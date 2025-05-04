"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function FormularioPlanta() {
  const [enviando, setEnviando] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    localizacao: "",
    codigo: "",
    descricao: "",
  })
  const [erros, setErros] = useState<Record<string, string>>({})

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

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {}

    if (!formData.nome.trim()) {
      novosErros.nome = "O nome da planta é obrigatório"
    }

    if (!formData.localizacao.trim()) {
      novosErros.localizacao = "A localização é obrigatória"
    }

    if (!formData.codigo.trim()) {
      novosErros.codigo = "O código é obrigatório"
    } else if (!/^[A-Z]+-\d{3}$/.test(formData.codigo)) {
      novosErros.codigo = "O código deve seguir o formato XXX-000 (ex: PLT-001)"
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
        localizacao: "",
        codigo: "",
        descricao: "",
      })
    } catch (error) {
      console.error("Erro ao cadastrar planta:", error)
  
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
              Nome da Planta <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Planta Industrial Norte"
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
              placeholder="Ex: PLT-001"
              className={erros.codigo ? "border-red-500" : ""}
            />
            {erros.codigo && <p className="text-sm text-red-500">{erros.codigo}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="localizacao">
            Localização <span className="text-red-500">*</span>
          </Label>
          <Input
            id="localizacao"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
            placeholder="Ex: Cuiabá - MT"
            className={erros.localizacao ? "border-red-500" : ""}
          />
          {erros.localizacao && <p className="text-sm text-red-500">{erros.localizacao}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              nome: "",
              localizacao: "",
              codigo: "",
              descricao: ""
            })
            setErros({})
          }}
        >
          Limpar
        </Button>
        <Button type="submit" disabled={enviando}>
          {enviando ? "Cadastrando..." : "Cadastrar Planta"}
        </Button>
      </div>
    </form>
  )
}
