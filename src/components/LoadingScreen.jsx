import { motion } from 'framer-motion';

export default function LoadingScreen() {
  // Generate random coordinates for floating particles that will "gather"
  const particles = Array.from({ length: 40 });

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      {/* Tiny particles gathering */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((_, i) => {
          const randomX = Math.random() * 200 - 100; // start offset
          const randomY = Math.random() * 200 - 100;
          return (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? '#D4AF37' : '#FFFFFF',
                left: '50%',
                top: '50%',
              }}
              initial={{
                x: randomX + 'vw',
                y: randomY + 'vh',
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2.2,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            />
          );
        })}
      </div>

      <motion.div
        className="relative flex flex-col items-center gap-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-3 overflow-hidden text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-12 h-12 border border-accentGold/20 flex items-center justify-center mb-2"
          >
            <span className="text-accentGold font-heading text-lg font-light tracking-widest">SD</span>
          </motion.div>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-heading text-2xl md:text-3xl tracking-[0.25em] uppercase font-light"
          >
            Dr. D. Sri Dhivya
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
            className="h-[1px] w-32 bg-gradient-to-r from-transparent via-accentGold to-transparent"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-white/60 font-body text-[9px] tracking-[0.3em] uppercase font-semibold mt-2"
          >
            Academic Exhibition
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
