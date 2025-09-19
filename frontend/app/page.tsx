'use client';

import React, { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { setAccess, setUserData } from './utils/Access';
import './app.css'

const AuthSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

type AuthData = z.infer<typeof AuthSchema>;

export default function AuthPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthData>({
        resolver: zodResolver(AuthSchema)
    });

    const router = useRouter();

    const notifyError = ({ message }: { message: string }) => toast.error(message);
    const notifySuccess = ({ message }: { message: string }) => toast.success(message);

    const onSubmit = async (data: AuthData) => {
        console.log("Dados do formulário:", data);
        console.log("Enviando dados para a API...");
        console.log(`URL da API: ${process.env.NEXT_PUBLIC_API_URL}`);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json();

            if (!response.ok) {
                console.log("Login falhou:", result);
                notifyError({ message: result.message || "Erro desconhecido" });
                return;
            }

            notifySuccess({ message: "Login bem-sucedido!" });
            setAccess(result.cargo);
            setUserData(result);
            router.push('/orcamentos');

        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }

    const dataAuth = [
        { titulo: "Acesso diretor", nome: "Ora Hermann", cargo: "Diretor", email: "marcos50@yahoo.com", senha: "diretor123" },
        { titulo: "Acesso gerente", nome: "Dan Hickle", cargo: "Gerente", email: "stefan_monahan@gmail.com", senha: "gerente123" },
        { titulo: "Acesso colaborador", nome: "Connie Swift", cargo: "Funcionário", email: "susie.lakin@hotmail.com", senha: "funcionario123" }
    ]

    const cardAuth = ({ titulo, nome, cargo, email, senha }: { titulo: string, nome: string, cargo: string, email: string, senha: string }) => {
        return (
            <div className="card-auth">
                <h2>{titulo}</h2>
                <p><strong>Nome:</strong> {nome}</p>
                <p><strong>Cargo:</strong> {cargo}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Senha:</strong> {senha}</p>
            </div>
        )
    }

    useEffect(() => {
        sessionStorage.clear();
    }, [])

    return (
        <section className="auth-page">
            <div className="form-container-auth">
                <h1>Formulário de Autenticação</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="form-auth">
                    <div className="input-group-auth">
                        <label className='label-field-auth' htmlFor="nome">Nome:</label>
                        <input className='input-field-auth' id="nome" placeholder='Insira o nome' {...register("nome")} />
                        {errors.nome && <span className="error">{errors.nome.message}</span>}
                    </div>
                    <div className="input-group-auth">
                        <label className='label-field-auth' htmlFor="email">Email:</label>
                        <input className='input-field-auth' id="email" placeholder='Insira o email' {...register("email")} />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>
                    <div className="input-group-auth">
                        <label className='label-field-auth' htmlFor="senha">Senha:</label>
                        <input className='input-field-auth' id="senha" type="password" placeholder='Insira a senha' {...register("senha")} />
                        {errors.senha && <span className="error">{errors.senha.message}</span>}
                    </div>

                    <div className="submit-button" >
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>

            <section className="data-auth">
                <h1>Dados de Acesso</h1>
                <div className="cards-auth">
                    {dataAuth.map((data, index) => (
                        <React.Fragment key={index}>
                            {cardAuth(data)}
                        </React.Fragment>
                    ))}
                </div>
            </section>
        </section>
    )
}