import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { useActiveSection } from '../utils/useActiveSection';
import { ThemeToggle } from './ui/ThemeToggle';
import { AccentPicker } from './ui/AccentPicker';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'contact', label: 'Contact' }
];

export const Navbar = () => {
  const activeId = useActiveSection(navItems.map((n) => n.id));
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-canvas/70 backdrop-blur-md border-b border-border/70">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/60 bg-card/60 font-mono text-lg font-bold text-accent shadow-glow">
            DR
          </div>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Software Developer</p>
            <p className="font-semibold">Dominic Rohan</p>
          </div>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'rounded-full px-3 py-2 text-sm transition-colors focus-ring',
                activeId === item.id ? 'text-accent bg-accent/10' : 'text-canvas-foreground/80 hover:text-accent'
              )}
            >
              {item.label}
            </a>
          ))}
          <AccentPicker />
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            className="rounded-lg border border-border bg-card/60 p-2 text-canvas-foreground focus-ring"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className={cn('md:hidden transition-[max-height] duration-300 overflow-hidden', open ? 'max-h-96' : 'max-h-0')}>
        <div className="container flex flex-col gap-2 pb-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                'rounded-lg px-3 py-2 text-sm focus-ring',
                activeId === item.id ? 'bg-accent/10 text-accent' : 'bg-card/70 text-canvas-foreground/80'
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
