/**
 * Giant water lilies (vitórias-régias) seen from above, drawn in the same
 * cell-block style as the sharks: a round pad with a raised rim, the
 * characteristic notch, radiating veins and soft top-left lighting, in
 * loose clusters, some with a flower in bloom.
 */
import type { OceanMetrics } from './page-ocean';

export interface LilyPad {
  id: number;
  /** Top-left corner in page pixels, snapped to the ocean's grid. */
  x: number;
  y: number;
  cols: number;
  rows: number;
  /** Radius in rows. */
  radius: number;
  /** Direction of the notch, in radians. */
  notch: number;
  seed: number;
  /** Where a flower sits, in cells from the pad's top-left; null for none. */
  flower: { col: number; row: number; size: number } | null;
  /** Animation timing, so pads don't drift in unison. */
  duration: number;
  delay: number;
}

type RGB = [number, number, number];

/** Widest column of the page content; pads mostly float either side of it. */
const CONTENT_WIDTH = 1200;

const DARK: RGB = [9, 46, 27];
const MID: RGB = [30, 108, 54];
const LIGHT: RGB = [112, 178, 84];
/** The underside of the rim, which shows where it curls away from the light. */
const MAROON: RGB = [112, 46, 60];
const PETAL: RGB = [246, 244, 250];
const BLUSH: RGB = [238, 150, 186];
const GOLD: RGB = [236, 190, 84];

const SUBSAMPLES = [0.25, 0.25, 0.75, 0.25, 0.25, 0.75, 0.75, 0.75];

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const css = (c: RGB, k = 1, alpha = 1) =>
  `rgba(${Math.round(clamp(c[0] * k, 0, 255))},${Math.round(clamp(c[1] * k, 0, 255))},${Math.round(clamp(c[2] * k, 0, 255))},${alpha.toFixed(3)})`;

/** Small deterministic PRNG, so the pads stay put across re-renders. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Cheap integer hash → [0, 1), for stable per-cell texture. */
function hash(x: number, y: number, z: number) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Shortest signed angle from b to a. */
const turnFrom = (a: number, b: number) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

function veinGlyph(angle: number) {
  const sector = Math.round(angle / (Math.PI / 4));
  switch (((sector % 4) + 4) % 4) {
    case 0:
      return '-';
    case 2:
      return '|';
    case 1:
      return '\\';
    default:
      return '/';
  }
}

