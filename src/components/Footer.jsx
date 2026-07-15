import { motion } from 'framer-motion';
import { FiMail, FiMapPin } from 'react-icons/fi';

const academicProfiles = [
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en' },
  { label: 'Scopus', href: 'https://www.scopus.com' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Sri-Dhivya-D' },
  { label: 'ORCID', href: 'https://orcid.org' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dr-sri-dhivya-501481259/' },
  { label: 'Download CV', href: '/cv.pdf' },
];

const researchKeywords = [
  'ESP',
  'Education 4.0',
  'Technology Enhanced Learning',
  'Gamification',
  'Professional Communication',
  'Educational Sustainability',
  'Corpus Linguistics',
];

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#D4AF37]/30 rounded-full blur-[1px]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default function Footer() {
  return (
    <footer 
      className="relative text-white pt-32 pb-12 overflow-hidden border-t border-white/5"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #081320 60%, #0B1220 100%)'
      }}
    >
      {/* Subtle Constellation & Particles */}
      <Particles />

      {/* Radial glow behind the heading */}
      <div 
        className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 60%)'
        }}
      />

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 relative"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide mb-4">
            Dr. D. Sri Dhivya
          </h2>
          <p className="text-[#D4AF37] font-body text-sm md:text-base tracking-[0.25em] uppercase mb-10">
            Assistant Professor
          </p>
          <p className="font-heading text-xl md:text-2xl text-white/80 italic font-light max-w-3xl mx-auto leading-relaxed">
            "Advancing knowledge through research, education, innovation, and global collaboration."
          </p>
        </motion.div>

        {/* Academic Profiles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-y-4 mb-20"
        >
          {academicProfiles.map((profile, idx) => (
            <div key={profile.label} className="flex items-center">
              <a
                href={profile.href}
                target={profile.label === 'Download CV' ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group relative px-5 py-2 font-body text-[13px] uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-500"
              >
                {profile.label}
                <motion.div 
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,1)]"
                  initial={{ width: 0, opacity: 0 }}
                  whileHover={{ width: '40%', opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </a>
              {idx < academicProfiles.length - 1 && (
                <span className="text-white/10 mx-1 md:mx-3 select-none text-xl font-light">|</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Research Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20 max-w-4xl"
        >
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-4">
            {researchKeywords.map((keyword, idx) => (
              <div key={keyword} className="flex items-center gap-4">
                <span className="font-body text-[15px] text-white/40 hover:text-[#D4AF37] transition-colors duration-500 cursor-default">
                  {keyword}
                </span>
                {idx < researchKeywords.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-10 mb-28"
        >
          <a href="mailto:sridhivya@csacademy.edu.in" className="flex items-center gap-3 text-white/40 hover:text-[#D4AF37] transition-colors duration-500 group">
            <FiMail size={18} className="group-hover:scale-110 transition-transform duration-500" />
            <span className="font-body text-sm tracking-widest uppercase">sridhivya@csacademy.edu.in</span>
          </a>
          <div className="hidden sm:block w-px h-6 bg-white/10" />
          <div className="flex items-center gap-3 text-white/40 cursor-default hover:text-white transition-colors duration-500">
            <FiMapPin size={18} />
            <span className="font-body text-sm tracking-widest uppercase">Coimbatore, Tamil Nadu, India</span>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-8" />
          
          <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
            <p className="font-body text-[11px] text-white/30 tracking-widest uppercase">
              © {new Date().getFullYear()} Dr. D. Sri Dhivya. All rights reserved.
            </p>
            <p className="font-body text-[11px] text-white/30 tracking-widest uppercase flex items-center gap-2">
              Designed with Elegance
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50" />
            </p>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
