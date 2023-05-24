import { Suspense, useState } from 'react'
import Overlay from './inc/Overlay'
import Layout from './inc/Layout'


export interface componentOverlayProps {
  name : string
  picture : string
  profile : string
  subtitle: string
  onChangeBackground : (e: React.ChangeEvent<HTMLInputElement>) => void
} 

const layouts : any = {
  "bananas": {
    GLTFSrc: "/banana-v1-transformed.glb",
    speed: 1,
    scale: 1,
    color: "#ffbf40"
  },
  "stars": {
    GLTFSrc: "/stars.glb",
    speed: 0.5,
    scale: 0.05,
    color: "#ae4cdb"
  },
  "hearts": {
    GLTFSrc: "/love-pump.glb",
    speed: 0.7,
    scale: 0.05,
    color: "#b94949"
  },
  "skulls"  : {
    GLTFSrc: "/puppet_skull.glb",
    speed: 0.5,
    scale: 0.4,
    color: "#303030"
  },
  "bullets" : {
    GLTFSrc: "/bullet.gltf",
    speed: 0.5,
    scale: 2,
    color: "#223122"
  },
  "robots" : {
    GLTFSrc: "/robot.glb",
    speed: 0.5,
    scale: 0.8,
    color: "#ffbf40"
  }

}

export function Floating3D2( props : componentOverlayProps) {

  const { name, picture, profile, subtitle } = props
  const [selectedValue, setSelectedValue] = useState('skulls');

  function changeBackground(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value)
  }

  
  const { GLTFSrc, speed, scale, color } = layouts[selectedValue]

  return (
    <>
      
      <Suspense fallback={null}>
        <Layout 
          GLTFSrc={GLTFSrc}
          speed={speed}
          color={color}
          scale={scale}
        />
      </Suspense>
      <Overlay 
        name={name}
        picture={picture}
        profile={profile}
        subtitle={subtitle}
        onChangeBackground={changeBackground}
      />

      {/* Speed Adjust bar */}
      {/* <div className='absolute right-6 top-1/2 z-20' style={{transform: `rotate(90deg) translate3d(50%, 0, 0)`,transformOrigin: `100% 50%`}}>
        <input type="range" min="0" max="10" value={speed} step="1" onChange={(e : any) => set(e.target.value)} />
      </div> */}
    </>
  )
}