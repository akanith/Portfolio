import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap } from 'react-icons/hi';
import { education } from '../data/education';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function EducationTimeline() {
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
    <section id="education" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom" ref={ref}>
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Academic Background</p>
          <h2 className="section-title">Education</h2>
          <div className="divider-accent-center mt-4" />
        </motion.div>

        <div className="relative max-w-3xl mx-auto" ref={containerRef}>
          {/* Background line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-primary/10 dark:bg-gray-800 rounded-full md:-translate-x-1/2" />
          
          {/* Glowing Scroll-Linked Line */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-accent to-primary rounded-full md:-translate-x-1/2 origin-top shadow-[0_0_10px_rgba(15,118,110,0.5)]"
            style={{ scaleY }}
          />

          <div className="space-y-10">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i}
                className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-2 border-secondary shadow-card flex items-center justify-center"
                  >
                    <HiAcademicCap size={18} className="text-secondary" />
                  </motion.div>
                </div>

                {/* Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="card p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="badge bg-secondary/10 text-secondary text-xs mb-2 inline-block">
                          {edu.duration}
                        </span>
                        <h3 className="font-heading font-bold text-primary dark:text-white text-base leading-tight">
                          {edu.degree}
                        </h3>
                        <p className="text-secondary font-semibold text-sm mt-0.5">{edu.field}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-heading font-bold text-2xl text-accent">{edu.year}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{edu.institution}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">{edu.location}</p>
                    {edu.description && (
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-3 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3">
                        {edu.description}
                      </p>
                    )}
                    {edu.thesis && (
                      <div className="mt-3 p-2.5 rounded-lg bg-accent/5 border border-accent/10">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-accent">Thesis: </span>
                          {edu.thesis}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
