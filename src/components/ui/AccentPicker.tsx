import { cn } from '../../utils/cn';
import { useTheme } from '../../utils/theme';

const swatches = [
  { name: 'Aqua', value: '178 100% 66%' },
  { name: 'Cyan', value: '190 90% 60%' },
  { name: 'Blue', value: '210 90% 60%' },
  { name: 'Purple', value: '260 85% 70%' },
  { name: 'Emerald', value: '160 75% 55%' }
];

export const AccentPicker = () => {
  const { accent, changeAccent } = useTheme();

  return (
    <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-2 py-1">
      {swatches.map((swatch) => {
        const active = accent === swatch.value;
        return (
          <button
            key={swatch.value}
            aria-label={`Set accent to ${swatch.name}`}
            className={cn(
              'h-6 w-6 rounded-full border border-border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
              active && 'ring-2 ring-accent ring-offset-1 ring-offset-canvas'
            )}
            style={{ backgroundColor: `hsl(${swatch.value})` }}
            onClick={() => changeAccent(swatch.value)}
          />
        );
      })}
    </div>
  );
};
