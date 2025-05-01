# 📦 Manual Rápido – Uso do Yarn

## 🔧 Instalar yarn
```bash
npm install -g yarn
```

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


## 🌿 Fluxo de Branches e Padrão de Commits com Gitmoji

### 📌 Branch principal: `main`
- Contém o código estável, pronto para produção.
- Nenhum desenvolvimento direto é feito aqui.

### 🚧 Branch de desenvolvimento: `dev`
- Todas as novas funcionalidades e correções partem da `dev`.
- Merge para `main` só acontece após testes e validações.

---

### 🔀 Criando uma nova funcionalidade (feature)

Sempre crie uma nova branch **a partir da `dev`**, com o seguinte padrão:

```bash
git checkout dev
git pull origin dev
git checkout -b feat/nome-da-funcionalidade
```

Exemplo:
```bash
git checkout -b feat/cadastro-de-ativos
```

### 🧹 Criando uma branch para correção de bug
```bash
git checkout dev
git pull origin dev
git checkout -b fix/corrige-erro-apontamento
```

### ✅ Finalizou a tarefa?
1. Faça o commit com Gitmoji (veja a tabela abaixo).
2. Suba sua branch:
    ```bash
    git push origin feat/nome-da-funcionalidade
    ```
3. Crie um Pull Request (PR) da sua branch para `dev`.

---

## 💬 Padrão de Commits com Gitmoji

Utilizamos o padrão [Gitmoji](https://gitmoji.dev/) para manter um histórico de commits claro e padronizado.

### 📌 Exemplo de commit:
```bash
git commit -m ":sparkles: Adiciona tela de cadastro de ativos"
```

### 📘 Tabela de Emojis mais usados

| Emoji | Código            | Tipo                  | Quando usar?                                      |
|-------|-------------------|-----------------------|--------------------------------------------------|
| ✨    | `:sparkles:`      | Nova funcionalidade   | Adição de algo novo                              |
| 🐛    | `:bug:`           | Correção de bug       | Corrige algo quebrado                            |
| ♻️    | `:recycle:`       | Refatoração           | Melhora o código sem alterar funcionalidade      |
| 📝    | `:memo:`          | Documentação          | Atualiza README ou comentários                   |
| 🎨    | `:art:`           | Estilo                | Ajuste visual ou formatação                      |
| 🔥    | `:fire:`          | Remoção               | Remove código ou arquivos                        |
| 🚧    | `:construction:`  | Em progresso          | Funcionalidade ainda em construção               |
| ✅    | `:white_check_mark:` | Testes             | Adiciona ou ajusta testes                        |
| 📦    | `:package:`       | Dependências          | Instala ou remove pacotes                        |
| 🔧    | `:wrench:`        | Configurações         | Altera arquivos de configuração                  |

---

### ✔️ Boas práticas
- Sempre crie branches novas a partir da `dev`.
- Faça commits pequenos e objetivos, com o emoji correspondente.
- Não faça merge direto na `main` – use Pull Requests com revisão.

### 🔁 Finalizando uma tarefa: merge na `dev`

Após terminar e testar sua feature na sua branch (ex: `feat/xxx`), siga estes passos para integrá-la na `dev`:

1. Troque para a branch `dev`:
    ```bash
    git checkout dev
    ```

2. Atualize a `dev` com o que está no repositório remoto:
    ```bash
    git pull origin dev
    ```

3. Faça o merge da sua branch de feature na `dev`:
    ```bash
    git merge nome-da-sua-branch
    ```
    Exemplo:
    ```bash
    git merge feat/rotas-validacoes-zod
    ```

4. Envie a `dev` atualizada para o GitHub:
    ```bash
    git push origin dev
    ```