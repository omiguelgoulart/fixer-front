"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PlantaItf } from "@/app/utils/types/PlantaItf"
import type { AreaItf } from "@/app/utils/types/AreaItf"
import type { SistemaItf } from "@/app/utils/types/SistemaItf"

export default function FormularioAtivo() {
  const [enviando, setEnviando] = useState(false)
  const [plantas, setPlantas] = useState<PlantaItf[]>([])
  const [areas, setAreas] = useState<AreaItf[]>([])
  const [sistemas, setSistemas] = useState<SistemaItf[]>([])
  const [carregando, setCarregando] = useState(true)

  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    fabricante: "",
    modelo: "",
    data_aquisicao: "",
    localizacao_interna: "",
    tipo_ativo: "",
    situacao: "",
    criticidade: "",
    id_planta: "",
    id_area: "",
    id_sistema: "",
    descricao: "",
  })

  const [erros, setErros] = useState<Record<string, string>>({})

  // Carregar plantas disponíveis temporariamente
  useEffect(() => {
    const carregarPlantasTemporarias = () => {
      setCarregando(true)
      setTimeout(() => {
        setPlantas([
          {
            id: 1,
            nome: "Planta A",
            codigo: "PLA-001",
            localizacao: "Setor 1",
            area: [
              {
                id: 1,
                nome: "Área 1",
                codigo: "ARE-001",
                id_planta: 1,
                sistema: [
                  {
                    id: 1,
                    nome: "Sistema A1",
                    codigo: "SYS-001",
                    id_area: 1,
                    ativo: []
                  },
                  {
                    id: 2,
                    nome: "Sistema A2",
                    codigo: "SYS-002",
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
            localizacao: "Setor 2",
            area: [
              {
                id: 2,
                nome: "Área 2",
                codigo: "ARE-002",
                id_planta: 2,
                sistema: [
                  {
                    id: 3,
                    nome: "Sistema B1",
                    codigo: "SYS-003",
                    id_area: 2,
                    ativo: []
                  },
                  {
                    id: 4,
                    nome: "Sistema B2",
                    codigo: "SYS-004",
                    id_area: 2,
                    ativo: []
                  }
                ]
              }
            ]
          }
        ])
        
        setCarregando(false)
      }, 1000) // Simula um atraso de 1 segundo
    }

    carregarPlantasTemporarias()
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
      // Limpar área e sistema selecionados quando trocar de planta
      setFormData((prev) => ({ ...prev, id_area: "", id_sistema: "" }))
    } else {
      setAreas([])
    }
  }, [formData.id_planta, plantas])

  // Atualizar sistemas quando a área for selecionada
  useEffect(() => {
    if (formData.id_area) {
      const areaSelecionada = areas.find((a) => a.id.toString() === formData.id_area)
      if (areaSelecionada) {
        setSistemas(areaSelecionada.sistema)
      } else {
        setSistemas([])
      }
      // Limpar sistema selecionado quando trocar de área
      setFormData((prev) => ({ ...prev, id_sistema: "" }))
    } else {
      setSistemas([])
    }
  }, [formData.id_area, areas])

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
      novosErros.nome = "O nome do ativo é obrigatório"
    }

    if (!formData.codigo.trim()) {
      novosErros.codigo = "O código é obrigatório"
    } else if (!/^[A-Z]+-\d{4}$/.test(formData.codigo)) {
      novosErros.codigo = "O código deve seguir o formato XXX-0000 (ex: ELT-0001)"
    }

    if (!formData.fabricante.trim()) {
      novosErros.fabricante = "O fabricante é obrigatório"
    }

    if (!formData.modelo.trim()) {
      novosErros.modelo = "O modelo é obrigatório"
    }

    if (!formData.data_aquisicao) {
      novosErros.data_aquisicao = "A data de aquisição é obrigatória"
    }

    if (!formData.tipo_ativo) {
      novosErros.tipo_ativo = "O tipo de ativo é obrigatório"
    }

    if (!formData.situacao) {
      novosErros.situacao = "A situação é obrigatória"
    }

    if (!formData.criticidade) {
      novosErros.criticidade = "A criticidade é obrigatória"
    }

    if (!formData.id_planta) {
      novosErros.id_planta = "A planta é obrigatória"
    }

    if (!formData.id_area) {
      novosErros.id_area = "A área é obrigatória"
    }

    if (!formData.id_sistema) {
      novosErros.id_sistema = "O sistema é obrigatório"
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
        fabricante: "",
        modelo: "",
        data_aquisicao: "",
        localizacao_interna: "",
        tipo_ativo: "",
        situacao: "",
        criticidade: "",
        id_planta: "",
        id_area: "",
        id_sistema: "",
        descricao: "",
      })
    } catch (error) {
      console.error("Erro ao cadastrar ativo:", error)


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
              Nome do Ativo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Motor Elétrico 1"
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
              placeholder="Ex: ELT-0001"
              className={erros.codigo ? "border-red-500" : ""}
            />
            {erros.codigo && <p className="text-sm text-red-500">{erros.codigo}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fabricante">
              Fabricante <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fabricante"
              name="fabricante"
              value={formData.fabricante}
              onChange={handleChange}
              placeholder="Ex: WEG"
              className={erros.fabricante ? "border-red-500" : ""}
            />
            {erros.fabricante && <p className="text-sm text-red-500">{erros.fabricante}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelo">
              Modelo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              placeholder="Ex: M90"
              className={erros.modelo ? "border-red-500" : ""}
            />
            {erros.modelo && <p className="text-sm text-red-500">{erros.modelo}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="data_aquisicao">
              Data de Aquisição <span className="text-red-500">*</span>
            </Label>
            <Input
              id="data_aquisicao"
              name="data_aquisicao"
              type="date"
              value={formData.data_aquisicao}
              onChange={handleChange}
              className={erros.data_aquisicao ? "border-red-500" : ""}
            />
            {erros.data_aquisicao && <p className="text-sm text-red-500">{erros.data_aquisicao}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="localizacao_interna">Localização Interna</Label>
            <Input
              id="localizacao_interna"
              name="localizacao_interna"
              value={formData.localizacao_interna}
              onChange={handleChange}
              placeholder="Ex: Linha 1 - Ponto A"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="tipo_ativo">
              Tipo de Ativo <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.tipo_ativo} onValueChange={(value) => handleSelectChange("tipo_ativo", value)}>
              <SelectTrigger className={erros.tipo_ativo ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ELETRICO">Elétrico</SelectItem>
                <SelectItem value="MECANICO">Mecânico</SelectItem>
                <SelectItem value="HIDRAULICO">Hidráulico</SelectItem>
                <SelectItem value="PNEUMATICO">Pneumático</SelectItem>
                <SelectItem value="OUTRO">Outro</SelectItem>
              </SelectContent>
            </Select>
            {erros.tipo_ativo && <p className="text-sm text-red-500">{erros.tipo_ativo}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="situacao">
              Situação <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.situacao} onValueChange={(value) => handleSelectChange("situacao", value)}>
              <SelectTrigger className={erros.situacao ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione a situação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ATIVO">Ativo</SelectItem>
                <SelectItem value="INATIVO">Inativo</SelectItem>
                <SelectItem value="MANUTENCAO">Em Manutenção</SelectItem>
              </SelectContent>
            </Select>
            {erros.situacao && <p className="text-sm text-red-500">{erros.situacao}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="criticidade">
              Criticidade <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.criticidade} onValueChange={(value) => handleSelectChange("criticidade", value)}>
              <SelectTrigger className={erros.criticidade ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione a criticidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALTA">Alta</SelectItem>
                <SelectItem value="MEDIA">Média</SelectItem>
                <SelectItem value="BAIXA">Baixa</SelectItem>
              </SelectContent>
            </Select>
            {erros.criticidade && <p className="text-sm text-red-500">{erros.criticidade}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

          <div className="space-y-2">
            <Label htmlFor="id_sistema">
              Sistema <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.id_sistema}
              onValueChange={(value) => handleSelectChange("id_sistema", value)}
              disabled={!formData.id_area || sistemas.length === 0}
            >
              <SelectTrigger className={erros.id_sistema ? "border-red-500" : ""}>
                <SelectValue placeholder={!formData.id_area ? "Selecione uma área primeiro" : "Selecione um sistema"} />
              </SelectTrigger>
              <SelectContent>
                {sistemas.map((sistema) => (
                  <SelectItem key={sistema.id} value={sistema.id.toString()}>
                    {sistema.nome} ({sistema.codigo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {erros.id_sistema && <p className="text-sm text-red-500">{erros.id_sistema}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição</Label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva detalhes adicionais sobre o ativo..."
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
              fabricante: "",
              modelo: "",
              data_aquisicao: "",
              localizacao_interna: "",
              tipo_ativo: "",
              situacao: "",
              criticidade: "",
              id_planta: "",
              id_area: "",
              id_sistema: "",
              descricao: "",
            })
            setErros({})
          }}
        >
          Limpar
        </Button>
        <Button type="submit" disabled={enviando || carregando}>
          {enviando ? "Cadastrando..." : "Cadastrar Ativo"}
        </Button>
      </div>
    </form>
  )
}
