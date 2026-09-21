'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ChartGroup() {
  const groupRef = useRef(null);
  const [hovered, setHover] = useState(false);
  
  // Refs untuk grup masing-masing balok agar bisa di-scale
  const b1 = useRef(null);
  const b2 = useRef(null);
  const b3 = useRef(null);
  const b4 = useRef(null);

  // Tinggi final tiap balok
  const h1 = 1.0;
  const h2 = 1.8;
  const h3 = 2.6;
  const h4 = 1.4;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const speed = hovered ? 2.0 : 0.4;

    groupRef.current.rotation.y += delta * speed;
    groupRef.current.position.y = -0.5 + Math.sin(time * 2) * 0.1;

    // Use lerp instead of damp to ensure compatibility with all Three.js versions
    const lerpFactor = 0.1;
    if (b1.current && time > 0.1) b1.current.scale.y = THREE.MathUtils.lerp(b1.current.scale.y, 1, lerpFactor);
    if (b2.current && time > 0.3) b2.current.scale.y = THREE.MathUtils.lerp(b2.current.scale.y, 1, lerpFactor);
    if (b3.current && time > 0.5) b3.current.scale.y = THREE.MathUtils.lerp(b3.current.scale.y, 1, lerpFactor);
    if (b4.current && time > 0.7) b4.current.scale.y = THREE.MathUtils.lerp(b4.current.scale.y, 1, lerpFactor);
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
      rotation={[0.15, -0.4, 0]} // Sedikit dimiringkan agar dimensi 3D terlihat dari awal
    >
      {/* Base/Alas */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.2, 0.1, 1.0]} />
        <meshStandardMaterial color="#12171F" flatShading={true} roughness={1} metalness={0} />
      </mesh>

      {/* Balok 1 (Pendek) - Darker */}
      {/* Set scale awal Y mendekati 0. Posisi diletakkan di Y=0 (sejajar alas) */}
      <group ref={b1} position={[-1.2, 0, 0]} scale={[1, 0.001, 1]}>
        {/* Mesh digeser ke atas sejauh setengah tingginya agar tumbuh dari bawah */}
        <mesh position={[0, h1 / 2, 0]}>
          <boxGeometry args={[0.5, h1, 0.5]} />
          <meshStandardMaterial color="#1D4ED8" flatShading={true} roughness={1} metalness={0} />
        </mesh>
      </group>

      {/* Balok 2 (Sedang) - Primary */}
      <group ref={b2} position={[-0.4, 0, 0]} scale={[1, 0.001, 1]}>
        <mesh position={[0, h2 / 2, 0]}>
          <boxGeometry args={[0.5, h2, 0.5]} />
          <meshStandardMaterial color="#2563EB" flatShading={true} roughness={1} metalness={0} />
        </mesh>
      </group>

      {/* Balok 3 (Tinggi) - Lighter */}
      <group ref={b3} position={[0.4, 0, 0]} scale={[1, 0.001, 1]}>
        <mesh position={[0, h3 / 2, 0]}>
          <boxGeometry args={[0.5, h3, 0.5]} />
          <meshStandardMaterial color="#3B82F6" flatShading={true} roughness={1} metalness={0} />
        </mesh>
      </group>

      {/* Balok 4 (Sedang/Netral) - Netral */}
      <group ref={b4} position={[1.2, 0, 0]} scale={[1, 0.001, 1]}>
        <mesh position={[0, h4 / 2, 0]}>
          <boxGeometry args={[0.5, h4, 0.5]} />
          <meshStandardMaterial color="#9AA4B2" flatShading={true} roughness={1} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}

export default function BarChartIcon({ className = "w-[120px] h-[120px]" }) {
  return (
    <div className={className} style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#1D4ED8" />
        <ChartGroup />
      </Canvas>
    </div>
  );
}
