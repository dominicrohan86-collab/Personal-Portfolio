import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export const Card = ({ children, className, interactive }: CardProps) => (
  <div
    className={cn(
      'glass relative overflow-hidden rounded-2xl border shadow-card',
      interactive && 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow',
      className
    )}
  >
    <div className="relative z-10">{children}</div>
    <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
  </div>
);
