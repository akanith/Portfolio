import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FiAward, FiBook, FiDatabase, FiFileText, FiGlobe } from 'react-icons/fi';
import TiltCard from './TiltCard';

const achievementsList = [
  {
    year: "2025",
    title: "Editorial Board Member",
    category: "Editorial Role",
    issuer: "Int'l Journal of Education, Culture and Society",
    description: "Appointed to the editorial review board representing pedagogical and technological integrations.",
    icon: FiAward
  },
  {
    year: "2025",
    title: "Reviewer Recognition",
    category: "Peer Review",
    issuer: "Elsevier, Frontiers, Sage Publications",
    description: "Honored for rigorous evaluation and quality control contributions across international education journals.",
    icon: FiBook
  },
  {
    year: "2024",
    title: "Patents Granted",
    category: "Intellectual Property",
    issuer: "Indian Patent Office",
    description: "Granted and published patents outlining innovative technology-enhanced vocabulary and language analysis tools.",
    icon: FiFileText
  },
  {
    year: "2023",
    title: "International Conference Presenter",
    category: "Research Presentation",
    issuer: "HEIs Thailand & Malaysia Symposia",
    description: "Presented research papers on digital translanguaging and Education 4.0 frameworks at global venues.",
    icon: FiGlobe
  },
  {
    year: "2022",
    title: "BEC Vantage (C1 Level)",
    category: "Language Certification",
    issuer: "Cambridge Assessment English",
    description: "Certified at C1 Level operational proficiency demonstrating advanced business communicative competency.",
    icon: FiAward
  },
  {
    year: "2021",
    title: "IBM SPSS Certification",
    category: "Technical Certification",
    issuer: "IBM Analytics Division",
    description: "Certified in statistical modeling, database operations, and variance analytics workflows.",
    icon: FiDatabase
  },
  {
    year: "2020",
    title: "Six Hindi Language Certifications",
    category: "Multilingual Distinction",
    issuer: "Dakshina Bharat Hindi Prachar Sabha",
    description: "Awarded multiple language distinctions representing comprehensive reading, writing, and translation fluency.",
    icon: FiGlobe
  }
];

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="achievements" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:45px_45px]" />

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
              Milestones
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-6">
            Achievements & Awards
          </h2>
          <p className="font-body text-textSecondary text-lg font-light max-w-2xl mx-auto">
            Milestones recognizing excellence in teaching, research, innovation, and professional development.
          </p>
        </motion.div>

        {/* Animated Achievement Counters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-20 border-y border-white/10 py-8 bg-cardBg/40 backdrop-blur-md px-6 text-center">
          {[
            { label: "Certifications", value: 8 },
            { label: "Awards & Honors", value: 3 },
            { label: "Patents Published", value: 2 },
            { label: "Reviewer Roles", value: 6 },
            { label: "Int'l Conferences", value: 4 }
          ].map((stat, idx) => (
            <div key={idx}>
              <span className="block font-numbers text-3xl md:text-4xl text-accentGold font-light mb-1">
                {inView ? <CountUp end={stat.value} duration={2.5} /> : '0'}
              </span>
              <span className="block font-body text-[10px] tracking-widest uppercase text-white/50">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Achievement Gallery Layout */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {achievementsList.map((ach, i) => {
            const Icon = ach.icon;
            const isEven = i % 2 === 0;

            return (
              <TiltCard key={i}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative overflow-hidden bg-cardBg/80 backdrop-blur-md border border-[#D4AF37]/20 p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center rounded-none shadow-[0_15px_30px_rgba(0,0,0,0.50)] hover:border-accentGold hover:shadow-card-hover transition-all duration-500 group ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Sweep highlight */}
                  <div className="absolute inset-0 w-[200%] -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 transition-transform duration-1000 ease-out pointer-events-none" />

                  {/* Left Info */}
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 border border-[#D4AF37]/20 flex items-center justify-center text-accentGold group-hover:border-accentGold transition-colors duration-500">
                      <Icon size={24} className="group-hover:scale-115 transition-transform duration-500" />
                    </div>
                    <div>
                      <span className="font-body text-[9px] tracking-widest uppercase font-semibold text-accentGold">{ach.category}</span>
                      <h3 className="font-heading text-xl md:text-2xl text-white font-medium mt-1 mb-2 group-hover:text-accentGold transition-colors duration-500">
                        {ach.title}
                      </h3>
                      <p className="font-body text-textSecondary text-sm font-light leading-relaxed max-w-xl">
                        {ach.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Info: Year and Issuer */}
                  <div className={`mt-6 md:mt-0 flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} shrink-0`}>
                    <span className="font-numbers text-3xl text-accentGold font-light mb-1">{ach.year}</span>
                    <span className="font-body text-[10px] text-white/50 tracking-wider uppercase font-semibold">{ach.issuer}</span>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
