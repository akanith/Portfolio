import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCloud = [
  { name: 'Academic Research', size: 'text-xl md:text-2xl px-6 py-3', description: 'Expertise in conducting qualitative and quantitative educational studies.' },
  { name: 'Teaching', size: 'text-xl md:text-2xl px-6 py-3', description: 'Pedagogical delivery in Higher Education contexts and curriculum frameworks.' },
  { name: 'IBM SPSS', size: 'text-base md:text-lg px-4.5 py-2.5', description: 'Data modeling, analysis of variance, and regression methodologies.' },
  { name: 'Education 4.0', size: 'text-xl md:text-2xl px-6 py-3', description: 'Integrating Industry 4.0 structures in educational curricula.' },
  { name: 'Technology Enhanced Learning', size: 'text-xl md:text-2xl px-6 py-3', description: 'Designing web blended structures for language acquisition.' },
  { name: 'Academic Writing', size: 'text-base md:text-lg px-4.5 py-2.5', description: 'Formulating high-impact research manuscripts for journals.' },
  { name: 'Communication', size: 'text-base md:text-lg px-4.5 py-2.5', description: 'Intercultural communicative competence and speech delivery.' },
  { name: 'Gamification', size: 'text-base md:text-lg px-4.5 py-2.5', description: 'Applying play elements to classroom motivation and engagement.' },
  { name: 'Data Analysis', size: 'text-base md:text-lg px-4.5 py-2.5', description: 'Interpreting complex educational metrics and research outcomes.' },
  { name: 'Professional English', size: 'text-xl md:text-2xl px-6 py-3', description: 'Workplace readiness communication and Technical English.' },
  { name: 'Curriculum Design', size: 'text-base md:text-lg px-4.5 py-2.5', description: 'Formulating student-centric Outcome-Based Education syllabi.' },
  { name: 'Public Speaking', size: 'text-base md:text-lg px-4.5 py-2.5', description: 'Delivering keynote presentations at international symposiums.' },
];

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="py-24 lg:py-32 bg-background relative overflow-hidden border-b border-white/5">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/30 rounded-full"
            style={{
              top: `${20 + i * 14}%`,
              left: `${15 + (i * 13) % 70}%`
            }}
            animate={{
              y: [0, -20, 0],
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
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Competencies
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-6">
            Skills & Expertise
          </h2>
          <p className="font-body text-textSecondary text-lg font-light max-w-2xl mx-auto">
            Technical, academic, and professional competencies developed through research, teaching, and innovation.
          </p>
        </motion.div>

        {/* Floating Skill Cloud */}
        <div className="max-w-4xl mx-auto min-h-[250px] flex flex-wrap justify-center items-center gap-4 mb-12">
          {skillCloud.map((skill, i) => {
            const isHovered = hoveredSkill?.name === skill.name;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`relative cursor-pointer bg-cardBg/80 backdrop-blur-md border border-[#D4AF37]/20 text-white font-heading ${skill.size} rounded-none hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300 flex items-center justify-center`}
                whileHover={{ scale: 1.08 }}
              >
                <span>{skill.name}</span>
                {isHovered && (
                  <motion.div 
                    layoutId="dot-glow"
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accentGold rounded-full animate-ping"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Description Display */}
        <div className="max-w-xl mx-auto h-16 text-center">
          <AnimatePresence mode="wait">
            {hoveredSkill ? (
              <motion.p
                key={hoveredSkill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-body text-sm text-accentGold tracking-wide font-light italic"
              >
                {hoveredSkill.description}
              </motion.p>
            ) : (
              <p className="font-body text-xs text-white/30 tracking-wider uppercase font-semibold">
                Hover over an expertise pill to reveal scholarly details.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
