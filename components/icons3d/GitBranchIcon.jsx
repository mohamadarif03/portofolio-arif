'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Komponen helper untuk membuat garis tebal (Cylinder) antar 2 titik
function Connection({ start, end, color }) {
  const vStart = new THREE.Vector3(...start);
  const vEnd = new THREE.Vector3(...end);
  
  const distance = vStart.distanceTo(vEnd);
  // Titik tengah
  const position = vStart.clone().lerp(vEnd, 0.5);
  
  // Kalkulasi rotasi silinder agar menunjuk dari start ke end
  const direction = new THREE.Vector3().subVectors(vEnd, vStart).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  const euler = new THREE.Euler().setFromQuaternion(quaternion);

  return (
    <mesh position={position} rotation={euler}>
      <cylinderGeometry args={[0.04, 0.04, distance, 8]} />
      {/* Menggunakan MeshBasicMaterial agar warnanya solid, tebal namun tanpa gradien */}
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function GitBranchGroup() {
  const groupRef = useRef(null);
  const [hovered, setHover] = useState(false);

  // Gunakan array of refs untuk menghindari konflik dengan rules ESLint react-hooks/refs
  const nodeRefs = useRef([]);

  // Definisi Node (Posisi, Ukuran, Warna) - tanpa menyimpan ref di dalam state/memo
  const nodes = useMemo(() => [
    { id: 0, pos: [0, -1.1, 0], size: 0.32, color: '#2563EB' }, // Root (bawah) - Primary
    { id: 1, pos: [0, -0.1, 0], size: 0.28, color: '#2563EB' }, // Hub (tengah) - Primary
    { id: 2, pos: [0.8, 0.6, 0.2], size: 0.22, color: '#3B82F6' }, // Cabang Kanan - Lighter
    { id: 3, pos: [-0.7, 0.7, -0.3], size: 0.22, color: '#9AA4B2' }, // Cabang Kiri - Netral
    { id: 4, pos: [0.1, 1.1, 0.4], size: 0.18, color: '#3B82F6' }  // Cabang Atas - Lighter
  ], []);

  const connections = [
    { start: nodes[0].pos, end: nodes[1].pos },
    { start: nodes[1].pos, end: nodes[2].pos },
    { start: nodes[1].pos, end: nodes[3].pos },
    { start: nodes[1].pos, end: nodes[4].pos }
  ];

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const speed = hovered ? 2.5 : 0.4;

    groupRef.current.rotation.y += delta * speed;
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.1;

    // Animasi per node
    nodes.forEach((node, i) => {
      const mesh = nodeRefs.current[i];
      if (mesh) {
        const pulse = 1.0 + Math.max(0, Math.sin(time * 4 + i * 1.2)) * 0.2;
        mesh.scale.setScalar(pulse);
      }
    });
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
      rotation={[0.1, -0.5, 0]}
    >
      {connections.map((conn, idx) => (
        <Connection 
          key={`conn-${idx}`} 
          start={conn.start} 
          end={conn.end} 
          color="#1D4ED8" 
        />
      ))}

      {nodes.map((node, i) => (
        <mesh 
          key={`node-${node.id}`} 
          ref={(el) => { nodeRefs.current[i] = el; }} 
          position={node.pos}
        >
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
    </group>
  );
}

export default function GitBranchIcon({ className = "w-[120px] h-[120px]" }) {
  return (
    <div className={className} style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <GitBranchGroup />
      </Canvas>
    </div>
  );
}
