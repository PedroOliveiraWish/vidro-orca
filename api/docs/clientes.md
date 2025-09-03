# Rotas - Cliente

## Estrutura dos Dados

Os dados do Cliente são gerados com base nos seguintes tipos TypeScript:

```typescript
export type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
};
```

## GET /clientes
Retorna a lista de todos os clientes.

**Exemplo de Resposta:**
```json
[
    {
        "id": 2,
        "nome": "Monica Erdman",
        "email": "Bertram32@gmail.com",
        "telefone": "+16314113559",
        "endereco": "943 Rachelle Extensions"
    },
    {
        "id": 3,
        "nome": "Wilma Nader",
        "email": "Hank.Bins@gmail.com",
        "telefone": "+18035034538",
        "endereco": "507 Fisher Lights"
    }
]
```

---

## POST /clientes

Cria um novo cliente.

**Body Exemplo:**

```json
{
    "id": 59,
    "nome": "angel larissa",
    "email": "angel_larissa@gmail.com",
    "telefone": "+12996967821",
    "endereco": "3256 Garden Spring"
}
```

**Resposta Exemplo:**

```json
{
    "id": 59,
    "nome": "angel larissa",
    "email": "angel_larissa@gmail.com",
    "telefone": "+12996967821",
    "endereco": "3256 Garden Spring"
}
```

---

## PUT /clientes/\:id

Atualiza um cliente existente.

**Body Exemplo:**

```json
{
    "id": 51,
    "nome": "anjo larissa edit",
    "email": "anjo_larissa@gmail.com",
    "telefone": "+12996967822",
    "endereco": "3256 Garden Street"
}
```

**Resposta Exemplo:**

```json
{
    "id": 51,
    "nome": "anjo larissa edit",
    "email": "anjo_larissa@gmail.com",
    "telefone": "+12996967822",
    "endereco": "3256 Garden Street"
}
```

---

## DELETE /clientes/\:id

Remove um cliente existente.

**Resposta Exemplo:**

```json
{}
```