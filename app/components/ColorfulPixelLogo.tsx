import type React from "react"

const ColorfulPixelLogo: React.FC = () => {
  const colors = ["bg-purple-300", "bg-purple-400", "bg-purple-500", "bg-purple-600", "bg-purple-700", "bg-indigo-400"]

  return (
    <div className="w-24 h-24 grid grid-cols-8 grid-rows-8 gap-0.5 mb-4 transform rotate-45">
      {[...Array(64)].map((_, i) => (
        <div
          key={i}
          className={`w-full h-full ${
            [0, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 63].includes(i)
              ? colors[Math.floor(Math.random() * colors.length)]
              : "bg-transparent"
          }`}
        />
      ))}
    </div>
  )
}

export default ColorfulPixelLogo

