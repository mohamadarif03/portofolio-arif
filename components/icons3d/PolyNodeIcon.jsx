'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function NodeGroup() {
  const groupRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current || !ringRef.current) return;
    
    const speed = hovered ? 1.5 : 0.3;
    
    // Rotate the whole group slowly
    groupRef.current.rotation.y += delta * (speed * 0.5);
    groupRef.current.rotation.x += delta * (speed * 0.3);
    
    // Rotate the ring in the opposite direction
    ringRef.current.rotation.z -= delta * speed;
    ringRef.current.rotation.y -= delta * (speed * 0.4);
    
    // Smooth scaling on hover
    const targetScale = hovered ? 1.1 : 1.0;
    const currentScale = groupRef.current.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * 0.1;
    groupRef.current.scale.setScalar(newScale);
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }} 
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
    >
      {/* Central Poly Sphere */}
      <mesh>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#2563EB" flatShading={true} roughness={1} metalness={0} />
      </mesh>
      
      {/* Outer Orbit Ring (Low poly torus) */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.15, 6, 16]} />
        <meshStandardMaterial color="#9AA4B2" flatShading={true} roughness={1} metalness={0} />
        
        {/* Orbiting Satellite Node */}
        <mesh position={[1.8, 0, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#E7EAEE" flatShading={true} roughness={1} metalness={0} />
        </mesh>
      </mesh>
    </group>
  );
}

export default function PolyNodeIcon({ className = "w-[120px] h-[120px]" }) {
  return (
    <div className={className} style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#1D4ED8" />
        <NodeGroup />
      </Canvas>
    </div>
  );
}
