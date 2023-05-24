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

const speed = 1.5;

// Key must match the value of `/profile-backgrounds/${key}/object.glb`
const layouts : any = {
  "bananas": {
    speed: speed,
    scale: 1,
    color: "#ffbf40"
  },
  "stars": {
    speed: speed,
    scale: 0.04,
    color: "#ae4cdb"
  },
  "hearts": {
    speed: speed,
    scale: 0.05,
    color: "#b94949"
  },
  "skulls"  : {
    speed: speed,
    scale: 0.35,
    color: "#303030"
  },
  "bullets" : {
    speed: speed,
    scale: 1.6,
    color: "#223122"
  },
  "robots" : {
    speed: speed,
    scale: 0.6,
    color: "#ffbf40"
  }

}

export function Floating3D2( props : componentOverlayProps) {

  const { name, picture, profile, subtitle } = props
  const [selectedValue, setSelectedValue] = useState('skulls');

  function changeBackground(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value)
  }

  const { speed, scale, color } = layouts[selectedValue]

  return (
    <>
      
      <Suspense fallback={null}>
        <Layout 
          objectName={selectedValue}
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
    </>
  )
}