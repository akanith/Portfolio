import { useRef } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SiGooglescholar } from 'react-icons/si';
import { FiBookOpen, FiFileText, FiGlobe, FiMapPin, FiTrendingUp, FiAward, FiBarChart2, FiStar, FiDatabase } from 'react-icons/fi';
import { researchMetrics } from '../data/academicProfiles';

const metrics = [
  {
    icon: SiGooglescholar,
    value: researchMetrics.scholarCitations,
    label: 'Google Scholar Citations',
    subLabel: 'Total all-time',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'from-blue-50 to-blue-50/30 dark:from-blue-950/30 dark:to-transparent',
    borderColor: 'border-blue-100 dark:border-blue-900/40',
    suffix: '',
  },
  {
    icon: FiTrendingUp,
    value: researchMetrics.scholarHIndex,
    label: 'Google Scholar h-index',
    subLabel: 'Citation impact',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'from-indigo-50 to-indigo-50/30 dark:from-indigo-950/30 dark:to-transparent',
    borderColor: 'border-indigo-100 dark:border-indigo-900/40',
    suffix: '',
  },
  {
    icon: FiAward,
    value: researchMetrics.scholarI10Index,
    label: 'Google Scholar i10-index',
    subLabel: '10+ cited papers',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'from-purple-50 to-purple-50/30 dark:from-purple-950/30 dark:to-transparent',
    borderColor: 'border-purple-100 dark:border-purple-900/40',
    suffix: '',
  },
  {
    icon: FiDatabase,
    value: researchMetrics.scopusCitations,
    label: 'Scopus Citations',
    subLabel: 'Verified citations',
    color: 'text-orange-500 dark:text-orange-400',
    bgColor: 'from-orange-50 to-orange-50/30 dark:from-orange-950/30 dark:to-transparent',
    borderColor: 'border-orange-100 dark:border-orange-900/40',
    suffix: '+',
  },
  {
    icon: FiBarChart2,
    value: researchMetrics.scopusHIndex,
    label: 'Scopus h-index',
    subLabel: 'Scopus impact',
    color: 'text-red-500 dark:text-red-400',
    bgColor: 'from-red-50 to-red-50/30 dark:from-red-950/30 dark:to-transparent',
    borderColor: 'border-red-100 dark:border-red-900/40',
    suffix: '',
  },
  {
    icon: FiBookOpen,
    value: researchMetrics.publications,
    label: 'Publications',
    subLabel: 'Peer-reviewed journals',
    color: 'text-secondary dark:text-teal-400',
    bgColor: 'from-teal-50 to-teal-50/30 dark:from-teal-950/30 dark:to-transparent',
    borderColor: 'border-teal-100 dark:border-teal-900/40',
    suffix: '+',
  },
  {
    icon: FiFileText,
    value: researchMetrics.patents,
    label: 'Patents',
    subLabel: 'Filed & published',
    color: 'text-primary dark:text-blue-300',
    bgColor: 'from-primary/5 to-primary/0 dark:from-primary/10 dark:to-transparent',
    borderColor: 'border-primary/10 dark:border-primary/20',
    suffix: '',
  },
  {
    icon: FiGlobe,
    value: researchMetrics.internationalConferences,
    label: 'International Conferences',
    subLabel: 'Presentations delivered',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'from-amber-50 to-amber-50/30 dark:from-amber-950/30 dark:to-transparent',
    borderColor: 'border-amber-100 dark:border-amber-900/40',
    suffix: '+',
  },
  {
    icon: FiMapPin,
    value: researchMetrics.countriesVisited,
    label: 'Countries',
    subLabel: 'International reach',
    color: 'text-pink-500 dark:text-pink-400',
    bgColor: 'from-pink-50 to-pink-50/30 dark:from-pink-950/30 dark:to-transparent',
    borderColor: 'border-pink-100 dark:border-pink-900/40',
    suffix: '',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ResearchDashboard() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="research-dashboard" className="section-padding bg-gradient-to-br from-primary/3 via-background to-secondary/3 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Metrics</p>
          <h2 className="section-title">Research Dashboard</h2>
          <div className="divider-accent-center mt-4" />
          <p className="text-gray-500 dark:text-gray-400 text-base mt-5 max-w-2xl mx-auto">
            A live snapshot of scholarly impact — aggregated from Google Scholar, Scopus, and institutional records.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                variants={item}
                className={`group relative bg-gradient-to-br ${metric.bgColor} border ${metric.borderColor} rounded-2xl p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              >
                {/* Subtle bg circle */}
                <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-current opacity-5 pointer-events-none" />

                <div className={`w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-3 ${metric.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={18} />
                </div>

                <div className={`font-heading font-bold text-2xl lg:text-3xl mb-0.5 ${metric.color}`}>
                  {inView ? (
                    <CountUp
                      end={metric.value}
                      duration={2}
                      delay={i * 0.07}
                      suffix={metric.suffix}
                    />
                  ) : `0${metric.suffix}`}
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-xs font-semibold leading-tight mb-0.5">
                  {metric.label}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs">{metric.subLabel}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-400 text-xs mt-8 flex items-center justify-center gap-2"
        >
          <FiStar size={11} className="text-accent" />
          Metrics sourced from Google Scholar (
          <a
            href="https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            verified profile
          </a>
          ) and Scopus. Updated periodically.
        </motion.p>
      </div>
    </section>
  );
}
