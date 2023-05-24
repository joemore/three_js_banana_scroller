import { Inter } from 'next/font/google'
import { Floating3D2, componentOverlayProps } from '../components/Floating3D2'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { name, picture, profile, subtitle, onChangeBackground }: componentOverlayProps = {
    name: "Joe Gilmore",
    picture: "/profile-image.jpg",
    subtitle: "This is my webpage...",
    profile: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed euismod, nisl quis tincidunt aliquam, nunc nisl ultricies nunc, nec ultricies nisl nunc nec nisl.`,
    onChangeBackground: () => {return}
  }
  return <div className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-zinc-900">
		<Floating3D2
			name={name}
			picture={picture}
			profile={profile}
      subtitle={subtitle}
      onChangeBackground={onChangeBackground}
		/>
	</div> 
}
