import React, { useEffect, useRef } from 'react';
import { AsciiOcean } from '../vendor/ascii-sharks/react';
import type { SharkSpec } from '../vendor/ascii-sharks';
import { OceanDecor } from '../ocean/decor';

interface OceanBackdropProps {
  sharks: SharkSpec[];
  /** What sits between the water and the content: an even veil, or the hero's gradient. */
  cover?: 'veil' | 'scrim';
}

/**
 * A stretch of ocean that fills its (positioned) parent and scrolls with it.
 * Each one runs its own simulation and pauses while off-screen.
 */
const OceanBackdrop: React.FC<OceanBackdropProps> = ({ sharks, cover = 'veil' }) => {
  const decorRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = decorRef.current;
    if (!canvas) return;
    const decor = new OceanDecor(canvas);
    return () => decor.destroy();
  }, []);

  return (
    <div className="backdrop" aria-hidden="true">
      <AsciiOcean className="backdrop__layer" sharks={sharks} />
      <div className={`backdrop__layer backdrop__${cover}`} />
      <canvas ref={decorRef} className="backdrop__layer backdrop__decor" />
    </div>
  );
};

export default OceanBackdrop;
