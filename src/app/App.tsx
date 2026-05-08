import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Projects } from '../sections/Projects';
import { CaseStudies } from '../sections/CaseStudies';
import { Experience } from '../sections/Experience';
import { Certifications } from '../sections/Certifications';
import { Contact } from '../sections/Contact';

const sections = [
  Hero,
  About,
  CaseStudies,
  Projects,
  Experience,
  Certifications,
  Contact
];

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="fixed right-4 top-1/2 z-30 hidden h-40 w-1 rounded-full bg-border/60 lg:block">
        <div
          className="h-full w-full origin-top rounded-full bg-accent/40"
          style={{ transform: `scaleY(${scrollProgress / 100})` }}
        />
      </div>
      <main className="relative z-10">
        {sections.map((SectionComponent, idx) => (
          <SectionComponent key={idx} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default App;
