import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Sneaker } from '../Sneakers'
import { useState, type FC } from 'react'
import * as THREE from 'three'
import { SketchPicker } from 'react-color'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../utils/supabase'
import LoadingScreen from '../../pages/Loading/LoadingScreen'
import background from '../../assets/images/environment.jpg'
// import { productsList } from '../../constants/mochSneakersData'

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

    const getModelUrl = async() => {
      const { data, error } = await supabase.from('products')
        .select("model_url")
        .eq("id", +id!)
        .single()
      
        if(error){
          console.log(error)
        }

        if(data){
          console.log(data.model_url)

          const { data: urlData } = await supabase.storage
            .from('models')
            .createSignedUrl(data.model_url, 300);

          console.log('public url of model: ' + urlData?.signedUrl)

          return urlData?.signedUrl ?? null;
        }
    }

    const { data, isLoading, isError } = useQuery({
      queryKey: ['customProduct', id],
      queryFn: () => getModelUrl(),
      staleTime: 1000 * 60 * 5
    })

    if(isError){
      console.log('error while requesting model url')
    }

    if(isLoading){
      return <LoadingScreen />
    }

    return (
      <>
        <Canvas
          gl={{ powerPreference: 'high-performance' }}

          scene={{
            background: useLoader(THREE.TextureLoader, background),
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

          <Sneaker modelUrl={data!} selectedPart={selectedPart} setSelectedPart={setSelectedPart} setColors={setColors} colors={colors} />

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