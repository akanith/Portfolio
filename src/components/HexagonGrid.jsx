import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGlobe, FiCpu, FiMonitor, FiZap, FiSun, FiMessageSquare, FiGrid, FiDatabase } from 'react-icons/fi';
import { researchInterests } from '../data/research';

const iconMap = {
  language: FiGlobe,
  technology: FiCpu,
  digital: FiMonitor,
  game: FiZap,
  sustainability: FiSun,
  communication: FiMessageSquare,
  research: FiGrid,
  linguistics: FiDatabase,
};

// SVG Hexagon mask for the cards
const HexagonShape = () => (
  <svg width="0" height="0">
    <defs>
      <clipPath id="hexagon-clip" clipPathUnits="objectBoundingBox">
        <polygon points="0.5 0, 1 0.25, 1 0.75, 0.5 1, 0 0.75, 0 0.25" />
      </clipPath>
    </defs>
  </svg>
);

export default function HexagonGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="research" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      <HexagonShape />
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Scholarly Focus
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">
            Research Interests
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto px-4 md:px-0">
          {researchInterests.map((interest, idx) => {
            const Icon = iconMap[interest.icon] || FiGrid;
            
            // Calculate a slight offset for odd rows to create honeycomb
            const isOddRow = Math.floor(idx / 3) % 2 !== 0;
            const marginTop = idx >= 3 ? '-mt-12 md:-mt-16' : '';
            const marginLeft = isOddRow ? 'md:ml-24' : '';

            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative w-40 h-44 md:w-48 md:h-56 ${marginTop} ${idx % 3 === 0 ? marginLeft : ''} transition-all duration-500 hover:z-20`}
                style={{ clipPath: 'url(#hexagon-clip)' }}
              >
                {/* Background border layer (Gold) */}
                <div className="absolute inset-0 bg-accentGold/30 transition-all duration-500 group-hover:bg-accentGold group-hover:scale-105" />
                
                {/* Inner Content Background (CardBg) */}
                <div className="absolute inset-[1.5px] bg-[#111111] transition-colors duration-500 group-hover:bg-accentGold/[0.05]" style={{ clipPath: 'url(#hexagon-clip)' }}>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
                    <div className="text-accentGold/60 group-hover:text-accentGold transition-colors duration-500 mb-4">
                      <Icon strokeWidth={1} size={28} />
                    </div>
                    <h3 className="font-heading text-white font-medium text-sm md:text-base leading-snug transition-colors duration-500">
                      {interest.shortTitle}
                    </h3>
                  </div>

                </div>

                {/* Particle Hover Effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_60%)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
