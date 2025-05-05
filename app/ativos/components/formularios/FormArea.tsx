"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlantaItf } from "@/app/utils/types/PlantaItf"




export default function FormularioArea() {
  const [enviando, setEnviando] = useState(false)
  const [plantas, setPlantas] = useState<PlantaItf[]>([])
  const [carregando, setCarregando] = useState(true)

  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    id_planta: "",
    descricao: "",
  })

  const [erros, setErros] = useState<Record<string, string>>({})

  // Carregar plantas disponíveis (temporário)
  useEffect(() => {
    const carregarPlantas = async () => {
      try {
        setCarregando(true)
        // Dados temporários simulados
        const dados = [
          {
            id: 1,
            nome: "Planta A",
            codigo: "PLA-001",
            localizacao: "Local A",
            area: [
              {
                id: 1,
                tamanho: 100,
                nome: "Área 1",
                id_planta: 1,
                codigo: "ARE-001",
                sistema: [
                  {
                    id: 1,
                    nome: "Sistema A",
                    codigo: "SYS-001",
                    id_area: 1,
                    ativo: []
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            nome: "Planta B",
            codigo: "PLA-002",
            localizacao: "Local B",
            area: [
              {
                id: 2,
                tamanho: 200,
                nome: "Área 2",
                id_planta: 2,
                codigo: "ARE-002",
                sistema: [
                  {
                    id: 2,
                    nome: "Sistema B",
                    codigo: "SYS-002",
                    id_area: 2,
                    ativo: []
                  }
                ]
              }
            ]
          }
        ]
        
        setPlantas(dados)
      } catch (error) {
        console.error("Erro ao carregar plantas:", error)
      } finally {
        setCarregando(false)
      }
    }

    carregarPlantas()
  }, [])

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
      novosErros.nome = "O nome da área é obrigatório"
    }

    if (!formData.codigo.trim()) {
      novosErros.codigo = "O código é obrigatório"
    } else if (!/^[A-Z]+-\d{3}$/.test(formData.codigo)) {
      novosErros.codigo = "O código deve seguir o formato XXX-000 (ex: ARE-001)"
    }

    if (!formData.id_planta) {
      novosErros.id_planta = "A planta é obrigatória"
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setEnviando(true)

    try {
      // Simulando envio para API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Limpar formulário
      setFormData({
        nome: "",
        codigo: "",
        id_planta: "",
        descricao: "",
      })
    } catch (error) {
      console.error("Erro ao cadastrar área:", error)
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
              Nome da Área <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Área de Produção"
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
              placeholder="Ex: ARE-001"
              className={erros.codigo ? "border-red-500" : ""}
            />
            {erros.codigo && <p className="text-sm text-red-500">{erros.codigo}</p>}
          </div>
        </div>

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
          <Label htmlFor="descricao">Descrição</Label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva detalhes adicionais sobre a área..."
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
              descricao: "",
            })
            setErros({})
          }}
        >
          Limpar
        </Button>
        <Button type="submit" disabled={enviando || carregando}>
          {enviando ? "Cadastrando..." : "Cadastrar Área"}
        </Button>
      </div>
    </form>
  )
}
