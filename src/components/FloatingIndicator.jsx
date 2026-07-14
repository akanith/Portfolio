import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Knowledge Universe' },
  { id: 'about', label: 'Biography' },
  { id: 'education', label: 'Education' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Connect' }
];

export default function FloatingIndicator() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col items-end">
      <div className="absolute right-[3px] top-4 bottom-4 w-[1px] bg-primary/10 -z-10" />
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <div key={section.id} className="relative group flex items-center justify-end w-40 h-8">
            <button
              onClick={() => scrollToSection(section.id)}
              className={`absolute right-0 w-2 h-2 rounded-full transition-all duration-500 z-10 hover:scale-150 hover:bg-accent 
                ${isActive ? 'bg-accent shadow-[0_0_15px_rgba(200,167,90,0.6)] scale-125' : 'bg-primary/20'}`}
              aria-label={`Scroll to ${section.label}`}
            />
            <span 
              className={`absolute right-6 text-[10px] uppercase tracking-[0.2em] font-body transition-all duration-500 pointer-events-none 
                ${isActive ? 'opacity-100 text-accent translate-x-0' : 'opacity-0 text-primary translate-x-4 group-hover:opacity-40 group-hover:translate-x-0'}`}
            >
              {section.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
