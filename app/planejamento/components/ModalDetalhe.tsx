"use client"

import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import AbaGeral from "./abas/Geral"

interface ModalDetalheProps {
  ordem: OrdemServicoItf | null
  open: boolean
  onClose: () => void
}

export default function ModalDetalhe({ ordem, open, onClose }: ModalDetalheProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhes da Ordem de Serviço</DialogTitle>
          <DialogDescription>
            {ordem ? `#${ordem.codigo} — ${ordem.titulo}` : "Nenhuma ordem selecionada"}
          </DialogDescription>
        </DialogHeader>

        {ordem && (
          <div className="max-h-[70vh] overflow-y-auto">
            <AbaGeral ordem={ordem} />
          </div>
        )}

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
