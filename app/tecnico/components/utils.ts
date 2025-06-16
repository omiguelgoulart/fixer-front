export const getStatusColor = (status: string) => {
  switch (status) {
    case "EM_ABERTO":
      return "bg-yellow-500 text-white"
    case "CONCLUIDA":
      return "bg-green-500 text-white"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getPrioridadeColor = (prioridade: string) => {
switch (prioridade) {
    case "ALTA":
        return "bg-red-500 text-white"
    case "MEDIA":
        return "bg-yellow-500 text-white"
    case "BAIXA":
        return "bg-green-500 text-white"
    default:
        return "bg-gray-100 text-gray-800"
}
}
