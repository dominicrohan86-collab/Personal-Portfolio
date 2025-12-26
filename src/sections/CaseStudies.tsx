import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { profile } from '../data/profile';

export const CaseStudies = () => (
  <Section id="case-studies" title="Case Studies">
    <div className="grid gap-4 lg:grid-cols-3">
      {profile.projects.slice(0, 3).map((project, idx) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.05 }}
        >
          <Card className="h-full p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent/70">Case Study</p>
                <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
                <p className="text-xs text-canvas-foreground/70">{project.period}</p>
              </div>
              <Badge variant="outline">{project.tech[0]}</Badge>
            </div>
            <div className="space-y-2 text-sm text-canvas-foreground/80">
              <p>
                <span className="font-semibold text-canvas-foreground">Problem:</span> {project.problem}
              </p>
              <p>
                <span className="font-semibold text-canvas-foreground">Solution:</span> {project.solution}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-xs uppercase tracking-[0.3em] text-accent/70">Outcomes</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-canvas-foreground/80">
                {project.outcomes.slice(0, 2).map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </Section>
);
