"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAccess, getUserData, logout } from "@/app/utils/Access";
import "./header.css";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const access = getAccess();
  const user = getUserData();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const renderLinks = () => {
    switch (access) {
      case "Funcionário":
        return (
          <>
            <div onClick={() => router.push("/orcamentos")}>Gerar Orçamento</div>
            <div onClick={() => router.push("/clientes")}>Cadastrar Cliente</div>
          </>
        );
      case "Gerente":
        return (
          <>
            <div onClick={() => router.push("/orcamentos")}>Gerar Orçamento</div>
            <div onClick={() => router.push("/clientes")}>Cadastrar Cliente</div>
            <div onClick={() => router.push("/funcionarios")}>Cadastrar Funcionário</div>
            <div onClick={() => router.push("/estatisticas")}>Estatísticas</div>
          </>
        );
      case "Diretor":
        return (
          <>
            <div onClick={() => router.push("/orcamentos")}>Gerar Orçamento</div>
            <div onClick={() => router.push("/clientes")}>Cadastrar Cliente</div>
            <div onClick={() => router.push("/funcionarios")}>Cadastrar Funcionário</div>
            <div onClick={() => router.push("/estatisticas")}>Estatísticas</div>
            <div onClick={() => router.push("/financeiro")}>Financeiro</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>VidroOrça</h1>
      </div>

      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
        <div className="links">
          {renderLinks()}
        </div>
        <div className="header-right">
          {user?.nome && (
            <span className="user-info">
              {user.nome} ({access})
            </span>
          )}
          <div>
            <button onClick={logout} className="logout-btn">
              Sair
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
