export type Usuario = {
  id: number;
  nome: string;
  cargo: "Diretor" | "Gerente" | "Funcionário";
  email: string;
  senha: string;
};

export type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

export type Orcamento = {
  id: number;
  clienteId: number;
  usuarioId: number;
  descricao: string;
  valor: number;
  status: "Pendente" | "Aprovado" | "Rejeitado";
  dataCriacao: Date;
  dataAtualizacao: Date | null;
}