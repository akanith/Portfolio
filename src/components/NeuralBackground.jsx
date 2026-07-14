import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Constellation(props) {
  const ref = useRef();
  
  // Generate 3500 points spread widely
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(3500 * 3);
    const colors = new Float32Array(3500 * 3);
    const goldColor = new THREE.Color('#D4AF37');
    const whiteColor = new THREE.Color('#FFFFFF');

    for (let i = 0; i < 3500; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = Math.cbrt(Math.random()) * 3.5;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = Math.random() > 0.6 ? goldColor : whiteColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Rotation
    ref.current.rotation.x += delta * 0.01;
    ref.current.rotation.y += delta * 0.015;

    // Mouse Parallax
    ref.current.position.x += (mouse.current.x * 0.15 - ref.current.position.x) * 0.05;
    ref.current.position.y += (mouse.current.y * 0.15 - ref.current.position.y) * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          vertexColors
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  );
}

export default function NeuralBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background">
      <Canvas camera={{ position: [0, 0, 1.2] }}>
        <ambientLight intensity={0.5} />
        <Constellation />
      </Canvas>
    </div>
  );
}
