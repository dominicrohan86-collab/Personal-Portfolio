import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { profile } from '../data/profile';
import { TerminalPanel } from '../components/TerminalPanel';

export const Hero = () => {
  const [firstName, ...rest] = profile.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-full opacity-70">
        <div className="pointer-events-none absolute inset-0 bg-card/20" />
      </div>
      <div className="container relative z-10 grid max-w-6xl gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <motion.div
          className="flex h-full flex-col justify-center space-y-7"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase text-accent/80">
                Hi there <span aria-hidden>👋</span> I&apos;m
              </p>
              <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.96] sm:text-7xl lg:text-8xl">
                {firstName}
                <br />
                {lastName}
              </h1>
              <p className="text-base font-semibold uppercase text-signal">
                {profile.headline}
              </p>
            </div>
            <p className="max-w-3xl font-display text-xl font-semibold leading-tight text-canvas-foreground/90 sm:text-2xl">
              {profile.heroTitle}
            </p>
            <p className="max-w-2xl text-base leading-8 text-canvas-foreground/80 sm:text-lg">
              {profile.heroSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="primary">
              <a href="#projects" className="flex items-center gap-2">
                <ArrowDown size={16} />
                View Projects
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="/Dominic_Rohan_Resume.pdf"
                download
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Download Resume
              </a>
            </Button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold text-canvas-foreground/80 hover:text-accent focus-ring"
            >
              <Mail size={16} />
              Contact Me
            </a>
          </div>
        </motion.div>
        <motion.div
          className="relative lg:ml-auto lg:w-full lg:max-w-[520px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div
            className="absolute -right-3 -top-3 h-full w-full border border-signal/25"
            aria-hidden
          />
          <TerminalPanel />
        </motion.div>
      </div>
    </section>
  );
};
