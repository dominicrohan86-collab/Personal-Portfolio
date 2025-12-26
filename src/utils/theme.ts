import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme-preference';
const ACCENT_KEY = 'accent-preference';
const defaultAccent = '178 100% 66%';

type Theme = 'dark' | 'light';

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'dark' || stored === 'light') return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [accent, setAccent] = useState<string>(defaultAccent);

  useEffect(() => {
    setTheme(getPreferredTheme());
    const storedAccent = window.localStorage.getItem(ACCENT_KEY);
    if (storedAccent) setAccent(storedAccent);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent', accent);
    window.localStorage.setItem(ACCENT_KEY, accent);
  }, [accent]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const changeAccent = (value: string) => setAccent(value);

  return { theme, accent, toggleTheme, changeAccent };
};
