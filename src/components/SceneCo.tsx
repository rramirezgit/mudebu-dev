/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';

export function Model(props: any) {
  const { nodes, materials } = useGLTF('/sceneCo.gltf');
  return (
    <group {...props} dispose={null}>
      <mesh
        // @ts-ignore
        geometry={nodes.Object_4.geometry}
        material={materials['Material.001']}
        position={[-0.015, 0.017, -0.006]}
        scale={0.652}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_6.geometry}
        material={materials['Material.005']}
        position={[0, 1.825, 0]}
        scale={0.559}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_8.geometry}
        material={materials['Material.004']}
        position={[-0.015, 0.017, -0.006]}
        scale={0.652}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_10.geometry}
        material={materials['Material.003']}
        position={[-0.015, 0.017, -0.006]}
        scale={0.652}
      />
    </group>
  );
}

useGLTF.preload('/sceneCo.gltf');
