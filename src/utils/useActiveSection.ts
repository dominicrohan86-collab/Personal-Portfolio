import { useEffect, useState } from 'react';

export const useActiveSection = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string>(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: [0.3, 0.6]
        }
      );
      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [ids]);

  return activeId;
};
