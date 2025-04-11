import type React from "react"
import { Instagram, Linkedin } from "lucide-react"

interface SocialShareProps {
  url: string
  title: string
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {

  return (
    <div className="flex space-x-4 mt-4">
      <a
        href={`https://www.instagram.com/luis_marchio/`}
        target="_blank"
        rel="noopener noreferrer"
        className="pixelated-border p-2 bg-gray-900 hover:bg-gray-800 transition-colors"
      >
        <Instagram className="w-6 h-6" />
      </a>
      <a
        href={`https://www.linkedin.com/in/lu%C3%ADs-gabriel-marchi%C3%B3-batista-4a8b58287/`}
        target="_blank"
        rel="noopener noreferrer"
        className="pixelated-border p-2 bg-gray-900 hover:bg-gray-800 transition-colors"
      >
        <Linkedin className="w-6 h-6" />
      </a>
    </div>
  )
}

export default SocialShare

