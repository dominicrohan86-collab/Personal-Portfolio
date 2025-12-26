import { Section } from '../components/ui/Section';
import { profile } from '../data/profile';

export const About = () => (
  <Section id="about" title="About">
    <div className="space-y-4">
      <p className="text-lg leading-relaxed text-canvas-foreground/90">{profile.shortBio}</p>
      <p className="text-sm text-canvas-foreground/70">{profile.aboutDetail}</p>
    </div>
  </Section>
);
