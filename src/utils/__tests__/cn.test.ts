import { describe, expect, it } from 'vitest';
import { cn } from '../cn';

describe('cn', () => {
  it('merges class names and deduplicates', () => {
    const classes = cn('px-2', 'py-3', 'px-2').split(' ');

    expect(classes).toHaveLength(2);
    expect(classes).toEqual(expect.arrayContaining(['px-2', 'py-3']));
  });

  it('handles conditional values', () => {
    expect(cn('base', false && 'hidden', 'text')).toBe('base text');
  });
});
