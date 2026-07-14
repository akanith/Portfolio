import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiGlobe, FiCpu, FiMonitor, FiZap, FiSun, FiMessageSquare, FiGrid, FiDatabase
} from 'react-icons/fi';
import { researchInterests } from '../data/research';
import TiltCard from './TiltCard';

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

const colorMap = {
  primary: {
    bg: 'bg-primary/5 dark:bg-primary/10',
    border: 'border-primary/10 dark:border-primary/20',
    icon: 'bg-primary/10 text-primary dark:bg-primary/20',
    badge: 'bg-primary/10 text-primary',
  },
  secondary: {
    bg: 'bg-secondary/5 dark:bg-secondary/10',
    border: 'border-secondary/10 dark:border-secondary/20',
    icon: 'bg-secondary/10 text-secondary dark:bg-secondary/20',
    badge: 'bg-secondary/10 text-secondary',
  },
  accent: {
    bg: 'bg-accent/5 dark:bg-amber-900/10',
    border: 'border-accent/10 dark:border-amber-700/20',
    icon: 'bg-accent/10 text-amber-600 dark:bg-amber-900/20',
    badge: 'bg-accent/10 text-amber-600',
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ResearchCards() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="research" className="section-padding bg-background dark:bg-gray-950">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Scholarly Focus</p>
          <h2 className="section-title">Research Interests</h2>
          <div className="divider-accent-center mt-4" />
          <p className="text-gray-500 dark:text-gray-400 text-base mt-6 max-w-2xl mx-auto leading-relaxed">
            Interdisciplinary research spanning applied linguistics, educational technology, and pedagogical innovation — committed to transforming higher education through evidence-based practices.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {researchInterests.map((interest) => {
            const Icon = iconMap[interest.icon] || FiGrid;
            const colors = colorMap[interest.color] || colorMap.primary;

            return (
              <TiltCard key={interest.id}>
                <motion.div
                  variants={item}
                  className={`group h-full p-6 rounded-2xl border ${colors.bg} ${colors.border} transition-all duration-300 cursor-default`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <span className={`badge ${colors.badge} text-xs mb-3`}>{interest.shortTitle}</span>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base mb-2 leading-tight">
                    {interest.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {interest.description}
                  </p>
                </motion.div>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
