# VidroOrça API Mock - Backend para SaaS de Orçamentos

API mockada utilizando **JSON Server** para simulação de um backend REST. 

**Acesse a API Online:** [https://vidroorca-saas-ficticio.onrender.com](https://vidroorca-saas-ficticio.onrender.com)

## Documentação Completa da API

A coleção completa de rotas está disponível no Postman:

[Acesse a coleção no Postman](https://www.postman.com/pedrooliveirawish/workspace/vidroorca/collection/45281257-facfe742-0a02-4cdc-8c45-042955e6236c?action=share&source=copy-link&creator=45281257)

A documentação detalhada de cada rota está disponível em:

- [Documentação de Clientes](./docs/clientes.md)
- [Documentação de Orçamentos](./docs/orcamentos.md)
- [Documentação de Usuários](./docs/usuarios.md)

###

> Não possui autenticação, visto que é um projeto voltado para o desenvolvimento Front End, no entanto, em uma aplicação real, seria implementado JWT para autenticação, refresh token e permissões por perfil.

---

## Autores

 [@PedroOliveiraWish](https://github.com/PedroOliveiraWish)


## Tecnologias Utilizadas

**Back-end:** TypeScript, Faker, JSON Server


## Como Executar Localmente

Siga os passos abaixo para rodar o projeto na sua máquina local:

1. Clone o repositório:

```bash
git clone https://link-para-o-projeto
```

2. Acesse o diretório do projeto:

```bash
cd API
```

3. Instale as dependências:

```bash
npm install
```

4. Gere os dados fictícios:

```bash
npm run generate
```

5. Inicie o servidor:

```bash
npm run dev
```

O servidor da API estará disponível em: `http://localhost:3001/api`

---
### Endpoints Disponíveis

Os endpoints seguem o padrão para listar todos os itens (`GET /api/{endpoint}`) ou um item específico (`GET /api/{endpoint}/{id}`):

- **Usuários:** `/api/usuarios`
- **Orçamentos:** `/api/orcamentos`
- **Clientes:** `/api/clientes`



