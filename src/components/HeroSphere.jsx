import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function KnowledgeNetwork() {
  const groupRef = useRef();
  
  // Create nodes (points) and edges (lines)
  const { points, lines } = useMemo(() => {
    const nodeCount = 65;
    const p = new Float32Array(nodeCount * 3);
    const nodes = [];
    
    // Generate nodes in a sphere
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2.0 + Math.random() * 0.5; // outer shell sphere
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
      
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Connect nodes that are close to each other
    const l = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.6) {
          l.push(nodes[i].x, nodes[i].y, nodes[i].z);
          l.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return { points: p, lines: new Float32Array(l) };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.02;
      groupRef.current.rotation.y += delta * 0.03;
      // Subtle float motion
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D4AF37"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lines.length / 3}
            array={lines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FFFFFF" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function HeroSphere() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
        <KnowledgeNetwork />
      </Canvas>
    </div>
  );
}
