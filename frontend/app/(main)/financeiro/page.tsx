'use client';

import React, { useState, useEffect } from "react";
import { Orcamento } from "@/app/types/orcamento.type";
import { getOrcamentos } from "@/app/utils/Orcamentos";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

import './financeiro.css'

export default function FinanceiroPage() {
    const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOrcamentos();
                const responseJson: Orcamento[] = await response.json();
                setOrcamentos(responseJson);
            } catch (error) {
                console.log("Erro ao buscar orçamentos", error);
            }
        };
        fetchData();
    }, []);

    
    const total = orcamentos.reduce((acc, o) => acc + o.valor, 0);
    const aprovados = orcamentos.filter((o) => o.status === "Aprovado");
    const pendentes = orcamentos.filter((o) => o.status === "Pendente");
    const rejeitados = orcamentos.filter((o) => o.status === "Rejeitado");

    const totalAprovados = aprovados.reduce((acc, o) => acc + o.valor, 0);
    const totalPendentes = pendentes.reduce((acc, o) => acc + o.valor, 0);
    const totalRejeitados = rejeitados.reduce((acc, o) => acc + o.valor, 0);


    
    const pieData = [
        { name: "Aprovados", value: totalAprovados },
        { name: "Pendentes", value: totalPendentes },
        { name: "Rejeitados", value: totalRejeitados },
    ];

    const pieDataQuantidades = [
        { name: "Aprovados", value: aprovados.length },
        { name: "Pendentes", value: pendentes.length },
        { name: "Rejeitados", value: rejeitados.length },
    ];

    const lineData = orcamentos.map((o) => ({
        data: new Date(o.dataCriacao).toLocaleDateString(),
        valor: o.valor,
        status: o.status,
    }));

    const COLORS = ["#6b21a8", "#c084fc", "#ef4444"];

    
    const monthlyData = Object.values(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        orcamentos.reduce((acc: any, o) => {
            const month = new Date(o.dataCriacao).toLocaleString("pt-BR", { month: "short" });
            if (!acc[month]) acc[month] = { month, aprovados: 0, pendentes: 0, rejeitados: 0 };
            acc[month][o.status.toLowerCase() + "s"] += o.valor;
            return acc;
        }, {})
    );

    return (
        <section className="financeiro">
            <h2>Resumo Financeiro</h2>

            <div className="cards-container">
                <div className="card">
                    <h3>Total de Orçamentos</h3>
                    <p>{orcamentos.length}</p>
                </div>
                <div className="card">
                    <h3>Valor Total</h3>
                    <p>R$ {total.toFixed(2)}</p>
                </div>
                <div className="card">
                    <h3>Aprovados</h3>
                    <p>R$ {totalAprovados.toFixed(2)}</p>
                </div>
                <div className="card">
                    <h3>Pendentes</h3>
                    <p>R$ {totalPendentes.toFixed(2)}</p>
                </div>
                <div className="card">
                    <h3>Rejeitados</h3>
                    <p>R$ {totalRejeitados.toFixed(2)}</p>
                </div>
            </div>

            <div className="charts">
                <div className="charts-pizza">
                    <div className="chart">
                        <h3>Distribuição dos Orçamentos (Dinheiro)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label={(entry) => `R$ ${Number(entry.value).toFixed(2)}`}
                                >

                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart">
                        <h3>Distribuição de Orçamentos (Quantidades)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieDataQuantidades}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={40}
                                    outerRadius={100}
                                    label={(entry) =>
                                        `${entry.name}: ${Number(entry.value).toFixed(0)}`
                                    }
                                >
                                    {pieDataQuantidades.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => `${value.toFixed(2)} orçamentos`}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart">
                    <h3>Evolução Mensal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="aprovados" stroke="#6b21a8" name="Aprovados" />
                            <Line type="monotone" dataKey="pendentes" stroke="#c084fc" name="Pendentes" />
                            <Line type="monotone" dataKey="rejeitados" stroke="#ef4444" name="Rejeitados" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart">
                    <h3>Evolução do Faturamento</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="data" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                            <Legend />
                            <Line type="monotone" dataKey="valor" stroke="#6b21a8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
