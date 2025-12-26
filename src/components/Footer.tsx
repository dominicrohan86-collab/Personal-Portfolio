import { profile } from '../data/profile';

const currentYear = new Date().getFullYear();

export const Footer = () => (
  <footer className="border-t border-border/70 bg-canvas/60 py-8 backdrop-blur-md">
    <div className="container flex flex-col gap-4 text-sm text-canvas-foreground/80 sm:flex-row sm:items-center sm:justify-between">
      <p>© {currentYear} {profile.name}. Built with React, Vite, and Three.js.</p>
      <div className="flex flex-wrap gap-4">
        {profile.socials.map((social) => (
          <a key={social.label} href={social.href} className="hover:text-accent focus-ring rounded-md px-1">
            {social.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);
