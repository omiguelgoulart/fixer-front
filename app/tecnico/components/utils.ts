export const getStatusColor = (status: string) => {
  switch (status) {
    case "Em aberto":
      return "bg-yellow-100 text-yellow-800"
    case "Concluída":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case "Alta":
      return "bg-red-100 text-red-800"
    case "Média":
      return "bg-orange-100 text-orange-800"
    case "Baixa":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
