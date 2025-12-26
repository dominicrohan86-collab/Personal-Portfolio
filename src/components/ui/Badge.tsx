import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type BadgeProps = {
  children: ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
};

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
      variant === 'outline'
        ? 'border border-accent/50 text-accent bg-transparent'
        : 'bg-accent/20 text-accent border border-accent/20',
      className
    )}
  >
    {children}
  </span>
);
