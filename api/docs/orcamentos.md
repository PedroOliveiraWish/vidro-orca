# Rotas - Orçamento

## Estrutura dos Dados

Os dados do Orçamento são gerados com base nos seguintes tipos TypeScript:

```typescript
export type Orcamento = {
  id: number;
  clienteId: number;
  usuarioId: number;
  descricao: string;
  valor: number;
  status: "Pendente" | "Aprovado" | "Rejeitado";
  dataCriacao: Date;
};
```

## GET /orcamentos

Retorna a lista de todos os orçamentos.

**Resposta Exemplo:**

```json
[
  {
    "id": 1,
    "clienteId": 33,
    "usuarioId": 3,
    "descricao": "Espelho decorativo - Featuring Chlorine-enhanced technology, our Cheese offers unparalleled royal performance",
    "valor": 1830.25,
    "status": "Rejeitado",
    "dataCriacao": "2023-09-11T20:33:19.289Z"
  },
  {
    "id": 2,
    "clienteId": 2,
    "usuarioId": 2,
    "descricao": "Janela basculante - Experience the fuchsia brilliance of our Sausages, perfect for unwelcome environments",
    "valor": 807.29,
    "status": "Pendente",
    "dataCriacao": "2022-01-30T13:42:15.932Z"
  }
]
```

---

## POST /orcamentos

Cria um novo orçamento.

**Body Exemplo:**

```json
{
  "id": 2,
  "clienteId": 51,
  "usuarioId": 10,
  "descricao": "Janela basculante - Experience the fuchsia brilliance of our Sausages, perfect for unwelcome environments",
  "valor": 807.29,
  "status": "Pendente",
  "dataCriacao": "2022-01-30T13:42:15.932Z"
}
```

**Resposta Exemplo:**

```json
{
  "id": 2,
  "clienteId": 51,
  "usuarioId": 10,
  "descricao": "Janela basculante - Experience the fuchsia brilliance of our Sausages, perfect for unwelcome environments",
  "valor": 807.29,
  "status": "Pendente",
  "dataCriacao": "2022-01-30T13:42:15.932Z"
}
```

---

## PUT /orcamentos/\:id

Atualiza um orçamento existente.

**Body Exemplo:**

```json
{
  "id": 2,
  "clienteId": 51,
  "usuarioId": 10,
  "descricao": "Janela basculante - Experience the fuchsia brilliance of our Sausages, perfect for unwelcome environments",
  "valor": 807.29,
  "status": "Rejeitado",
  "dataCriacao": "2022-01-30T13:42:15.932Z"
}
```

**Resposta Exemplo:**

```json
{
  "id": 2,
  "clienteId": 51,
  "usuarioId": 10,
  "descricao": "Janela basculante - Experience the fuchsia brilliance of our Sausages, perfect for unwelcome environments",
  "valor": 807.29,
  "status": "Rejeitado",
  "dataCriacao": "2022-01-30T13:42:15.932Z"
}
```

## DELETE /orcamentos/\:id

Remove um orçamento existente.

**Resposta Exemplo:**

```json
{}
```
