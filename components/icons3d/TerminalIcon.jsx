'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function TerminalGroup() {
  const groupRef = useRef(null);
  const [hovered, setHover] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const screenMaterials = useMemo(() => {
    const bodyColor = new THREE.MeshBasicMaterial({ color: '#2563EB' });
    const screenColor = new THREE.MeshBasicMaterial({ color: '#3B82F6' });
    return [bodyColor, bodyColor, bodyColor, bodyColor, screenColor, bodyColor];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const speed = hovered ? 2.0 : 0.4;

    groupRef.current.rotation.y += delta * speed;
    groupRef.current.position.y = Math.sin(time * 2) * 0.1;

    // React state for cursor blinking is safer than mutating Troika Text ref
    const isVisible = Math.floor(time * 2.5) % 2 === 0;
    if (cursorVisible !== isVisible) {
      setCursorVisible(isVisible);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
      rotation={[0.3, -0.4, 0]} 
    >
      <mesh position={[0, -0.075, 0]}>
        <boxGeometry args={[2.0, 0.15, 1.4]} />
        <meshBasicMaterial color="#1D4ED8" />
      </mesh>

      <group position={[0, 0, -0.7]} rotation={[-0.15, 0, 0]}>
        <mesh position={[0, 0.65, 0]} material={screenMaterials}>
          <boxGeometry args={[2.0, 1.3, 0.15]} />
        </mesh>

        <Text
          position={[-0.85, 1.15, 0.076]} 
          fontSize={0.25}
          color="#E7EAEE"
          fillOpacity={cursorVisible ? 1 : 0}
          anchorX="left"
          anchorY="top"
          font="https://fonts.gstatic.com/s/firamono/v14/N0bX2SlFPv1weGeLZDtgJv7S.woff"
          material-toneMapped={false} 
        >
          {">_"}
        </Text>
      </group>
    </group>
  );
}

export default function TerminalIcon({ className = "w-[120px] h-[120px]" }) {
  return (
    <div className={className} style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <React.Suspense fallback={null}>
          <TerminalGroup />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
