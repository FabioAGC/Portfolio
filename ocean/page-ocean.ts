/**
 * One continuous ocean for a whole scrolling page.
 *
 * The world is as tall as the page, but drawing a canvas that size would be
 * far too large. Instead the canvas is a window a bit taller than the
 * viewport, positioned inside the page so it scrolls natively with the
 * content, and moved (in whole grid rows) whenever the viewport gets near
 * its edge. Each frame the world is drawn shifted by the window's offset.
 */
import { AsciiRenderer, World, type SharkKind, type SharkSpec } from '../vendor/ascii-sharks';

const STEP = 1 / 60;
const MAX_STEPS = 4;
/** Canvas height as a multiple of the viewport; the surplus is scroll headroom. */
const WINDOW_SCALE = 1.7;
/** Widest column of the page content; sharks mostly keep to either side of it. */
const CONTENT_WIDTH = 1200;

const KINDS: SharkKind[] = ['classic', 'hammerhead', 'thresher', 'mako', 'tiger', 'nurse', 'greathammer', 'zebra'];

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

export interface OceanMetrics {
  width: number;
  height: number;
  /** Grid cell size in CSS pixels. */
  cw: number;
  ch: number;
}

/** Roughly one shark per half-screen of page, cycling through every species. */
function roster(pageHeight: number): SharkSpec[] {
  const count = clamp(Math.round(pageHeight / 430), 6, 16);
  return Array.from({ length: count }, (_, i) => ({
    kind: KINDS[i % KINDS.length],
    size: i === 0 ? 1 : 0.6 + 0.4 * (((i * 5) % count) / count),
  }));
}

export class PageOcean {
  private renderer: AsciiRenderer;
  private world: World | null = null;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private disposed = false;
  private width = 0;
  private pageHeight = 0;
  private viewHeight = 0;
  private canvasHeight = 0;
  private ch = 17;
  /** Offset of the canvas window from the top of the page, in CSS pixels. */
  private top = 0;
  private pointer = { x: 0, y: 0, active: false };
  private reducedMotion: MediaQueryList;
  private resizeObserver: ResizeObserver;

  constructor(
    private canvas: HTMLCanvasElement,
    private page: HTMLElement,
    private onMetrics?: (metrics: OceanMetrics) => void,
  ) {
    this.renderer = new AsciiRenderer(canvas);
    this.renderer.setFontFamily(getComputedStyle(canvas).fontFamily);
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(page);

    this.reducedMotion.addEventListener('change', this.onMotionPreference);
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('click', this.onClick, { passive: true });
    window.addEventListener('blur', this.onPointerLeave);
    document.documentElement.addEventListener('pointerleave', this.onPointerLeave);
    document.addEventListener('visibilitychange', this.onVisibility);

    this.resize();
    // Canvas text can't trigger a webfont load; once the mono face is in, redraw.
    document.fonts?.load(`600 16px ${getComputedStyle(canvas).fontFamily}`).then(() => {
      if (!this.disposed && this.reducedMotion.matches) this.drawStill();
    });
    this.schedule();
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.reducedMotion.removeEventListener('change', this.onMotionPreference);
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('blur', this.onPointerLeave);
    document.documentElement.removeEventListener('pointerleave', this.onPointerLeave);
    document.removeEventListener('visibilitychange', this.onVisibility);
  }

  private resize() {
    const width = this.page.clientWidth;
    const pageHeight = this.page.offsetHeight;
    if (width < 1 || pageHeight < 1) return;
    // Mobile browsers resize the viewport as their toolbars slide; only ever
    // grow the window for that, so the canvas isn't rebuilt mid-scroll.
    const viewHeight = width === this.width ? Math.max(this.viewHeight, window.innerHeight) : window.innerHeight;
    if (width === this.width && pageHeight === this.pageHeight && viewHeight === this.viewHeight) return;
    this.width = width;
    this.pageHeight = pageHeight;
    this.viewHeight = viewHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // The cell size depends only on the width; size once to learn it.
    this.renderer.resize(width, 16, dpr);
    const cw = this.renderer.cellWidth;
    const ch = (this.ch = this.renderer.cellHeight);
    const pageRows = Math.ceil(pageHeight / ch);
    this.canvasHeight = Math.min(Math.ceil((viewHeight * WINDOW_SCALE) / ch), pageRows) * ch;
    this.canvas.style.height = `${this.canvasHeight}px`;
    this.renderer.resize(width, this.canvasHeight, dpr);

    if (!this.world) {
      const fishCount = clamp(Math.round((width * pageHeight) / 5200), 85, 1400);
      this.world = new World(roster(pageHeight), fishCount, { patrol: 'lanes', contentWidth: CONTENT_WIDTH });
    }
    this.world.resize(width, pageHeight, cw, ch);
    this.onMetrics?.({ width, height: pageHeight, cw, ch });

    this.top = -1;
    this.follow(true);
    if (this.reducedMotion.matches) this.drawStill();
    else this.draw(STEP);
  }

