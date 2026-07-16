import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiPhone, FiDownload, FiChevronUp, FiExternalLink, FiLinkedin, FiDatabase } from 'react-icons/fi';
import { SiGooglescholar, SiResearchgate, SiOrcid } from 'react-icons/si';

const quickLinks = [
  {
    icon: SiGooglescholar,
    label: 'Google Scholar',
    sublabel: '149 Citations · h-index 6',
    href: 'https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-800',
    verified: true,
  },
  {
    icon: FiDatabase,
    label: 'Scopus',
    sublabel: '70 Citations · h-index 4',
    href: 'https://www.scopus.com/authid/detail.uri?authorId=58124404000',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/30',
    border: 'border-orange-200 dark:border-orange-800',
    verified: true,
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    sublabel: 'Professional Network',
    href: 'https://www.linkedin.com/in/dr-sri-dhivya-501481259/',
    color: 'text-[#0A66C2]',
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-800',
    verified: false,
  },
  {
    icon: SiResearchgate,
    label: 'ResearchGate',
    sublabel: '10 Publications',
    href: 'https://www.researchgate.net/profile/Sri-Dhivya?ev=hdr_xprf',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    border: 'border-teal-200 dark:border-teal-800',
    verified: false,
  },
  {
    icon: SiOrcid,
    label: 'ORCID',
    sublabel: 'Researcher ID',
    href: 'https://orcid.org/0000-0003-0277-1629',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/30',
    border: 'border-green-200 dark:border-green-800',
    verified: false,
  },
  {
    icon: FiDownload,
    label: 'Download CV',
    sublabel: 'Academic Curriculum Vitae',
    href: '/cv.pdf',
    color: 'text-primary dark:text-white',
    bg: 'bg-primary/5 dark:bg-primary/20',
    border: 'border-primary/10 dark:border-primary/30',
    download: true,
    verified: false,
  },
  {
    icon: FiMail,
    label: 'Email',
    sublabel: 'sridhivya@csacademy.edu.in',
    href: 'mailto:sridhivya@csacademy.edu.in',
    color: 'text-secondary dark:text-teal-400',
    bg: 'bg-secondary/5 dark:bg-teal-900/30',
    border: 'border-secondary/10 dark:border-teal-800',
    verified: false,
  },
  {
    icon: FiPhone,
    label: 'Phone',
    sublabel: '+91 98765 43210',
    href: 'tel:+919876543210',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    border: 'border-amber-200 dark:border-amber-800',
    verified: false,
  },
];

const badges = [
  { label: 'Google Scholar Verified' },
  { label: '149 Citations' },
  { label: '10 Publications' },
  { label: '2 Patents' },
  { label: 'Peer Reviewer' },
  { label: 'Education 4.0 Researcher' },
];

export default function FloatingProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={panelRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-80 bg-black border border-accent/20 overflow-hidden shadow-2xl rounded-none"
          >
            {/* Header */}
            <div className="bg-[#0a0a0a] border-b border-white/5 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[100px]" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-accent font-heading font-medium text-lg tracking-wider">SD</span>
                </div>
                <div>
                  <p className="text-white font-heading font-medium text-lg">Dr. D. Sri Dhivya</p>
                  <p className="font-body text-accent text-xs font-light tracking-wide uppercase">Assistant Professor</p>
                </div>
              </div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {badges.slice(0, 3).map((badge) => (
                  <span
                    key={badge.label}
                    className="font-body text-[9px] tracking-widest uppercase font-semibold text-white/80 border border-white/20 px-2 py-1"
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.download || link.href.startsWith('mailto') || link.href.startsWith('tel') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    download={link.download}
                    className="flex items-center gap-4 p-3 border border-transparent hover:border-accent/10 hover:bg-[#111] transition-all duration-300 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-white/60 group-hover:text-accent group-hover:border-accent/30 transition-colors duration-300 shrink-0`}>
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-heading font-medium text-white/90 text-sm group-hover:text-accent transition-colors duration-300">{link.label}</p>
                        {link.verified && (
                          <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 font-bold">✓</span>
                        )}
                      </div>
                      <p className="font-body text-white/50 text-xs font-light tracking-wide truncate">{link.sublabel}</p>
                    </div>
                    <FiExternalLink size={14} className="text-white/20 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Academic profiles quick access"
        aria-expanded={isOpen}
        className="relative w-14 h-14 bg-black border border-accent flex items-center justify-center text-white hover:bg-[#111] transition-colors duration-500 rounded-none group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {isOpen ? <FiX size={22} strokeWidth={1} /> : (
            <SiGooglescholar size={22} className="text-accent group-hover:text-white transition-colors duration-500" />
          )}
        </motion.div>
        {/* Pulse border */}
        {!isOpen && (
          <motion.div
            className="absolute -inset-1 border border-accent/40 pointer-events-none"
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.button>
    </div>
  );
}
