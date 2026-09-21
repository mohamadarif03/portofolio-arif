'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function CodeCube() {
  const groupRef = useRef(null);
  const [hovered, setHover] = useState(false);

  const materials = useMemo(() => {
    const frontBack = new THREE.MeshBasicMaterial({ color: '#2563EB' });
    const topBottom = new THREE.MeshBasicMaterial({ color: '#3B82F6' });
    const sides = new THREE.MeshBasicMaterial({ color: '#1D4ED8' });

    return [sides, sides, topBottom, topBottom, frontBack, frontBack];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const speed = hovered ? 2.5 : 0.5;
    groupRef.current.rotation.y += delta * speed;
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 2) * 0.15;
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    groupRef.current.rotation.z = Math.cos(time * 0.5) * 0.05;
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }} 
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
      rotation={[0.2, 0.4, 0]}
    >
      <mesh material={materials}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
      </mesh>
      
      <Text
        position={[0, 0, 0.751]}
        fontSize={0.6}
        color="#E7EAEE"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/firamono/v14/N0bX2SlFPv1weGeLZDtgJv7S.woff"
        material-toneMapped={false} 
      >
        {"</>"}
      </Text>
    </group>
  );
}

export default function CodeCubeIcon({ className = "w-[120px] h-[120px]" }) {
  return (
    <div className={className} style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true }}>
        <React.Suspense fallback={null}>
          <CodeCube />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
