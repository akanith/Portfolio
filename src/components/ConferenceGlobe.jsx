import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

function InteractiveGlobe() {
  const globeRef = useRef();

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#D4AF37"
          emissive="#111111"
          emissiveIntensity={0.2}
          wireframe
          distort={0.05}
          speed={1.0}
          roughness={0.4}
          metalness={0.9}
        />
      </Sphere>
      
      {/* Conference Markers (Simulated as orbiting points) */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i * 1.5) * 2.1,
          Math.cos(i * 2) * 1.4,
          Math.cos(i * 1.5) * 2.1
        ]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      ))}
    </group>
  );
}

export default function ConferenceGlobe() {
  return (
    <section id="conferences" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Global Reach
            </span>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-8"
          >
            International <br />
            <span className="text-accentGold italic font-light">Conferences</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-textSecondary text-lg font-light leading-relaxed max-w-lg mb-8"
          >
            Presenting groundbreaking research on English for Specific Purposes and Education 4.0 across the globe. Actively contributing to international academic dialogues and symposiums.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-6 pt-8 border-t border-white/10">
              <div className="text-center">
                <span className="block font-numbers text-3xl text-accentGold font-light mb-1">15+</span>
                <span className="block font-body text-[10px] tracking-widest uppercase font-semibold text-textSecondary">Countries</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <span className="block font-numbers text-3xl text-accentGold font-light mb-1">40+</span>
                <span className="block font-body text-[10px] tracking-widest uppercase font-semibold text-textSecondary">Presentations</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] w-full relative cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#D4AF37" />
            <InteractiveGlobe />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none hidden lg:block" />
        </div>

      </div>
    </section>
  );
}
