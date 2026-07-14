import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiFileText, FiCalendar, FiUser, FiCheckCircle } from 'react-icons/fi';
import { patents } from '../data/patents';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' } }),
};

export default function PatentCard() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="patents" className="section-padding bg-background dark:bg-gray-950">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Intellectual Property</p>
          <h2 className="section-title">Patents</h2>
          <div className="divider-accent-center mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {patents.map((patent, i) => (
            <motion.div
              key={patent.id}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i}
              className="card dark:bg-gray-800 dark:border-gray-700 p-7 group hover:border-secondary/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/5 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <FiFileText size={22} className="text-primary dark:text-blue-400" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`badge ${patent.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    <FiCheckCircle size={10} />
                    {patent.status}
                  </span>
                  <span className="text-accent font-bold text-lg font-heading">{patent.year}</span>
                </div>
              </div>

              {/* Patent number */}
              <div className="mb-3">
                <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">Patent No.</span>
                <p className="font-mono text-sm text-secondary font-semibold mt-0.5">{patent.patentNumber}</p>
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-primary dark:text-white text-base leading-snug mb-3">
                {patent.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{patent.description}</p>

              {/* Meta */}
              <div className="space-y-1.5 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FiUser size={12} />
                  <span>{patent.inventors}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FiCalendar size={12} />
                  <span>Filed: {patent.filingDate} · {patent.office}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
