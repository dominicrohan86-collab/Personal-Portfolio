import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export const Section = ({ id, title, children, className }: SectionProps) => (
  <section id={id} className={cn('py-16 sm:py-24', className)}>
    <div className="container max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent/80">Section</p>
            <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-accent/60 via-accent/10 to-transparent sm:block" />
        </div>
        {children}
      </motion.div>
    </div>
  </section>
);
