'use client'

import React, { useEffect, useState } from 'react'
import { Orcamento } from '@/app/types/orcamento.type'
import { Cliente } from '@/app/types/clientes.type'
import { getOrcamentos } from '@/app/utils/Orcamentos'
import { getClientes } from '@/app/utils/Clientes'
import './card.css'

export default function EstatisticaCards() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resOrc = await getOrcamentos()
        const jsonOrc: Orcamento[] = await resOrc.json()
        setOrcamentos(jsonOrc)

        const resCli = await getClientes()
        const jsonCli: Cliente[] = await resCli.json()
        setClientes(jsonCli)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  
  const totalClientes = clientes.length
  const totalOrcamentos = orcamentos.length
  const totalAprovados = orcamentos.filter(o => o.status === 'Aprovado').length
  const totalPendentes = orcamentos.filter(o => o.status === 'Pendente').length
  const ticketMedio =
    totalOrcamentos > 0
      ? (orcamentos.reduce((acc, o) => acc + o.valor, 0) / totalOrcamentos).toFixed(2)
      : 0

  const cards = [
    { title: 'Total de Clientes', value: totalClientes },
    { title: 'Total de Orçamentos', value: totalOrcamentos },
    { title: 'Aprovados', value: totalAprovados },
    { title: 'Pendentes', value: totalPendentes },
    { title: 'Ticket Médio', value: `R$ ${ticketMedio}` }
  ]

  return (
    <article className="estatistica-cards">
      {cards.map((card, index) => (
        <div className="estatistica-card" key={index}>
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </article>
  )
}
