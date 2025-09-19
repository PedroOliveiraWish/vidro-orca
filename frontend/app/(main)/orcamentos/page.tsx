"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "@/app/utils/Notify";

import { getUserData, getAccess } from "@/app/utils/Access";
import { getClientes } from "@/app/utils/Clientes";
import { Cliente } from "@/app/types/clientes.type";
import { Usuario } from "@/app/types/auth.type";
import '../../styles/form/form.css'

const OrcamentoSchema = z.object({
    id: z.number().optional(),
    clienteId: z.number().min(1),
    funcionarioId: z.number().min(1),
    descricao: z.string().min(2).max(200),
    valor: z.number().min(0),
    status: z.enum(["Pendente", "Aprovado", "Rejeitado"]),
    dataCriacao: z.date().optional(),
    dataAtualizacao: z.union([z.date(), z.null()]).optional(),
});

type OrcamentoData = z.infer<typeof OrcamentoSchema>;

export default function OrcamentosPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrcamentoData>({
        resolver: zodResolver(OrcamentoSchema)
    });
    const [clientes, setClientes] = useState<Partial<Cliente>[]>([]);

    const user: Partial<Usuario> = getUserData();
    const access = getAccess();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await getClientes();
                const data: Partial<Cliente>[] = await response.json();
                setClientes(data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClientes();
    }, []);

    const onSubmit = async (data: OrcamentoData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orcamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                notifyError({ message: errorData.message || "Erro desconhecido" });
                return;
            }

            await response.json();
            notifySuccess({ message: "Orçamento criado/atualizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao criar orçamento:", error);
            notifyError({ message: "Erro ao criar orçamento" });
        }
    };

    const renderForm = (): React.ReactNode => {
        switch (access) {
            case "Funcionário":
                return (
                    <form onSubmit={handleSubmit(onSubmit)} className="form">

                        <h2>Gerar Orçamento</h2>
                        <div className="input-group">
                            <label className="label-field" htmlFor="clienteId">Cliente:</label>
                            <select
                                id="clienteId"
                                {...register("clienteId", { required: "Cliente é obrigatório" })}
                            >
                                <option value="">Selecione um cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.clienteId && <span className="error">{errors.clienteId.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="funcionarioId">Funcionário</label>
                            <select
                                id="funcionarioId"
                                {...register("funcionarioId", { required: "Funcionário é obrigatório" })}
                            >
                                <option value="">Selecione o funcionário responsável</option>
                                <option value={user.id}>{user.nome} - {user.cargo}</option>
                            </select>
                            {errors.funcionarioId && <span className="error">{errors.funcionarioId.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="descricao">Descrição</label>
                            <input
                                className="input-field"
                                id="descricao"
                                type="text"
                                {...register("descricao", { required: "Descrição é obrigatória" })}
                                placeholder="Digite a descrição do orçamento"
                            />
                            {errors.descricao && <span className="error">{errors.descricao.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="valor">Valor</label>
                            <input
                                className="input-field"
                                id="valor"
                                type="number"
                                step="0.01"
                                {...register("valor", { required: "Valor é obrigatório" })}
                                placeholder="Digite o valor do orçamento"
                            />
                            {errors.valor && <span className="error">{errors.valor.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="status">Status</label>
                            <select id="status" {...register("status", { required: "Status é obrigatório" })}>
                                <option value="Pendente">Pendente</option>
                            </select>
                            {errors.status && <span className="error">{errors.status.message}</span>}
                        </div>

                        <div className="button-submit">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Salvando..." : "Salvar Orçamento"}
                            </button>
                        </div>
                    </form>
                );

            case "Gerente":
                return (
                    <form onSubmit={handleSubmit(onSubmit)} className="form">

                        <h2>Gerar Orçamento</h2>
                        <div className="input-group">
                            <label className="label-field" htmlFor="clienteId">Cliente:</label>
                            <select
                                id="clienteId"
                                {...register("clienteId", { required: "Cliente é obrigatório" })}
                            >
                                <option value="">Selecione um cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.clienteId && <span className="error">{errors.clienteId.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="funcionarioId">Funcionário</label>
                            <select
                                id="funcionarioId"
                                {...register("funcionarioId", { required: "Funcionário é obrigatório" })}
                            >
                                <option value="">Selecione o funcionário responsável</option>
                                <option value={user.id}>{user.nome} - {user.cargo}</option>
                            </select>
                            {errors.funcionarioId && <span className="error">{errors.funcionarioId.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="descricao">Descrição</label>
                            <input
                                className="input-field"
                                id="descricao"
                                type="text"
                                {...register("descricao", { required: "Descrição é obrigatória" })}
                                placeholder="Digite a descrição do orçamento"
                            />
                            {errors.descricao && <span className="error">{errors.descricao.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="valor">Valor</label>
                            <input
                                className="input-field"
                                id="valor"
                                type="number"
                                step="0.01"
                                {...register("valor", { required: "Valor é obrigatório" })}
                                placeholder="Digite o valor do orçamento"
                            />
                            {errors.valor && <span className="error">{errors.valor.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="status">Status</label>
                            <select id="status" {...register("status", { required: "Status é obrigatório" })}>
                                <option value="Pendente">Pendente</option>
                                <option value="Aprovado">Aprovado</option>
                                <option value="Rejeitado">Rejeitado</option>
                            </select>
                            {errors.status && <span className="error">{errors.status.message}</span>}
                        </div>

                        <div className="button-submit">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Salvando..." : "Salvar Orçamento"}
                            </button>
                        </div>
                    </form>
                );

            case "Diretor":
                return (
                    <form onSubmit={handleSubmit(onSubmit)} className="form">

                        <h2>Gerar Orçamento</h2>
                        <div className="input-group">
                            <label className="label-field" htmlFor="clienteId">Cliente:</label>
                            <select
                                id="clienteId"
                                {...register("clienteId", { required: "Cliente é obrigatório" })}
                            >
                                <option value="">Selecione um cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.clienteId && <span className="error">{errors.clienteId.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="funcionarioId">Funcionário</label>
                            <select
                                id="funcionarioId"
                                {...register("funcionarioId", { required: "Funcionário é obrigatório" })}
                            >
                                <option value="">Selecione o funcionário responsável</option>
                                <option value={user.id}>{user.nome} - {user.cargo}</option>
                            </select>
                            {errors.funcionarioId && <span className="error">{errors.funcionarioId.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="descricao">Descrição</label>
                            <input
                                className="input-field"
                                id="descricao"
                                type="text"
                                {...register("descricao", { required: "Descrição é obrigatória" })}
                                placeholder="Digite a descrição do orçamento"
                            />
                            {errors.descricao && <span className="error">{errors.descricao.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="valor">Valor</label>
                            <input
                                className="input-field"
                                id="valor"
                                type="number"
                                step="0.01"
                                {...register("valor", { required: "Valor é obrigatório" })}
                                placeholder="Digite o valor do orçamento"
                            />
                            {errors.valor && <span className="error">{errors.valor.message}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label-field" htmlFor="status">Status</label>
                            <select id="status" {...register("status", { required: "Status é obrigatório" })}>
                                <option value="Pendente">Pendente</option>
                                <option value="Aprovado">Aprovado</option>
                                <option value="Rejeitado">Rejeitado</option>
                            </select>
                            {errors.status && <span className="error">{errors.status.message}</span>}
                        </div>

                        <div className="button-submit">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Salvando..." : "Salvar Orçamento"}
                            </button>
                        </div>
                    </form>
                );

            default:
                return <p>Sem permissão para acessar esta página.</p>;
        }
    };

    return (
        <section className="page-container">
            <article className="form-container">
                {renderForm()}
            </article>
        </section>
    );
}
