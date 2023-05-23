import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
// https://github.com/pmndrs/drei
import { useGLTF, Detailed, Environment } from '@react-three/drei'
// https://github.com/pmndrs/react-postprocessing
// https://github.com/vanruesc/postprocessing
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'

/**
 * 3D model is free, commercial-able
 * "PUMPING HEART MODEL" (https://skfb.ly/6RIR7) by omarelone is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
 * changes were made that is creating 3 version of the model (high vertices, medium and low) and also add material color
 * @param param0 
 * @returns 
 */
function Love({ index, z, speed } : any) {
  const ref : any = useRef()
  // useThree gives you access to the R3F state model
  const { viewport, camera } = useThree()
  // getCurrentViewport is a helper that calculates the size of the viewport
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
  // useGLTF is an abstraction around R3F's useLoader(GLTFLoader, url)
  // It can automatically handle draco and meshopt-compressed assets without you having to
  // worry about binaries and such ...
  // const { nodes, materials } : any = useGLTF('/banana-v1-transformed.glb')
  const { scene, nodes, materials } : any = useGLTF('/love-pump.glb')
  // By the time we're here the model is loaded, this is possible through React suspense
  // Local component state, it is safe to mutate because it's fixed data
  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(2),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  })

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
    // Rotate the object around
    ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
    // If they're too far up, set them back to the bottom
    if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
  })
  console.log("CEK", nodes)
  // Using drei's detailed is a nice trick to reduce the vertex count because (if only the model provide low/high vertex version!)
  // we don't need high resolution for objects in the distance. The model contains 3 decimated meshes ...
  return (
    // @ts-ignore
    <Detailed ref={ref} distances={[0, 65, 80]}>
      {
        ['', '001', '002'].map(idx => (
          <group key={idx} ref={ref} scale={0.1}>
            <mesh geometry={nodes[`BASE_HEART_Material_#41_0${idx}`].geometry} material={materials['Material_41']}  />
          </group>
        ))
      }
    </Detailed>
  )
}

export default function Loves({ speed = 1, count = 50, depth = 80, easing = (x : number) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
  return (
    // No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}>

      <Perf position="bottom-left"/>
      <color attach="background" args={['#fc8e86']} />
      <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color="orange" />
      {/* Using cubic easing here to spread out objects a little more interestingly, i wanted a sole big object up front ... */}
      {Array.from({ length: count }, (_, i) => <Love key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */)}
      <Environment preset="sunset" />
      {/* Multisampling (MSAA) is WebGL2 antialeasing, we don't need it (faster) */}
      <EffectComposer multisampling={0}>
        <DepthOfField target={[0, 0, 60]} focalLength={0.4} bokehScale={7} height={700} />
      </EffectComposer>
    </Canvas>
  )
}
