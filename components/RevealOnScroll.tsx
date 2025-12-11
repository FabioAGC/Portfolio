import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number; // Delay in ms
  threshold?: number; // Intersection threshold (0 to 1)
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on intersection status to allow re-appearing
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: threshold,
        // Trigger slightly before the bottom to feel responsive
        rootMargin: '0px 0px -50px 0px', 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const style = {
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-700 ease-out transform will-change-transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 filter blur-0 scale-100' 
          : 'opacity-0 translate-y-12 filter blur-sm scale-95'
      }`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;