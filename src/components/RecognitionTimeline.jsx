import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBookOpen, FiAward, FiCheckCircle } from 'react-icons/fi';

const recognitionList = [
  {
    journal: "MethodsX",
    role: "Reviewer",
    year: "2025"
  },
  {
    journal: "Frontiers in Education",
    role: "Reviewer",
    year: "2025"
  },
  {
    journal: "Journal of Educational Technology Development and Exchange",
    role: "Reviewer",
    year: "2024"
  },
  {
    journal: "Health Education & Behavior",
    role: "Reviewer",
    year: "2024"
  },
  {
    journal: "International Journal of Creative Research Thoughts",
    role: "Reviewer",
    year: "2024"
  },
  {
    journal: "International Journal of Education, Culture and Society",
    role: "Editorial Board Member",
    year: "2024"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function RecognitionTimeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="recognition" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/30 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + (i * 13) % 80}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{
              duration: 6 + i,
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
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Editorial Service
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-6">
            Editorial & Reviewer Recognition
          </h2>
          <p className="font-body text-textSecondary text-lg font-light max-w-2xl mx-auto">
            Recognized contributions to international peer review and scholarly publishing.
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {recognitionList.map((rec, i) => {
            const isEditorial = rec.role.includes("Editorial");
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i}
                className="relative bg-cardBg/80 backdrop-blur-md border border-[#D4AF37]/18 p-8 md:p-10 flex flex-col justify-between h-64 rounded-none group hover:border-[#D4AF37] hover:shadow-card-hover transition-all duration-500 overflow-hidden"
              >
                {/* Subtle soft sweep sweep on hover */}
                <div className="absolute inset-0 w-[200%] -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 transition-transform duration-1000 ease-out pointer-events-none" />

                {/* Top Info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="text-accentGold group-hover:scale-110 transition-transform duration-500">
                    {isEditorial ? <FiAward size={24} /> : <FiBookOpen size={24} />}
                  </div>
                  <span className="font-numbers text-xs text-white/50 border border-white/10 px-2.5 py-1">
                    {rec.year}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-auto">
                  <h3 className="font-heading text-xl text-white font-medium tracking-wide mb-3 leading-snug group-hover:text-accentGold transition-colors duration-500">
                    {rec.journal}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <FiCheckCircle size={12} className="text-accentGold" />
                    <span className="font-body text-[10px] tracking-widest uppercase font-semibold text-white/70">
                      {rec.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
