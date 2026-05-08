import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme-preference';
const ACCENT_KEY = 'accent-preference';
const THEME_EVENT = 'portfolio-theme-change';
const ACCENT_EVENT = 'portfolio-accent-change';

export const accentSwatches = [
  {
    id: 'blue',
    name: 'Blue',
    dark: '210 90% 60%',
    light: '214 82% 42%'
  },
  {
    id: 'cyan',
    name: 'Cyan',
    dark: '190 90% 60%',
    light: '195 88% 38%'
  },
  {
    id: 'violet',
    name: 'Violet',
    dark: '260 85% 70%',
    light: '258 62% 48%'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    dark: '160 75% 55%',
    light: '162 72% 32%'
  }
] as const;

type AccentId = (typeof accentSwatches)[number]['id'];
const defaultAccent: AccentId = 'blue';

type Theme = 'dark' | 'light';

const getAccentById = (id: string | null | undefined) =>
  accentSwatches.find((swatch) => swatch.id === id);

const getAccentByLegacyValue = (value: string | null | undefined) =>
  accentSwatches.find(
    (swatch) => swatch.dark === value || swatch.light === value
  );

const getAccentValue = (accent: AccentId, theme: Theme) => {
  const swatch = getAccentById(accent) ?? accentSwatches[0];
  return theme === 'light' ? swatch.light : swatch.dark;
};

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'dark' || stored === 'light') return stored;
  return 'dark';
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [accent, setAccent] = useState<AccentId>(defaultAccent);

  useEffect(() => {
    setTheme(getPreferredTheme());
    const storedAccent = window.localStorage.getItem(ACCENT_KEY);
    const swatch =
      getAccentById(storedAccent) ?? getAccentByLegacyValue(storedAccent);
    if (swatch) setAccent(swatch.id);
  }, []);

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;
      if (nextTheme === 'dark' || nextTheme === 'light') {
        setTheme(nextTheme);
      }
    };

    const handleAccentChange = (event: Event) => {
      const nextAccent = (event as CustomEvent<AccentId>).detail;
      if (getAccentById(nextAccent)) {
        setAccent(nextAccent);
      }
    };

    window.addEventListener(THEME_EVENT, handleThemeChange);
    window.addEventListener(ACCENT_EVENT, handleAccentChange);

    return () => {
      window.removeEventListener(THEME_EVENT, handleThemeChange);
      window.removeEventListener(ACCENT_EVENT, handleAccentChange);
    };
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
    document.documentElement.style.setProperty(
      '--color-accent',
      getAccentValue(accent, theme)
    );
    window.localStorage.setItem(ACCENT_KEY, accent);
  }, [accent, theme]);

  const toggleTheme = () =>
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: nextTheme }));
      return nextTheme;
    });

  const changeAccent = (value: AccentId) => {
    setAccent(value);
    window.dispatchEvent(new CustomEvent(ACCENT_EVENT, { detail: value }));
  };

  return { theme, accent, toggleTheme, changeAccent };
};
