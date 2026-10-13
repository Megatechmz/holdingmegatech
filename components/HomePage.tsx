"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { companies } from "../data/companies";
import { ContactDetails } from "./ContactDetails";

const cards = [companies.tech, companies.legal, companies.credit, companies.transport];

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [entering, setEntering] = useState<{ name: string; accent: string; accent2: string; slug: string } | null>(null);
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
    event.preventDefault(); setEntering({ name: company.name, accent: company.accent, accent2: company.accent2, slug: company.slug });
    window.setTimeout(() => { window.location.href = `/${company.slug}`; }, 3000);
  }

  return (
    <main ref={mainRef} className="group-home">
      <div className={`page-transition ${entering ? "active" : ""} ${entering ? `for-${entering.slug}` : ""}`} style={{"--transition-accent": entering?.accent, "--transition-secondary": entering?.accent2} as React.CSSProperties} aria-hidden={!entering}>
        <div className="transition-code-panel" aria-hidden="true"><small>INITIALIZING_PORTAL</small><span><i>01</i> const portal = "MEGATECHNOLOGY";</span><span><i>02</i> status = "connecting";</span><span><i>03</i> deploy();</span><b>01001000&nbsp; 01010100</b></div>
        <div className="transition-documents" aria-hidden="true"><div className="transition-paper paper-back"/><div className="transition-paper paper-middle"/><div className="transition-paper paper-front"><small>LEGAL START</small><b>REGISTO<br/>EMPRESARIAL</b><i/><i/><i/><strong>LS</strong></div></div>
        <span>A entrar em</span><strong>{entering?.name}</strong><i />
      </div>
      <header className={`site-header group-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="brand" href="/" aria-label="The Holding — Início"><span className="brand-mark">T</span><span>THE <b>HOLDING</b></span></Link>
        <nav className="desktop-nav" aria-label="Navegação principal"><a href="#sobre">Sobre</a><a href="#empresas">Empresas</a><a href="#impacto">Visão</a><a href="#contactos">Contactos</a></nav>
        <a className="header-cta" href="#empresas">Conhecer o ecossistema <span>↗</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu"><i /><i /></button>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a><a href="#empresas" onClick={() => setMenuOpen(false)}>Empresas</a><a href="#contactos" onClick={() => setMenuOpen(false)}>Contactos</a></div>

      <section className="hero">
        <div className="hero-grid" aria-hidden="true" /><div className="orb orb-one" aria-hidden="true" /><div className="orb orb-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Grupo moçambicano · Maputo</p>
          <h1>Um grupo.<br />Diferentes soluções.<br /><em>Uma visão de futuro.</em></h1>
          <p className="lead">Um ecossistema moçambicano que combina tecnologia, formalização empresarial, soluções financeiras, logística e manutenção. Cada empresa especializa-se numa etapa do crescimento — com a mesma visão de confiança, inovação e progresso.</p>
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

      <section className="about-holding" id="sobre" aria-labelledby="about-title">
        <div className="about-holding-copy" data-reveal>
          <p className="eyebrow"><span /> Sobre a The Holding</p>
          <h2 id="about-title">Um grupo.<br /><em>Várias formas de avançar.</em></h2>
          <p>A The Holding reúne empresas especializadas em áreas complementares para apoiar pessoas, empreendedores e organizações em Moçambique. O ecossistema liga competências e serviços distintos sob uma visão comum de confiança, rigor e progresso.</p>
          <p>Mais do que reunir marcas, queremos facilitar o acesso a soluções adequadas a cada etapa — desde estruturar uma ideia e formalizar um negócio até desenvolver tecnologia ou manter uma operação em movimento.</p>
        </div>
        <div className="about-holding-areas" data-reveal>
          <p>ÁREAS DO ECOSSISTEMA</p>
          <div><span>01</span><strong>Tecnologia & inovação</strong></div>
          <div><span>02</span><strong>Registo empresarial</strong></div>
          <div><span>03</span><strong>Microcrédito</strong><small>Em preparação</small></div>
          <div><span>04</span><strong>Transportes, logística & manutenção</strong><small>Em preparação</small></div>
        </div>
      </section>

      <section className="companies-section" id="empresas">
        <div className="section-heading" data-reveal><p className="eyebrow dark"><span /> O nosso ecossistema</p><h2>Especialistas em cada área.<br /><em>Uma ambição partilhada.</em></h2><p>Quatro empresas independentes, unidas por uma cultura de proximidade, rigor e inovação.</p></div>
        <div className="company-list">
          {cards.map((company, index) => <article className={`company-card ${company.className}`} key={company.slug} aria-label={company.name} data-reveal onPointerMove={tiltCard} onPointerLeave={resetTilt}>
            <div className="company-number">0{index + 1}</div><div className="company-logo-stage">{company.logo ? <img src={company.logo} alt={`${company.name} — logótipo`} /> : company.key === "credit" ? <span className="mega-credit-wordmark" aria-label="Mega Microcrédito">MEGA<small>MICROCRÉDITO</small></span> : <span className="transmec-wordmark" aria-label="TransMec Solutions"><b>TRANS</b>MEC<small>SOLUTIONS</small></span>}</div>
            <div className="company-card-divider" aria-hidden="true" />
            <p>{company.comingSoon ? "Página em preparação. Mais informações em breve." : company.intro}</p>
            {company.comingSoon ? <span className="company-card-availability" role="status">Brevemente</span> : <a href={`/${company.slug}`} onClick={(event) => enterCompany(event, company)}>Explorar empresa <span>↗</span></a>}
          </article>)}
        </div>
      </section>

      <section className="vision-section" id="impacto">
        <div className="vision-copy" data-reveal><p className="eyebrow"><span /> A nossa direção</p><h2>O futuro constrói-se com <em>competência</em>, confiança e coragem.</h2></div>
        <div className="metrics" data-reveal><div><strong>04</strong><span>áreas estratégicas</span></div><div><strong>01</strong><span>visão integrada</span></div><div><strong>∞</strong><span>possibilidades</span></div></div>
        <p className="vision-note">Criamos relações duradouras e soluções úteis — com atenção ao contexto de Moçambique e ambição para ir além-fronteiras.</p>
      </section>

      <section className="contact-section" id="contactos" data-reveal><p className="eyebrow dark"><span /> Vamos conversar</p><div><h2>Grandes movimentos<br />começam com uma conversa.</h2><a className="circle-link" href="mailto:seiuanealodio@gmail.com" aria-label="Enviar email">↗</a></div><ContactDetails /></section>
      <footer className="group-footer"><Link className="brand" href="/"><span className="brand-mark">T</span><span>THE <b>HOLDING</b></span></Link><p>Conteúdo institucional provisório, preparado para atualização.</p><span>© {new Date().getFullYear()} The Holding</span></footer>
    </main>
  );
}
