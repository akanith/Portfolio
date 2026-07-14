import { useRef } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const stats = [
  {
    value: 149,
    label: 'Google Scholar',
    sublabel: 'Total Citations',
    suffix: '+',
  },
  {
    value: 70,
    label: 'Scopus',
    sublabel: 'Verified Citations',
    suffix: '+',
  },
  {
    value: 6,
    label: 'h-index',
    sublabel: 'Google Scholar',
    suffix: '',
  },
  {
    value: 4,
    label: 'h-index',
    sublabel: 'Scopus',
    suffix: '',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="stats" className="py-24 lg:py-32 bg-backgroundSecondary relative overflow-hidden border-y border-white/5">
      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-accentGold/20" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label + i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="flex items-start gap-1 mb-3">
                <span className="font-numbers text-5xl lg:text-7xl font-light text-accentGold tracking-tighter">
                  {inView ? (
                    <CountUp end={stat.value} duration={2.5} delay={i * 0.1} useEasing={true} />
                  ) : '0'}
                </span>
                {stat.suffix && (
                  <span className="font-numbers text-2xl lg:text-3xl text-white font-light mt-2">{stat.suffix}</span>
                )}
              </div>
              
              <div className="w-8 h-[1px] bg-accentGold/30 mb-4 transition-all duration-500 group-hover:w-16 group-hover:bg-accentGold" />
              
              <p className="font-body text-xs tracking-[0.2em] uppercase font-semibold text-white mb-1">{stat.label}</p>
              <p className="font-body text-xs text-textSecondary">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