  /** Keep the canvas window over the viewport, moving it in whole rows. */
  private follow(force = false) {
    const scrollY = -this.page.getBoundingClientRect().top;
    const headroom = (this.canvasHeight - this.viewHeight) / 2;
    const maxTop = Math.max(0, Math.ceil(this.pageHeight / this.ch) * this.ch - this.canvasHeight);
    const nearEdge =
      scrollY < this.top + headroom * 0.4 || scrollY + this.viewHeight > this.top + this.canvasHeight - headroom * 0.4;
    if (!force && !nearEdge) return;
    const top = clamp(Math.round((scrollY - headroom) / this.ch) * this.ch, 0, maxTop);
    if (top === this.top) return;
    if (this.top >= 0) this.renderer.scrollRows((top - this.top) / this.ch);
    this.top = top;
    this.canvas.style.transform = `translateY(${top}px)`;
  }

  private schedule() {
    cancelAnimationFrame(this.raf);
    if (this.disposed || document.hidden || this.reducedMotion.matches) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    const world = this.world;
    if (world) {
      const dt = Math.min(0.1, (now - this.last) / 1000);
      this.last = now;
      this.acc += dt;

      // The pointer's place in the world changes as the page scrolls under it.
      const rect = this.page.getBoundingClientRect();
      world.pointer.x = this.pointer.x - rect.left;
      world.pointer.y = this.pointer.y - rect.top;
      world.pointer.active = this.pointer.active;

      let steps = 0;
      while (this.acc >= STEP && steps < MAX_STEPS) {
        world.step(STEP);
        this.acc -= STEP;
        steps++;
      }
      if (steps === MAX_STEPS) this.acc = 0;
      this.follow();
      this.draw(dt);
    }
    this.raf = requestAnimationFrame(this.frame);
  };

  /** Draw the part of the world under the canvas window. */
  private draw(dt: number) {
    const world = this.world;
    if (!world) return;
    this.shift(world, -this.top);
    this.renderer.render(world, dt);
    this.shift(world, this.top);
  }

  /** Move everything the renderer reads between world and window coordinates. */
  private shift(world: World, dy: number) {
    if (!dy) return;
    for (const f of world.fish) f.y += dy;
    for (const sh of world.sharks) {
      for (let i = 1; i < sh.nodes.length; i += 2) sh.nodes[i] += dy;
    }
    for (const e of world.events) e.y += dy;
    world.pointer.y += dy;
  }

  /** Reduced motion: let the ecosystem settle, then show single frames. */
  private drawStill() {
    const world = this.world;
    if (!world) return;
    if (world.time < 2) {
      for (let i = 0; i < 120; i++) world.step(STEP);
    }
    this.follow();
    this.draw(STEP);
  }

  private onWindowResize = () => this.resize();

  private onScroll = () => {
    // The animation loop follows the scroll itself; without it, redraw here.
    if (this.reducedMotion.matches) this.drawStill();
  };

  private onVisibility = () => this.schedule();

  private onMotionPreference = () => {
    if (this.reducedMotion.matches) {
      cancelAnimationFrame(this.raf);
      this.drawStill();
    } else {
      this.schedule();
    }
  };

  private onPointerMove = (e: PointerEvent) => {
    this.pointer.x = e.clientX;
    this.pointer.y = e.clientY;
    this.pointer.active = e.pointerType !== 'touch';
  };

  private onPointerLeave = () => {
    this.pointer.active = false;
  };

  private onClick = (e: MouseEvent) => {
    if (!this.world || this.reducedMotion.matches) return;
    const rect = this.page.getBoundingClientRect();
    this.world.splash(e.clientX - rect.left, e.clientY - rect.top);
  };
}
