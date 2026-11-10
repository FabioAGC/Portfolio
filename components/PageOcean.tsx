import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PageOcean as PageOceanEngine, type OceanMetrics } from '../ocean/page-ocean';
import { Ripples } from '../ocean/ripples';
import { scatterLilies } from '../ocean/lily';

interface PageOceanProps {
  /** The element that wraps the whole page; the ocean is as tall as it is. */
  pageRef: React.RefObject<HTMLElement | null>;
}

/**
 * Everything behind the content: one continuous ocean that scrolls with the
 * page, a veil that keeps text legible, floating water lilies, and ripples.
 */
const PageOcean: React.FC<PageOceanProps> = ({ pageRef }) => {
  const oceanRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState<OceanMetrics | null>(null);

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

  const lilies = useMemo(() => (metrics ? scatterLilies(metrics) : []), [metrics]);

  return (
    <div className="ocean" aria-hidden="true">
      <canvas ref={oceanRef} className="ocean__water" />
      <div className="ocean__scrim" />
      <div className="ocean__veil" />

      {metrics && (
        <div
          className="lilies"
          style={{ '--cw': `${metrics.cw}px`, '--ch': `${metrics.ch}px` } as React.CSSProperties}
        >
          {lilies.map((lily) => (
            <div
              key={lily.id}
              className="lily"
              style={{
                left: lily.x,
                top: lily.y,
                width: lily.cols * metrics.cw,
                height: lily.rows * metrics.ch,
                animationDuration: `${lily.duration}s`,
                animationDelay: `${lily.delay}s`,
              }}
            >
              <pre className="lily__fill">{lily.fill}</pre>
              <pre className="lily__rim">{lily.rim}</pre>
              {lily.flower && <pre className="lily__flower">{lily.flower}</pre>}
            </div>
          ))}
        </div>
      )}

      <canvas ref={ripplesRef} className="ocean__ripples" />
    </div>
  );
};

export default PageOcean;
