/**
 * Extra ASCII scenery drawn on a transparent canvas above an ascii-sharks
 * ocean, on the same cell grid: kelp swaying along the bottom edge, and
 * ripples that spread from wherever the visitor clicks or taps.
 */

const RIPPLE_DURATION = 2.1;
const RIPPLE_RADIUS = 190;
const RIPPLE_RINGS = 3;
const RING_DELAY = 0.24;
/** Widest column of the page content; taller kelp only grows outside it. */
const CONTENT_WIDTH = 1200;

interface Stalk {
  col: number;
  height: number;
  phase: number;
  sway: number;
  speed: number;
  /** 0 green, 1 teal. */
  tone: 0 | 1;
}

interface Ripple {
  x: number;
  y: number;
  start: number;
}

const TONES = ['60,181,74', '51,200,204'];
const WAKE = '110,230,255';

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

/** Glyph that follows the ring's tangent, so the cells read as a circle. */
function ringGlyph(dx: number, dy: number) {
  const a = Math.atan2(dy, dx);
  const s = Math.round(a / (Math.PI / 4));
  switch (((s % 8) + 8) % 8) {
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

export class OceanDecor {
  private ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private cw = 12;
  private ch = 17;
  private cols = 0;
  private rows = 0;
  private stalks: Stalk[] = [];
  private maxStalk = 0;
  private ripples: Ripple[] = [];
  private raf = 0;
  private visible = true;
  private disposed = false;
  private fontFamily: string;
  private reducedMotion: MediaQueryList;
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas unavailable');
    this.ctx = ctx;
    this.fontFamily = getComputedStyle(canvas).fontFamily || 'ui-monospace, Menlo, monospace';
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.schedule();
    });
    this.intersectionObserver.observe(canvas);

    this.reducedMotion.addEventListener('change', this.onMotionPreference);
    window.addEventListener('click', this.onClick, { passive: true });

    this.resize();
    this.schedule();
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.reducedMotion.removeEventListener('change', this.onMotionPreference);
    window.removeEventListener('click', this.onClick);
  }

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    this.width = rect.width;
    this.height = rect.height;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Same cell metrics as the ascii-sharks renderer, so both layers share a grid.
    this.cw = clamp(Math.round(rect.width / 124), 8, 13);
    this.ch = Math.round(this.cw * 1.45);
    const cols = Math.ceil(rect.width / this.cw);
    this.rows = Math.floor(rect.height / this.ch);
    this.canvas.width = Math.round(rect.width * this.dpr);
    this.canvas.height = Math.round(rect.height * this.dpr);
    if (cols !== this.cols) {
      this.cols = cols;
      this.plant();
    }
    this.draw(performance.now() / 1000);
  }

  /** Kelp in loose clumps: short over the content column, tall in the side margins. */
  private plant() {
    const margin = Math.max(0, (this.width - CONTENT_WIDTH) / 2);
    this.stalks = [];
    this.maxStalk = 0;
    let col = 1;
    while (col < this.cols - 1) {
      const clump = 1 + Math.floor(Math.random() * 4);
      for (let i = 0; i < clump && col < this.cols - 1; i++) {
        const x = col * this.cw;
        const inMargin = x < margin - this.cw || x > this.width - margin + this.cw;
        const height = inMargin ? 5 + Math.floor(Math.random() * 10) : 2 + Math.floor(Math.random() * 3);
        this.stalks.push({
          col,
          height,
          phase: Math.random() * Math.PI * 2,
          sway: inMargin ? 1 + Math.random() * 1.2 : 0.7,
          speed: 0.6 + Math.random() * 0.5,
          tone: Math.random() < 0.75 ? 0 : 1,
        });
        this.maxStalk = Math.max(this.maxStalk, height);
        col += 1 + Math.floor(Math.random() * 2);
      }
      col += 3 + Math.floor(Math.random() * 9);
    }
  }

  private schedule() {
    cancelAnimationFrame(this.raf);
    if (this.disposed || !this.visible || this.reducedMotion.matches) return;
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    this.draw(now / 1000);
    this.raf = requestAnimationFrame(this.frame);
  };

  private draw(t: number) {
    const { ctx, dpr, cw, ch } = this;
    if (this.cols === 0) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.font = `600 ${Math.round(ch * 0.74)}px ${this.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    this.drawKelp(this.reducedMotion.matches ? 0 : t);
    this.drawRipples(t);
  }

  private drawKelp(t: number) {
    const { ctx, cw, ch, rows } = this;
    for (const s of this.stalks) {
      let prev = s.col;
      for (let r = 0; r < s.height; r++) {
        const k = r / s.height;
        const bend = Math.sin(t * s.speed + s.phase + r * 0.5) * s.sway * Math.pow(k, 1.2);
        const col = Math.round(s.col + bend);
        const row = rows - 1 - r;
        let glyph: string;
        if (r === s.height - 1) glyph = '`';
        else if (col > prev) glyph = '/';
        else if (col < prev) glyph = '\\';
        else glyph = (r + s.col) % 2 === 0 ? '(' : ')';
        prev = col;
        if (row < 0 || col < 0 || col >= this.cols) continue;
        ctx.fillStyle = `rgba(${TONES[s.tone]},${(0.3 + 0.38 * k).toFixed(2)})`;
        ctx.fillText(glyph, (col + 0.5) * cw, (row + 0.5) * ch);
      }
    }
  }

  private drawRipples(t: number) {
    const { ctx, cw, ch } = this;
    this.ripples = this.ripples.filter((r) => t - r.start < RIPPLE_DURATION);
    for (const ripple of this.ripples) {
      const age = t - ripple.start;
      const c0 = Math.floor((ripple.x - RIPPLE_RADIUS) / cw);
      const c1 = Math.ceil((ripple.x + RIPPLE_RADIUS) / cw);
      const r0 = Math.floor((ripple.y - RIPPLE_RADIUS) / ch);
      const r1 = Math.ceil((ripple.y + RIPPLE_RADIUS) / ch);

      // The drop itself, for the first instant.
      if (age < 0.3) {
        ctx.fillStyle = `rgba(${WAKE},${(1 - age / 0.3).toFixed(2)})`;
        ctx.fillText('o', (Math.floor(ripple.x / cw) + 0.5) * cw, (Math.floor(ripple.y / ch) + 0.5) * ch);
      }

      for (let ring = 0; ring < RIPPLE_RINGS; ring++) {
        const life = RIPPLE_DURATION - ring * RING_DELAY;
        const p = (age - ring * RING_DELAY) / life;
        if (p <= 0 || p >= 1) continue;
        // Fast at first, then easing out, like a real wavefront losing energy.
        const radius = RIPPLE_RADIUS * (1 - Math.pow(1 - p, 2.2)) * (1 - ring * 0.12);
        const alpha = Math.pow(1 - p, 1.4) * (0.95 - ring * 0.25);
        if (alpha < 0.03) continue;
        ctx.fillStyle = `rgba(${WAKE},${alpha.toFixed(2)})`;
        const thickness = cw * 0.5;
        for (let row = Math.max(0, r0); row <= r1; row++) {
          const dy = (row + 0.5) * ch - ripple.y;
          for (let col = Math.max(0, c0); col <= c1; col++) {
            const dx = (col + 0.5) * cw - ripple.x;
            const d = Math.hypot(dx, dy);
            if (Math.abs(d - radius) > thickness) continue;
            ctx.fillText(ringGlyph(dx, dy), (col + 0.5) * cw, (row + 0.5) * ch);
          }
        }
      }
    }
  }

  private onClick = (e: MouseEvent) => {
    if (this.reducedMotion.matches) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    this.ripples.push({ x, y, start: performance.now() / 1000 });
  };

  private onMotionPreference = () => {
    if (this.reducedMotion.matches) {
      cancelAnimationFrame(this.raf);
      this.ripples = [];
      this.draw(0);
    } else {
      this.schedule();
    }
  };
}
