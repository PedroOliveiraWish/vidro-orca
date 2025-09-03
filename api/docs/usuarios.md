# Rotas - Funcionário

## Estrutura dos Dados

Os dados do Funcionario são gerados com base nos seguintes tipos TypeScript:

```typescript
export type Usuario = {
  id: number;
  nome: string;
  cargo: "Diretor" | "Gerente" | "Funcionário";
  email: string;
  senha: string;
};
```

## GET /funcionarios

Retorna a lista de todos os funcionários.

**Resposta Exemplo:**

```json
[
  {
    "id": 1,
    "nome": "Ms. Bonnie Simonis",
    "cargo": "Diretor",
    "email": "myron.west@gmail.com",
    "senha": "diretor123"
  },
  {
    "id": 2,
    "nome": "Willie Hilll MD",
    "cargo": "Gerente",
    "email": "leda_oberbrunner54@yahoo.com",
    "senha": "gerente123"
  }
]
```

---

## POST /funcionarios

Cria um novo funcionário.

**Body Exemplo:**

```json
{
  "id": 1,
  "nome": "Ms. Bonnie Simonis",
  "cargo": "Diretor",
  "email": "myron.west@gmail.com",
  "senha": "diretor123"
}
```

**Resposta Exemplo:**

```json
{
  "id": 1,
  "nome": "Ms. Bonnie Simonis",
  "cargo": "Diretor",
  "email": "myron.west@gmail.com",
  "senha": "diretor123"
}
```

---

## PUT /funcionarios/\:id

Atualiza um funcionário existente.

**Body Exemplo:**

```json
{
  "id": 1,
  "nome": "Ms. Bonnie Simonis",
  "cargo": "Gerente",
  "email": "myron.west@gmail.com",
  "senha": "gerente123"
}
```

**Resposta Exemplo:**

```json
{
  "id": 1,
  "nome": "Ms. Bonnie Simonis",
  "cargo": "Gerente",
  "email": "myron.west@gmail.com",
  "senha": "gerente123"
}
```

---

## DELETE /funcionarios/\:id

Remove um funcionário existente.

**Resposta Exemplo:**

```json
{}
```
