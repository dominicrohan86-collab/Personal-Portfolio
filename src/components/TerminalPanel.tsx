import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion';
import { cn } from '../utils/cn';

type ScriptLine = {
  prompt: string;
  text: string;
  delay?: number;
};

const scripts: ScriptLine[] = [
  {
    prompt: '$',
    text: 'hello --user="Dominic" --role="Software Developer (AWS/GovCloud)"'
  },
  { prompt: '$', text: 'pnpm whoami' },
  {
    prompt: '>',
    text: 'Full-stack developer building secure cloud workflows and automation tools.'
  },
  {
    prompt: '>',
    text: 'Strategic Business Systems · AWS GovCloud · Azure · Wiz · secure UX.'
  },
  { prompt: '$', text: 'pnpm load projects' },
  {
    prompt: '>',
    text: 'COSMOS JIT Access - mTLS + CAC auth, tRPC services, full auditability.'
  },
  {
    prompt: '>',
    text: 'Billing Microservice - Lambda/SQS/API Gateway + Aurora for daily cost ingestion.'
  },
  {
    prompt: '>',
    text: 'Automated Readiness Review - codified readiness gates, evidence capture, compliant releases.'
  },
  {
    prompt: '>',
    text: 'Government onboarding automation - reusable workflows for complex platform requests.'
  },
  {
    prompt: '$',
    text: 'pnpm skills --select="ts, react, node, aws, trpc, rds, cdk"'
  },
  {
    prompt: '>',
    text: 'TypeScript · React · Node.js · AWS · tRPC · RDS/Aurora · CDK · Docker · GovCloud'
  },
  { prompt: '$', text: 'pnpm availability' },
  {
    prompt: '>',
    text: 'Open for secure cloud-native builds, auth workflows, and developer tooling.'
  },
  { prompt: '$', text: 'clear', delay: 800 }
];

const CARET = '▋';

type TerminalPanelProps = {
  className?: string;
};

export const TerminalPanel = ({ className }: TerminalPanelProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [scriptIndex, setScriptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [caretVisible, setCaretVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const speed = prefersReducedMotion ? 0 : 40;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => setCaretVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [displayLines, currentLine]);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Instant render when reduced motion is on.
      const allLines = scripts.map((line) => `${line.prompt} ${line.text}`);
      setDisplayLines(allLines);
      setCurrentLine('');
      return;
    }

    const current = scripts[scriptIndex % scripts.length];
    const target = `${current.prompt} ${current.text}`;

    if (charIndex <= target.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(target.slice(0, charIndex));
        setCharIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    const hold = setTimeout(() => {
      if (current.text.trim() === 'clear') {
        setDisplayLines([]);
      } else {
        setDisplayLines((lines) => [...lines.slice(-7), target]);
      }
      setCurrentLine('');
      setCharIndex(0);
      setScriptIndex((idx) => (current.text.trim() === 'clear' ? 0 : idx + 1));
    }, current.delay ?? 900);

    return () => clearTimeout(hold);
  }, [charIndex, scriptIndex, prefersReducedMotion, speed]);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-slate-700/70 bg-slate-950 shadow-glow dark:border-border/70',
        className
      )}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent/10 via-slate-950 to-slate-950"
        aria-hidden
      />
      <div
        className={cn(
          'relative flex items-center justify-between px-4 py-2',
          'border-b border-slate-700/80 bg-slate-100 text-slate-700'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <p className={cn('ml-3 text-xs font-mono', 'text-slate-600')}>
            terminal.sh
          </p>
        </div>
        <div className="rounded-md bg-accent/10 px-2 py-1 text-[11px] font-semibold text-accent">
          interactive
        </div>
      </div>
      <div
        ref={scrollRef}
        className={cn(
          'relative max-h-[430px] min-h-[220px] overflow-y-auto px-4 py-4 font-mono text-sm leading-6 transition-[max-height] duration-300',
          'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100'
        )}
      >
        <div
          className={cn(
            'absolute inset-0',
            'bg-[linear-gradient(120deg,rgba(110,241,245,0.045),transparent_42%),linear-gradient(300deg,rgba(255,196,87,0.035),transparent_38%)]'
          )}
          aria-hidden
        />
        <div className="absolute inset-0 opacity-40">
          <div
            className={cn(
              'absolute inset-6 rounded-lg border',
              'border-accent/10'
            )}
          />
          <div
            className={cn(
              'absolute inset-8 rounded-lg border',
              'border-accent/5'
            )}
          />
        </div>
        <div className="relative space-y-2">
          {displayLines.map((line, idx) => (
            <p key={`${line}-${idx}`} className={cn('text-slate-200/85')}>
              {line}
            </p>
          ))}
          {!prefersReducedMotion && (
            <p className={cn('text-slate-100')}>
              {currentLine}
              <span
                className={cn(
                  'inline-block pl-0.5',
                  caretVisible ? 'opacity-80' : 'opacity-20'
                )}
              >
                {CARET}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
