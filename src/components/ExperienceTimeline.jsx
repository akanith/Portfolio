import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCheckCircle } from 'react-icons/fi';

const milestones = [
  {
    year: "2013",
    title: "Started Career at Cognizant",
    subtitle: "Professional Corporate Entry",
    description: "Began professional career at Cognizant Technology Solutions, building foundation in corporate frameworks."
  },
  {
    year: "2016",
    title: "Completed B.A. in English",
    subtitle: "Undergraduate Excellence",
    description: "Graduated with honors in English Literature, laying academic foundation in language and pedagogy."
  },
  {
    year: "2019",
    title: "Master's in English",
    subtitle: "Post-Graduate Distinction",
    description: "Completed advanced research thesis in English studies, focusing on linguistic constructs and communication."
  },
  {
    year: "2023",
    title: "International Conference – Thailand",
    subtitle: "Global Scholarly Reach",
    description: "Presented research papers on digital translanguaging and Education 4.0 at international symposiums in Thailand."
  },
  {
    year: "2024",
    title: "Patents Granted & Published",
    subtitle: "EdTech Innovation",
    description: "Published cutting-edge vocabulary and linguistics software tools via the Indian Patent Office."
  },
  {
    year: "2025",
    title: "PhD Completed",
    subtitle: "Doctorate Milestone",
    description: "Completed doctoral dissertation on English for Specific Purposes and advanced vocational education."
  },
  {
    year: "2025",
    title: "Assistant Professor",
    subtitle: "Academic Leadership",
    description: "Appointed as Assistant Professor, leading research groups and teaching technical communication programs."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ExperienceTimeline() {
  const containerRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-24 lg:py-32 bg-background relative overflow-hidden border-b border-white/5">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container-custom relative z-10" ref={ref}>
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
              Chronology
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">
            Academic & Career Journey
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Central Vertical Tracking Line */}
          <div className="absolute left-6 md:left-[50%] md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10" />
          
          <motion.div 
            className="absolute left-6 md:left-[50%] md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-accentGold origin-top shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            style={{ scaleY }}
          />

          <div className="space-y-16">
            {milestones.map((mil, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={i}
                  className={`relative flex flex-col md:flex-row gap-8 pl-16 md:pl-0 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Indicator Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: i * 0.1 + 0.2, type: 'spring' }}
                      className="w-3.5 h-3.5 rounded-full bg-background border border-accentGold shadow-[0_0_10px_rgba(212,175,55,0.4)] flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 bg-accentGold rounded-full" />
                    </motion.div>
                  </div>

                  {/* Content Glass Panel */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <div className="bg-[#111111]/80 border border-white/5 p-8 hover:border-accentGold/40 transition-colors duration-500 rounded-none shadow-[0_15px_30px_rgba(0,0,0,0.40)]">
                      <div className="flex items-center gap-2 mb-2 flex-wrap" style={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
                        <span className="font-numbers text-accentGold text-lg font-light tracking-wide">{mil.year}</span>
                      </div>
                      
                      <h3 className="font-heading text-xl text-white font-medium mb-1">{mil.title}</h3>
                      <p className="font-body text-[10px] text-white/50 tracking-wider uppercase font-semibold mb-4">{mil.subtitle}</p>
                      <p className="font-body text-textSecondary text-sm font-light leading-relaxed">{mil.description}</p>
                    </div>
                  </div>
                  
                  {/* Layout Spacer */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
