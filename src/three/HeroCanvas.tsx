import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion';
import { motion } from 'framer-motion';

const ConsoleScene = lazy(() => import('./LazyConsoleScene'));

export const HeroCanvas = () => {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[320px] w-full sm:h-[420px]">
      <motion.div
        className="absolute inset-0 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 via-transparent to-transparent blur-3xl"
        aria-hidden
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-accent/80">Initializing 3D console...</div>}>
        <Canvas
          dpr={typeof window !== 'undefined' && window.devicePixelRatio > 1 ? [1, 1.5] : 1}
          camera={{ position: [0, 1.2, 5], fov: 55 }}
          frameloop={visible ? 'always' : 'demand'}
          className="rounded-3xl border border-border/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900"
        >
          <ConsoleScene reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>
    </div>
  );
};
