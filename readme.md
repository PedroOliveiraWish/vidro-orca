

# VidroOrça – 

**VidroOrça** é um sistema web fictício de **gestão de orçamentos, clientes e funcionários** para uma empresa de serviços de vidro.
Este projeto foi desenvolvido com fins de **portfólio** e demonstração de habilidades, mas já possui estrutura para **escalar e se integrar com APIs reais** no futuro.

---

## 📚 Visão Geral

O VidroOrça é um **website de gestão interna** construído com **Next.js + React + TypeScript**.
Ele simula funcionalidades comuns em um sistema SaaS, como:

* **Autenticação e controle de acesso** (Funcionário, Gerente e Diretor).
* **Geração de orçamentos**.
* **Cadastro de clientes**.
* **Cadastro de funcionários**.
* **Visualização de estatísticas e financeiro**.

No momento, ele utiliza uma **API mockada** para simular dados, garantindo demonstração de fluxo completo sem depender de um back-end real.

---

## ⚙️ Tecnologias Utilizadas

* **Next.js** (App Router)
* **React**
* **TypeScript**
* **SCSS** para estilização
* **sessionStorage** para simular autenticação no lado do cliente
* **API mockada** para dados de exemplo

---

## 📝 Estrutura do Projeto

```
frontend/
├── app/ # Estrutura App Router do Next.js
│ ├── (main)/ # Rotas principais do aplicativo
│ ├── components/ # Componentes reutilizáveis
│ ├── styles/ # Estilos globais e módulos SCSS/CSS
│ ├── types/ # Definições de tipos TypeScript
│ ├── utils/ # Funções utilitárias
│ ├── app.scss # Estilos globais do app
│ ├── layout.scss # Estilos específicos do layout
│ ├── layout.css
│ ├── layout.tsx # Layout principal
│ ├── page.tsx # Página inicial
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json # Configuração do TypeScript
└── README.md
```

### `/utils/Access.ts`

Arquivo com funções utilitárias para **gerenciar acesso do usuário e dados em sessão**:

* `setAccess(access: string)` – Define o nível de acesso do usuário no `sessionStorage`.
* `getAccess()` – Retorna o nível de acesso armazenado.
* `logout()` – Remove informações do usuário do `sessionStorage`.
* `getUserData()` – Retorna dados do usuário armazenados (JSON parseado).
* `setUserData(userData: object)` – Salva os dados do usuário em `sessionStorage`.

> ⚠️ Observação: o uso do `sessionStorage` ocorre **apenas no lado do cliente**. Durante SSR/Build do Next.js, são feitas verificações para evitar erros.

---

## 🖥️ Funcionalidades

* **Menu Responsivo com Hamburger Menu**
* **Controle de rotas por nível de acesso** (Funcionário, Gerente, Diretor)
* **Mock de dados** para simular requisições de API
* **Design escalável e modular** para futura integração com back-end real

---

## 🚀 Possibilidade de Escalar

Apesar de ser um projeto de **portfólio**, toda a arquitetura foi pensada para:

* **Trocar a API mockada** por um back-end real com pouca refatoração.
* **Integrar autenticação JWT ou OAuth** facilmente.
* **Acomodar crescimento** de novas páginas e funcionalidades.

---

## 🧑‍💻 Como Executar

```bash
# Instalar dependências
npm install

# Rodar o projeto em desenvolvimento
npm run dev

# Fazer build para produção
npm run build
```

---

## 📜 Licença

Este projeto é **fictício** e voltado para fins educacionais/portfólio.
Sinta-se à vontade para consultar o código e se inspirar!

---