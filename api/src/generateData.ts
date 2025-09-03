import { faker } from "@faker-js/faker";
import fs from "fs";

import { Cliente, Orcamento, Usuario } from "./types/models";

const usuarios: Usuario[] = []
const clientes: Cliente[] = []
const orcamentos: Orcamento[] = []

const maxUsuarios = 10
const maxClientes = 50
const maxOrcamentos = 100

for (let i = 1; i <= maxUsuarios; i++) {
    usuarios.push({
        id: i,
        nome: faker.person.fullName(),
        cargo:
            i === 1
                ? 'Diretor'
                : i <= 3
                    ? 'Gerente'
                    : 'Funcionário',
        email: faker.internet.email().toLowerCase(),
        senha: i === 1 ? 'diretor123' : i <= 3 ? 'gerente123' : 'funcionario123'
    })
}

for (let i = 1; i <= maxClientes; i++) {
    clientes.push({
        id: i,
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        telefone: faker.phone.number({ style: "international" }),
        endereco: faker.location.streetAddress()
    })
}

for (let i = 1; i <= maxOrcamentos; i++) {
    orcamentos.push({
        id: i,
        clienteId: faker.number.int({ min: 1, max: maxClientes }),
        usuarioId: faker.number.int({ min: 1, max: maxUsuarios }),
        descricao: `${faker.helpers.arrayElement([
            "Porta de quatro folhas",
            "Janela de duas folhas",
            "Porta pivotante",
            "Espelho decorativo",
            "Janela basculante"
        ])} - ${faker.commerce.productDescription()}`,
        valor: parseFloat(faker.commerce.price({ min: 500, max: 5000 })),
        status: faker.helpers.arrayElement(["Pendente", "Aprovado", "Rejeitado"]),
        dataCriacao: faker.date.past({ years: 5 })
    })
}

const data = {
    usuarios,
    clientes,
    orcamentos
};

fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

console.log("Dados gerados com sucesso!");