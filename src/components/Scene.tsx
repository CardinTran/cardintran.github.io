import { useRef, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import { Water } from "three-stdlib";
extend({ Water });
import { useNormalizedGLTF } from "../hooks/useNormalizedGLTF";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { ISLANDS } from "../data/islands";
import { useTexture } from "@react-three/drei";

export default function Scene({
  selectedIndex,
  setSelectedIndex,
}: {
  selectedIndex: number | null;
  setSelectedIndex: (val: number | null) => void;
}) {
  const islandRef = useRef<THREE.Group>(null!);
  const island = useNormalizedGLTF("/models/CentralIsland.glb", 16);
  const [] = useState<string | null>(null);
  const defaultCamera = useRef(new THREE.Vector3(-4, 24, 50));
  const profileTexture = useTexture("/_DSC0139.JPEG");

  const ringRef = useRef<THREE.Group>(null!);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const previousX = useRef(0);

  // Gentle floating animation
  useFrame((state) => {
    islandRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.4 + 5;
  });

  const waterRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!waterRef.current) return;

    const time = state.clock.elapsedTime;
    const geometry = waterRef.current.geometry as THREE.PlaneGeometry;
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);

      position.setZ(
        i,
        Math.sin(x * 0.05 + time * 0.3) * 0.3 + Math.cos(y * 0.05 + time * 0.3) * 0.3
      );
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  useFrame(({ camera }) => {
    const basePosition = defaultCamera.current.clone();

    if (selectedIndex !== null) {
      const direction = basePosition.clone().normalize();

      const zoomAmount = selectedIndex === 0 ? -28 : -10;

      const zoomedPosition = basePosition.clone().add(direction.multiplyScalar(zoomAmount));

      zoomedPosition.y -= selectedIndex === 0 ? -3 : 9;

      camera.position.lerp(zoomedPosition, 0.08);
    } else {
      camera.position.lerp(basePosition, 0.08);
    }

    if (selectedIndex === 0) {
      camera.lookAt(0, 8, 0);
    } else {
      camera.lookAt(0, 3, 0);
    }
  });

  function HaloRing() {
    const groupRef = useRef<THREE.Group>(null!);
  
    const segmentCount = 60;
    const radius = 24;
  
    useFrame((state) => {
      if (!groupRef.current) return;
  
      groupRef.current.children.forEach((child, i) => {
        child.position.y =
          2.5 + Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.15;
      });
    });
  
    return (
      <group ref={groupRef}>
        {Array.from({ length: segmentCount }).map((_, i) => {
          const angle = (i / segmentCount) * Math.PI * 2;
  
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
  
          return (
            <mesh key={i} position={[x, 2.5, z]}>
              <icosahedronGeometry args={[1.2, 0]} />
              <meshStandardMaterial
                color="#a07a4f"
                roughness={0.95}
                metalness={0}
              />
            </mesh>
          );
        })}
      </group>
    );
  }

  function MiniIsland({
    islandModel,
    floatingModel,
    position,
    index,
    selectedIndex,
    setSelectedIndex,
  }: {
    id: string;
    islandModel: string;
    floatingModel: string;
    position: [number, number, number];
    index: number;
    selectedIndex: number | null;
    setSelectedIndex: (val: number | null) => void;
  }) {
    const island = useNormalizedGLTF(islandModel, 8);
    const floating = useNormalizedGLTF(floatingModel, 4);

    const rootRef = useRef<THREE.Group>(null!);
    const floatRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
      if (!rootRef.current || !floatRef.current) return;

      const baseY = position[1];
      const isSelected = selectedIndex === index + 1;

      let targetY = baseY;

      if (isSelected) {
        targetY += 2;
      }

      rootRef.current.position.y = THREE.MathUtils.lerp(rootRef.current.position.y, targetY, 0.25);

      const t = state.clock.elapsedTime;

      floatRef.current.position.y = 6 + Math.sin(t * 1.5) * 0.6;

      floatRef.current.rotation.y += 0.01;
    });

    return (
      <group
        ref={rootRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedIndex(index + 1);
        }}
      >
        <primitive object={island} />

        <group ref={floatRef} position={[0, 6, 0]} scale={0.75}>
          <primitive object={floating} />
        </group>
      </group>
    );
  }

  const ringRadius = 24;
  const ringHeight = 3;

  const ringIslands = ISLANDS.slice(1);

  const islandPositions = ringIslands.map((_, index) => {
    const angle = (index / ringIslands.length) * Math.PI * 2;

    const x = Math.cos(angle) * ringRadius;
    const z = Math.sin(angle) * ringRadius;

    return [x, ringHeight, z] as [number, number, number];
  });

  useFrame(() => {
    if (!isDragging.current && ringRef.current) {
      ringRef.current.rotation.y += velocity.current;
      velocity.current *= 0.75;
    }
  });

  useFrame(() => {
    if (
      selectedIndex === null ||
      selectedIndex === 0 ||
      !ringRef.current
    )
      return;

    const islandGroup = ringRef.current.children[selectedIndex - 1];
    if (!islandGroup) return;

    const worldPos = new THREE.Vector3();
    islandGroup.getWorldPosition(worldPos);

    const angle = Math.atan2(worldPos.x, worldPos.z);

    const desiredRotation = ringRef.current.rotation.y - angle - 0.07;

    ringRef.current.rotation.y = THREE.MathUtils.lerp(
      ringRef.current.rotation.y,
      desiredRotation,
      0.18
    );
  });

  return (
    <>
      <group
        onPointerMissed={() => {
          setSelectedIndex(null);
        }}
        onPointerDown={(e) => {
          isDragging.current = true;
          previousX.current = e.clientX;
        }}
        onPointerUp={() => {
          isDragging.current = false;
        }}
        onPointerMove={(e) => {
          if (!isDragging.current) return;

          const delta = e.clientX - previousX.current;
          previousX.current = e.clientX;

          if (ringRef.current) {
            ringRef.current.rotation.y += delta * 0.005;
          }
        }}
      >
        <color attach="background" args={["#f5c27c"]} />
        <Sky
          distance={450000}
          sunPosition={[0, 1, -30]}
          turbidity={8}
          rayleigh={2}
          mieCoefficient={0.01}
          mieDirectionalG={0.8}
        />
        <fog attach="fog" args={["#f5c27c", 60, 250]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[15, 20, -20]} intensity={2} color="#ffd7a8" />
        <group
          ref={islandRef}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIndex(0);
          }}
        >
          <primitive object={island} />

          <mesh position={[0, 8, 4]}>
            <planeGeometry args={[4, 4]} />
            <meshBasicMaterial map={profileTexture} transparent />
          </mesh>
        </group>
        <HaloRing />
        <group ref={ringRef}>
          {ringIslands.map((islandData, index) => (
            <MiniIsland
              key={islandData.id}
              id={islandData.id}
              islandModel={islandData.model}
              floatingModel={islandData.hoverModel}
              position={islandPositions[index]}
              index={index}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          ))}
        </group>
        <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
          <planeGeometry args={[5000, 5000, 128, 128]} />
          <meshStandardMaterial color="#4f9fd8" roughness={0.6} metalness={0.2} />
        </mesh>
        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.6} luminanceSmoothing={0.9} />
          <Vignette eskil={false} offset={0.1} darkness={0.6} />
        </EffectComposer>
      </group>
    </>
  );
}
