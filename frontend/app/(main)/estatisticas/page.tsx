'use client'

import React, { useState, useEffect } from "react";
import { getOrcamentos } from "@/app/utils/Orcamentos";
import { Orcamento } from "@/app/types/orcamento.type";
import EstatisticaCards from "@/app/components/estatisticaCard/card";
import './estatistica.css'

export default function EstatisticaPage() {
    const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);

    useEffect(() => {
        const fetchOrcamentos = async () => {
            try {
                const response = await getOrcamentos();
                const responseJson: Orcamento[] = await response.json();
                setOrcamentos(responseJson);
            } catch (error) {
                console.error("Erro ao carregar orçamentos", error);
            }
        };
        fetchOrcamentos();
    }, []);


    return (
        <section className="estatistica">
            <h1>Estatísticas</h1>

            <article className="estatistica-cards">
                <EstatisticaCards />
            </article>


            <article className="estatistica-table-container">
                <table className="estatistica-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente ID</th>
                            <th>Usuário ID</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Data Criação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orcamentos.map((orcamento) => (
                            <tr key={orcamento.id}>
                                <td>{orcamento.id}</td>
                                <td>{orcamento.clienteId}</td>
                                <td>{orcamento.funcionarioId}</td>
                                <td>{orcamento.descricao}</td>
                                <td>R$ {orcamento.valor.toFixed(2)}</td>
                                <td>{orcamento.status}</td>
                                <td>{new Date(orcamento.dataCriacao).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </article>
        </section>
    );
}
