import { useState, useRef, useCallback } from "react";
import beforeImg from "@/assets/before-after-1.jpg";
import afterImg from "@/assets/before-after-2.jpg";

const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    // RTL: invert direction
    const x = rect.right - clientX;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto aspect-square rounded-2xl overflow-hidden cursor-col-resize select-none touch-none shadow-xl"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* After image (full) */}
      <img
        src={afterImg}
        alt="بعد التبييض"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* Before image (clipped from the right in RTL) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeImg}
          alt="قبل التبييض"
          className="absolute top-0 right-0 h-full object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100vw' }}
          draggable={false}
        />
      </div>
      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg"
        style={{ right: `${position}%`, transform: 'translateX(50%)' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 right-1/2 w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center shadow-lg">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 10L2 10M2 10L5 7M2 10L5 13" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 10L18 10M18 10L15 7M18 10L15 13" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-4 right-4 bg-foreground/70 text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
        قبل
      </span>
      <span className="absolute top-4 left-4 bg-primary/80 text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
        بعد
      </span>
    </div>
  );
};

const BeforeAfterSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4">
          نتائج حقيقية من عملائنا
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          اسحب للمقارنة — قبل وبعد!
        </p>
        <BeforeAfterSlider />
        <div className="text-center mt-10">
          <a href="#booking" className="btn-gold text-lg">
            احجز جلستك الآن
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
