/**
 * Giant water lilies (vitórias-régias) seen from above, as ASCII: a round pad
 * with a raised rim and the characteristic notch, sometimes with a flower.
 */
import type { OceanMetrics } from './page-ocean';

export interface LilyPad {
  id: number;
  /** Top-left corner in page pixels, snapped to the ocean's grid. */
  x: number;
  y: number;
  cols: number;
  rows: number;
  /** Text layers, rows joined by newlines. */
  rim: string;
  fill: string;
  flower: string | null;
  /** Animation timing, so pads don't bob in unison. */
  duration: number;
  delay: number;
}

/** Widest column of the page content; pads mostly float either side of it. */
const CONTENT_WIDTH = 1200;

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

function rimGlyph(nx: number, ny: number) {
  const sector = Math.round(Math.atan2(ny, nx) / (Math.PI / 4));
  switch (((sector % 8) + 8) % 8) {
    case 0:
      return ')';
    case 4:
      return '(';
    case 2:
      return '_';
    case 6:
      return '-';
    case 1:
    case 5:
      return '/';
    default:
      return '\\';
  }
}

function drawPad(radiusRows: number, aspect: number, rand: () => number) {
  const ry = radiusRows;
  const rx = radiusRows * aspect;
  const rows = 2 * ry + 1;
  const cols = 2 * Math.round(rx) + 1;
  const cx = (cols - 1) / 2;
  const cy = ry;
  const notch = rand() * Math.PI * 2;
  const rim: string[] = [];
  const fill: string[] = [];
  const edge = 0.95 / ry;

  for (let r = 0; r < rows; r++) {
    let rimRow = '';
    let fillRow = '';
    for (let c = 0; c < cols; c++) {
      const nx = (c - cx) / rx;
      const ny = (r - cy) / ry;
      const d = Math.hypot(nx, ny);
      let turn = Math.atan2(ny, nx) - notch;
      turn = Math.atan2(Math.sin(turn), Math.cos(turn));
      const inNotch = d > 0.2 && Math.abs(turn) < 0.2;
      if (d > 1.04 || inNotch) {
        rimRow += ' ';
        fillRow += ' ';
      } else if (d > 1.04 - edge) {
        rimRow += rimGlyph(nx, ny);
        fillRow += ' ';
      } else {
        rimRow += ' ';
        const roll = rand();
        // Veins: faint spokes running out from the centre.
        const spoke = Math.abs(Math.sin(Math.atan2(ny, nx) * 5)) > 0.96 && d > 0.25;
        fillRow += spoke ? ':' : roll < 0.14 ? '.' : roll < 0.2 ? "'" : ' ';
      }
    }
    rim.push(rimRow);
    fill.push(fillRow);
  }
  return { rows, cols, rim: rim.join('\n'), fill: fill.join('\n') };
}

const FLOWER = [' \\|/ ', '-(@)-', ' /|\\ '].join('\n');

/** Scatter pads down the page, mostly in the side margins. */
export function scatterLilies({ width, height, cw, ch }: OceanMetrics): LilyPad[] {
  const rand = mulberry32(20261110);
  const margin = Math.max(0, (width - CONTENT_WIDTH) / 2);
  const wide = margin >= 110;
  const count = Math.min(22, Math.max(5, Math.round(height / (wide ? 340 : 520))));
  const pads: LilyPad[] = [];

  for (let i = 0; i < count; i++) {
    const radius = wide ? 3 + Math.floor(rand() * 4) : 2 + Math.floor(rand() * 2);
    const pad = drawPad(radius, ch / cw, rand);
    const w = pad.cols * cw;
    const h = pad.rows * ch;

    let centerX: number;
    if (wide) {
      // Alternate sides, drifting a little over the edge of the content.
      const lane = margin * (0.25 + rand() * 0.75);
      centerX = i % 2 === 0 ? lane : width - lane;
    } else {
      centerX = rand() < 0.5 ? width * (0.02 + rand() * 0.2) : width * (0.78 + rand() * 0.2);
    }
    // One per band of the page, kept clear of the header and the very bottom.
    const centerY = Math.min(height - h, Math.max(110 + h / 2, ((i + 0.15 + rand() * 0.7) / count) * height));

    pads.push({
      id: i,
      x: Math.round((centerX - w / 2) / cw) * cw,
      y: Math.round((centerY - h / 2) / ch) * ch,
      cols: pad.cols,
      rows: pad.rows,
      rim: pad.rim,
      fill: pad.fill,
      flower: rand() < 0.4 ? FLOWER : null,
      duration: 7 + rand() * 6,
      delay: -rand() * 10,
    });
  }
  return pads;
}
