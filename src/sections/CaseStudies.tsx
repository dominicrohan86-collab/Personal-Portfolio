import { motion } from 'framer-motion';
import { CheckCircle2, Workflow } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { profile } from '../data/profile';

export const CaseStudies = () => (
  <Section
    id="case-studies"
    title="Featured Case Study"
    eyebrow="Operational impact"
    intro="A case-study view of government onboarding work: the problem, the workflow, and the practical result are visible at a glance."
  >
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="border-signal/40 bg-signal/10 text-signal">
                {profile.featuredCaseStudy.company}
              </Badge>
              <span className="text-sm font-semibold text-canvas-foreground/60">
                {profile.featuredCaseStudy.period}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent">
                  <Workflow />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                    {profile.featuredCaseStudy.title}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-canvas-foreground/80 sm:text-lg">
                    {profile.featuredCaseStudy.summary}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border-l border-signal/60 pl-4">
                <p className="mb-2 text-sm font-semibold uppercase text-signal">
                  Problem
                </p>
                <p className="text-sm leading-7 text-canvas-foreground/80">
                  {profile.featuredCaseStudy.problem}
                </p>
              </div>
              <div className="border-l border-accent/60 pl-4">
                <p className="mb-2 text-sm font-semibold uppercase text-accent">
                  Solution
                </p>
                <p className="text-sm leading-7 text-canvas-foreground/80">
                  {profile.featuredCaseStudy.solution}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.featuredCaseStudy.tech.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div className="border border-border/70 bg-canvas/30 p-5">
            <p className="mb-4 text-sm font-semibold uppercase text-accent/80">
              Result Signals
            </p>
            <ul className="space-y-4">
              {profile.featuredCaseStudy.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex gap-3 text-sm leading-7 text-canvas-foreground/80"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-signal" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  </Section>
);
