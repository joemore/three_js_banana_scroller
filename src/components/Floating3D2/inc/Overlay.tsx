
import { componentOverlayProps } from '..'
import Radio from './Radio'


export default function Overlay( props : componentOverlayProps) {
  const { name, picture, profile, subtitle, onChangeBackground } = props
  return (
    <div className='absolute top-0 left-0 w-full h-full z-10 text-white' style={{
      textShadow: '1px 1px 1px rgba(0,0,0,0.9)'
    }}>


      {/* Top Nav Bar */}
      <nav className='flex pt-2 px-2 md:px-6 items-center mb-6'>
        {/* Name and subtitle */}
        <div className='flex-1'>
          <h1 className='text-2xl md:text-4xl lg:text-7xl font-extrabold'>
            {name}
          </h1>
        </div>
        {/* Profile Picture and Menu */}
        <div className='flex gap-x-2 md:gap-x-6 items-center'>
          {/* <div>
            <Bars3Icon className='h-12 w-12 text-black hover:text-sky-500 cursor-pointer' />
          </div> */}
          <div>
            <img 
              src={picture}
              className='h-16 w-16 md:w-24 md:h-24 rounded-full border-2 md:border-4 border-white shadow-md'
              alt="Profile Image"
            />
          </div>
        </div>
      </nav>
      
      <div className="absolute right-2 top-1/2">
        <Radio onChangeBackground={onChangeBackground}/>
      </div>

      {/* Subtitle & Profile */}
      <div className='px-2 md:px-6'>
        <p className='text-lg md:text-2xl font-bold mb-3'>{subtitle}</p>
        <div className='text-base md:text-lg'>
          {profile}
        </div>
      </div>    


      {/* Footer */}
      <footer className='absolute bottom-0 left-0 right-0 w-full'>
        <div className='p-4 md:p-6 text-center text-base'>
          Page created by {' '}<a href="https://www.joemore.com" className='underline animate-pulse'>joemore.com</a>
        </div>
      </footer>
      

      
    </div>
  )
}