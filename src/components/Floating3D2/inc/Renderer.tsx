import { MathUtils, Mesh, Object3D } from 'three'
import { useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
// https://github.com/pmndrs/drei
import { useGLTF, Detailed } from '@react-three/drei'

interface iRendererProps {
	index: number
	z: number
	speed: number
	scale: number
	objectName: string
}

export function Renderer( props : iRendererProps) {
	const { index, z, speed, scale, objectName } = props

  const GLTFSrc = `/profile-backgrounds/${objectName}/object.glb`;
	
  const ref : any = useRef()
  // useThree gives you access to the R3F state model
  const { viewport, camera } = useThree()
  // getCurrentViewport is a helper that calculates the size of the viewport
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
  // useGLTF is an abstraction around R3F's useLoader(GLTFLoader, url)
  // It can automatically handle draco and meshopt-compressed assets without you having to
  // worry about binaries and such ...
  const { nodes, materials } : any = useGLTF( GLTFSrc )
  // By the time we're here the model is loaded, this is possible through React suspense

  // Local component state, it is safe to mutate because it's fixed data
  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: MathUtils.randFloatSpread(2),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: MathUtils.randFloat(8, 12),
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

	const RenderNodes : any = () => {
    switch (objectName) {
      case "bananas":
        return ['banana_high', 'banana_mid', 'banana_low'].map(idx => (
					<group key={idx} ref={ref} scale={scale}>
						<mesh geometry={nodes[`${idx}`].geometry} material={materials[`skin`]} material-emissive="#ff9f00" />
					</group>
				))
			case "bullets":
				return ['', '001', '002'].map(idx => (
					<group key={idx} ref={ref} scale={scale}>
						<mesh geometry={nodes[`v${idx}`].geometry} material={materials['bullet']}  />
					</group>
				))
			case "skulls":
				return ['', '001', '002'].map(idx => (
          <group key={idx} ref={ref} scale={scale}>
            <mesh geometry={nodes[`pCube2_lambert2_0${idx}`].geometry} material={materials['lambert2']}  />
            <mesh geometry={nodes[`pCube2_lambert3_0${idx}`].geometry} material={materials['lambert3']}  />
          </group>
        ))
			case "hearts" : 
				return ['', '001', '002'].map(idx => (
					<group key={idx} ref={ref} scale={scale}>
						<mesh geometry={nodes[`BASE_HEART_Material_#41_0${idx}`].geometry} material={materials['Material_41']}  />
					</group>
				))
			case "stars":
				return ['', '001', '002'].map(idx => (
          <group key={idx} ref={ref} scale={scale}>
            <mesh geometry={nodes[`Star_Gold_0${idx}`].geometry} material={materials['Gold']}  />
          </group>
        ))
			case "robots":
				return ['', '001', '002'].map(idx => (
          <group key={idx} ref={ref} scale={scale}>
            {
              nodes[`GLTF_SceneRootNode${idx}`].children.map((gsr: Object3D, idxn: number) => (
                <group
                  key={idxn}
                  position={gsr.position}
                  scale={gsr.scale}
                  rotation={gsr.rotation}
                >
                  { gsr.children[0] instanceof Mesh ?
                    <mesh geometry={gsr.children[0].geometry} material={gsr.children[0].material}  />
                    : <></>
                  }
                </group>

              ))
            }</group>
        ))
			default: 
				return [1,2,3].map(idx => (
					<mesh key={idx} material-emissive={`#${idx}${idx}${idx}`} />
				))
    }
  }

  // Using drei's detailed is a nice trick to reduce the vertex count because
  // we don't need high resolution for objects in the distance. The model contains 3 decimated meshes ...
  return (
		// @ts-ignore
    <Detailed ref={ref} distances={[0, 65, 80]}>
			<RenderNodes/>
    </Detailed>
  )
}