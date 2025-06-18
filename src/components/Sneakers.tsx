// import * as THREE from 'three'
// import { useEffect, useRef, type Dispatch, type JSX, type SetStateAction } from 'react'
// import { useGLTF } from '@react-three/drei'
// import type { GLTF } from 'three-stdlib'
// import { useFrame } from '@react-three/fiber'

// type GLTFResult = GLTF & {
//   nodes: {
//     Object_35: THREE.Mesh
//     Object_59: THREE.Mesh
//     Object_14: THREE.Mesh
//     Object_16: THREE.Mesh
//     Object_19: THREE.Mesh
//     Object_22: THREE.Mesh
//     laces: THREE.Mesh
//     Object_26: THREE.Mesh
//     Object_29: THREE.Mesh
//     Object_35001: THREE.Mesh
//     secondaryBase: THREE.Mesh
//     base: THREE.Mesh
//     Object_5: THREE.Mesh
//     Object_8: THREE.Mesh
//     Object_56: THREE.Mesh
//     Object_59001: THREE.Mesh
//     sole: THREE.Mesh
//     Object_65: THREE.Mesh
//     Object_68: THREE.Mesh
//   }
//   materials: {
//     ['Fabric_Straight_Mat.005']: THREE.MeshStandardMaterial
//     ['Plastic_Mat.001']: THREE.MeshStandardMaterial
//     ['Basement_SoftGrain_Mat.001']: THREE.MeshStandardMaterial
//     ['Basement_Point_Mat.001']: THREE.MeshStandardMaterial
//     ['Basement_Middle_Mat.001']: THREE.MeshStandardMaterial
//     ['Fabric_Square_Mat.001']: THREE.MeshStandardMaterial
//     lacesMaterial: THREE.MeshStandardMaterial
//     ['Fabric_Cross_Mat.001']: THREE.MeshStandardMaterial
//     ['Fabric_Straight_Mat.001']: THREE.MeshStandardMaterial
//     ['Fabric_Straight_Mat.003']: THREE.MeshStandardMaterial
//     secondaryBaseMaterial: THREE.MeshStandardMaterial
//     baseMaterial: THREE.MeshStandardMaterial
//     ['Material.003']: THREE.MeshPhysicalMaterial
//     ['ARROW.001']: THREE.MeshStandardMaterial
//     ['Plastic_Mat.005']: THREE.MeshStandardMaterial
//     ['Plastic_Mat.006']: THREE.MeshStandardMaterial
//     soleMaterial: THREE.MeshStandardMaterial
//     ['Stitches_Mat.002']: THREE.MeshStandardMaterial
//     ['Text_Mat.001']: THREE.MeshStandardMaterial
//   }
// }

// type SneakerProps = {
//   colors: Record<'base' | 'sole' | 'secondaryBase', THREE.Color> | null
//   selectedPart: 'base' | 'sole' | 'secondaryBase'
//   setSelectedPart: (part: 'base' | 'sole' | 'secondaryBase') => void,
//   setColors: Dispatch<SetStateAction<Record<"base" | "sole" | "secondaryBase", THREE.Color> | null>>
// } & JSX.IntrinsicElements['group']

// export function Sneaker(props: SneakerProps) {

//   const groupRef = useRef<THREE.Group>(null)

//   const { nodes, materials } = useGLTF('/models/dior_b44.glb') as unknown as GLTFResult

//   useEffect(() => {
//         if(props.setColors){
//             props.setColors({
//                 base: materials.baseMaterial.color.clone(),
//                 sole: materials.soleMaterial.color.clone(),
//                 secondaryBase: materials.secondaryBaseMaterial.color.clone(),
//             })
//         }
//     }, [])

//     if(props.colors){
//         materials.baseMaterial.color = props.colors.base
//         materials.soleMaterial.color = props.colors.sole
//         materials.secondaryBaseMaterial.color = props.colors.secondaryBase
//     }

//     useFrame(() => {
//       if(groupRef.current){
//         groupRef.current.rotation.y += 0.01
//       }
//     })

