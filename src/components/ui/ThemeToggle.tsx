import { Moon, Sun } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../utils/theme';

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 text-canvas-foreground shadow-card transition hover:border-accent/70 hover:text-accent focus-ring',
        className
      )}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