function prepare(canvas: HTMLCanvasElement, cols: number, rows: number, cw: number, ch: number, fontFamily: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(cols * cw * dpr);
  canvas.height = Math.round(rows * ch * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cols * cw, rows * ch);
  ctx.font = `600 ${Math.round(ch * 0.74)}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  return ctx;
}

/** Paint one pad onto its own canvas (cols × rows cells). */
export function paintPad(canvas: HTMLCanvasElement, pad: LilyPad, cw: number, ch: number, fontFamily: string) {
  const ctx = prepare(canvas, pad.cols, pad.rows, cw, ch, fontFamily);
  if (!ctx) return;
  const ry = pad.radius;
  const rx = (pad.radius * ch) / cw;
  const cx = pad.cols / 2;
  const cy = pad.rows / 2;
  const rimWidth = clamp(1.25 / ry, 0.16, 0.5);
  const spokes = ry >= 4 ? 12 : 8;

  const inside = (nx: number, ny: number) => {
    const d = Math.hypot(nx, ny);
    if (d > 1) return false;
    // The notch: a wedge that closes just short of the centre.
    return !(d > 0.14 && Math.abs(turnFrom(Math.atan2(ny, nx), pad.notch)) < 0.25);
  };

  for (let r = 0; r < pad.rows; r++) {
    for (let c = 0; c < pad.cols; c++) {
      let hits = 0;
      for (let k = 0; k < SUBSAMPLES.length; k += 2) {
        if (inside((c + SUBSAMPLES[k] - cx) / rx, (r + SUBSAMPLES[k + 1] - cy) / ry)) hits++;
      }
      if (hits === 0) continue;
      const coverage = hits / 4;

      const nx = (c + 0.5 - cx) / rx;
      const ny = (r + 0.5 - cy) / ry;
      const d = Math.hypot(nx, ny);
      const angle = Math.atan2(ny, nx);
      const fromNotch = turnFrom(angle, pad.notch);
      const rim = d > 1 - rimWidth || coverage < 1;
      // Veins fan out from the centre, with one fainter ring tying them together.
      const spoke = Math.abs(Math.sin((fromNotch * spokes) / 2)) * d * ry;
      const vein = !rim && d > 0.16 && (spoke < 0.34 || (ry >= 5 && Math.abs(d - 0.58) < 0.3 / ry));

      // Light falls from the top-left; the pad is slightly dished.
      const lit = (-nx * 0.55 - ny * 0.83) * d;
      let shade = clamp(0.5 + lit * 0.34 + (hash(c, r, pad.seed) - 0.5) * 0.14, 0, 1);
      if (rim) shade = clamp(shade + 0.2, 0, 1);
      if (vein) shade *= 0.72;

      let color = shade < 0.5 ? mix(DARK, MID, shade * 2) : mix(MID, LIGHT, (shade - 0.5) * 2);
      if (rim && lit < -0.12) color = mix(color, MAROON, clamp(-lit * 1.5, 0, 0.6));

      ctx.fillStyle = css(color, 0.72, coverage * 0.94);
      ctx.fillRect(c * cw + 0.5, r * ch + 0.5, cw - 1, ch - 1);
      if (coverage < 0.75) continue;

      let glyph = '';
      if (rim) glyph = 'S8%X'[Math.floor(hash(c, r, pad.seed + 3) * 4)];
      else if (vein) glyph = spoke < 0.34 ? veinGlyph(angle) : '~';
      else if (hash(c, r, pad.seed + 7) < 0.5) glyph = '.:;t'[Math.floor((1 - shade) * 3.99)];
      if (!glyph) continue;
      ctx.fillStyle = rim ? css(color, 1.35, 0.9) : vein ? css(color, 1.5, 0.75) : css(color, 0.5, 0.9);
      ctx.fillText(glyph, (c + 0.5) * cw, (r + 0.5) * ch);
    }
  }
}

/** Paint a flower in bloom: white petals blushing pink toward a golden heart. */
export function paintFlower(canvas: HTMLCanvasElement, size: number, seed: number, cw: number, ch: number, fontFamily: string) {
  const rows = size * 2 + 1;
  const cols = Math.round((size * 2 + 1) * (ch / cw));
  const ctx = prepare(canvas, cols, rows, cw, ch, fontFamily);
  if (!ctx) return;
  const rx = cols / 2;
  const ry = rows / 2;
  const twist = hash(seed, 1, 2) * Math.PI;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const nx = (c + 0.5 - rx) / rx;
      const ny = (r + 0.5 - ry) / ry;
      const d = Math.hypot(nx, ny);
      const angle = Math.atan2(ny, nx);
      // Two rings of petals, the inner one turned against the outer.
      const outer = 0.66 + 0.34 * Math.abs(Math.cos(angle * 3.5 + twist));
      if (d > outer) continue;
      const inner = d < 0.5 + 0.12 * Math.abs(Math.cos(angle * 3.5 + twist + 0.9));
      const heart = d < 0.24;
      const color = heart ? GOLD : inner ? mix(BLUSH, PETAL, clamp((d - 0.2) / 0.4, 0, 1)) : PETAL;
      const lit = 0.86 + (-nx * 0.55 - ny * 0.83) * 0.14;
      ctx.fillStyle = css(color, lit * (inner ? 0.95 : 0.88), heart ? 1 : 0.92);
      ctx.fillRect(c * cw + 0.5, r * ch + 0.5, cw - 1, ch - 1);
      ctx.fillStyle = css(color, heart ? 0.55 : 0.62, 0.9);
      ctx.fillText(heart ? '@' : inner ? '*' : 'o', (c + 0.5) * cw, (r + 0.5) * ch);
    }
  }
}

export function flowerCells(size: number, cw: number, ch: number) {
  return { cols: Math.round((size * 2 + 1) * (ch / cw)), rows: size * 2 + 1 };
}

/** Scatter clusters of pads down the page, mostly in the side margins. */
export function scatterLilies({ width, height, cw, ch }: OceanMetrics): LilyPad[] {
  const rand = mulberry32(20261110);
  const margin = Math.max(0, (width - CONTENT_WIDTH) / 2);
  const wide = margin >= 110;
  const clusters = Math.min(18, Math.max(5, Math.round(height / (wide ? 420 : 560))));
  const pads: LilyPad[] = [];

  const add = (centerX: number, centerY: number, radius: number, mayFlower: boolean) => {
    const rows = radius * 2 + 1;
    const cols = Math.round((rows * ch) / cw);
    const notch = rand() * Math.PI * 2;
    let flower: LilyPad['flower'] = null;
    if (mayFlower && radius >= 5 && rand() < 0.6) {
      // Off-centre, on the side away from the notch.
      const size = 2;
      const at = notch + Math.PI + (rand() - 0.5) * 1.6;
      const cells = flowerCells(size, cw, ch);
      flower = {
        col: Math.round(cols / 2 + Math.cos(at) * (cols / 2) * 0.5 - cells.cols / 2),
        row: Math.round(rows / 2 + Math.sin(at) * (rows / 2) * 0.5 - cells.rows / 2),
        size,
      };
    }
    pads.push({
      id: pads.length,
      x: Math.round((centerX - (cols * cw) / 2) / cw) * cw,
      y: Math.round((centerY - (rows * ch) / 2) / ch) * ch,
      cols,
      rows,
      radius,
      notch,
      seed: Math.floor(rand() * 1e6),
      flower,
      duration: 11 + rand() * 9,
      delay: -rand() * 20,
    });
  };

  for (let i = 0; i < clusters; i++) {
    const radius = wide ? 4 + Math.floor(rand() * 4) : 3 + Math.floor(rand() * 2);
    let centerX: number;
    if (wide) {
      // Alternate sides, drifting a little over the edge of the content.
      const lane = margin * (0.25 + rand() * 0.7);
      centerX = i % 2 === 0 ? lane : width - lane;
    } else {
      centerX = rand() < 0.5 ? width * (0.02 + rand() * 0.18) : width * (0.8 + rand() * 0.18);
    }
    // One cluster per band of the page, clear of the header and the very bottom.
    const reach = (radius * 2 + 1) * ch;
    const centerY = clamp(((i + 0.15 + rand() * 0.7) / clusters) * height, 110 + reach / 2, height - reach);
    add(centerX, centerY, radius, true);

    // Younger pads gathered round the big one.
    const young = Math.floor(rand() * 3);
    for (let k = 0; k < young; k++) {
      const small = wide ? 2 + Math.floor(rand() * 2) : 2;
      const at = rand() * Math.PI * 2;
      const gap = (radius + small + 0.6 + rand()) * ch;
      add(centerX + Math.cos(at) * gap, centerY + Math.sin(at) * gap, small, false);
    }
  }
  return pads;
}
