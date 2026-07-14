import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiGlobe, FiUsers } from 'react-icons/fi';
import TiltCard from './TiltCard';

const membershipData = [
  {
    acronym: "ELTAI",
    fullName: "English Language Teachers' Association of India",
    role: "Active Member",
    since: "2021",
    icon: FiUsers,
    description: "Promoting excellence in English language teaching across India through professional development, national symposia, and academic publishing partnerships."
  },
  {
    acronym: "TESOL",
    fullName: "Teaching English to Speakers of Other Languages",
    role: "Active Member",
    since: "2022",
    icon: FiAward,
    description: "Advancing excellence in English language teaching for speakers of other languages worldwide through global educational standards, conferences, and research initiatives."
  },
  {
    acronym: "IATEFL",
    fullName: "International Association of Teachers of English as a Foreign Language",
    role: "Active Member",
    since: "2022",
    icon: FiGlobe,
    description: "Connecting, supporting, and developing English language teaching professionals globally through publications, international Special Interest Groups, and annual symposiums."
  }
];

export default function MembershipCards() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="memberships" className="py-24 lg:py-32 bg-background relative overflow-hidden border-b border-white/5">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/35 rounded-full"
            style={{
              top: `${25 + i * 15}%`,
              left: `${15 + (i * 19) % 70}%`
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 5 + i * 1.2,
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
              Global Affiliations
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-6">
            Professional Memberships
          </h2>
          <p className="font-body text-textSecondary text-lg font-light max-w-2xl mx-auto">
            Active participation in globally recognized academic and professional organizations that promote excellence in education, research, and language learning.
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {membershipData.map((mem, i) => {
            const Icon = mem.icon;
            const isHovered = hoveredIndex === i;

            return (
              <TiltCard key={mem.acronym}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative h-full overflow-hidden bg-cardBg/80 backdrop-blur-md border border-[#D4AF37]/20 p-8 md:p-10 flex flex-col justify-between rounded-none shadow-[0_15px_30px_rgba(0,0,0,0.50)] transition-all duration-500 hover:border-accentGold group"
                >
                  {/* Soft light sweep overlay */}
                  <div className="absolute inset-0 w-[200%] -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 transition-transform duration-1000 ease-out pointer-events-none" />

                  {/* Top: Logo & Status */}
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="w-14 h-14 border border-[#D4AF37]/30 flex items-center justify-center text-accentGold group-hover:border-accentGold transition-colors duration-500">
                      <Icon size={24} className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div className="text-right">
                      <span className="font-numbers text-xs text-white/50 block">Since {mem.since}</span>
                      <span className="font-body text-[10px] tracking-wider uppercase font-semibold text-accentGold mt-1 block">
                        {mem.role}
                      </span>
                    </div>
                  </div>

                  {/* Body: Acronym, Name, Divider, Description */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-heading text-2xl text-white font-medium mb-1 group-hover:text-accentGold transition-colors duration-500">
                        {mem.acronym}
                      </h3>
                      <p className="font-body text-xs text-white/60 font-light leading-tight">
                        {mem.fullName}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="relative w-full h-[1px] bg-white/10">
                      <div className="absolute top-0 left-0 h-full bg-accentGold transition-all duration-500" style={{ width: isHovered ? '100%' : '20%' }} />
                    </div>

                    <p className="font-body text-textSecondary text-sm font-light leading-relaxed">
                      {mem.description}
                    </p>
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
