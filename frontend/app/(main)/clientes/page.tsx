"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifyError, notifySuccess } from "@/app/utils/Notify";
import "../../styles/form/form.css";

const ClienteSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(8, "Telefone inválido"),
    endereco: z.string().min(5, "Endereço inválido"),
});

type ClienteData = z.infer<typeof ClienteSchema>;

export default function ClienteForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ClienteData>({
        resolver: zodResolver(ClienteSchema),
    });

    const onSubmit = async (data: ClienteData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes`, {
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

    return (
        <section className="page-container">
            <article className="form-container">
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <h2>Cadastrar Cliente</h2>

                    <div className="input-group">
                        <label className="label-field" htmlFor="nome" aria-labelledby="nome-help">Nome</label>
                        <input className="input-field" id="nome" type="text" {...register("nome")} placeholder="Digite o nome" aria-label="Nome" aria-describedby="nome-help" />
                        {errors.nome && <span className="error">{errors.nome.message}</span>}
                    </div>

                    <div className="input-group">
                        <label className="label-field" htmlFor="email">Email</label>
                        <input className="input-field" id="email" type="email" {...register("email")} placeholder="Digite o email" />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>

                    <div className="input-group">
                        <label className="label-field" htmlFor="telefone">Telefone</label>
                        <input className="input-field" id="telefone" type="text" {...register("telefone")} placeholder="Digite o telefone" />
                        {errors.telefone && <span className="error">{errors.telefone.message}</span>}
                    </div>

                    <div className="input-group">
                        <label className="label-field" htmlFor="endereco">Endereço</label>
                        <input className="input-field" id="endereco" type="text" {...register("endereco")} placeholder="Digite o endereço" />
                        {errors.endereco && <span className="error">{errors.endereco.message}</span>}
                    </div>

                    <div className="button-submit">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Salvando..." : "Salvar Cliente"}
                        </button>
                    </div>
                </form>
            </article>
        </section>
    );
}
