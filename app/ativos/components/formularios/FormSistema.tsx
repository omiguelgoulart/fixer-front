"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { PlantaItf } from "@/app/utils/types/PlantaItf"
import { AreaItf } from "@/app/utils/types/AreaItf"


export default function FormularioSistema() {
  const [enviando, setEnviando] = useState(false)
  const [plantas, setPlantas] = useState<PlantaItf[]>([])
  const [areas, setAreas] = useState<AreaItf[]>([])
  const [carregando, setCarregando] = useState(true)

  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    id_planta: "",
    id_area: "",
    descricao: "",
  })

  const [erros, setErros] = useState<Record<string, string>>({})

  // Carregar plantas disponíveis (temporário, substituir por chamada à API posteriormente)
  useEffect(() => {
    // Dados de exemplo para simulação
    const plantasExemplo: PlantaItf[] = [
      { id: 1, nome: "Planta A", localizacao: "Local A", codigo: "PA", area: [{ id: 1, nome: "Área 1", codigo: "A1", id_planta: 1, sistema: [] }] },
      { id: 2, nome: "Planta B", localizacao: "Local B", codigo: "PB", area: [{ id: 2, nome: "Área 2", codigo: "A2", id_planta: 2, sistema: [] }] },
    ]
    setPlantas(plantasExemplo)
    setCarregando(false)
  }, [])

  // Atualizar áreas quando a planta for selecionada
  useEffect(() => {
    if (formData.id_planta) {
      const plantaSelecionada = plantas.find((p) => p.id.toString() === formData.id_planta)
      if (plantaSelecionada) {
        setAreas(plantaSelecionada.area)
      } else {
        setAreas([])
      }
      // Limpar área selecionada quando trocar de planta
      setFormData((prev) => ({ ...prev, id_area: "" }))
    } else {
      setAreas([])
    }
  }, [formData.id_planta, plantas])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro quando o usuário começa a digitar
    if (erros[name]) {
      setErros((prev) => {
        const newErros = { ...prev }
        delete newErros[name]
        return newErros
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro quando o usuário seleciona um valor
    if (erros[name]) {
      setErros((prev) => {
        const newErros = { ...prev }
        delete newErros[name]
        return newErros
      })
    }
  }

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {}

    if (!formData.nome.trim()) {
      novosErros.nome = "O nome do sistema é obrigatório"
    }

    if (!formData.codigo.trim()) {
      novosErros.codigo = "O código é obrigatório"
    } else if (!/^[A-Z]+-\d{3}$/.test(formData.codigo)) {
      novosErros.codigo = "O código deve seguir o formato XXX-000 (ex: SYS-001)"
    }

    if (!formData.id_planta) {
      novosErros.id_planta = "A planta é obrigatória"
    }

    if (!formData.id_area) {
      novosErros.id_area = "A área é obrigatória"
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validarFormulario()) {
      toast.error("Por favor, corrija os erros no formulário.")
      return
    }

    setEnviando(true)

    try {
      // Simulação de envio de dados (substituir pela chamada à API)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Sistema cadastrado com sucesso!")
      setFormData({
        nome: "",
        codigo: "",
        id_planta: "",
        id_area: "",
        descricao: "",
      })
    } catch {
      toast.error("Erro ao cadastrar o sistema. Tente novamente.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nome">
              Nome do Sistema <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Sistema Elétrico"
              className={erros.nome ? "border-red-500" : ""}
            />
            {erros.nome && <p className="text-sm text-red-500">{erros.nome}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="codigo">
              Código <span className="text-red-500">*</span>
            </Label>
            <Input
              id="codigo"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              placeholder="Ex: SYS-001"
              className={erros.codigo ? "border-red-500" : ""}
            />
            {erros.codigo && <p className="text-sm text-red-500">{erros.codigo}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="id_planta">
              Planta <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.id_planta}
              onValueChange={(value) => handleSelectChange("id_planta", value)}
              disabled={carregando}
            >
              <SelectTrigger className={erros.id_planta ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione uma planta" />
              </SelectTrigger>
              <SelectContent>
                {plantas.map((planta) => (
                  <SelectItem key={planta.id} value={planta.id.toString()}>
                    {planta.nome} ({planta.codigo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {erros.id_planta && <p className="text-sm text-red-500">{erros.id_planta}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="id_area">
              Área <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.id_area}
              onValueChange={(value) => handleSelectChange("id_area", value)}
              disabled={!formData.id_planta || areas.length === 0}
            >
              <SelectTrigger className={erros.id_area ? "border-red-500" : ""}>
                <SelectValue
                  placeholder={!formData.id_planta ? "Selecione uma planta primeiro" : "Selecione uma área"}
                />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.id.toString()}>
                    {area.nome} ({area.codigo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {erros.id_area && <p className="text-sm text-red-500">{erros.id_area}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição</Label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva detalhes adicionais sobre o sistema..."
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              nome: "",
              codigo: "",
              id_planta: "",
              id_area: "",
              descricao: "",
            })
            setErros({})
          }}
        >
          Limpar
        </Button>
        <Button type="submit" disabled={enviando || carregando}>
          {enviando ? "Cadastrando..." : "Cadastrar Sistema"}
        </Button>
      </div>
    </form>
  )
}
