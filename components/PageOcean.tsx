import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PageOcean as PageOceanEngine, type OceanMetrics } from '../ocean/page-ocean';
import { Ripples } from '../ocean/ripples';
import { flowerCells, paintFlower, paintPad, scatterLilies, type LilyPad } from '../ocean/lily';

interface PageOceanProps {
  /** The element that wraps the whole page; the ocean is as tall as it is. */
  pageRef: React.RefObject<HTMLElement | null>;
}

interface LilyProps {
  pad: LilyPad;
  cw: number;
  ch: number;
  /** Bumped once the mono webfont is ready, to repaint with the right glyphs. */
  fontEpoch: number;
}

const Lily: React.FC<LilyProps> = ({ pad, cw, ch, fontEpoch }) => {
  const padRef = useRef<HTMLCanvasElement>(null);
  const flowerRef = useRef<HTMLCanvasElement>(null);
  const flower = pad.flower ? { ...pad.flower, ...flowerCells(pad.flower.size, cw, ch) } : null;

  useEffect(() => {
    const canvas = padRef.current;
    if (!canvas) return;
    const fontFamily = getComputedStyle(canvas).fontFamily;
    paintPad(canvas, pad, cw, ch, fontFamily);
    if (flowerRef.current && pad.flower) {
      paintFlower(flowerRef.current, pad.flower.size, pad.seed, cw, ch, fontFamily);
    }
  }, [pad, cw, ch, fontEpoch]);

  return (
    <div
      className="lily"
      style={{
        left: pad.x,
        top: pad.y,
        width: pad.cols * cw,
        height: pad.rows * ch,
        animationDuration: `${pad.duration}s`,
        animationDelay: `${pad.delay}s`,
      }}
    >
      <canvas ref={padRef} className="lily__pad" />
      {flower && (
        <canvas
          ref={flowerRef}
          className="lily__flower"
          style={{
            left: flower.col * cw,
            top: flower.row * ch,
            width: flower.cols * cw,
            height: flower.rows * ch,
          }}
        />
      )}
    </div>
  );
};

/**
 * Everything behind the content: one continuous ocean that scrolls with the
 * page, a veil that keeps text legible, floating water lilies, and ripples.
 */
const PageOcean: React.FC<PageOceanProps> = ({ pageRef }) => {
  const oceanRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState<OceanMetrics | null>(null);
  const [fontEpoch, setFontEpoch] = useState(0);

  useEffect(() => {
    const page = pageRef.current;
    const oceanCanvas = oceanRef.current;
    const ripplesCanvas = ripplesRef.current;
    if (!page || !oceanCanvas || !ripplesCanvas) return;

    const ripples = new Ripples(ripplesCanvas, page);
    const ocean = new PageOceanEngine(oceanCanvas, page, (m) => {
      ripples.setCell(m.cw, m.ch);
      setMetrics(m);
    });
    return () => {
      ocean.destroy();
      ripples.destroy();
    };
  }, [pageRef]);

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) setFontEpoch((n) => n + 1);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const lilies = useMemo(() => (metrics ? scatterLilies(metrics) : []), [metrics]);

  return (
    <div className="ocean" aria-hidden="true">
      <canvas ref={oceanRef} className="ocean__water" />
      {/* Under the veil, at the same depth as the sharks. */}
      {metrics && (
        <div className="lilies">
          {lilies.map((pad) => (
            <Lily key={pad.id} pad={pad} cw={metrics.cw} ch={metrics.ch} fontEpoch={fontEpoch} />
          ))}
        </div>
      )}

      <div className="ocean__scrim" />
      <div className="ocean__veil" />

      <canvas ref={ripplesRef} className="ocean__ripples" />
    </div>
  );
};

export default PageOcean;
