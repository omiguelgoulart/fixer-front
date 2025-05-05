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
import { AtivoItf } from "@/app/utils/types/AtivoITF"

export default function FormularioSubativo() {
  const [enviando, setEnviando] = useState(false)
  const [plantas, setPlantas] = useState<PlantaItf[]>([])
  const [areas, setAreas] = useState<AreaItf[]>([])
  const [sistemas, setSistemas] = useState<SistemaItf[]>([])
  const [ativos, setAtivos] = useState<AtivoItf[]>([])
  const [carregando, setCarregando] = useState(true)

  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    tipo: "",
    id_planta: "",
    id_area: "",
    id_sistema: "",
    id_ativo: "",
  })

  const [erros, setErros] = useState<Record<string, string>>({})

  // Carregar plantas disponíveis
  useEffect(() => {
    const carregarPlantas = async () => {
      try {
        setCarregando(true)
        // Simulando dados temporários
        const dados: PlantaItf[] = [
          {
            id: 1,
            nome: "Planta A",
            codigo: "PLA-001",
            localizacao: "Setor A",
            area: [
              {
                id: 1,
                nome: "Área A1",
                codigo: "ARE-001",
                id_planta: 1,
                sistema: [
                  {
                    id: 1,
                    nome: "Sistema A1.1",
                    codigo: "SYS-001",
                    id_area: 1,
                    ativo: [
                      {
                        id: 1,
                        nome: "Motor A",
                        codigo: "MTR-0001",
                        fabricante: "WEG",
                        modelo: "W22",
                        data_aquisicao: "2023-05-01",
                        localizacao_interna: "Linha 1",
                        tipo_ativo: "ELETRICO",
                        situacao: "ATIVO",
                        criticidade: "ALTA",
                        id_sistema: 1,
                        subativos: [] 
                      },
                      {
                        id: 2,
                        nome: "Bomba A",
                        codigo: "BMP-0002",
                        fabricante: "KSB",
                        modelo: "B1",
                        data_aquisicao: "2023-06-15",
                        localizacao_interna: "Tanque 2",
                        tipo_ativo: "HIDRAULICO",
                        situacao: "MANUTENCAO",
                        criticidade: "MEDIA",
                        id_sistema: 1,
                        subativos: [] 
                      }
                    ]
                  },
                  {
                    id: 2,
                    nome: "Sistema A1.2",
                    codigo: "SYS-002",
                    id_area: 1,
                    ativo: [
                      {
                        id: 3,
                        nome: "Compressor A",
                        codigo: "CMP-0003",
                        fabricante: "Atlas Copco",
                        modelo: "ZX300",
                        data_aquisicao: "2023-04-20",
                        localizacao_interna: "Compressor Room",
                        tipo_ativo: "MECANICO",
                        situacao: "ATIVO",
                        criticidade: "MEDIA",
                        id_sistema: 2,
                        subativos: [] 
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            nome: "Planta B",
            codigo: "PLA-002",
            localizacao: "Setor B",
            area: [
              {
                id: 2,
                nome: "Área B1",
                codigo: "ARE-002",
                id_planta: 2,
                sistema: [
                  {
                    id: 3,
                    nome: "Sistema B1.1",
                    codigo: "SYS-003",
                    id_area: 2,
                    ativo: [
                      {
                        id: 4,
                        nome: "Turbina B",
                        codigo: "TRB-0004",
                        fabricante: "GE",
                        modelo: "T900",
                        data_aquisicao: "2022-12-01",
                        localizacao_interna: "Sala de Energia",
                        tipo_ativo: "MECANICO",
                        situacao: "ATIVO",
                        criticidade: "ALTA",
                        id_sistema: 3,
                        subativos: [] 
                      },
                      {
                        id: 5,
                        nome: "Gerador B",
                        codigo: "GRD-0005",
                        fabricante: "Siemens",
                        modelo: "G400",
                        data_aquisicao: "2023-01-10",
                        localizacao_interna: "Sala de Geradores",
                        tipo_ativo: "ELETRICO",
                        situacao: "INATIVO",
                        criticidade: "BAIXA",
                        id_sistema: 3,
                        subativos: [] 
                      }
                    ]
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

  // Atualizar áreas quando a planta for selecionada
  useEffect(() => {
    if (formData.id_planta) {
      const plantaSelecionada = plantas.find((p) => p.id.toString() === formData.id_planta)
      if (plantaSelecionada) {
        setAreas(plantaSelecionada.area)
      } else {
        setAreas([])
      }
      // Limpar seleções subsequentes
      setFormData((prev) => ({ ...prev, id_area: "", id_sistema: "", id_ativo: "" }))
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
      // Limpar seleções subsequentes
      setFormData((prev) => ({ ...prev, id_sistema: "", id_ativo: "" }))
    } else {
      setSistemas([])
    }
  }, [formData.id_area, areas])

  // Atualizar ativos quando o sistema for selecionado
  useEffect(() => {
    if (formData.id_sistema) {
      const sistemaSelecionado = sistemas.find((s) => s.id.toString() === formData.id_sistema)
      if (sistemaSelecionado) {
        setAtivos(sistemaSelecionado.ativo)
      } else {
        setAtivos([])
      }
      // Limpar ativo selecionado
      setFormData((prev) => ({ ...prev, id_ativo: "" }))
    } else {
      setAtivos([])
    }
  }, [formData.id_sistema, sistemas])

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
      novosErros.nome = "O nome do subativo é obrigatório"
    }

    if (!formData.codigo.trim()) {
      novosErros.codigo = "O código é obrigatório"
    } else if (!/^SUB-\d+-\d+$/.test(formData.codigo)) {
      novosErros.codigo = "O código deve seguir o formato SUB-X-XX (ex: SUB-1-01)"
    }

    if (!formData.tipo.trim()) {
      novosErros.tipo = "O tipo é obrigatório"
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

    if (!formData.id_ativo) {
      novosErros.id_ativo = "O ativo é obrigatório"
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
        tipo: "",
        id_planta: "",
        id_area: "",
        id_sistema: "",
        id_ativo: "",
      })
    } catch (error) {
      console.error("Erro ao cadastrar subativo:", error)
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
              Nome do Subativo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Bobina de Cobre"
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
              placeholder="Ex: SUB-1-01"
              className={erros.codigo ? "border-red-500" : ""}
            />
            {erros.codigo && <p className="text-sm text-red-500">{erros.codigo}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">
            Tipo <span className="text-red-500">*</span>
          </Label>
          <Input
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            placeholder="Ex: Componente interno"
            className={erros.tipo ? "border-red-500" : ""}
          />
          {erros.tipo && <p className="text-sm text-red-500">{erros.tipo}</p>}
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

          <div className="space-y-2">
            <Label htmlFor="id_ativo">
              Ativo <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.id_ativo}
              onValueChange={(value) => handleSelectChange("id_ativo", value)}
              disabled={!formData.id_sistema || ativos.length === 0}
            >
              <SelectTrigger className={erros.id_ativo ? "border-red-500" : ""}>
                <SelectValue
                  placeholder={!formData.id_sistema ? "Selecione um sistema primeiro" : "Selecione um ativo"}
                />
              </SelectTrigger>
              <SelectContent>
                {ativos.map((ativo) => (
                  <SelectItem key={ativo.id} value={ativo.id.toString()}>
                    {ativo.nome} ({ativo.codigo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {erros.id_ativo && <p className="text-sm text-red-500">{erros.id_ativo}</p>}
          </div>
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
              tipo: "",
              id_planta: "",
              id_area: "",
              id_sistema: "",
              id_ativo: "",
            })
            setErros({})
          }}
        >
          Limpar
        </Button>
        <Button type="submit" disabled={enviando || carregando}>
          {enviando ? "Cadastrando..." : "Cadastrar Subativo"}
        </Button>
      </div>
    </form>
  )
}
