import { useEffect, useState } from 'react';

type TypingTextProps = {
  text: string;
  delay?: number;
};

export const TypingText = ({ text, delay = 60 }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let mounted = true;
    let index = 0;
    const tick = () => {
      if (!mounted) return;
      setDisplayed(text.slice(0, index));
      index += 1;
      if (index <= text.length) {
        setTimeout(tick, delay);
      }
    };
    tick();
    return () => {
      mounted = false;
    };
  }, [text, delay]);

  return <span className="font-mono text-accent">{displayed}</span>;
};
