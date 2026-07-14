import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { FiX, FiBookOpen, FiArrowRight, FiActivity } from 'react-icons/fi';
import * as THREE from 'three';

const researchNodes = [
  {
    id: 1,
    title: "English for Specific Purposes (ESP)",
    short: "ESP",
    description: "Designing and evaluating ESP curricula tailored to professional and technical domains, with a particular focus on engineering communication and workplace readiness.",
    focus: "Vocational communication framework & technical language acquisition.",
    keywords: ["ESP", "Curriculum Design", "STEM Communication", "Professional Readiness"],
    pubs: [
      "ELSA as an education 4.0 tool for learning business English communication (2023)",
      "Unleashing potential: multimedia learning and education 4.0 in learning professional English communication (2023)"
    ]
  },
  {
    id: 2,
    title: "Education 4.0",
    short: "Education 4.0",
    description: "Exploring the pedagogical transformation driven by Industry 4.0 technologies—AI, IoT, blockchain—and their implications for higher education policy and practice.",
    focus: "AI integration, digital pedagogy transformation, policy making.",
    keywords: ["Education 4.0", "AI in Education", "Pedagogical Shift", "Future Skills"],
    pubs: [
      "Investigating the Role of Education 4.0 in the Performance of HEIs (2023)",
      "Innovating education 4.0: A SAMR-driven approach to learning (2024)"
    ]
  },
  {
    id: 3,
    title: "Technology Enhanced Learning",
    short: "TEL",
    description: "Investigating how digital tools, platforms, and blended learning environments enhance language acquisition, learner autonomy, and academic achievement.",
    focus: "Blended frameworks, digital platforms, and learner metrics.",
    keywords: ["TEL", "Blended Learning", "Digital Platforms", "Autonomy"],
    pubs: [
      "Mastering Professional English Communication: A Guide to Education 4.0 Tools (2024)",
      "Utilizing ELSA speak and busuu apps to enhance English for professional purposes (2024)"
    ]
  },
  {
    id: 4,
    title: "Gamification",
    short: "Gamification",
    description: "Applying game-design mechanics—points, badges, leaderboards, and narrative—to educational contexts to foster motivation, engagement, and deep learning.",
    focus: "Engagement frameworks, motivational design, reward loops.",
    keywords: ["Gamification", "Engagement", "Motivational Design", "Interactive Learning"],
    pubs: [
      "Mastering Professional English Communication: A Guide to Education 4.0 Tools (2024)"
    ]
  },
  {
    id: 5,
    title: "Educational Sustainability",
    short: "Sustainability",
    description: "Developing sustainable pedagogical models that balance technological innovation with equitable access, long-term learner outcomes, and institutional viability.",
    focus: "Equitable EdTech, sustainable training models, policy long-term impact.",
    keywords: ["Sustainability", "Equity in EdTech", "Pedagogical Policy", "Long-term Impact"],
    pubs: [
      "ELSA as an education 4.0 tool for learning business English communication (2023)",
      "Fostering Academic Success through English Language Learning at Rural Universities (2025)"
    ]
  },
  {
    id: 6,
    title: "Professional Communication",
    short: "Prof. Communication",
    description: "Bridging the gap between academic preparation and industry expectations through targeted professional communication skills development for STEM graduates.",
    focus: "Technical presentation skills, technical writing, corporate translation.",
    keywords: ["Professional English", "Industry Alignment", "Technical Writing", "Presentation Skills"],
    pubs: [
      "Unleashing potential: multimedia learning and education 4.0 in learning professional English communication (2023)"
    ]
  },
  {
    id: 7,
    title: "Multidisciplinary Research",
    short: "Multidisciplinary",
    description: "Conducting research that transcends disciplinary boundaries, connecting applied linguistics, educational technology, cognitive science, and organisational behaviour.",
    focus: "Cross-disciplinary linguistics integration with computer sciences.",
    keywords: ["Multidisciplinary", "Linguistics Intersection", "Cognitive Science", "EdTech Innovation"],
    pubs: [
      "Applying Psychoanalysis As A Key To Understanding And Addressing The Problem of Aggression (2024)",
      "The power of translanguaging: Theoretical insights and empirical evidence (2025)"
    ]
  },
  {
    id: 8,
    title: "Corpus Linguistics",
    short: "Corpus Linguistics",
    description: "Employing corpus-based methods and natural language processing tools to analyse disciplinary discourse patterns and inform data-driven language teaching.",
    focus: "Corpus-based discourse patterns, NLP text metrics.",
    keywords: ["Corpus Linguistics", "NLP", "Discourse Analysis", "Computational Linguistics"],
    pubs: [
      "The power of translanguaging: Theoretical insights and empirical evidence (2025)"
    ]
  }
];

