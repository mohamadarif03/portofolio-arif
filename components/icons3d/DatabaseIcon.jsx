'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function DatabaseStack() {
  const groupRef = useRef(null);
  const topRef = useRef(null);
  const midRef = useRef(null);
  const botRef = useRef(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const speed = hovered ? 2.5 : 0.5;

    // Rotasi dasar keseluruhan (sumbu Y) + sedikit tilt (sumbu X)
    groupRef.current.rotation.y += delta * speed;
    groupRef.current.rotation.x = 0.2 + Math.sin(time * 0.5) * 0.1; 

    // Floating independen tiap piringan
    // Menggunakan offset waktu (+1.5, +3) agar tidak sinkron sempurna (memberi kesan "hidup")
    if (topRef.current) {
      topRef.current.position.y = 0.6 + Math.sin(time * 2) * 0.08;
      topRef.current.rotation.y = Math.sin(time * 1.5) * 0.15;
      topRef.current.rotation.z = Math.sin(time * 1.2) * 0.05;
    }
    if (midRef.current) {
      midRef.current.position.y = 0 + Math.sin(time * 2 + 1.5) * 0.08;
      midRef.current.rotation.y = Math.sin(time * 1.5 + 1.5) * 0.15;
      midRef.current.rotation.z = Math.sin(time * 1.2 + 1.5) * 0.05;
    }
    if (botRef.current) {
      botRef.current.position.y = -0.6 + Math.sin(time * 2 + 3) * 0.08;
      botRef.current.rotation.y = Math.sin(time * 1.5 + 3) * 0.15;
      botRef.current.rotation.z = Math.sin(time * 1.2 + 3) * 0.05;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
    >
      {/* Piringan Atas - Lighter Shade */}
      <mesh ref={topRef}>
        {/* Menggunakan 16 segmen agar efek flatShading / low-poly tiap sisinya solid dan tegas */}
        <cylinderGeometry args={[1.2, 1.2, 0.4, 16]} />
        <meshStandardMaterial 
          color="#3B82F6" 
          flatShading={true} 
          roughness={1} 
          metalness={0} 
        />
      </mesh>

      {/* Piringan Tengah - Primary Shade */}
      <mesh ref={midRef}>
        <cylinderGeometry args={[1.2, 1.2, 0.4, 16]} />
        <meshStandardMaterial 
          color="#2563EB" 
          flatShading={true} 
          roughness={1} 
          metalness={0} 
        />
      </mesh>

      {/* Piringan Bawah - Darker Shade */}
      <mesh ref={botRef}>
        <cylinderGeometry args={[1.2, 1.2, 0.4, 16]} />
        <meshStandardMaterial 
          color="#1D4ED8" 
          flatShading={true} 
          roughness={1} 
          metalness={0} 
        />
      </mesh>
    </group>
  );
}

export default function DatabaseIcon({ className = "w-[120px] h-[120px]" }) {
  return (
    <div className={className} style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        {/* Ambient & Directional light untuk mengaktifkan flat shading */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#1D4ED8" />
        <DatabaseStack />
      </Canvas>
    </div>
  );
}
