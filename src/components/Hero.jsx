import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import profileImg from '../assets/images/profile.jpg';
import MagneticButton from './MagneticButton';
import HeroSphere from './HeroSphere';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 120, mass: 1 };
  const rx = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const ry = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      <HeroSphere />
      <div className="container-custom relative z-10 py-32 lg:py-0 pointer-events-none w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-screen lg:py-28 pointer-events-auto">

          {/* Left — Editorial Content (Col Span 7) */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[1px] bg-accentGold" />
              <span className="text-accentGold text-xs font-semibold tracking-[0.3em] uppercase">
                Academic Profile
              </span>
            </motion.div>

            {/* Massive Editorial Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium text-white leading-[1.05] tracking-tight mb-8"
            >
              Dr. D. Sri Dhivya.
            </motion.h1>

            {/* Professional Introduction */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="font-body text-lg md:text-xl text-textSecondary font-light leading-relaxed mb-10 max-w-2xl"
            >
              Assistant Professor and Researcher specializing in English for Specific Purposes, Education 4.0, and Technology Enhanced Learning at CS Academy of Higher Education.
            </motion.p>

            {/* Keywords */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap gap-x-6 gap-y-3 mb-12 text-sm font-body text-accentGold/80 tracking-wide"
            >
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accentGold" /> ESP</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accentGold" /> Education 4.0</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accentGold" /> Gamification</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accentGold" /> Sustainability</span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap items-center gap-6"
            >
              <MagneticButton cursorText="Scholar">
                <a
                  href="https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 bg-accentGold text-background px-8 py-4 rounded-none font-body text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-glow"
                >
                  <span className="relative z-10 flex items-center gap-3 font-semibold">
                    <SiGooglescholar size={18} />
                    Google Scholar
                  </span>
                </a>
              </MagneticButton>
              <MagneticButton cursorText="Download">
                <a
                  href="/cv.pdf"
                  download
                  className="group inline-flex items-center gap-3 text-white font-body text-sm tracking-widest uppercase transition-all duration-500 hover:text-accentGold"
                >
                  <span className="relative overflow-hidden">
                    Download CV
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accentGold -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </span>
                  <FiDownload size={16} />
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — Profile Card (Col Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px]" style={{ perspective: 1200 }}>
              
              {/* Luxury Black Glass Profile Card */}
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
                className="relative rounded-none overflow-hidden bg-[#111111]/80 backdrop-blur-xl border border-accentGold/20 shadow-card transition-shadow duration-500 hover:shadow-card-hover p-5"
              >
                {/* Dynamic Lighting Glows */}
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_20%,_#D4AF37_0%,_transparent_40%)] opacity-10 blur-2xl" />
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_80%_80%,_#FFFFFF_0%,_transparent_40%)] opacity-5 blur-2xl" />
                
                <motion.div 
                  className="absolute inset-0 z-20 pointer-events-none mix-blend-soft-light transition-opacity duration-300"
                  style={{
                    opacity: useTransform(mouseX, [0, 1], [0.3, 0]),
                    background: 'linear-gradient(120deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)'
                  }}
                />

                {/* Inner Content */}
                <div className="relative z-10 rounded-none overflow-hidden bg-black/60 border border-white/5 flex flex-col h-full">
                  {/* Image Area */}
                  <div className="relative h-[360px] w-full overflow-hidden" style={{ transform: "translateZ(30px)" }}>
                    <img
                      src={profileImg}
                      alt="Dr. D. Sri Dhivya"
                      className="w-full h-full object-cover object-top filter grayscale contrast-125 saturate-[0.8] brightness-90 hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                  
                  {/* Info Area */}
                  <div className="p-6 relative bg-[#111111]/90 backdrop-blur-md" style={{ transform: "translateZ(40px)" }}>
                    <h3 className="font-heading text-2xl font-semibold text-white mb-1">
                      Dr. D. Sri Dhivya
                    </h3>
                    <p className="font-body text-sm text-accentGold font-light tracking-wide mb-5">
                      Assistant Professor
                    </p>
                    
                    <a
                      href="https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full p-3 rounded-none bg-black/40 hover:bg-accentGold hover:text-black border border-accentGold/20 transition-all duration-500 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-none bg-accentGold/10 flex items-center justify-center text-accentGold group-hover:bg-black group-hover:text-accentGold transition-colors">
                          <SiGooglescholar size={14} />
                        </div>
                        <span className="font-body text-xs font-semibold tracking-wider group-hover:text-black">Google Scholar</span>
                      </div>
                      <FiArrowRight size={14} className="text-accentGold/50 group-hover:text-black transition-colors group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
        <motion.div
          animate={{ height: [0, 24, 0], y: [0, 12, 24], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px bg-accentGold/40"
        />
      </motion.div>
    </section>
  );
}
