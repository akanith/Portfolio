import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import { conferences } from '../data/conferences';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } }),
};

const countryFlags = {
  Thailand: '🇹🇭',
  Malaysia: '🇲🇾',
  India: '🇮🇳',
};

export default function ConferenceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const international = conferences.filter(c => c.type === 'International');
  const national = conferences.filter(c => c.type === 'National');

  return (
    <section id="conferences" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Global Presence</p>
          <h2 className="section-title">Conferences & Presentations</h2>
          <div className="divider-accent-center mt-4" />
          <p className="text-gray-500 dark:text-gray-400 text-base mt-6 max-w-2xl mx-auto">
            Presenting and sharing research at international conferences across Asia, contributing to global scholarly discourse in ELT, gamification, and educational technology.
          </p>
        </motion.div>

        {/* Country Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { flag: '🇹🇭', country: 'Thailand', count: 2, color: 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-800/20' },
            { flag: '🇲🇾', country: 'Malaysia', count: 2, color: 'bg-blue-50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800/20' },
            { flag: '🇮🇳', country: 'India', count: 1, color: 'bg-orange-50 border-orange-100 dark:bg-orange-900/10 dark:border-orange-800/20' },
          ].map((item) => (
            <div key={item.country} className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${item.color}`}>
              <span className="text-2xl">{item.flag}</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{item.country}</p>
                <p className="text-gray-400 text-xs">{item.count} Conference{item.count > 1 ? 's' : ''}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Conference Cards */}
        <div className="space-y-5 max-w-4xl mx-auto">
          {conferences.map((conf, i) => (
            <motion.div
              key={conf.id}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i}
              className="card dark:bg-gray-800 dark:border-gray-700 p-6 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {countryFlags[conf.country] || '🌍'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <div>
                      <div className="flex gap-2 mb-1 flex-wrap">
                        <span className={`badge text-xs ${conf.type === 'International' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                          {conf.type}
                        </span>
                        <span className="badge bg-accent/10 text-amber-600 text-xs">
                          {conf.role}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-primary dark:text-white text-base leading-snug">{conf.title}</h3>
                    </div>
                    <span className="font-heading font-bold text-xl text-accent shrink-0">{conf.year}</span>
                  </div>
                  <p className="text-secondary text-sm font-medium italic mb-2">"{conf.paper}"</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><FiMapPin size={11} />{conf.location}</span>
                    <span className="flex items-center gap-1"><FiUsers size={11} />{conf.organiser}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
