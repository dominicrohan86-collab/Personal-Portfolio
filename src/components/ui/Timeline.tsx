import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type TimelineItem = {
  title: string;
  subtitle: string;
  meta?: string;
  content: ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export const Timeline = ({ items, className }: TimelineProps) => (
  <div className={cn('relative', className)}>
    <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent/60 via-border to-transparent" aria-hidden />
    <div className="space-y-8">
      {items.map((item, idx) => (
        <div key={item.title} className="relative pl-10">
          <div className="absolute left-1 top-1.5 h-5 w-5 rounded-full border border-accent/60 bg-canvas shadow-glow" aria-hidden />
          <div className="glass rounded-xl border border-border/70 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-accent/90">{item.meta}</p>
            </div>
            <p className="text-sm text-canvas-foreground/70">{item.subtitle}</p>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-canvas-foreground">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
