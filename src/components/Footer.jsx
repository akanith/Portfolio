
import { motion, useAnimation } from 'framer-motion';
import { FiArrowUp, FiMail, FiMapPin, FiLinkedin } from 'react-icons/fi';
import { SiGooglescholar, SiResearchgate, SiOrcid } from 'react-icons/si';
import SectionDivider from './SectionDivider';
import MagneticButton from './MagneticButton';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dr-sri-dhivya-501481259/' },
  { icon: SiGooglescholar, label: 'Google Scholar', href: 'https://scholar.google.com' },
  { icon: SiResearchgate, label: 'ResearchGate', href: 'https://researchgate.net' },
  { icon: SiOrcid, label: 'ORCID', href: 'https://orcid.org' },
];

export default function Footer() {
  const controls = useAnimation();

  const scrollToTop = async () => {
    await controls.start({ y: -100, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    controls.set({ y: 100, opacity: 0 });
    controls.start({ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } });
  };

  return (
    <footer className="relative bg-background text-white border-t border-white/5">
      <SectionDivider />
      <div className="container-custom pt-8 pb-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-none bg-accentGold/20 border border-accentGold/30 flex items-center justify-center">
                <span className="text-accentGold font-heading font-bold text-sm">SD</span>
              </div>
              <div>
                <p className="font-heading font-bold text-white text-sm">Dr. D. Sri Dhivya</p>
                <p className="text-white/50 text-xs">Assistant Professor</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Advancing knowledge at the intersection of language education, technology, and pedagogical innovation. CS Academy of Higher Education, Coimbatore.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
              <FiMail size={12} />
              <span>sridhivya@csacademy.edu.in</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <FiMapPin size={12} />
              <span>Coimbatore, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white/80 text-sm mb-4 tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-accentGold text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-white/20 group-hover:bg-accentGold group-hover:w-4 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h4 className="font-heading font-semibold text-white/80 text-sm mb-4 tracking-wide uppercase">Research Focus</h4>
            <div className="flex flex-wrap gap-2">
              {['ESP', 'Education 4.0', 'TEL', 'Gamification', 'Prof. Communication', 'Sustainability', 'Corpus Linguistics'].map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <h4 className="font-heading font-semibold text-white/80 text-sm mt-6 mb-3 tracking-wide uppercase">Academic Profiles</h4>
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-accentGold hover:bg-white/10 hover:border-accentGold/30 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Dr. D. Sri Dhivya. All rights reserved. · CS Academy of Higher Education, Coimbatore.
          </p>
          <MagneticButton cursorText="Top">
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-accentGold hover:bg-white/10 hover:border-accentGold/30 transition-all duration-300 overflow-hidden"
            >
              <motion.div animate={controls}>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FiArrowUp size={20} />
                </motion.div>
              </motion.div>
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
