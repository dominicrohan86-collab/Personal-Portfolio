import { Canvas } from '@react-three/fiber';
import { Environment, Float, Html, OrbitControls, Sparkles } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import type { SkillCategory } from '../data/profile';
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion';
import { Color } from 'three';

type SkillsCanvasProps = {
  categories: SkillCategory[];
};

type SkillColumn = {
  label: string;
  count: number;
  color: Color;
  position: [number, number, number];
};

const palette = ['#6ef1f5', '#7de1c3', '#7dd3fc', '#9be5ff', '#67e8f9'];

const generateColumns = (categories: SkillCategory[]): SkillColumn[] => {
  const columns: SkillColumn[] = [];
  const spacing = 2.3;
  categories.forEach((cat, idx) => {
    const angle = (idx / categories.length) * Math.PI * 2;
    const radius = 2.8;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    columns.push({
      label: cat.label,
      count: cat.items.length,
      color: new Color(palette[idx % palette.length]),
      position: [x, 0, z]
    });
  });
  return columns;
};

const Column = ({ column, reducedMotion }: { column: SkillColumn; reducedMotion: boolean }) => {
  const height = 0.6 + column.count * 0.22;
  const y = height / 2;

  return (
    <Float speed={reducedMotion ? 0.4 : 1} rotationIntensity={reducedMotion ? 0 : 0.35} floatIntensity={reducedMotion ? 0.2 : 0.6}>
      <mesh position={[column.position[0], y, column.position[2]]}>
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial
          color={column.color}
          emissive={column.color}
          emissiveIntensity={0.35}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
      <Html distanceFactor={12} position={[column.position[0], height + 0.6, column.position[2]]}>
        <div className="rounded-full border border-accent/40 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-accent shadow-glow">
          {column.label}
        </div>
      </Html>
    </Float>
  );
};

export const SkillsCanvas = ({ categories }: SkillsCanvasProps) => {
  const reducedMotion = usePrefersReducedMotion();
  const columns = useMemo(() => generateColumns(categories), [categories]);

  return (
    <div className="relative h-[420px] w-full">
      <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-accent/80">Loading skill matrix...</div>}>
        <Canvas
          camera={{ position: [0, 4, 10], fov: 55 }}
          dpr={typeof window !== 'undefined' && window.devicePixelRatio > 1 ? [1, 1.5] : 1}
          className="rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        >
          <ambientLight intensity={0.75} />
          <pointLight position={[6, 8, 6]} intensity={1.1} />
          <group position={[0, -0.4, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.2, 3.8, 48]} />
              <meshStandardMaterial color="#0f172a" emissive="#0f172a" emissiveIntensity={0.5} metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
              <circleGeometry args={[4.2, 48]} />
              <meshStandardMaterial color="#0b1629" roughness={0.8} metalness={0.2} />
            </mesh>
            {columns.map((column) => (
              <Column key={column.label} column={column} reducedMotion={reducedMotion} />
            ))}
          </group>
          <Sparkles count={100} scale={8} size={3} speed={reducedMotion ? 0.1 : 0.4} color="#6ef1f5" />
          <Environment preset="city" />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={!reducedMotion} autoRotate={!reducedMotion} autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
};
