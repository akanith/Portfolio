import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { education } from '../data/education';

export default function DNATimeline() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1.2]);

  return (
    <section id="education" className="py-24 lg:py-32 relative overflow-hidden bg-background" ref={containerRef}>
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Academic Journey
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">
            Education
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* DNA Strand SVG Background */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-24 md:w-32 z-0 hidden md:block">
            <svg width="100%" height="100%" preserveAspectRatio="none" className="opacity-[0.15]">
              <motion.path
                d="M 20,0 C 80,100 -20,200 40,300 C 100,400 0,500 60,600 C 120,700 20,800 80,900 C 140,1000 40,1100 100,1200"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
                style={{ pathLength }}
              />
              <motion.path
                d="M 80,0 C 20,100 120,200 60,300 C 0,400 100,500 40,600 C -20,700 80,800 20,900 C -40,1000 60,1100 0,1200"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                style={{ pathLength }}
              />
              {/* Connecting rungs */}
              {Array.from({ length: 24 }).map((_, i) => (
                <line key={i} x1="30" y1={i * 50 + 25} x2="70" y2={i * 50 + 25} stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.4" />
              ))}
            </svg>
          </div>

          <div className="relative z-10 flex flex-col gap-16 md:gap-24">
            {education.map((edu, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col md:flex-row gap-8 lg:gap-12 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:text-left'} bg-cardBg backdrop-blur-md p-8 lg:p-10 rounded-none border border-borderGlass hover:border-accentGold/40 hover:shadow-card transition-all duration-500 relative group`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-accentGold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="inline-block text-accentGold font-numbers text-xl font-light tracking-wide mb-4">
                      {edu.year}
                    </span>
                    <h3 className="font-heading text-2xl lg:text-3xl font-medium text-white leading-tight mb-2 group-hover:text-accentGold transition-colors duration-500">{edu.degree}</h3>
                    <h4 className="font-body text-xs font-semibold text-textSecondary tracking-widest uppercase mb-4">{edu.institution}</h4>
                    
                    {edu.thesis && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-accentGold mb-2">Thesis</p>
                        <p className="font-heading text-lg italic text-textSecondary leading-relaxed">{edu.thesis}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Node on DNA */}
                  <div className="hidden md:flex w-2/12 justify-center relative">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-background border border-accentGold shadow-[0_0_20px_rgba(212,175,55,0.5)] z-20"
                      whileHover={{ scale: 2, backgroundColor: '#D4AF37' }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  
                  <div className="w-full md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
