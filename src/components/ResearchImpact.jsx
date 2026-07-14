import { useRef, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SiGooglescholar } from 'react-icons/si';
import { FiTrendingUp, FiBookOpen, FiFileText, FiGlobe, FiMapPin, FiAward, FiActivity } from 'react-icons/fi';

const metrics = [
  {
    icon: SiGooglescholar,
    value: 149,
    suffix: '',
    label: 'Google Scholar Citations',
    subLabel: 'Global Academic Citations'
  },
  {
    icon: FiActivity,
    value: 70,
    suffix: '',
    label: 'Scopus Citations',
    subLabel: 'Scopus Databases Citations'
  },
  {
    icon: FiTrendingUp,
    value: 6,
    suffix: '',
    label: 'Google Scholar h-index',
    subLabel: 'Research Impact Factor'
  },
  {
    icon: FiAward,
    value: 4,
    suffix: '',
    label: 'Scopus h-index',
    subLabel: 'Scopus Impact Factor'
  },
  {
    icon: FiBookOpen,
    value: 10,
    suffix: '+',
    label: 'Publications',
    subLabel: 'Peer-Reviewed Journals'
  },
  {
    icon: FiFileText,
    value: 2,
    suffix: '',
    label: 'Patents',
    subLabel: 'Intellectual Properties'
  },
  {
    icon: FiMapPin,
    value: 2,
    suffix: '',
    label: 'Countries',
    subLabel: 'International Footprint'
  },
  {
    icon: FiGlobe,
    value: 4,
    suffix: '',
    label: 'International Conferences',
    subLabel: 'Global Symposia'
  }
];

export default function ResearchImpact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({
      x: (clientX - window.innerWidth / 2) * 0.02,
      y: (clientY - window.innerHeight / 2) * 0.02
    });
  };

  return (
    <section 
      id="research-impact" 
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Floating dot particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-accentGold/20 rounded-full"
            style={{
              top: `${10 + i * 12}%`,
              left: `${15 + (i * 7) % 70}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Scholarly Impact
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">
            Research Impact
          </h2>
        </motion.div>

        {/* Spacing Container */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                className="relative bg-cardBg/80 backdrop-blur-md border border-[#D4AF37]/15 p-8 flex flex-col justify-between h-56 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-accentGold/30 group overflow-hidden"
              >
                {/* Gold glowing bar expanding on hover */}
                <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Soft glow */}
                <div className="absolute inset-0 bg-[#D4AF37]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Metric Icon */}
                <div className="text-white/40 group-hover:text-accentGold transition-colors duration-500">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                {/* Stat Display */}
                <div>
                  <div className="font-numbers text-4xl md:text-5xl font-light text-white mb-2 tracking-tight group-hover:text-accentGold transition-colors duration-500">
                    {inView ? (
                      <CountUp end={metric.value} duration={2} delay={i * 0.08} suffix={metric.suffix} />
                    ) : `0${metric.suffix}`}
                  </div>
                  
                  <h3 className="font-heading text-sm text-white font-medium tracking-wide mb-1 leading-snug">
                    {metric.label}
                  </h3>
                  <p className="font-body text-[10px] text-white/50 tracking-wider uppercase font-semibold">
                    {metric.subLabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
