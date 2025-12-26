import { ShieldCheck } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { profile } from '../data/profile';

export const Certifications = () => (
  <Section id="certifications" title="Credentials">
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
          <ShieldCheck />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Certification</p>
          <p className="text-lg font-semibold">{profile.certifications[0]}</p>
        </div>
      </Card>
      <Card className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
          <ShieldCheck />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Clearance</p>
          <p className="text-lg font-semibold">{profile.clearance}</p>
        </div>
      </Card>
    </div>
  </Section>
);
