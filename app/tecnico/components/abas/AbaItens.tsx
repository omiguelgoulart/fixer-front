"use client";

import { Button } from "@/components/ui/button";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import FormItens from "@/app/planejamento/components/FormItens";
import { useState } from "react";
import { useTecnico } from "../../stores/useTecnico";

interface Props {
  ordem: OrdemServicoItf;
  onUpdate: (novaOrdem: OrdemServicoItf) => void;
}

export default function AbaItens({ ordem, onUpdate }: Props) {
  const [open, setOpen] = useState(false);
  const { buscarOrdemPorId } = useTecnico();

  async function handleSuccess() {
    setOpen(false);
    const atualizada = await buscarOrdemPorId(ordem.id);
    if (atualizada) onUpdate(atualizada);
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Itens da Ordem {ordem.codigo}</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Adicionar item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar item à OS {ordem.codigo}</DialogTitle>
            </DialogHeader>
            <FormItens ordemServicoId={ordem.id} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista de Insumos</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordem.insumos.length > 0 ? (
                ordem.insumos.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.codigo}</TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-sm text-gray-500 py-6"
                  >
                    Nenhum item cadastrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
