import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiCheckCircle, FiLinkedin, FiBookOpen, FiAward, FiTrendingUp, FiLock } from 'react-icons/fi';
import { SiGooglescholar, SiOrcid, SiResearchgate } from 'react-icons/si';
import { FiDatabase } from 'react-icons/fi';
import TiltCard from './TiltCard';

export default function AcademicProfiles() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="academic-profiles" className="py-24 lg:py-32 bg-background relative overflow-hidden border-b border-white/5">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Floating dots constellation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/30 rounded-full"
            style={{
              top: `${15 + i * 16}%`,
              left: `${10 + (i * 17) % 80}%`
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Scholarly Footprint
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-6">
            Academic Profiles
          </h2>
          <p className="font-body text-textSecondary text-lg font-light max-w-2xl mx-auto">
            Explore verified scholarly profiles, research metrics, and academic contributions across leading research platforms.
          </p>
        </motion.div>

        {/* Horizontal / Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Google Scholar Card — Spans 2 columns on desktop */}
          <div className="col-span-1 md:col-span-2">
            <TiltCard>
              <a 
                href="https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="block relative h-full bg-cardBg/80 backdrop-blur-md border border-[#D4AF37]/20 p-8 md:p-10 flex flex-col justify-between rounded-none shadow-[0_15px_30px_rgba(0,0,0,0.50)] transition-all duration-500 hover:border-accentGold hover:shadow-card-hover group"
              >
                {/* Spotlight follower effect simulation */}
                <div className="absolute inset-0 bg-[#D4AF37]/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 w-[200%] -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 transition-transform duration-1000 ease-out pointer-events-none" />

                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 border border-[#D4AF37]/20 flex items-center justify-center text-accentGold group-hover:border-accentGold transition-colors duration-500">
                      <SiGooglescholar size={26} className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 bg-green-900/20 text-green-400 border border-green-500/20 text-[9px] tracking-widest uppercase font-semibold px-2.5 py-1">
                      <FiCheckCircle size={10} />
                      Verified Profile
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl text-white font-medium mb-1 group-hover:text-accentGold transition-colors duration-500">
                    Google Scholar
                  </h3>
                  <p className="font-body text-xs text-white/50 mb-6">Dr. D. Sri Dhivya · CS Academy</p>

                  {/* Scholar stats grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: FiBookOpen, label: 'Citations', value: '149' },
                      { icon: FiTrendingUp, label: 'h-index', value: '6' },
                      { icon: FiAward, label: 'i10-index', value: '4' }
                    ].map((stat) => {
                      const SIcon = stat.icon;
                      return (
                        <div key={stat.label} className="border border-white/5 bg-black/30 p-3 text-center">
                          <SIcon size={14} className="text-accentGold mx-auto mb-1" />
                          <div className="font-numbers text-xl font-light text-white mb-0.5">{stat.value}</div>
                          <div className="text-white/40 text-[9px] uppercase tracking-wider leading-none font-body">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div 
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-background py-3.5 px-6 font-body text-xs tracking-widest uppercase hover:bg-white transition-colors duration-500"
                >
                  View Google Scholar Profile
                  <FiExternalLink size={12} />
                </div>
              </a>
            </TiltCard>
          </div>

          {/* Scopus Card */}
          <TiltCard>
            <a 
              href="https://www.scopus.com/authid/detail.uri?authorId=58124404000"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="block relative h-full bg-cardBg/80 backdrop-blur-md border border-[#D4AF37]/20 p-8 md:p-10 flex flex-col justify-between rounded-none shadow-[0_15px_30px_rgba(0,0,0,0.50)] transition-all duration-500 hover:border-accentGold hover:shadow-card-hover group"
            >
              <div className="absolute inset-0 w-[200%] -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 transition-transform duration-1000 ease-out pointer-events-none" />

              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-14 h-14 border border-[#D4AF37]/20 flex items-center justify-center text-accentGold group-hover:border-accentGold transition-colors duration-500">
                    <FiDatabase size={24} className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                </div>

                <h3 className="font-heading text-2xl text-white font-medium mb-1 group-hover:text-accentGold transition-colors duration-500">
                  Scopus
                </h3>
                <p className="font-body text-xs text-white/50 mb-6">Elsevier Citations & Indexes</p>

                {/* Scopus stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="border border-white/5 bg-black/30 p-3 text-center">
                    <FiBookOpen size={14} className="text-accentGold mx-auto mb-1" />
                    <div className="font-numbers text-xl font-light text-white mb-0.5">70</div>
                    <div className="text-white/40 text-[9px] uppercase tracking-wider leading-none font-body">Citations</div>
                  </div>
                  <div className="border border-white/5 bg-black/30 p-3 text-center">
                    <FiTrendingUp size={14} className="text-accentGold mx-auto mb-1" />
                    <div className="font-numbers text-xl font-light text-white mb-0.5">4</div>
                    <div className="text-white/40 text-[9px] uppercase tracking-wider leading-none font-body">h-index</div>
                  </div>
                </div>
              </div>

              <div 
                className="w-full inline-flex items-center justify-center gap-2 bg-transparent border border-[#D4AF37]/40 hover:border-white text-white py-3.5 px-6 font-body text-xs tracking-widest uppercase transition-colors duration-500"
              >
                View Scopus Profile
                <FiExternalLink size={12} />
              </div>
            </a>
          </TiltCard>

          {/* Placeholders Row/Column (ResearchGate, ORCID, LinkedIn) */}
          <div className="flex flex-col gap-6">
            {[
              { name: "ResearchGate", icon: SiResearchgate, isLocked: false, href: "https://www.researchgate.net/profile/Sri-Dhivya?ev=hdr_xprf" },
              { name: "ORCID", icon: SiOrcid, isLocked: false, href: "https://orcid.org/0000-0003-0277-1629" },
              { name: "LinkedIn", icon: FiLinkedin, isLocked: false, href: "https://www.linkedin.com/in/dr-sri-dhivya-501481259/" }
            ].map((p, idx) => {
              const PIcon = p.icon;
              const Wrapper = p.isLocked ? 'div' : 'a';
              return (
                <Wrapper 
                  key={p.name}
                  {...(p.isLocked ? {} : { href: p.href, target: "_blank", rel: "noopener noreferrer" })}
                  className={`bg-cardBg/60 border border-white/5 p-5 flex items-center justify-between group rounded-none ${p.isLocked ? '' : 'hover:border-accentGold transition-colors duration-500 cursor-pointer'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 border flex items-center justify-center transition-colors duration-500 ${p.isLocked ? 'border-white/10 text-white/40 group-hover:text-accentGold group-hover:border-accentGold' : 'border-[#D4AF37]/40 text-accentGold group-hover:border-accentGold group-hover:scale-110'}`}>
                      <PIcon size={16} />
                    </div>
                    <div>
                      <h4 className={`font-heading text-sm font-medium leading-none mb-1 transition-colors duration-500 ${p.isLocked ? 'text-white' : 'text-white group-hover:text-accentGold'}`}>{p.name}</h4>
                      <p className="text-[9px] font-body uppercase text-white/30 tracking-widest">{p.isLocked ? 'Coming Soon' : 'Professional Network'}</p>
                    </div>
                  </div>
                  {p.isLocked ? (
                    <FiLock size={12} className="text-white/20" />
                  ) : (
                    <FiExternalLink size={12} className="text-[#D4AF37]/50 group-hover:text-accentGold transition-colors duration-500" />
                  )}
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
