import { Section } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import { profile } from '../data/profile';

export const About = () => (
  <Section
    id="about"
    title="Software for Complex Workflows"
    eyebrow="About"
  >
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
      <div className="space-y-5">
        <p className="text-lg leading-8 text-canvas-foreground/90">
          {profile.shortBio}
        </p>
        <p className="text-base leading-8 text-canvas-foreground/70">
          {profile.aboutDetail}
        </p>
      </div>
      <div className="border border-border/70 bg-card/35 p-5">
        <p className="mb-4 text-sm font-semibold uppercase text-accent/80">
          Current Focus
        </p>
        <div className="flex flex-wrap gap-2">
          {profile.highlights.map((highlight) => (
            <Badge key={highlight} variant="outline">
              {highlight}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </Section>
);
