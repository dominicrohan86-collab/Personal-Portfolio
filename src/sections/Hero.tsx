import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { TypingText } from '../components/ui/TypingText';
import { profile } from '../data/profile';
import { TerminalPanel } from '../components/TerminalPanel';
import { cn } from '../utils/cn';

export const Hero = () => {
  const [firstName, ...rest] = profile.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section id="hero" className="relative overflow-hidden pb-16 pt-12 sm:pt-16">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(110,241,245,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(110,241,245,0.08),transparent_30%)]" />
      </div>
      <div className="container relative z-10 grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/80">
              Hi there <span aria-hidden>👋</span> I&apos;m
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {firstName}
              <br />
              {lastName}
            </h1>
            <p className="text-lg font-semibold uppercase tracking-[0.12em] text-accent">
              Full Stack Web + Cloud Developer
            </p>
            <p className="text-sm text-canvas-foreground/80">{profile.heroSubtitle}</p>
            <p className="font-mono text-sm text-accent">
              <TypingText text={profile.heroCommand} />
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="primary">
              <a href="#projects" className="flex items-center gap-2">
                <ArrowDown size={16} />
                View Projects
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="#contact" className="flex items-center gap-2">
                <Mail size={16} />
                Contact
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/Dominic_Rohan_Resume.pdf" download className="flex items-center gap-2">
                <Download size={16} />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className={cn('absolute -left-6 -top-6 h-20 w-20 rounded-full bg-accent/20 blur-3xl')} aria-hidden />
          <TerminalPanel />
        </div>
      </div>
    </section>
  );
};
