import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-pixel mb-4">404 - Game Over</h1>
      {/* <p className="font-mono mb-4">The page you're looking for is in another castle!</p> 
      PTBR
      */}
      <p className="font-mono mb-4">
        A página que você procura está em outro castelo!
      </p>
      <div className="flex flex-col items-center">
        <p className="font-mono mb-4">Insira a moeda para continuar (Retornar para a página inicial)</p>
        <Link
          href="/"
          className="font-pixel bg-purple-600 px-4 py-2 rounded hover:bg-purple-500 transition-colors"
        >
          [Inserir moeda]
        </Link>
      </div>
    </div>
  )
}

