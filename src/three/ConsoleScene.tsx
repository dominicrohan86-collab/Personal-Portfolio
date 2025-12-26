import { ContactShadows, Environment, Float, Line, OrbitControls, RoundedBox, Sparkles, Text } from '@react-three/drei';
import { useMemo } from 'react';
import { Color, Vector3 } from 'three';

type ConsoleSceneProps = {
  reducedMotion?: boolean;
};

type Node = {
  label: string;
  position: [number, number, number];
};

const nodes: Node[] = [
  { label: 'TS', position: [0, 0, 0] },
  { label: 'React', position: [0, 1.8, 0] },
  { label: 'JS', position: [1.8, 1, 0] },
  { label: 'AWS', position: [2, -0.4, 0] },
  { label: 'Firebase', position: [1.2, -1.8, 0] },
  { label: 'GitHub', position: [-0.2, -2.2, 0] },
  { label: 'CSS', position: [-1.8, -1.6, 0] },
  { label: 'Node', position: [-2.2, 0.2, 0] },
  { label: 'tRPC', position: [-1.2, 1.6, 0] }
];

const ringRadii = [1.2, 2.2, 3.0];

const RadarGrid = () => {
  const rings = ringRadii.map((r) => (
    <Line key={r} points={new Array(64).fill(0).map((_, i) => new Vector3(Math.cos((i / 63) * Math.PI * 2) * r, Math.sin((i / 63) * Math.PI * 2) * r, 0))} color="#233349" lineWidth={1} transparent opacity={0.5} />
  ));

  const cross = (
    <>
      <Line points={[[-3.2, 0, 0], [3.2, 0, 0]]} color="#233349" lineWidth={1} transparent opacity={0.5} />
      <Line points={[[0, -3.2, 0], [0, 3.2, 0]]} color="#233349" lineWidth={1} transparent opacity={0.5} />
    </>
  );

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {rings}
      {cross}
    </group>
  );
};

const NodeCard = ({ node, reducedMotion }: { node: Node; reducedMotion?: boolean }) => (
  <Float speed={reducedMotion ? 0.2 : 0.6} floatIntensity={reducedMotion ? 0.05 : 0.2} rotationIntensity={reducedMotion ? 0.05 : 0.2}>
    <group position={node.position}>
      <RoundedBox args={[1.1, 1.1, 0.12]} radius={0.15} smoothness={6}>
        <meshStandardMaterial color={new Color('#0f172a')} metalness={0.25} roughness={0.4} />
      </RoundedBox>
      <Text
        position={[0, 0, 0.08]}
        fontSize={0.28}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#0a192f"
      >
        {node.label}
      </Text>
      <Line points={[[0, 0, 0], [0, 0, -0.8]]} color="#6ef1f5" opacity={0.4} transparent />
    </group>
  </Float>
);

export const ConsoleScene = ({ reducedMotion }: ConsoleSceneProps) => {
  const cards = useMemo(() => nodes, []);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <pointLight position={[-3, 4, 3]} intensity={0.7} color="#6ef1f5" />
      <RadarGrid />
      {cards.map((node) => (
        <NodeCard key={node.label} node={node} reducedMotion={reducedMotion} />
      ))}
      <Sparkles count={120} scale={9} size={2} speed={reducedMotion ? 0.05 : 0.3} color="#6ef1f5" />
      <ContactShadows position={[0, -1.4, 0]} opacity={0.25} scale={12} blur={2} />
      <Environment preset="city" />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={!reducedMotion} maxPolarAngle={Math.PI / 2.05} minPolarAngle={Math.PI / 3} />
    </>
  );
};
