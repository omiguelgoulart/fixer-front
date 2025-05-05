// Simulação de busca de dados do servidor
export async function getAssetDetails(assetId: string) {
    // Normalmente, isso seria uma chamada a uma API ou banco de dados
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulando latência de rede
  
    // Dados mockados para o exemplo
    return {
      id: assetId,
      name: "Motor Principal",
      type: "Equipamento",
      code: "AS-MP-001",
      manufacturer: "Wärtsilä",
      model: "WBL32",
      serialNumber: "WRTSL123456",
      installationDate: "2020-01-01",
      lastMaintenanceDate: "2024-01-15",
      nextMaintenanceDate: "2024-04-15",
      criticality: "Nível A",
      imageUrl: "/placeholder.svg?height=400&width=400",
      manualFileName: "Motor.pdf",
      manualUrl: "/documents/motor.pdf",
    }
  }
  