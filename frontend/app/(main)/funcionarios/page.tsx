'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAccess } from "@/app/utils/Access";
import { notifyError, notifySuccess } from "@/app/utils/Notify";
import '../../styles/form/form.css'

const usuarioSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    cargo: z.enum(["Diretor", "Gerente", "Funcionário"]),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type UsuarioForm = z.infer<typeof usuarioSchema>;

export default function CadastroFuncionarioPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<UsuarioForm>({
        resolver: zodResolver(usuarioSchema),
    });

    const access = getAccess();

    const onSubmit = async (data: UsuarioForm) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
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
                    <h2>Cadastrar Novo Funcionário</h2>

                    <div className="input-group">
                        <label className="label-field" htmlFor="nome">Nome</label>
                        <input
                            className="input-field"
                            id="nome"
                            type="text"
                            {...register("nome")}
                            placeholder="Digite o nome"
                        />
                        {errors.nome && <p className="error">{errors.nome.message}</p>}
                    </div>

                    <div className="input-group">
                        <label className="label-field" htmlFor="cargo">Cargo</label>
                        <select id="cargo" {...register("cargo")}>
                            <option value="">Selecione...</option>
                            {access === "Diretor" && (
                                <>
                                    <option value="Diretor">Diretor</option>
                                    <option value="Gerente">Gerente</option>
                                    <option value="Usuario">Funcionario</option>
                                </>
                            )}
                            {access === "Gerente" && (
                                <>
                                    <option value="Gerente">Gerente</option>
                                    <option value="Usuario">Funcionario</option>
                                </>
                            )}
                            {access === "Usuario" && (
                                <option value="Usuario">Funcionario</option>
                            )}

                        </select>
                        {errors.cargo && <p className="error">{errors.cargo.message}</p>}
                    </div>

                    <div className="input-group">
                        <label className="label-field" htmlFor="email">E-mail</label>
                        <input
                            className="input-field"
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="Digite o e-mail"
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div className="input-group">
                        <label className="label-field" htmlFor="senha">Senha</label>
                        <input
                            className="input-field"
                            id="senha"
                            type="password"
                            {...register("senha")}
                            placeholder="Digite a senha"
                        />
                        {errors.senha && <p className="error">{errors.senha.message}</p>}
                    </div>

                        <div className="button-submit">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Salvando..." : "Salvar Funcionário"}
                            </button>
                        </div>
                </form>
            </article>
        </section>
    );
}