//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         name="Object_35"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_35.geometry}
//         material={materials['Fabric_Straight_Mat.005']}
//       />
//       <mesh
//         name="Object_59"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_59.geometry}
//         material={materials['Plastic_Mat.001']}
//       />
//       <mesh
//         name="Object_14"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_14.geometry}
//         material={materials['Basement_SoftGrain_Mat.001']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_16"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_16.geometry}
//         material={materials['Basement_Point_Mat.001']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_19"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_19.geometry}
//         material={materials['Basement_Middle_Mat.001']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_22"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_22.geometry}
//         material={materials['Fabric_Square_Mat.001']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="laces"
//         castShadow
//         receiveShadow
//         geometry={nodes.laces.geometry}
//         material={materials.lacesMaterial}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_26"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_26.geometry}
//         material={materials['Fabric_Cross_Mat.001']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_29"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_29.geometry}
//         material={materials['Fabric_Straight_Mat.001']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_35001"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_35001.geometry}
//         material={materials['Fabric_Straight_Mat.003']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         onClick={(e) => {
//           e.stopPropagation()
//           props.setSelectedPart('secondaryBase')
//         }}
//         name="secondaryBase"
//         castShadow
//         receiveShadow
//         geometry={nodes.secondaryBase.geometry}
//         material={materials.secondaryBaseMaterial}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         onClick={(e) => {
//           e.stopPropagation()
//           props.setSelectedPart('base')
//         }}
//         name="base"
//         castShadow
//         receiveShadow
//         geometry={nodes.base.geometry}
//         material={materials.baseMaterial}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_5"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_5.geometry}
//         material={materials['Material.003']}
//         position={[-4.176, 3.323, 4.217]}
//         rotation={[1.347, -0.391, -0.039]}
//         scale={0.06}
//       />
//       <mesh
//         name="Object_8"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_8.geometry}
//         material={materials['ARROW.001']}
//         position={[9.35, 3.347, -1.894]}
//         rotation={[-1.17, -0.036, 2.986]}
//         scale={-0.928}
//       />
//       <mesh
//         name="Object_56"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_56.geometry}
//         material={materials['Plastic_Mat.005']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_59001"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_59001.geometry}
//         material={materials['Plastic_Mat.006']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         onClick={(e) => {
//           e.stopPropagation()
//           props.setSelectedPart('sole')
//         }}
//         name="sole"
//         castShadow
//         receiveShadow
//         geometry={nodes.sole.geometry}
//         material={materials.soleMaterial}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_65"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_65.geometry}
//         material={materials['Stitches_Mat.002']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//       <mesh
//         name="Object_68"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_68.geometry}
//         material={materials['Text_Mat.001']}
//         position={[1.473, -0.016, 0.911]}
//         scale={15.133}
//       />
//     </group>
//   )
// }

// useGLTF.preload('/dior_b44.glb')

// import * as THREE from 'three'
// import { useEffect, useRef, type Dispatch, type JSX, type SetStateAction } from 'react'
// import { useGLTF } from '@react-three/drei'
// import type { GLTF } from 'three-stdlib'
// import { useFrame } from '@react-three/fiber'

// type GLTFResult = GLTF & {
//   nodes: {
//     Object_164: THREE.Mesh
//     sole: THREE.Mesh
//     Object_16: THREE.Mesh
//     Object_26: THREE.Mesh
//     Object_92: THREE.Mesh
//     Object_263: THREE.Mesh
//     secondaryBase: THREE.Mesh
//     Object: THREE.Mesh
//     Mesh_8: THREE.Mesh
//     Mesh_8_1: THREE.Mesh
//     Object_305: THREE.Mesh
//     Object_313: THREE.Mesh
//     base: THREE.Mesh
//   }
//   materials: {
//     Default_Topstitch_2348: THREE.MeshPhysicalMaterial
//     ['soleMaterial.001']: THREE.MeshPhysicalMaterial
//     ['Default_Topstitch_2348.001']: THREE.MeshPhysicalMaterial
//     ['Topstitch_1_1860109.001']: THREE.MeshPhysicalMaterial
//     ['secondaryBaseMaterial.001']: THREE.MeshPhysicalMaterial
//     ['Cotton_Twill_1680397.004']: THREE.MeshPhysicalMaterial
//     ['Cotton_Twill_1680397.006']: THREE.MeshPhysicalMaterial
//     ['Cotton_Twill_1680397.005']: THREE.MeshPhysicalMaterial
//     ['Cotton_Twill_1463669.001']: THREE.MeshPhysicalMaterial
//     ['Cotton_Twill_1680397.007']: THREE.MeshPhysicalMaterial
//     ['baseMaterial.001']: THREE.MeshPhysicalMaterial
//   }
// }

