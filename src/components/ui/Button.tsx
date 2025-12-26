import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cloneElement, isValidElement } from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: ReactNode;
  asChild?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-slate-900 shadow-glow hover:shadow-lg hover:shadow-accent/30 focus-visible:ring-2 focus-visible:ring-accent',
  secondary: 'bg-card text-canvas-foreground border border-border hover:border-accent/70 hover:shadow-glow',
  ghost: 'bg-transparent border border-transparent hover:border-accent/60 hover:text-accent',
  outline: 'border border-border hover:border-accent/70 text-canvas-foreground'
};

export const Button = ({ className, variant = 'primary', icon, asChild, children, ...props }: ButtonProps) => {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(
        'inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus-ring',
        variantClasses[variant],
        (children as { props?: { className?: string } }).props?.className
      )
    });
  }

  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus-ring',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};
