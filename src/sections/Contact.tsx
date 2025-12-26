import { FormEvent, useState } from 'react';
import { Mail, Github, Linkedin, Copy } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { profile } from '../data/profile';

export const Contact = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('company')) return; // honeypot
    setSubmitted(true);
    setMessage('Thanks for reaching out! I will reply via email.');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error('Clipboard copy failed', error);
    }
  };

  return (
    <Section id="contact" title="Contact">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm text-canvas-foreground/80">
            Ready to collaborate on secure cloud-native systems, authorization workflows, or developer tooling? Send a note—let’s align requirements and move quickly.
          </p>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm">
              <span className="text-canvas-foreground/80">Name</span>
              <input
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-lg border border-border bg-card/60 px-3 py-2 text-canvas-foreground focus-ring"
              />
            </label>
            <label className="block text-sm">
              <span className="text-canvas-foreground/80">Email</span>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-lg border border-border bg-card/60 px-3 py-2 text-canvas-foreground focus-ring"
              />
            </label>
            <label className="block text-sm">
              <span className="text-canvas-foreground/80">Message</span>
              <textarea
                name="message"
                required
                rows={4}
                className="mt-2 w-full rounded-lg border border-border bg-card/60 px-3 py-2 text-canvas-foreground focus-ring"
              />
            </label>
            {/* Honeypot */}
            <label className="hidden">
              Do not fill this field
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
            <Button type="submit" className="w-full sm:w-auto">
              Send message
            </Button>
            {submitted ? <p className="text-sm text-accent">{message}</p> : null}
          </form>
        </Card>
        <div className="space-y-4">
          <Card className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent/70">Email</p>
              <p className="font-semibold">{profile.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="secondary">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2">
                  <Mail size={16} /> Email me
                </a>
              </Button>
              <Button type="button" variant="ghost" onClick={copyEmail} aria-label="Copy email">
                <Copy size={16} />
              </Button>
            </div>
            {copied ? <p className="mt-2 text-xs text-accent">Copied to clipboard</p> : null}
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-accent/70">LinkedIn</p>
                <p className="font-semibold">Connect professionally</p>
              </div>
              <Button asChild variant="ghost">
                <a href="https://www.linkedin.com" className="flex items-center gap-2" aria-label="LinkedIn profile">
                  <Linkedin size={16} />
                </a>
              </Button>
            </Card>
            <Card className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-accent/70">GitHub</p>
                <p className="font-semibold">See code samples</p>
              </div>
              <Button asChild variant="ghost">
                <a href="https://github.com" className="flex items-center gap-2" aria-label="GitHub profile">
                  <Github size={16} />
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
};
