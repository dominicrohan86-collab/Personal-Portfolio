import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  intro?: string;
};

export const Section = ({
  id,
  title,
  children,
  className,
  eyebrow = 'Section',
  intro
}: SectionProps) => (
  <section id={id} className={cn('py-20 sm:py-28', className)}>
    <div className="container max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase text-accent/80">
              {eyebrow}
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 text-base leading-8 text-canvas-foreground/70 sm:text-lg">
                {intro}
              </p>
            ) : null}
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-accent/60 via-signal/40 to-transparent sm:block" />
        </div>
        {children}
      </motion.div>
    </div>
  </section>
);
