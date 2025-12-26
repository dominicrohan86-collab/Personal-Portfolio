import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { profile, type Project } from '../data/profile';

export const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {profile.projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <Card interactive className="h-full">
              <button
                onClick={() => setSelected(project)}
                className="flex h-full w-full flex-col gap-4 p-6 text-left focus-ring"
                aria-label={`View details for ${project.title}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-accent/70">{project.period}</p>
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                  </div>
                  <div className="rounded-full bg-accent/15 p-2 text-accent">
                    <ArrowRight size={16} />
                  </div>
                </div>
                <p className="text-sm text-canvas-foreground/80">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </button>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.title ?? ''}>
        {selected ? (
          <div className="space-y-4 text-sm leading-relaxed">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent/70">Problem</p>
                <p className="text-canvas-foreground/90">{selected.problem}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent/70">Solution</p>
                <p className="text-canvas-foreground/90">{selected.solution}</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent/70">Outcomes</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-canvas-foreground/90">
                {selected.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent/70">Tech Stack</p>
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
