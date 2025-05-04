import { Building2, FolderCog, Cog, CircleDot } from "lucide-react"

// Server Component para a árvore de ativos
export default function AssetTree() {
  // Normalmente, estes dados viriam de uma API ou banco de dados
  const assets = [
    {
      id: "AS",
      name: "Atlântico Sul (AS)",
      type: "location" as const,
      children: [
        {
          id: "SM",
          name: "Sala de Máquinas",
          type: "room" as const,
          children: [
            {
              id: "MP",
              name: "Motor Principal",
              type: "equipment" as const,
              children: [
                {
                  id: "PT",
                  name: "Pistão",
                  type: "component" as const,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "location":
        return <Building2 className="h-4 w-4 text-red-600" />
      case "room":
        return <FolderCog className="h-4 w-4 text-orange-600" />
      case "equipment":
        return <Cog className="h-4 w-4 text-blue-600" />
      case "component":
        return <CircleDot className="h-4 w-4 text-green-600" />
      default:
        return null
    }
  }

  interface Asset {
    id: string
    name: string
    type: "location" | "room" | "equipment" | "component"
    children: Asset[]
  }

  const renderTree = (items: Asset[]) => {
    return (
      <ul className="pl-4 space-y-1">
        {items.map((item) => (
          <li key={item.id} className="py-1">
            <div className="flex items-center">
              {getIcon(item.type)}
              <span className="ml-2 text-sm">{item.name}</span>
            </div>
            {item.children && item.children.length > 0 && renderTree(item.children)}
          </li>
        ))}
      </ul>
    )
  }

  return <div className="mt-2">{renderTree(assets)}</div>
}
