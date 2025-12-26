import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion';
import { cn } from '../utils/cn';
import { useTheme } from '../utils/theme';

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
    text: 'Lead developer on secure cloud-native workflows and event-driven services.'
  },
  {
    prompt: '>',
    text: 'Top Secret clearance, building in AWS and AWS GovCloud.'
  },
  { prompt: '$', text: 'pnpm load projects' },
  {
    prompt: '>',
    text: 'COSMOS JIT Access — mTLS + CAC auth, tRPC services, full auditability.'
  },
  {
    prompt: '>',
    text: 'Billing Microservice — Lambda/SQS/API Gateway + Aurora for daily cost ingestion.'
  },
  {
    prompt: '>',
    text: 'Automated Readiness Review — codified readiness gates, evidence capture, compliant releases.'
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

export const TerminalPanel = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();
  const storedTheme =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('theme-preference')
      : null;
  const effectiveTheme = theme || storedTheme || 'dark';
  const isLight = effectiveTheme === 'light';
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
        'relative overflow-hidden rounded-2xl border shadow-glow',
        'glass border-border/70'
      )}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2',
          'border-b border-border/70'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <p
            className={cn(
              'ml-3 text-xs font-mono',
              'text-canvas-foreground/70'
            )}
          >
            terminal.sh
          </p>
        </div>
        <div className="rounded-full bg-accent/10 px-2 py-1 text-[11px] font-semibold text-accent">
          interactive
        </div>
      </div>
      <div
        ref={scrollRef}
        className={cn(
          'relative h-[340px] overflow-y-auto px-4 py-4 font-mono text-sm',
          'bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90 text-canvas-foreground'
        )}
      >
        <div
          className={cn(
            'absolute inset-0',
            'bg-[radial-gradient(circle_at_20%_20%,rgba(110,241,245,0.05),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(110,241,245,0.03),transparent_35%)]'
          )}
          aria-hidden
        />
        <div className="absolute inset-0 opacity-40">
          <div
            className={cn(
              'absolute inset-6 rounded-xl border',
              'border-accent/10'
            )}
          />
          <div
            className={cn(
              'absolute inset-8 rounded-xl border',
              'border-accent/5'
            )}
          />
        </div>
        <div className="relative space-y-2">
          {displayLines.map((line, idx) => (
            <p
              key={`${line}-${idx}`}
              className={cn('text-canvas-foreground/80')}
            >
              {line}
            </p>
          ))}
          {!prefersReducedMotion && (
            <p className={cn('text-canvas-foreground')}>
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
