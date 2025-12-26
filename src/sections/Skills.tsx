import { Sparkles, ShieldCheck, Cloud, Workflow, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { profile } from '../data/profile';

export const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="grid gap-4 lg:grid-cols-2">
      {profile.skills.map((category, idx) => (
        <motion.div
          key={category.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.05 }}
        >
          <Card className="p-5 flex flex-col">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-accent/70">
                  Category
                </p>
                <p className="text-base font-semibold">{category.label}</p>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
                {category.items.length} items
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-sm text-canvas-foreground/90 shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </Section>
);
