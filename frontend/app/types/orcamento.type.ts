export type Orcamento = {
    id: number;
    clienteId: number;
    funcionarioId: number;
    descricao: string;
    valor: number;
    status: "Pendente" | "Aprovado" | "Rejeitado";
    dataCriacao: Date;
    dataAtualizacao: Date;
}