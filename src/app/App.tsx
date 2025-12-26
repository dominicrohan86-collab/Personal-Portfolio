import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Projects } from '../sections/Projects';
import { CaseStudies } from '../sections/CaseStudies';
import { Experience } from '../sections/Experience';
import { Skills } from '../sections/Skills';
import { Certifications } from '../sections/Certifications';
import { Contact } from '../sections/Contact';
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const parallaxOffsets = [
  { left: '10%', size: '18rem', blur: '70px' },
  { left: '70%', size: '22rem', blur: '90px' },
  { left: '40%', size: '16rem', blur: '60px' }
];

const sections = [Hero, About, Projects, CaseStudies, Experience, Skills, Certifications, Contact];

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.parallax-shape').forEach((shape, idx) => {
        gsap.to(shape, {
          y: () => (idx % 2 === 0 ? -120 : 120),
          ease: 'none',
          scrollTrigger: {
            trigger: shape,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="fixed right-4 top-1/2 z-30 hidden h-40 w-1 rounded-full bg-border/60 lg:block">
        <div className="h-full w-full origin-top rounded-full bg-accent/40" style={{ transform: `scaleY(${scrollProgress / 100})` }} />
      </div>
      <main className="relative z-10">
        {sections.map((SectionComponent, idx) => (
          <SectionComponent key={idx} />
        ))}
      </main>
      <Footer />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {parallaxOffsets.map((shape, idx) => (
          <div
            key={idx}
            className="parallax-shape absolute top-[10%] rounded-full bg-accent/15 blur-3xl"
            style={{ left: shape.left, width: shape.size, height: shape.size, filter: `blur(${shape.blur})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
