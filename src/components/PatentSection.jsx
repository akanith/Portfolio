import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiFileText, FiCalendar, FiUser, FiCheckCircle } from 'react-icons/fi';
import { patents } from '../data/patents';
import TiltCard from './TiltCard';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' } }),
};

export default function PatentSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="patents" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative gradient orb for glass effect reflection */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accentGold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Intellectual Property
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">
            Patents
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {patents.map((patent, i) => (
            <TiltCard key={patent.id}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i}
                className="h-full relative overflow-hidden rounded-none border border-borderGlass bg-[#111111]/80 backdrop-blur-xl p-10 transition-all duration-500 hover:border-accentGold/40 hover:shadow-card-hover group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accentGold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-8">
                    <div className="text-white/20 group-hover:text-accentGold transition-colors duration-500">
                      <FiFileText strokeWidth={1} size={40} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center gap-1 font-body text-[10px] tracking-widest uppercase font-semibold text-accentGold border border-accentGold/20 px-3 py-1 bg-accentGold/5">
                        <FiCheckCircle size={10} />
                        {patent.status}
                      </span>
                      <span className="text-white font-numbers text-2xl font-light tracking-wide">{patent.year}</span>
                    </div>
                  </div>

                  {/* Patent number */}
                  <div className="mb-4">
                    <span className="font-body text-[10px] text-textSecondary tracking-widest uppercase font-semibold">Patent No.</span>
                    <p className="font-numbers text-sm text-accentGold tracking-wide mt-1">{patent.patentNumber}</p>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-medium text-white text-xl leading-snug mb-4 group-hover:text-accentGold transition-colors duration-500">
                    {patent.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-textSecondary text-sm font-light leading-relaxed mb-8">{patent.description}</p>

                  {/* Meta */}
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 font-body text-xs text-textSecondary tracking-wide">
                      <FiUser size={12} className="text-white/30" />
                      <span>{patent.inventors}</span>
                    </div>
                    <div className="flex items-center gap-3 font-body text-xs text-textSecondary tracking-wide">
                      <FiCalendar size={12} className="text-white/30" />
                      <span>Filed: {patent.filingDate} · {patent.office}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
