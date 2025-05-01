# 📦 Manual Rápido – Uso do Yarn

## 🔧 Instalar dependências do projeto
```bash
yarn install
```
Deve ser o primeiro comando executado após clonar o repositório.

## 🚀 Rodar o projeto em ambiente de desenvolvimento
```bash
yarn dev
```
Inicia o servidor de desenvolvimento do Next.js em [http://localhost:3000](http://localhost:3000).

## 📦 Adicionar uma nova dependência
```bash
yarn add nome-da-biblioteca
```
Exemplo: `yarn add axios`

## 🧪 Adicionar uma dependência de desenvolvimento
```bash
yarn add -D nome-da-biblioteca
```
Exemplo: `yarn add -D tailwindcss postcss autoprefixer`

## 🔄 Atualizar as dependências
```bash
yarn upgrade
```

## 🧹 Remover uma dependência
```bash
yarn remove nome-da-biblioteca
```

## 🗂️ Gerar ou atualizar o arquivo `yarn.lock`
Esse arquivo é gerado automaticamente pelo Yarn e não deve ser editado manualmente. Ele deve ser versionado no Git.

## 🏗️ Build para produção (Next.js)
```bash
yarn build
```


## 💬 Padrão de Commits com Gitmoji

Utilizamos o padrão [Gitmoji](https://gitmoji.dev/) para manter um histórico de commits claro e padronizado.  
Sempre que for realizar um commit, use um emoji correspondente ao tipo de alteração.

### 📌 Exemplo de commit:
```bash
git commit -m ":sparkles: Adiciona tela de cadastro de ativos"
```

### 📘 Tabela de Emojis mais usados

| Emoji | Código            | Tipo                  | Quando usar?                                      |
|-------|-------------------|-----------------------|--------------------------------------------------|
| ✨    | `:sparkles:`      | Nova funcionalidade   | Quando adicionar algo novo                       |
| 🐛    | `:bug:`           | Correção de bug       | Corrigiu algo que estava quebrado               |
| ♻️    | `:recycle:`       | Refatoração           | Melhorou o código sem alterar funcionalidade    |
| 🎨    | `:art:`           | Estilo / Layout       | Alterações visuais ou de formatação             |
| 📝    | `:memo:`          | Documentação          | Atualizou README, comentários ou docs           |
| 🚀    | `:rocket:`        | Deploy                | Preparou para produção                          |
| 🔥    | `:fire:`          | Remoção de código     | Removeu código, arquivos ou funcionalidades     |
| 💄    | `:lipstick:`      | Estilo visual         | Ajustes de UI, CSS, responsividade              |
| ✅    | `:white_check_mark:` | Testes             | Criou ou atualizou testes                       |
| 🔧    | `:wrench:`        | Configuração          | Alterações em arquivos de config ou scripts     |
| 📦    | `:package:`       | Dependências          | Instalou, atualizou ou removeu pacotes          |
| 🚧    | `:construction:`  | Em desenvolvimento    | Funcionalidade incompleta ou em progresso       |
| ⬆️    | `:arrow_up:`      | Upgrade               | Atualização de versão ou dependência            |
| ⬇️    | `:arrow_down:`    | Downgrade             | Downgrade de versão ou dependência              |