/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Funcionario } from "@/types/funcionarios"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface FormularioFuncionarioProps {
  funcionarioInicial: Funcionario | null
  onSalvar: (funcionario: Funcionario) => void
  onCancelar: () => void
}

export default function FormularioFuncionario({
  funcionarioInicial,
  onSalvar,
  onCancelar,
}: FormularioFuncionarioProps) {
  const [funcionario, setFuncionario] = useState<any>({
    nome: "",
    email: "",
    telefone: "",
    tipo: "tecnico",
    departamento: "",
    dataContratacao: "",
    status: "ativo",
    // Campos específicos para cada tipo
    // Gestor
    nivelAcesso: "",
    equipes: [],
    // Gerente
    areasResponsavel: [],
    metasDesempenho: "",
    // Técnico
    especialidades: [],
    certificacoes: [],
    ferramentasHabilitado: [],
  })

  const [novaEquipe, setNovaEquipe] = useState("")
  const [novaArea, setNovaArea] = useState("")
  const [novaEspecialidade, setNovaEspecialidade] = useState("")
  const [novaCertificacao, setNovaCertificacao] = useState("")
  const [novaFerramenta, setNovaFerramenta] = useState("")

  // Carregar dados do funcionário para edição
  useEffect(() => {
    if (funcionarioInicial) {
      setFuncionario({
        ...funcionarioInicial,
        // Garantir que todos os campos existam
        nivelAcesso: funcionarioInicial.nivelAcesso || "",
        equipes: funcionarioInicial.equipes || [],
        areasResponsavel: funcionarioInicial.areasResponsavel || [],
        metasDesempenho: funcionarioInicial.metasDesempenho || "",
        especialidades: funcionarioInicial.especialidades || [],
        certificacoes: funcionarioInicial.certificacoes || [],
        ferramentasHabilitado: funcionarioInicial.ferramentasHabilitado || [],
      })
    }
  }, [funcionarioInicial])

  const handleChange = (campo: string, valor: string | number | string[]) => {
    setFuncionario({ ...funcionario, [campo]: valor })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSalvar(funcionario)
  }

  // Funções para adicionar itens às listas
  const adicionarEquipe = () => {
    if (novaEquipe && !funcionario.equipes.includes(novaEquipe)) {
      handleChange("equipes", [...funcionario.equipes, novaEquipe])
      setNovaEquipe("")
    }
  }

  const removerEquipe = (equipe: string) => {
    handleChange(
      "equipes",
      funcionario.equipes.filter((e: string) => e !== equipe),
    )
  }

  const adicionarArea = () => {
    if (novaArea && !funcionario.areasResponsavel.includes(novaArea)) {
      handleChange("areasResponsavel", [...funcionario.areasResponsavel, novaArea])
      setNovaArea("")
    }
  }

  const removerArea = (area: string) => {
    handleChange(
      "areasResponsavel",
      funcionario.areasResponsavel.filter((a: string) => a !== area),
    )
  }

  const adicionarEspecialidade = () => {
    if (novaEspecialidade && !funcionario.especialidades.includes(novaEspecialidade)) {
      handleChange("especialidades", [...funcionario.especialidades, novaEspecialidade])
      setNovaEspecialidade("")
    }
  }

  const removerEspecialidade = (especialidade: string) => {
    handleChange(
      "especialidades",
      funcionario.especialidades.filter((e: string) => e !== especialidade),
    )
  }

  const adicionarCertificacao = () => {
    if (novaCertificacao && !funcionario.certificacoes.includes(novaCertificacao)) {
      handleChange("certificacoes", [...funcionario.certificacoes, novaCertificacao])
      setNovaCertificacao("")
    }
  }

  const removerCertificacao = (certificacao: string) => {
    handleChange(
      "certificacoes",
      funcionario.certificacoes.filter((c: string) => c !== certificacao),
    )
  }

  const adicionarFerramenta = () => {
    if (novaFerramenta && !funcionario.ferramentasHabilitado.includes(novaFerramenta)) {
      handleChange("ferramentasHabilitado", [...funcionario.ferramentasHabilitado, novaFerramenta])
      setNovaFerramenta("")
    }
  }

  const removerFerramenta = (ferramenta: string) => {
    handleChange(
      "ferramentasHabilitado",
      funcionario.ferramentasHabilitado.filter((f: string) => f !== ferramenta),
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-xl font-bold mb-4">
        {funcionarioInicial ? "Editar Funcionário" : "Cadastrar Novo Funcionário"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome Completo</Label>
            <Input id="nome" value={funcionario.nome} onChange={(e) => handleChange("nome", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={funcionario.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={funcionario.telefone}
              onChange={(e) => handleChange("telefone", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de Funcionário</Label>
            <Select value={funcionario.tipo} onValueChange={(value) => handleChange("tipo", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gestor">Gestor</SelectItem>
                <SelectItem value="gerente">Gerente</SelectItem>
                <SelectItem value="tecnico">Técnico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="departamento">Departamento</Label>
            <Select
              value={funcionario.departamento}
              onValueChange={(value) => handleChange("departamento", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manutenção">Manutenção</SelectItem>
                <SelectItem value="Produção">Produção</SelectItem>
                <SelectItem value="Logística">Logística</SelectItem>
                <SelectItem value="Administrativo">Administrativo</SelectItem>
                <SelectItem value="TI">TI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dataContratacao">Data de Contratação</Label>
            <Input
              id="dataContratacao"
              type="date"
              value={funcionario.dataContratacao}
              onChange={(e) => handleChange("dataContratacao", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={funcionario.status} onValueChange={(value) => handleChange("status", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Campos específicos para cada tipo de funcionário */}
      {funcionario.tipo === "gestor" && (
        <div className="border p-4 rounded-md bg-blue-50 space-y-4">
          <h3 className="font-medium text-lg">Informações de Gestor</h3>

          <div>
            <Label htmlFor="nivelAcesso">Nível de Acesso</Label>
            <Select
              value={funcionario.nivelAcesso}
              onValueChange={(value) => handleChange("nivelAcesso", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível de acesso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basico">Básico</SelectItem>
                <SelectItem value="intermediario">Intermediário</SelectItem>
                <SelectItem value="administrador">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="equipes">Equipes Responsável</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="equipes"
                value={novaEquipe}
                onChange={(e) => setNovaEquipe(e.target.value)}
                placeholder="Adicionar equipe"
              />
              <Button type="button" onClick={adicionarEquipe} variant="secondary">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {funcionario.equipes.map((equipe: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {equipe}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removerEquipe(equipe)} />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {funcionario.tipo === "gerente" && (
        <div className="border p-4 rounded-md bg-purple-50 space-y-4">
          <h3 className="font-medium text-lg">Informações de Gerente</h3>

          <div>
            <Label htmlFor="areasResponsavel">Áreas Responsável</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="areasResponsavel"
                value={novaArea}
                onChange={(e) => setNovaArea(e.target.value)}
                placeholder="Adicionar área"
              />
              <Button type="button" onClick={adicionarArea} variant="secondary">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {funcionario.areasResponsavel.map((area: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {area}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removerArea(area)} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="metasDesempenho">Metas de Desempenho</Label>
            <Textarea
              id="metasDesempenho"
              value={funcionario.metasDesempenho}
              onChange={(e) => handleChange("metasDesempenho", e.target.value)}
              placeholder="Descreva as metas de desempenho"
              rows={3}
            />
          </div>
        </div>
      )}

      {funcionario.tipo === "tecnico" && (
        <div className="border p-4 rounded-md bg-green-50 space-y-4">
          <h3 className="font-medium text-lg">Informações de Técnico</h3>

          <div>
            <Label htmlFor="especialidades">Especialidades</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="especialidades"
                value={novaEspecialidade}
                onChange={(e) => setNovaEspecialidade(e.target.value)}
                placeholder="Adicionar especialidade"
              />
              <Button type="button" onClick={adicionarEspecialidade} variant="secondary">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {funcionario.especialidades.map((especialidade: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {especialidade}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removerEspecialidade(especialidade)} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="certificacoes">Certificações</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="certificacoes"
                value={novaCertificacao}
                onChange={(e) => setNovaCertificacao(e.target.value)}
                placeholder="Adicionar certificação"
              />
              <Button type="button" onClick={adicionarCertificacao} variant="secondary">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {funcionario.certificacoes.map((certificacao: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {certificacao}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removerCertificacao(certificacao)} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="ferramentasHabilitado">Ferramentas Habilitado</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="ferramentasHabilitado"
                value={novaFerramenta}
                onChange={(e) => setNovaFerramenta(e.target.value)}
                placeholder="Adicionar ferramenta"
              />
              <Button type="button" onClick={adicionarFerramenta} variant="secondary">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {funcionario.ferramentasHabilitado.map((ferramenta: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {ferramenta}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removerFerramenta(ferramenta)} />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
          {funcionarioInicial ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  )
}