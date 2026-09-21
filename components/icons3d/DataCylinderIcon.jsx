'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function DatabaseGroup() {
  const groupRef = useRef(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Idle rotation (only Y axis for database stack looks best)
    const speed = hovered ? 1.5 : 0.4;
    groupRef.current.rotation.y += delta * speed;
    
    // Floating effect
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 2) * 0.1;
    
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
      // Tilt it slightly so we can see the top
      rotation={[0.3, 0, 0]}
    >
      {/* Top Cylinder */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[1, 1, 0.6, 12]} />
        <meshStandardMaterial color="#2563EB" flatShading={true} roughness={1} metalness={0} />
      </mesh>
      
      {/* Middle Cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.6, 12]} />
        <meshStandardMaterial color="#2563EB" flatShading={true} roughness={1} metalness={0} />
      </mesh>
      
      {/* Bottom Cylinder */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[1, 1, 0.6, 12]} />
        <meshStandardMaterial color="#2563EB" flatShading={true} roughness={1} metalness={0} />
      </mesh>

      {/* Floating Data Nodes (Accents) */}
      <mesh position={[1.4, 0.5, 0]}>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#E7EAEE" flatShading={true} roughness={1} metalness={0} />
      </mesh>
      <mesh position={[-1.2, -0.5, 0.8]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#9AA4B2" flatShading={true} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

export default function DataCylinderIcon({ className = "w-[120px] h-[120px]" }) {
  return (
    <div className={className} style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 4]} intensity={1.2} />
        <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#1D4ED8" />
        <DatabaseGroup />
      </Canvas>
    </div>
  );
}
