import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Floating3D, componentOverlayProps } from '../components/Floating3D'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { name, picture, profile, subtitle }: componentOverlayProps = {
    name: "Joe Gilmore",
    picture: "/profile-image.jpg",
    subtitle: "This is my webpage...",
    profile: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed euismod, nisl quis tincidunt aliquam, nunc nisl ultricies nunc, nec ultricies nisl nunc nec nisl.`,
  }
  return <div className="fixed top-0 bottom-0 left-0 right-0 z-10">
		<Floating3D
			name={name}
			picture={picture}
			profile={profile}
      subtitle={subtitle}
		/>
	</div> 
}
