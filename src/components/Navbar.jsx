import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Research', href: 'research' },
  { label: 'Publications', href: 'publications' },
  { label: 'Experience', href: 'experience' },
  { label: 'Achievements', href: 'achievements' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const link of navLinks) {
        const el = document.getElementById(link.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        animate={{
          width: scrolled ? 'auto' : '95%',
          maxWidth: scrolled ? '820px' : '1100px',
          paddingScale: scrolled ? 0.95 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex items-center justify-between lg:justify-center lg:gap-4 px-6 py-3.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-navbar-shadow"
      >
        {/* Mobile Logo / Header */}
        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 bg-accentGold flex items-center justify-center">
            <span className="text-black font-heading font-bold text-xs">SD</span>
          </div>
          <span className="text-white font-heading font-medium text-xs tracking-wider">Dr. D. Sri Dhivya</span>
        </a>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.label}
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-2 font-body text-xs font-medium tracking-widest uppercase transition-all duration-300
                  ${isActive ? 'text-accentGold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]' : 'text-white/60 hover:text-white'}`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-3.5 right-3.5 h-[1px] bg-accentGold shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Drawer trigger or simple mini nav */}
        <div className="flex lg:hidden items-center gap-3">
          {navLinks.slice(0, 4).map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.label}
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[10px] font-body font-medium tracking-wider uppercase ${isActive ? 'text-accentGold' : 'text-white/50'}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
