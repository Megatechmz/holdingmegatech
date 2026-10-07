"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { companies } from "../data/companies";

const cards = [companies.tech, companies.legal, companies.credit, companies.transport];

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [entering, setEntering] = useState<{ name: string; accent: string; accent2: string } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: 0.14 });
    nodes.forEach((node) => observer.observe(node));
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.8);
      mainRef.current?.style.setProperty("--scroll-progress", String(progress));
      setScrolled(window.scrollY > 48);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleScroll); };
  }, []);

  function tiltCard(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget; const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.setProperty("--tilt-x", `${-y * 10}deg`); card.style.setProperty("--tilt-y", `${x * 12}deg`);
    card.style.setProperty("--glow-x", `${(x + .5) * 100}%`); card.style.setProperty("--glow-y", `${(y + .5) * 100}%`);
  }

  function resetTilt(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  function enterCompany(event: React.MouseEvent<HTMLAnchorElement>, company: (typeof cards)[number]) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault(); setEntering({ name: company.name, accent: company.accent, accent2: company.accent2 });
    window.setTimeout(() => { window.location.href = `/${company.slug}`; }, 620);
  }

  return (
    <main ref={mainRef} className="group-home">
      <div className={`page-transition ${entering ? "active" : ""}`} style={{"--transition-accent": entering?.accent, "--transition-secondary": entering?.accent2} as React.CSSProperties} aria-hidden={!entering}>
        <span>A entrar em</span><strong>{entering?.name}</strong><i />
      </div>
      <header className={`site-header group-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="brand" href="/" aria-label="The Holding — Início"><span className="brand-mark">T</span><span>THE <b>HOLDING</b></span></Link>
        <nav className="desktop-nav" aria-label="Navegação principal"><a href="#sobre">Sobre</a><a href="#empresas">Empresas</a><a href="#impacto">Visão</a><a href="#contactos">Contactos</a></nav>
        <a className="header-cta" href="#empresas">Conhecer o ecossistema <span>↗</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu"><i /><i /></button>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a><a href="#empresas" onClick={() => setMenuOpen(false)}>Empresas</a><a href="#contactos" onClick={() => setMenuOpen(false)}>Contactos</a></div>

      <section className="hero" id="sobre">
        <div className="hero-grid" aria-hidden="true" /><div className="orb orb-one" aria-hidden="true" /><div className="orb orb-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Grupo moçambicano · Maputo</p>
          <h1>Um grupo.<br />xyz soluções.<br /><em>Uma visão de futuro.</em></h1>
          <p className="lead">Um ecossistema empresarial que une tecnologia, registo empresarial, soluções financeiras, transporte e manutenção para fazer ideias, organizações e pessoas avançarem.</p>
          <div className="hero-actions"><a className="button button-primary" href="#empresas">Explorar empresas <span>↓</span></a><a className="text-link" href="#contactos">Falar connosco <span>↗</span></a></div>
        </div>
        <div className="hero-3d" aria-hidden="true">
          <div className="orbit orbit-a"><i /></div><div className="orbit orbit-b"><i /></div><div className="orbit orbit-c"><i /></div>
          <div className="mega-core"><span>T</span><b>THE<br/>ECOSYSTEM</b></div>
          <div className="float-panel panel-tech"><small>01</small><strong>TECH</strong></div>
          <div className="float-panel panel-legal"><small>02</small><strong>LEGAL</strong></div>
          <div className="float-panel panel-credit"><small>03</small><strong>CRÉDITO</strong></div>
          <div className="float-panel panel-transport"><small>04</small><strong>TRANSMEC</strong></div>
        </div>
        <aside className="hero-index" aria-label="Áreas do grupo"><p>QUATRO EMPRESAS<br />UMA DIREÇÃO</p><ol><li><span>01</span> Tecnologia</li><li><span>02</span> Registo empresarial</li><li><span>03</span> Microcrédito</li><li><span>04</span> Transporte & manutenção</li></ol></aside>
        <p className="scroll-note">SCROLL PARA DESCOBRIR <span>↓</span></p>
      </section>

      <section className="companies-section" id="empresas">
        <div className="section-heading" data-reveal><p className="eyebrow dark"><span /> O nosso ecossistema</p><h2>Especialistas em cada área.<br /><em>Uma ambição partilhada.</em></h2><p>Quatro empresas independentes, unidas por uma cultura de proximidade, rigor e inovação.</p></div>
        <div className="company-list">
          {cards.map((company, index) => <article className={`company-card ${company.className}`} key={company.slug} data-reveal onPointerMove={tiltCard} onPointerLeave={resetTilt}>
            <div className="company-number">0{index + 1}</div><div className="company-logo-stage">{company.logo ? <img src={company.logo} alt={`${company.name} — logótipo`} /> : <span className="transmec-wordmark" aria-label="TransMec Solutions"><b>TRANS</b>MEC<small>SOLUTIONS</small></span>}</div>
            <h3>{company.name}</h3><p>{company.intro}</p>
            <a href={`/${company.slug}`} onClick={(event) => enterCompany(event, company)}>Explorar empresa <span>↗</span></a>
          </article>)}
        </div>
      </section>

      <section className="vision-section" id="impacto">
        <div className="vision-copy" data-reveal><p className="eyebrow"><span /> A nossa direção</p><h2>O futuro constrói-se com <em>competência</em>, confiança e coragem.</h2></div>
        <div className="metrics" data-reveal><div><strong>04</strong><span>áreas estratégicas</span></div><div><strong>01</strong><span>visão integrada</span></div><div><strong>∞</strong><span>possibilidades</span></div></div>
        <p className="vision-note">Criamos relações duradouras e soluções úteis — com atenção ao contexto de Moçambique e ambição para ir além-fronteiras.</p>
      </section>

      <section className="contact-section" id="contactos" data-reveal><p className="eyebrow dark"><span /> Vamos conversar</p><div><h2>Grandes movimentos<br />começam com uma conversa.</h2><a className="circle-link" href="mailto:seiuanealodio@gmail.com" aria-label="Enviar email">↗</a></div><p><a href="tel:+258849306684">+258 84 930 6684</a> · <a href="mailto:seiuanealodio@gmail.com">seiuanealodio@gmail.com</a> · Maputo, Moçambique</p></section>
      <footer className="group-footer"><Link className="brand" href="/"><span className="brand-mark">T</span><span>THE <b>HOLDING</b></span></Link><p>Conteúdo institucional provisório, preparado para atualização.</p><span>© {new Date().getFullYear()} The Holding</span></footer>
    </main>
  );
}
