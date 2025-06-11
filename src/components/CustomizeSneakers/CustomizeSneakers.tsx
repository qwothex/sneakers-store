import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Sneaker } from '../Sneakers'
import { useEffect, useRef, useState, type FC } from 'react'
import * as THREE from 'three'
import { SketchPicker } from 'react-color'
import { useParams } from 'react-router'
import { productsList } from '../../constants/mochSneakersData'

const CustomizeSneakers:FC = () => {

    const {id} = useParams()

    const [selectedPart, setSelectedPart] = useState<'sole' | 'base' | 'secondaryBase'>('base')

    const [colors, setColors] = useState<Record<'sole' | 'base' | 'secondaryBase', THREE.Color> | null>(null)


    // const DirectionalLightWithHelper = () => {
    //   const lightRef = useRef<THREE.DirectionalLight>(null)
    //   const { scene } = useThree()

    //   useEffect(() => {
    //     if (!lightRef.current) return

    //     const helper = new THREE.DirectionalLightHelper(lightRef.current, 1, 'red')
    //     scene.add(helper)

    //     return () => {
    //       scene.remove(helper)
    //       helper.dispose?.()
    //     }
    //   }, [scene])

    //   return (
    //     <directionalLight
    //       ref={lightRef}
    //       position={[0, 1, 3]}
    //       intensity={2}
    //       castShadow
    //     />
    //   )
    // }

    return (
      <>
        <Canvas
          gl={{ powerPreference: 'high-performance' }}

          scene={{
            background: useLoader(THREE.TextureLoader, '/src/assets/environment.jpg'),
          }}

          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
          }}
        >

          <PerspectiveCamera makeDefault fov={75} position={[0,1,5]} near={0.1} far={100} />

          <ambientLight intensity={0.5} />

          <directionalLight position={[0, 1, 3]} intensity={2} />
          {/* <DirectionalLightWithHelper /> */}

          <Sneaker modelUrl={productsList[+id! - 1].modelUrl} selectedPart={selectedPart} setSelectedPart={setSelectedPart} setColors={setColors} colors={colors} />
          <mesh position={[0,-3,0]}>
          <boxGeometry args={[4,5,4]} />
          <meshStandardMaterial />
          </mesh>

          <OrbitControls />

        </Canvas>

        <div style={{
          position: 'absolute', right: '5%'
        }}>
          { colors && <SketchPicker 
            color={colors[selectedPart].getStyle()} 
            onChange={(updated) => {
              const newColor = new THREE.Color(updated.hex)
              setColors((prev) => ({...prev!, [selectedPart]: newColor}))
            }} 
          />}
        </div>
      </>
    )
}

export default CustomizeSneakers