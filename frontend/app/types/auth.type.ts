export type Usuario = {
  id: number;
  nome: string;
  cargo: "Diretor" | "Gerente" | "Funcionário";
  email: string;
  senha: string;
};