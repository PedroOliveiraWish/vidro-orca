---

# **VidroOrça - API Mock para Consumo em Front-End**

Esta é uma **API mockada**, desenvolvida com **JSON Server**, destinada a simular um backend REST para fins de desenvolvimento Front-End.
O objetivo é fornecer endpoints fictícios que permitam testes e integração sem a necessidade de um servidor real.

**API Online:**
[https://vidroorca-saas-ficticio.onrender.com](https://vidroorca-saas-ficticio.onrender.com)

---

## **Objetivo do Projeto**

Esta API não é um backend real e **não possui autenticação, persistência de dados ou regras de negócio complexas**.
Seu propósito é servir como suporte para um projeto Front-End, simulando respostas reais para rotas REST.

---

## **Endpoints Disponíveis**

Todos os endpoints seguem o padrão REST:

* **Usuários:** `/api/usuarios`
* **Orçamentos:** `/api/orcamentos`
* **Clientes:** `/api/clientes`

Métodos disponíveis:
`GET`, `POST`, `PUT`, `DELETE`

---

## **Autenticação**

Este projeto **não possui autenticação**. Em um ambiente real, seriam implementados mecanismos como **JWT**, **refresh tokens** e **controle de permissões**.

---

## **Documentação Adicional**

A documentação detalhada das rotas está disponível nos arquivos:

* [Clientes](./docs/clientes.md)
* [Orçamentos](./docs/orcamentos.md)
* [Usuários](./docs/usuarios.md)

Coleção do Postman para testes:
[Acesse a coleção no Postman](https://www.postman.com/pedrooliveirawish/workspace/vidroorca/collection/45281257-facfe742-0a02-4cdc-8c45-042955e6236c?action=share&source=copy-link&creator=45281257)

---

## **Tecnologias Utilizadas**

* **JSON Server** – Para simulação de endpoints REST
* **TypeScript** – Para tipagem estática e manutenção do código
* **Faker.js** – Para geração de dados fictícios

---

## **Como Executar Localmente**

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
npm run start
```

A API estará disponível em:
`http://localhost:3001/api`

---

### **Aviso Importante**

Este projeto é **exclusivamente para fins de desenvolvimento e demonstração**.
Não deve ser utilizado em produção ou tratado como um backend real.

---