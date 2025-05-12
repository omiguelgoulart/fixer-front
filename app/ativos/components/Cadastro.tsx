"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import FormularioPlanta from "./formularios/FormPlanta"
import FormularioArea from "./formularios/FormArea"
import FormularioSistema from "./formularios/FormSistema"
import FormularioAtivo from "./formularios/FormAtivo"
import FormularioSubativo from "./formularios/FormSubativo"

interface ModalCadastroEntidadesProps {
  aberto: boolean
  aoFechar: () => void
}

export default function ModalCadastroEntidades({ aberto, aoFechar }: ModalCadastroEntidadesProps) {
  const [abaSelecionada, setAbaSelecionada] = useState("ativo")

  return (
    <Dialog open={aberto} onOpenChange={aoFechar}>
      <DialogContent className="max-w-5xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">Cadastro de Entidades</DialogTitle>
          <p className="text-sm text-muted-foreground">Cadastre planta, área, sistema, ativo ou subativo.</p>
        </DialogHeader>

        <Tabs value={abaSelecionada} onValueChange={setAbaSelecionada} className="mt-4">
          <TabsList className="grid grid-cols-5 mb-6 w-full">
            <TabsTrigger value="planta">Planta</TabsTrigger>
            <TabsTrigger value="area">Área</TabsTrigger>
            <TabsTrigger value="sistema">Sistema</TabsTrigger>
            <TabsTrigger value="ativo">Ativo</TabsTrigger>
            <TabsTrigger value="subativo">Subativo</TabsTrigger>
          </TabsList>

          <TabsContent value="planta">
            <FormularioPlanta />
          </TabsContent>
          <TabsContent value="area">
            <FormularioArea />
          </TabsContent>
          <TabsContent value="sistema">
            <FormularioSistema />
          </TabsContent>
          <TabsContent value="ativo">
            <FormularioAtivo />
          </TabsContent>
          <TabsContent value="subativo">
            <FormularioSubativo />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
