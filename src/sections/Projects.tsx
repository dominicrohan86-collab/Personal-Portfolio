import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ExternalLink, LockKeyhole } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { profile, type Project } from '../data/profile';
import { ProjectLaptopPreview } from '../three/ProjectLaptopPreview';
import { cn } from '../utils/cn';

const useRevealOnce = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(entry.target);
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.22 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
};

const ProjectShowcase = ({ project, index, onSelect }: ProjectShowcaseProps) => {
  const alternate = index % 2 === 1;
  const { ref, visible } = useRevealOnce();
  const projectNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      ref={ref}
      id={`project-${index + 1}`}
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-12 sm:py-16"
    >
      <div
        className="absolute inset-x-0 top-1/2 h-px bg-border/60"
        aria-hidden
      />
      <div
        className={cn(
          'relative grid w-full items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12',
          alternate && 'lg:grid-cols-[1.1fr_0.9fr]'
        )}
      >
        <motion.div
          className={cn(
            'relative z-10 max-w-xl',
            alternate && 'lg:order-2 lg:justify-self-end'
          )}
          initial={{ opacity: 0, y: 22 }}
          animate={visible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="mb-7 flex items-center gap-4">
            <div className="h-px w-16 bg-accent/70" aria-hidden />
            <span className="font-mono text-sm font-semibold text-accent">
              {projectNumber}
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="border-signal/40 bg-signal/10 text-signal">
                {project.period}
              </Badge>
              <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-card/70 px-2 py-1 text-xs font-semibold text-canvas-foreground/70">
                <LockKeyhole size={13} />
                Internal
              </span>
            </div>
            <h3 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {project.title}
            </h3>
            <p className="text-lg leading-8 text-canvas-foreground/80">
              {project.summary}
            </p>
          </div>
          <div className="mt-7 grid gap-4 border-l border-accent/50 pl-5">
            <div>
              <p className="text-xs font-semibold uppercase text-accent/70">
                Role
              </p>
              <p className="mt-1 text-sm leading-6 text-canvas-foreground/80">
                {project.role}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-accent/70">
                Engineering Signal
              </p>
              <p className="mt-1 text-sm leading-6 text-canvas-foreground/80">
                {project.highlight}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onSelect(project)}
            >
              Inspect Project
              <ArrowRight size={16} />
            </Button>
            {project.links?.map((link) => (
              <Button key={link.href} variant="outline" asChild>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ExternalLink size={16} />
                </a>
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={cn(
            'relative min-w-0',
            alternate && 'lg:order-1',
            !alternate && 'lg:translate-x-6',
            alternate && 'lg:-translate-x-6'
          )}
          initial={{ opacity: 0, y: 26, scale: 0.96 }}
          animate={visible ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <ProjectLaptopPreview
            title={project.title}
            summary={project.summary}
            tech={project.tech}
            outcomes={project.outcomes}
            period={project.period}
            alternate={alternate}
            active={visible}
            index={index}
            screenImage={project.screenImage}
          />
        </motion.div>
      </div>
    </article>
  );
};

export const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      title="Selected Projects"
      eyebrow="Proof of work"
      intro="Scroll through secure workflow builds as interactive laptop previews: each screen is a conceptual, non-sensitive view of the project logic behind the work."
      className="pb-10 sm:pb-14"
    >
      <div className="space-y-8">
        {profile.projects.map((project, idx) => (
          <ProjectShowcase
            key={project.title}
            project={project}
            index={idx}
            onSelect={setSelected}
          />
        ))}
      </div>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ''}
      >
        {selected ? (
          <div className="space-y-4 text-sm leading-relaxed">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase text-accent/70">
                  Role
                </p>
                <p className="text-canvas-foreground/90">{selected.role}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-accent/70">
                  Access
                </p>
                <p className="text-canvas-foreground/90">{selected.access}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-accent/70">
                  Period
                </p>
                <p className="text-canvas-foreground/90">{selected.period}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-accent/70">
                  Problem
                </p>
                <p className="text-canvas-foreground/90">{selected.problem}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-accent/70">
                  Solution
                </p>
                <p className="text-canvas-foreground/90">{selected.solution}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-accent/70">
                Engineering Highlight
              </p>
              <p className="text-canvas-foreground/90">{selected.highlight}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-accent/70">
                Outcomes
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-canvas-foreground/90">
                {selected.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
            <div className="border-l border-signal/60 bg-card/40 px-4 py-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase text-signal">
                <CheckCircle2 size={14} />
                Visual note
              </p>
              <p className="mt-1 text-canvas-foreground/80">
                Laptop screens are conceptual previews for public portfolio
                display, not screenshots of internal systems.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-accent/70">
                Tech Stack
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.tech.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
};
