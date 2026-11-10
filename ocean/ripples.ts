/**
 * Ripples that spread from wherever the visitor clicks or taps, like a drop
 * falling into a lake. Drawn as ASCII on a fixed, viewport-sized canvas, on
 * the same cell grid as the ocean, and anchored to the page so they scroll
 * with it. The canvas only animates while a ripple is alive.
 */

const DURATION = 3;
const RADIUS = 210;
const RINGS = 3;
const RING_DELAY = 0.34;
/** How far either side of a wavefront cells still light up, in cell widths. */
const SOFTNESS = 1.15;
const COLOR = '110,230,255';

interface Ripple {
  /** Page coordinates. */
  x: number;
  y: number;
  start: number;
}

/** Glyph that follows the ring's tangent, so the cells read as a circle. */
function ringGlyph(dx: number, dy: number) {
  const sector = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
  switch (((sector % 8) + 8) % 8) {
    case 0:
      return ')';
    case 4:
      return '(';
    case 2:
    case 6:
      return '-';
    case 1:
    case 5:
      return '/';
    default:
      return '\\';
  }
}

export class Ripples {
  private ctx: CanvasRenderingContext2D;
  private ripples: Ripple[] = [];
  private raf = 0;
  private cw = 12;
  private ch = 17;
  private fontFamily: string;
  private reducedMotion: MediaQueryList;

  constructor(
    private canvas: HTMLCanvasElement,
    private page: HTMLElement,
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas unavailable');
    this.ctx = ctx;
    this.fontFamily = getComputedStyle(canvas).fontFamily || 'ui-monospace, Menlo, monospace';
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    window.addEventListener('click', this.onClick, { passive: true });
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('click', this.onClick);
  }

  /** Share the ocean's cell size so rings land on its grid. */
  setCell(cw: number, ch: number) {
    this.cw = cw;
    this.ch = ch;
  }

  private onClick = (e: MouseEvent) => {
    if (this.reducedMotion.matches) return;
    const rect = this.page.getBoundingClientRect();
    this.ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, start: performance.now() / 1000 });
    if (!this.raf) this.raf = requestAnimationFrame(this.frame);
  };

  private frame = (now: number) => {
    const t = now / 1000;
    this.ripples = this.ripples.filter((r) => t - r.start < DURATION);
    this.draw(t);
    this.raf = this.ripples.length ? requestAnimationFrame(this.frame) : 0;
  };

  private draw(t: number) {
    const { ctx, canvas, cw, ch } = this;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.font = `600 ${Math.round(ch * 0.74)}px ${this.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Cells are laid out in page space, then offset to where the page is now.
    const rect = this.page.getBoundingClientRect();
    for (const ripple of this.ripples) {
      const age = t - ripple.start;
      const c0 = Math.floor((ripple.x - RADIUS) / cw);
      const c1 = Math.ceil((ripple.x + RADIUS) / cw);
      const r0 = Math.floor((ripple.y - RADIUS) / ch);
      const r1 = Math.ceil((ripple.y + RADIUS) / ch);

      // The drop itself, for the first instant.
      if (age < 0.5) {
        ctx.fillStyle = `rgba(${COLOR},${Math.pow(1 - age / 0.5, 2).toFixed(2)})`;
        ctx.fillText(
          'o',
          (Math.floor(ripple.x / cw) + 0.5) * cw + rect.left,
          (Math.floor(ripple.y / ch) + 0.5) * ch + rect.top,
        );
      }

      for (let ring = 0; ring < RINGS; ring++) {
        const p = (age - ring * RING_DELAY) / (DURATION - ring * RING_DELAY);
        if (p <= 0 || p >= 1) continue;
        // Fast at first, then easing out, like a wavefront losing energy.
        const radius = RADIUS * (1 - Math.pow(1 - p, 2.6)) * (1 - ring * 0.12);
        // Ease in over the first moments as well as out, so rings don't pop.
        const alpha = Math.min(1, p * 9) * Math.pow(1 - p, 1.6) * (1 - ring * 0.25);
        if (alpha < 0.03) continue;
        // Cells fade in and out as the front crosses them, so the ring
        // glides outward instead of jumping from cell to cell.
        const reach = cw * SOFTNESS;
        for (let row = r0; row <= r1; row++) {
          const dy = (row + 0.5) * ch - ripple.y;
          for (let col = c0; col <= c1; col++) {
            const dx = (col + 0.5) * cw - ripple.x;
            const off = Math.abs(Math.hypot(dx, dy) - radius);
            if (off > reach) continue;
            const near = 1 - off / reach;
            ctx.fillStyle = `rgba(${COLOR},${(alpha * near * near).toFixed(3)})`;
            ctx.fillText(ringGlyph(dx, dy), (col + 0.5) * cw + rect.left, (row + 0.5) * ch + rect.top);
          }
        }
      }
    }
  }
}
