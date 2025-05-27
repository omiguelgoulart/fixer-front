"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import FormItens from "../FormItens"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"


interface Props {
  ordem: OrdemServicoItf
}

export default function AbaItens({ ordem }: Props) {
  const [open, setOpen] = useState(false)

 return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Lista de insumos utilizados</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar item à OS #{ordem.id}</DialogTitle>
            </DialogHeader>
            <FormItens
              ordemServicoId={ordem.id}
              onSuccess={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Quantidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordem.insumos?.length ? (
            ordem.insumos.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-sm text-gray-500 py-6">
                Nenhum item cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