// R3F background star field
function StarField() {
  const ref = useRef();
  
  const { positions, colors } = useMemo(() => {
    const starsCount = 300;
    const pos = new Float32Array(starsCount * 3);
    const col = new Float32Array(starsCount * 3);
    const gold = new THREE.Color("#D4AF37");
    const white = new THREE.Color("#FFFFFF");
    
    for (let i = 0; i < starsCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      
      const isGold = Math.random() > 0.6;
      const c = isGold ? gold : white;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.z += delta * 0.005;
    ref.current.rotation.x += delta * 0.002;
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} colors={colors} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  );
}

export default function ResearchExpertise() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({
      x: (clientX - window.innerWidth / 2) * 0.015,
      y: (clientY - window.innerHeight / 2) * 0.015
    });
  };

  const orbitRadius = 38; // Radius of orbit in percentage

  // Pre-calculate positions around the orbit
  const orbitNodes = useMemo(() => {
    return researchNodes.map((node, i) => {
      const angle = (i * 2 * Math.PI) / researchNodes.length;
      return {
        ...node,
        ox: 50 + Math.cos(angle) * orbitRadius,
        oy: 50 + Math.sin(angle) * orbitRadius,
      };
    });
  }, []);

  return (
    <section
      id="research"
      className="py-24 lg:py-32 bg-[#050505] relative overflow-hidden min-h-[95vh] flex flex-col justify-center border-b border-white/5"
      onMouseMove={handleMouseMove}
      ref={sectionRef}
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />
      
      {/* Nebula subtle radial background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/[0.025] rounded-full blur-[120px] pointer-events-none" />

      {/* Background Star field Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <StarField />
        </Canvas>
      </div>

      <div className="container-custom relative z-20 w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Research Map
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">
            Research Expertise
          </h2>
          <p className="font-body text-textSecondary text-base font-light mt-6 max-w-xl mx-auto">
            Exploring interdisciplinary research areas that bridge education, technology, language learning, and innovation.
          </p>
        </div>

        {/* Constellation Galaxy map (Desktop & Tablet) */}
        <div className="hidden md:block relative w-full max-w-4xl h-[620px] mx-auto border border-white/5 bg-[#090909]/40 backdrop-blur-sm overflow-hidden rounded-none">
          {/* Constellation layout */}
          <div 
            className="absolute inset-0 z-10 w-full h-full"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {/* Center Node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 0 20px rgba(212,175,55,0.2)", "0 0 35px rgba(212,175,55,0.4)", "0 0 20px rgba(212,175,55,0.2)"]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
                className="w-36 h-36 rounded-full border border-accentGold/40 bg-[#111111] flex flex-col items-center justify-center p-4 text-center shadow-2xl relative"
              >
                {/* Soft inner reflection glow */}
                <div className="absolute top-2 left-4 w-12 h-6 bg-white/[0.03] rounded-full blur-[1px]" />
                <span className="font-heading text-base font-medium tracking-wide text-white">
                  Research
                </span>
                <span className="font-heading text-xs italic text-accentGold mt-0.5">
                  Expertise
                </span>
              </motion.div>
            </div>

            {/* Orbiting Container */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 180,
                ease: "linear"
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Ultra-thin connections to center node */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {orbitNodes.map((node) => {
                  const isHighlighted = hoveredNode === node.id;
                  return (
                    <line
                      key={node.id}
                      x1="50%"
                      y1="50%"
                      x2={`${node.ox}%`}
                      y2={`${node.oy}%`}
                      stroke={isHighlighted ? '#D4AF37' : 'rgba(255,255,255,0.05)'}
                      strokeWidth={isHighlighted ? 1.5 : 0.8}
                      className="transition-colors duration-300"
                    />
                  );
                })}
              </svg>

              {/* Orbiting Nodes */}
              {orbitNodes.map((node) => {
                const isHovered = hoveredNode === node.id;
                
                return (
                  <div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    style={{
                      left: `${node.ox}%`,
                      top: `${node.oy}%`,
                    }}
                  >
                    {/* Counter-rotating wrapper to keep text upright */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 180,
                        ease: "linear"
                      }}
                    >
                      {/* Floating Motion inside */}
                      <motion.div
                        animate={isHovered ? { y: 0 } : {
                          y: [0, Math.sin(node.id + Date.now() * 0.001) * 8, 0]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 5 + (node.id % 3),
                          ease: "easeInOut"
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setSelectedNode(node)}
                        className="relative"
                      >
                        <motion.div
                          animate={{
                            scale: isHovered ? 1.15 : 1,
                            borderColor: isHovered ? '#D4AF37' : 'rgba(212, 175, 55, 0.18)',
                            boxShadow: isHovered ? '0 0 25px rgba(212, 175, 55, 0.3)' : 'none'
                          }}
                          className="w-24 h-24 rounded-full border bg-[#111111]/90 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center shadow-xl group"
                        >
                          {/* Inner white reflection */}
                          <div className="absolute top-1 left-2.5 w-8 h-4 bg-white/[0.04] rounded-full blur-[1px] pointer-events-none" />

                          <span className="font-heading text-[10px] font-medium text-white group-hover:text-accentGold transition-colors duration-300 leading-snug">
                            {node.short}
                          </span>

                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-accentGold/20 p-0.5 rounded-full border border-accentGold/30">
                            <FiActivity size={8} className="text-accentGold animate-pulse" />
                          </div>
                        </motion.div>

                        {/* Interactive Tooltip on Hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute left-1/2 -translate-x-1/2 top-28 w-56 bg-black/90 border border-accentGold/30 p-4 text-center pointer-events-none shadow-2xl z-50 rounded-none"
                            >
                              <h4 className="font-heading text-xs font-semibold text-accentGold mb-1.5">{node.title}</h4>
                              <p className="font-body text-[10px] text-white/70 leading-relaxed font-light">{node.description.slice(0, 85)}...</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Mobile Adaptive Stacked Layout */}
        <div className="block md:hidden space-y-4 max-w-md mx-auto">
          {researchNodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelectedNode(node)}
              className="bg-[#111111]/85 border border-[#D4AF37]/18 p-6 flex items-center justify-between cursor-pointer hover:border-accentGold transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <FiActivity className="text-accentGold" size={16} />
                <span className="font-heading text-sm text-white font-medium">{node.title}</span>
              </div>
              <FiArrowRight size={14} className="text-accentGold/60" />
            </motion.div>
          ))}
        </div>

        {/* Details Glass Modal overlay */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={() => setSelectedNode(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl bg-[#111111] border border-accentGold/20 p-8 lg:p-10 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>

                {/* Details */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accentGold rounded-full" />
                    <span className="font-body text-[10px] tracking-widest uppercase font-semibold text-accentGold">Expertise Node</span>
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-2xl lg:text-3xl font-medium text-white mb-2">
                      {selectedNode.title}
                    </h3>
                    <p className="font-body text-accentGold text-xs font-semibold tracking-wider uppercase">Key focus: {selectedNode.focus}</p>
                  </div>

                  <p className="font-body text-textSecondary text-sm font-light leading-relaxed">
                    {selectedNode.description}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.keywords.map(kw => (
                      <span key={kw} className="text-[10px] font-body uppercase tracking-wider text-white/50 border border-white/10 px-2.5 py-1">
                        #{kw}
                      </span>
                    ))}
                  </div>

                  {/* Publications */}
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="font-heading text-lg text-white mb-4 flex items-center gap-2">
                      <FiBookOpen size={16} className="text-accentGold" />
                      Related Publications
                    </h4>
                    <ul className="space-y-3">
                      {selectedNode.pubs.map((pub, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-body text-textSecondary leading-relaxed">
                          <FiArrowRight size={12} className="text-accentGold/60 shrink-0 mt-0.5" />
                          <span>{pub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