// type SneakerProps = {
//   colors: Record<'base' | 'sole' | 'secondaryBase', THREE.Color> | null
//   selectedPart: 'base' | 'sole' | 'secondaryBase'
//   setSelectedPart: (part: 'base' | 'sole' | 'secondaryBase') => void,
//   setColors: Dispatch<SetStateAction<Record<"base" | "sole" | "secondaryBase", THREE.Color> | null>>
// } & JSX.IntrinsicElements['group']


// export function Sneaker(props: SneakerProps) {
//   const { nodes, materials } = useGLTF('/models/nikeDRACO.glb') as unknown as GLTFResult

//   const groupRef = useRef<THREE.Group>(null)

//   useEffect(() => {
//         if(props.setColors){
//             props.setColors({
//                 base: materials['baseMaterial.001'].color.clone(),
//                 sole: materials['soleMaterial.001'].color.clone(),
//                 secondaryBase: materials['secondaryBaseMaterial.001'].color.clone()
//             })
//         }
//     }, [])

//     if(props.colors){
//         materials['baseMaterial.001'].color = props.colors.base
//         materials['soleMaterial.001'].color = props.colors.sole
//         materials['secondaryBaseMaterial.001'].color = props.colors.secondaryBase
//     }

//     useFrame(() => {
//       if(groupRef.current){
//         groupRef.current.rotation.y += 0.01
//       }
//     })

//   return (
//     <group ref={groupRef} {...props} dispose={null} scale={0.3}>
//       <mesh
//         name="Object_164"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_164.geometry}
//         material={materials.Default_Topstitch_2348}
//       />
//       <mesh
//         onClick={(e) => {
//           e.stopPropagation()
//           props.setSelectedPart('sole')
//         }}
//         name="sole"
//         castShadow
//         receiveShadow
//         geometry={nodes.sole.geometry}
//         material={materials['soleMaterial.001']}
//         scale={40.342}
//       />
//       <mesh
//         name="Object_16"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_16.geometry}
//         material={materials['soleMaterial.001']}
//         scale={40.342}
//       />
//       <mesh
//         name="Object_26"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_26.geometry}
//         material={materials['Default_Topstitch_2348.001']}
//         scale={40.342}
//       />
//       <mesh
//         name="Object_92"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_92.geometry}
//         material={materials['Topstitch_1_1860109.001']}
//         scale={40.342}
//       />
//       <mesh
//         name="Object_263"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_263.geometry}
//         material={materials['secondaryBaseMaterial.001']}
//         scale={40.342}
//       />
//       <mesh
//         onClick={(e) => {
//           e.stopPropagation()
//           props.setSelectedPart('secondaryBase')
//         }}
//         name="secondaryBase"
//         castShadow
//         receiveShadow
//         geometry={nodes.secondaryBase.geometry}
//         material={materials['secondaryBaseMaterial.001']}
//         scale={40.342}
//       />
//       <mesh
//         name="Object"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object.geometry}
//         material={materials['Cotton_Twill_1680397.004']}
//         scale={40.342}
//       />
//       <mesh
//         name="Mesh_8"
//         castShadow
//         receiveShadow
//         geometry={nodes.Mesh_8.geometry}
//         material={materials['Cotton_Twill_1680397.006']}
//         scale={40.342}
//       />
//       <mesh
//         name="Mesh_8_1"
//         castShadow
//         receiveShadow
//         geometry={nodes.Mesh_8_1.geometry}
//         material={materials['Cotton_Twill_1680397.005']}
//         scale={40.342}
//       />
//       <mesh
//         name="Object_305"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_305.geometry}
//         material={materials['Cotton_Twill_1463669.001']}
//         scale={40.342}
//       />
//       <mesh
//         name="Object_313"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_313.geometry}
//         material={materials['Cotton_Twill_1680397.007']}
//         scale={40.342}
//       />
//       <mesh
          // onClick={(e) => {
          //   e.stopPropagation()
          //   props.setSelectedPart('base')
          // }}
