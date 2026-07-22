import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Icosahedron, Torus } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function Shards() {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.getElapsedTime() * 0.15;
    g.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
  });
  return (
    <group ref={g}>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={1.2}>
        <Icosahedron args={[1.6, 1]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#c9a84c"
            emissive="#3a2c0a"
            emissiveIntensity={0.4}
            distort={0.35}
            speed={1.4}
            metalness={0.9}
            roughness={0.15}
            wireframe
          />
        </Icosahedron>
      </Float>
      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.8}>
        <Torus args={[2.6, 0.02, 16, 128]} rotation={[Math.PI / 2.2, 0.4, 0]}>
          <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={0.6} />
        </Torus>
      </Float>
      <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.5}>
        <Torus args={[3.4, 0.008, 8, 128]} rotation={[Math.PI / 3, 0.9, 0.2]}>
          <meshBasicMaterial color="#c9a84c" transparent opacity={0.4} />
        </Torus>
      </Float>
      {Array.from({ length: 40 }).map((_, i) => {
        const a = (i / 40) * Math.PI * 2;
        const r = 3.2 + (i % 5) * 0.15;
        return (
          <mesh key={i} position={[Math.cos(a) * r, Math.sin(a * 2) * 0.8, Math.sin(a) * r]}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshBasicMaterial color="#c9a84c" />
          </mesh>
        );
      })}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f0d78c" />
      <pointLight position={[-4, -2, -2]} intensity={0.6} color="#c9a84c" />
      <Shards />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}