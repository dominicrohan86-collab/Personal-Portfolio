import { cn } from '../../utils/cn';
import { accentSwatches, useTheme } from '../../utils/theme';

export const AccentPicker = () => {
  const { accent, changeAccent, theme } = useTheme();

  return (
    <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-2 py-1">
      {accentSwatches.map((swatch) => {
        const active = accent === swatch.id;
        const swatchColor = theme === 'light' ? swatch.light : swatch.dark;
        return (
          <button
            key={swatch.id}
            aria-label={`Set accent to ${swatch.name}`}
            className={cn(
              'h-6 w-6 rounded-full border border-border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
              active && 'ring-2 ring-accent ring-offset-1 ring-offset-canvas'
            )}
            style={{ backgroundColor: `hsl(${swatchColor})` }}
            onClick={() => changeAccent(swatch.id)}
          />
        );
      })}
    </div>
  );
};
