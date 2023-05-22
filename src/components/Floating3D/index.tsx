import { Suspense } from 'react'
import Overlay from './inc/Overlay'



import Bananas from './inc/Bananas'

export interface componentOverlayProps {
  name : string
  picture : string
  profile : string
  subtitle: string
} 

export function Floating3D( props : componentOverlayProps) {
  // const [speed, set] = useState(2)
  const { name, picture, profile, subtitle } = props
  return (
    <>

      

      <Suspense fallback={null}>
        
        <Bananas />
        {/* <FadeIn /> */}
      </Suspense>
      <Overlay 
        name={name}
        picture={picture}
        profile={profile}
        subtitle={subtitle}
      />

      {/* Speed Adjust bar */}
      {/* <div className='absolute right-6 top-1/2 z-20' style={{transform: `rotate(90deg) translate3d(50%, 0, 0)`,transformOrigin: `100% 50%`}}>
        <input type="range" min="0" max="10" value={speed} step="1" onChange={(e : any) => set(e.target.value)} />
      </div> */}
    </>
  )
}