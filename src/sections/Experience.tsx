import { Section } from '../components/ui/Section';
import { Timeline } from '../components/ui/Timeline';
import { profile } from '../data/profile';
import {
  Code2,
  Cloud,
  Database,
  Github,
  Layers,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import type { ReactNode } from 'react';

import awsIcon from '../public/aws-svgrepo-com.svg';

const iconUrls: Record<string, string> = {
  react:
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
  typescript:
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
  javascript:
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
  node: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
  aws: awsIcon,
  govcloud: awsIcon,
  cdk: awsIcon,
  docker:
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
  github:
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
  postgres:
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
  trpc: 'https://raw.githubusercontent.com/t3-oss/create-t3-app/next/www/public/images/t3-light.svg'
};

const techIcon = (tech: string): ReactNode => {
  const key = tech.toLowerCase();
  const matched = Object.keys(iconUrls).find((k) => key.includes(k));
  if (matched) {
    return (
      <img
        src={iconUrls[matched]}
        alt={`${tech} logo`}
        className="h-6 w-6 object-contain"
      />
    );
  }
  if (key.includes('aws')) return <Cloud size={18} />;
  if (key.includes('govcloud')) return <ShieldCheck size={18} />;
  if (key.includes('postgres')) return <Database size={18} />;
  if (key.includes('t rpc') || key.includes('trpc'))
    return <Workflow size={18} />;
  if (key.includes('docker')) return <Layers size={18} />;
  if (key.includes('github')) return <Github size={18} />;
  if (
    key.includes('react') ||
    key.includes('node') ||
    key.includes('typescript') ||
    key.includes('javascript')
  )
    return <Code2 size={18} />;
  return <Code2 size={18} />;
};

export const Experience = () => (
  <Section id="experience" title="Experience">
    <Timeline
      items={profile.experience.map((exp) => ({
        title: exp.company,
        subtitle: exp.role,
        meta: `${exp.period} · ${exp.location}`,
        content: (
          <div className="space-y-3">
            <ul className="list-disc space-y-2 pl-5">
              {exp.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {exp.tech && exp.tech.length ? (
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-semibold text-canvas-foreground"
                  >
                    {techIcon(tech)}
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        )
      }))}
    />
  </Section>
);
