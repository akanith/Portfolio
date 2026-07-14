import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovered(true);
        if (target.dataset.cursor) {
          setHoverText(target.dataset.cursor);
        } else {
          setHoverText('');
        }
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 border border-accentGold rounded-full pointer-events-none z-[9998] hidden md:flex items-center justify-center text-[10px] font-bold text-accentGold tracking-widest"
        animate={{
          width: isHovered ? (hoverText ? 90 : 60) : 32,
          height: isHovered ? (hoverText ? 90 : 60) : 32,
          backgroundColor: isHovered ? (hoverText ? 'rgba(212, 175, 55, 0.1)' : 'rgba(212, 175, 55, 0.05)') : 'transparent',
          borderColor: '#D4AF37',
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && hoverText ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {hoverText}
        </motion.span>
      </motion.div>
    </>
  );
}
