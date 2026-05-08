import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Html,
  OrbitControls,
  useGLTF,
  useTexture
} from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import {
  Color,
  DoubleSide,
  Group,
  LinearFilter,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SRGBColorSpace,
  Texture
} from 'three';
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion';

type ProjectLaptopPreviewProps = {
  title: string;
  summary: string;
  tech: string[];
  outcomes: string[];
  period: string;
  alternate?: boolean;
  active?: boolean;
  index: number;
  screenImage: string;
};

type LaptopSceneProps = ProjectLaptopPreviewProps & {
  reducedMotion: boolean;
};

const MODEL_PATH = '/macbook_pro_2021.glb';

const sharpenTexture = (texture: Texture, anisotropy = 16) => {
  texture.anisotropy = anisotropy;
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
};

const Laptop = (props: LaptopSceneProps) => {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<Group | null>(null);
  const { size } = useThree();
  const model = useMemo(() => scene.clone(true), [scene]);

  const responsiveScale = useMemo(() => {
    const stableWidth = Math.round(size.width / 50) * 50;

    if (size.height >= 500) {
      return MathUtils.clamp(stableWidth / 72, 5.8, 10.6);
    }

    if (stableWidth < 480) {
      return MathUtils.clamp(stableWidth / 40, 8.3, 9.3);
    }

    if (stableWidth < 768) {
      return MathUtils.clamp(stableWidth / 52, 8.3, 10);
    }

    return MathUtils.clamp(stableWidth / 72, 5.8, 10.6);
  }, [size.height, size.width]);

  const responsiveY = useMemo(() => {
    return MathUtils.clamp(-0.42 + size.width / 5200, -0.36, -0.16);
  }, [size.width]);

  const { screenHost, screenMesh } = useMemo<{
    screenHost: Object3D | null;
    screenMesh: Mesh | null;
  }>(() => {
    let host: Object3D | null = null;
    let target: Mesh | null = null;

    const laptopBodyColor = new Color('#1A1A1E');

    model.traverse((node) => {
      if (node.name === 'Ecran_6') {
        host = node;
      }

      if (node instanceof Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;

        /**
         * Clone first so changes do not mutate the shared GLTF material.
         */
        if (node.material instanceof MeshStandardMaterial) {
          const material = node.material.clone();

          [
            material.map,
            material.emissiveMap,
            material.normalMap,
            material.roughnessMap,
            material.metalnessMap
          ].forEach((map) => {
            if (map) {
              sharpenTexture(map, 16);
            }
          });

          /**
           * Object_6 is using the MacBookPro material/texture set.
           * To force it to visually match the keyboard deck area,
           * remove the texture maps and use a flat dark material.
           */
          if (node.name === 'Object_6') {
            material.color = laptopBodyColor;
            material.emissive = new Color('#000000');
            material.emissiveIntensity = 0;

            material.map = null;
            material.emissiveMap = null;
            material.normalMap = null;
            material.roughnessMap = null;
            material.metalnessMap = null;

            material.metalness = 0.12;
            material.roughness = 0.68;
            material.envMapIntensity = 0.38;

            material.needsUpdate = true;
            node.material = material;
            return;
          }

          /**
           * Default laptop material styling for the rest of the model.
           */
          material.color = laptopBodyColor;
          material.emissive = new Color('#000000');
          material.emissiveIntensity = 0;
          material.metalness = 0.12;
          material.roughness = 0.68;
          material.envMapIntensity = 0.38;
          material.needsUpdate = true;

          node.material = material;
        }

        /**
         * Keep Object_6 out of this.
         * The screen texture is now applied through the portal plane below,
         * so we do not need to assign Object_6 as screenMesh.
         */
      }
    });

    return { screenHost: host, screenMesh: target };
  }, [model]);
  const texture = useTexture(props.screenImage);

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.flipY = true;
    texture.repeat.x = -1;
    texture.offset.x = 1;
    sharpenTexture(texture, 16);

    /**
     * screenMesh is intentionally optional now.
     * The visible project UI is handled by the createPortal plane,
     * so Object_6 can stay styled like the laptop body.
     */
    if (!screenMesh) return;

    const screenMaterial = new MeshStandardMaterial({
      color: new Color('#ffffff'),
      emissive: new Color('#06111d'),
      emissiveIntensity: 0.35,
      map: texture,
      metalness: 0.08,
      roughness: 0.18
    });

    screenMaterial.toneMapped = false;
    screenMesh.material = screenMaterial;
  }, [screenMesh, texture]);

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;
    const baseY = props.alternate ? -4.75 : 1.65;
    const targetY = props.reducedMotion ? baseY : baseY + pointer.x * 0.1;
    const targetX = props.reducedMotion ? 0.04 : 0.06 - pointer.y * 0.06;
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      5,
      delta
    );
    groupRef.current.rotation.x = MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      5,
      delta
    );
  });

  return (
    <group
      ref={groupRef}
      scale={responsiveScale}
      position={[0, responsiveY - 0.4, 0]}
    >
      <primitive object={model} />
      {screenHost
        ? createPortal(
            <mesh
              renderOrder={20}
              position={[0.014, 0.121, 0]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <planeGeometry args={[0.336, 0.213]} />
              <meshBasicMaterial
                map={texture}
                toneMapped={false}
                side={DoubleSide}
                transparent={false}
                opacity={1}
                depthTest={false}
                color="#ffffff"
              />
            </mesh>,
            screenHost
          )
        : null}
    </group>
  );
};

const Scene = (props: LaptopSceneProps) => (
  <>
    <ambientLight intensity={1.05} />

    <directionalLight position={[5, 7, 5]} intensity={1.35} />

    {/* Soft fill light aimed at the upper laptop/screen bezel area */}
    <directionalLight position={[0, 2.8, 4.5]} intensity={1.15} />

    {/* Gentle lower/front light to keep the keyboard deck balanced */}
    <pointLight position={[0, 1.2, 3.2]} intensity={0.35} distance={7} />

    <pointLight position={[-4, 3, 3]} intensity={0.2} color="#6ef1f5" />

    <Suspense
      fallback={
        <Html center>
          <span className="rounded-md border border-accent/30 bg-canvas/80 px-3 py-2 text-xs font-semibold text-accent">
            Loading model...
          </span>
        </Html>
      }
    >
      <Laptop {...props} />
      <Environment preset="city" />
    </Suspense>

    <OrbitControls
      enablePan={false}
      enableZoom={false}
      enableRotate={false}
      minPolarAngle={Math.PI / 3.4}
      maxPolarAngle={Math.PI / 2.05}
      minAzimuthAngle={-Math.PI / 4}
      maxAzimuthAngle={Math.PI / 4}
    />
  </>
);

export const ProjectLaptopPreview = (props: ProjectLaptopPreviewProps) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="relative h-[340px] w-full overflow-hidden sm:h-[420px] md:h-[520px] lg:h-[clamp(560px,46vw,720px)] xl:h-[clamp(600px,42vw,780px)]"
      aria-label={`${props.title} conceptual laptop preview`}
      role="img"
    >
      <div
        className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-accent/30 sm:inset-x-8 sm:bottom-10"
        aria-hidden
      />
      <Canvas
        resize={{ scroll: false }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={
          typeof window !== 'undefined'
            ? Math.min(window.devicePixelRatio, 4)
            : 2
        }
        camera={{ position: [0, 0.55, 5.3], fov: 42 }}
        frameloop={props.active ? 'always' : 'demand'}
        shadows
        className="bg-transparent"
      >
        <Scene {...props} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

useGLTF.preload(MODEL_PATH);
