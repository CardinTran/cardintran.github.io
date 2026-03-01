// import { useGLTF } from "@react-three/drei";
// import { useMemo } from "react";
// import * as THREE from "three";

// export function useNormalizedGLTF(path: string, targetSize = 6) {
//   const { scene } = useGLTF(path);

//   return useMemo(() => {
//     const cloned = scene.clone(true);

//     const box = new THREE.Box3().setFromObject(cloned);
//     const size = new THREE.Vector3();
//     box.getSize(size);

//     // const maxAxis = Math.max(size.x, size.y, size.z);
//     // const scale = targetSize / maxAxis;
//     const scale = targetSize / size.y

//     cloned.scale.setScalar(scale);

//     const newBox = new THREE.Box3().setFromObject(cloned);
//     const center = new THREE.Vector3();
//     newBox.getCenter(center);
//     cloned.position.sub(center);

//     return cloned;
//   }, [scene, targetSize]);
// }


import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

export function useNormalizedGLTF(path: string, targetSize = 10) {
  const { scene } = useGLTF(path)

  const clone = scene.clone()

  const box = new THREE.Box3().setFromObject(clone)
  const size = box.getSize(new THREE.Vector3())

  // Scale
  const maxAxis = Math.max(size.x, size.y, size.z)
  const scale = targetSize / maxAxis
  clone.scale.setScalar(scale)

  // Recalculate after scaling
  const scaledBox = new THREE.Box3().setFromObject(clone)
  const scaledCenter = scaledBox.getCenter(new THREE.Vector3())

  // Center the object
  clone.position.sub(scaledCenter)

  return clone
}