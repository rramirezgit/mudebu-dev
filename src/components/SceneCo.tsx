/* eslint-disable react/no-unknown-property */

import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props: any) {
  const { nodes, materials } = useGLTF('/sceneCo-transformed.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        // @ts-ignore
        geometry={nodes.Object_4.geometry}
        material={materials['Sofa_Jaspa.1A_Upholstry.001']}
        position={[-1.367, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 0.805, 1]}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_5.geometry}
        material={materials['Sofa_Jaspa.1A_Timber.001']}
        position={[-1.367, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 0.805, 1]}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_7.geometry}
        material={materials['Sofa_Jaspa.1B_Upholstry.001']}
        position={[1.835, 0, -0.173]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 0.805, 1]}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_8.geometry}
        material={materials['Sofa_Jaspa.1B_Timber.001']}
        position={[1.835, 0, -0.173]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 0.805, 1]}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_10.geometry}
        material={materials['Sofa_Jaspa.Chair.A_Upholstry.001']}
        position={[-1.545, 0, -1.246]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.508, 0.805, 1]}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_11.geometry}
        material={materials['Sofa_Jaspa.Chair.A_Timber.001']}
        position={[-1.545, 0, -1.246]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.508, 0.805, 1]}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_13.geometry}
        material={materials['Sofa_Jaspa.Futton.A_Upholstry.001']}
        position={[1.068, 0, -1.243]}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_14.geometry}
        material={materials['Sofa_Jaspa.Futton.A_Timber.001']}
        position={[1.068, 0, -1.243]}
      />
      <mesh
        // @ts-ignore
        geometry={nodes.Object_16.geometry}
        material={materials.Table_Coffee_Oval}
        position={[-0.58, 0, -0.73]}
      />
    </group>
  );
}

useGLTF.preload('/sceneCo-transformed.glb');