//         name="base"
//         castShadow
//         receiveShadow
//         geometry={nodes.base.geometry}
//         material={materials['baseMaterial.001']}
//         scale={40.342}
//       />
//     </group>
//   )
// }

// useGLTF.preload('/nikeDRACO.glb')

import * as THREE from 'three'
import { useEffect, useMemo, useRef, type Dispatch, type JSX, type SetStateAction } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const partNames = ['base', 'secondaryBase', 'sole'] as const
type Part = typeof partNames[number]

type SneakerProps = {
  modelUrl: string
  colors: Record<Part, THREE.Color> | null
  selectedPart: Part
  setSelectedPart: (part: Part) => void
  setColors: Dispatch<SetStateAction<Record<Part, THREE.Color> | null>>
} & JSX.IntrinsicElements['group']

export function Sneaker(props: SneakerProps) {
  const { scene } = useGLTF(props.modelUrl)
  
  const localScene = useMemo(() => scene.clone(true), [scene])

  const groupRef = useRef<THREE.Group>(null)

  const parts = useMemo(() => {
    const result = {} as Record<Part, THREE.Mesh>
    partNames.forEach(part => {
      const mesh = localScene.getObjectByName(part)
      if (mesh && mesh instanceof THREE.Mesh) {
        result[part] = mesh
      }
    })
    return result
  }, [localScene])

  const otherMeshes = useMemo(() => {
    return localScene.children.filter(obj =>
      obj instanceof THREE.Mesh && !partNames.includes(obj.name as Part)
    ) as THREE.Mesh[]
  }, [localScene])

  useEffect(() => {
    if (!groupRef.current) return

    const box = new THREE.Box3().setFromObject(groupRef.current)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)

    const maxAxis = Math.max(size.x, size.y, size.z)
    const scale = 4 / maxAxis

    groupRef.current.scale.setScalar(scale)
  }, [parts, otherMeshes])

  useEffect(() => {
    const initial: Record<Part, THREE.Color> = {
      base: (parts.base?.material as THREE.MeshStandardMaterial)?.color?.clone?.() || new THREE.Color(),
      sole: (parts.sole?.material as THREE.MeshStandardMaterial)?.color?.clone?.() || new THREE.Color(),
      secondaryBase: (parts.secondaryBase?.material as THREE.MeshStandardMaterial)?.color?.clone?.() || new THREE.Color()
    }
    props.setColors(initial)
  }, [parts])

  useEffect(() => {
    if (props.colors) {
      for (const part of partNames) {
        const mesh = parts[part]
        if (mesh && mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color = props.colors[part]
        }
      }
    }
  }, [props.colors])

  useFrame(() => {
    if(groupRef.current){
      groupRef.current.rotation.y += 0.01
    }
  })
    
  return ( 
    <group {...props} ref={groupRef} >
      {Object.entries(parts).map(([name, mesh]) => (
        <primitive 
          key={name}
          object={mesh}
          onClick={(e: Event) => {
            e.stopPropagation()
            props.setSelectedPart(name as Part)
          }}
        />
      ))}
      {otherMeshes.map((mesh, i) => (
        <primitive
          key={`other-${i}`}
          object={mesh}
        />
      ))}
    </group>
  )
}