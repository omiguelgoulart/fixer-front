"use client"

import { FileText } from "lucide-react"
import { useState } from "react"

// Client Component para o manual do ativo
export default function AssetManual({
  fileName,
  fileUrl,
}: {
  fileName: string
  fileUrl: string
}) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      // Lógica para download do arquivo
      console.log(`Baixando ${fileName} de ${fileUrl}`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Simulação de download
      alert(`Download de ${fileName} concluído!`)
    } catch (error) {
      console.error("Erro ao baixar arquivo", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Manual do ativo:</h3>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        <FileText className="h-5 w-5 mr-2 text-blue-500" />
        <span>{fileName}</span>
      </button>
    </div>
  )
}

