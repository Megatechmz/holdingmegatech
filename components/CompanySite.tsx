"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { companies, type CompanyKey } from "../data/companies";

const navMap: Record<CompanyKey, { label: string; path: string }[]> = {
  tech: [{label:"Sobre",path:"sobre"},{label:"Serviços",path:"servicos"},{label:"Soluções",path:"solucoes"},{label:"Projetos",path:"projetos"},{label:"Contactos",path:"contactos"}],
  legal: [{label:"Sobre",path:"sobre"},{label:"Serviços",path:"servicos"},{label:"Áreas de atuação",path:"areas-atuacao"},{label:"Contactos",path:"contactos"}],
  credit: [{label:"Sobre",path:"sobre"},{label:"Produtos",path:"produtos"},{label:"Como funciona",path:"como-funciona"},{label:"Simulador",path:"simulador"},{label:"Contactos",path:"contactos"}],
  transport: [{label:"Sobre",path:"sobre"},{label:"Serviços",path:"servicos"},{label:"Soluções",path:"solucoes"},{label:"Manutenção",path:"manutencao"},{label:"Contactos",path:"contactos"}],
};

const inquiryFields: Record<CompanyKey, { name: string; label: string; type?: string; kind?: "textarea"; options?: string[] }[]> = {
  tech: [
    { name: "empresa", label: "Empresa ou organização" },
    { name: "tipoProjeto", label: "Tipo de projeto", options: ["Website ou plataforma", "Software à medida", "Aplicação mobile", "Automação", "Cloud e infraestrutura", "Outro"] },
    { name: "descricao", label: "Descreva brevemente o projeto", kind: "textarea" },
  ],
  legal: [
    { name: "nomePretendido", label: "Nome pretendido para a empresa" },
    { name: "atividade", label: "Atividade principal da empresa" },
    { name: "socios", label: "Número de sócios", type: "number" },
  ],
  credit: [
    { name: "valor", label: "Valor pretendido (MT)", type: "number" },
    { name: "finalidade", label: "Finalidade do crédito", options: ["Necessidade pessoal", "Capital para negócio", "Compra de equipamento", "Emergência", "Outra"] },
    { name: "atividade", label: "Profissão ou atividade comercial" },
  ],
  transport: [
    { name: "empresa", label: "Empresa ou organização" },
    { name: "servico", label: "Serviço pretendido", options: ["Transporte de carga", "Logística integrada", "Manutenção preventiva", "Manutenção corretiva", "Gestão de equipamentos", "Outro"] },
    { name: "local", label: "Local, rota ou área de operação" },
    { name: "detalhes", label: "Descreva a necessidade, carga ou equipamento", kind: "textarea" },
  ],
};

export function CompanySite({ companyKey, active }: { companyKey: CompanyKey; active?: string }) {
  const company = companies[companyKey];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(active);
  const [formOpen, setFormOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const [amount, setAmount] = useState(20000);
  const figures = useMemo(() => { const interest = amount * .3; const total = amount + interest; return { interest, total, installment: total }; }, [amount]);
  const money = (value: number) => new Intl.NumberFormat("pt-MZ", { maximumFractionDigits: 0 }).format(value) + " MT";

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .1 });
    nodes.forEach((node) => observer.observe(node));
    const handleScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      rootRef.current?.style.setProperty("--page-progress", String(Math.min(window.scrollY / max, 1)));
      rootRef.current?.style.setProperty("--hero-progress", String(Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1)));
      setScrolled(window.scrollY > 48);
    };
    window.addEventListener("scroll", handleScroll, { passive: true }); handleScroll();
    if (active) window.setTimeout(() => document.getElementById(active)?.scrollIntoView({ behavior: "smooth" }), 150);
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleScroll); };
  }, [active]);

  useEffect(() => { setCurrentSection(active); }, [active]);

  useEffect(() => {
    if (!formOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setFormOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [formOpen]);

  function move3d(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5;
    event.currentTarget.style.setProperty("--rx", `${-y * 13}deg`); event.currentTarget.style.setProperty("--ry", `${x * 15}deg`);
    event.currentTarget.style.setProperty("--px", `${(x + .5) * 100}%`); event.currentTarget.style.setProperty("--py", `${(y + .5) * 100}%`);
  }

  function reset3d(event: React.PointerEvent<HTMLElement>) { event.currentTarget.style.setProperty("--rx", "0deg"); event.currentTarget.style.setProperty("--ry", "0deg"); }

  function navigateToSection(event: React.MouseEvent<HTMLAnchorElement>, path: string) {
    const section = document.getElementById(path);
    if (!section) return;
    event.preventDefault();
    window.history.pushState({}, "", `/${company.slug}/${path}`);
    setCurrentSection(path);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }

  function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`).join("\n");
    window.location.href = `mailto:seiuanealodio@gmail.com?subject=${encodeURIComponent(company.ctaLabel)}&body=${encodeURIComponent(body)}`;
  }

  return <main ref={rootRef} className={`company-site ${company.className}`} style={{"--company-accent":company.accent,"--company-secondary":company.accent2,"--company-dark":company.dark,"--company-pale":company.pale} as React.CSSProperties}>
    <div className="company-progress" aria-hidden="true"><i /></div>
    <header className={`site-header company-header ${scrolled ? "is-scrolled" : ""}`}><Link href={`/${company.slug}`} className="company-brand"><span className="company-brand-logo">{company.logo ? <img src={company.logo} alt={`${company.name} — logótipo`} /> : <span className="transmec-wordmark" aria-label="TransMec Solutions"><b>TRANS</b>MEC<small>SOLUTIONS</small></span>}</span></Link>
      <nav className="desktop-nav" aria-label={`Navegação ${company.name}`}>{navMap[companyKey].map(item => <Link className={currentSection === item.path ? "active" : ""} href={`/${company.slug}/${item.path}`} onClick={event => navigateToSection(event, item.path)} key={item.path}>{item.label}</Link>)}</nav>
      <a href="/" className="group-return">The Holding <span>↗</span></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu"><i/><i/></button>
    </header>
    <div className={`mobile-menu company-mobile ${menuOpen?"open":""}`}>{navMap[companyKey].map(item=><Link href={`/${company.slug}/${item.path}`} onClick={event => navigateToSection(event, item.path)} key={item.path}>{item.label}</Link>)}<a href="/">← The Holding</a></div>

    <section className="company-hero"><div className={`company-grid ${companyKey === "transport" ? "has-video" : ""}`}>{companyKey === "transport" && <video className="company-grid-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/video/transmec-hero.mp4" type="video/mp4" /></video>}</div><div className="company-hero-copy"><p className="eyebrow"><span/>{company.eyebrow}</p><h1>{company.headline}</h1><p>{company.intro}</p><a className="button company-button" href={companyKey === "credit" ? "#produtos" : "#servicos"}>Descobrir soluções <span>↓</span></a></div><div className="company-symbol" aria-hidden="true" onPointerMove={move3d} onPointerLeave={reset3d}><span className="symbol-logo">{company.logo ? <img src={company.logo} alt="" /> : <span className="transmec-wordmark"><b>TRANS</b>MEC<small>SOLUTIONS</small></span>}</span><i/><i/><b className="symbol-plane plane-one"/><b className="symbol-plane plane-two"/></div><p className="company-side-note">{company.statement}</p></section>

    <section className="company-about" id="sobre" data-reveal><p className="eyebrow dark"><span/> Sobre a {company.name}</p><div><h2>{companyKey === "legal" ? <>Registo empresarial,<br/>do início à formalização.</> : companyKey === "transport" ? <>Da estrada à oficina,<br/>operação sem interrupções.</> : <>Estratégia, execução<br/>e proximidade.</>}</h2><p>{company.intro} Como unidade da The Holding, combinamos conhecimento especializado com uma visão integrada sobre as necessidades de cada cliente.</p></div></section>

    <section className="services-section" id={companyKey === "credit" ? "produtos" : "servicos"}><div className="section-heading" data-reveal><p className="eyebrow dark"><span/> {companyKey === "credit" ? "Produtos" : "O que fazemos"}</p><h2>{company.showcaseTitle}</h2></div><div className="service-grid">{company.services.map((service,index)=><article key={service} data-reveal><span>{String(index+1).padStart(2,"0")}</span><h3>{service}</h3><i>↗</i></article>)}</div></section>

    <section className="showcase-section" id={companyKey === "legal" ? "areas-atuacao" : "solucoes"}><div className="showcase-top"><p className="eyebrow"><span/> Em foco</p><h2>{company.statement}</h2></div><div className="showcase-grid">{company.showcases.map((item,index)=><article key={item.title} data-reveal><div className="visual-field has-photo"><img className={`showcase-photo photo-${index+1}`} src={company.showcaseImage} alt={item.title}/><b>{String(index+1).padStart(2,"0")}</b><i/><i/></div><p>{item.tag}</p><h3>{item.title}</h3><span>{item.note}</span></article>)}</div></section>

    {companyKey === "tech" && <section className="signature-section tech-signature" id="projetos"><div className="signature-copy" data-reveal><p className="eyebrow"><span/> Digital command centre</p><h2>O seu negócio,<br/>visível em tempo real.</h2><p>Produtos digitais vivos: dados claros, fluxos automatizados e uma infraestrutura que evolui com a operação.</p><div className="tech-stack"><span>REACT</span><span>NEXT.JS</span><span>NODE</span><span>CLOUD</span></div></div><div className="tech-console interactive-3d" onPointerMove={move3d} onPointerLeave={reset3d} data-reveal><div className="console-top"><i/><i/><i/><span>mega_system / live</span></div><div className="console-grid"><div className="pulse-ring"><b>M</b><i/><i/></div><ul><li><span>Systems online</span><strong>12/12</strong></li><li><span>Automations</span><strong>+42%</strong></li><li><span>Response time</span><strong>84ms</strong></li></ul></div><code>deploy → measure → evolve_</code></div></section>}

    {companyKey === "legal" && <section className="signature-section legal-signature"><div className="legal-seal interactive-3d" onPointerMove={move3d} onPointerLeave={reset3d} data-reveal><div><small>LEGAL START</small><strong>LS</strong><span>REGISTO · ORDEM · ENTREGA</span></div></div><div className="signature-copy" data-reveal><p className="eyebrow"><span/> Registo acompanhado</p><h2>Da ideia à empresa<br/><em>formalizada.</em></h2><p>Cuidamos do processo de registo empresarial com informação clara, documentação organizada e acompanhamento em cada etapa.</p><dl><div><dt>01</dt><dd>Requisitos explicados com clareza</dd></div><div><dt>02</dt><dd>Documentos preparados e verificados</dd></div><div><dt>03</dt><dd>Processo acompanhado até à entrega</dd></div></dl></div></section>}

    {companyKey === "credit" && <section className="signature-section credit-signature"><div className="signature-copy" data-reveal><p className="eyebrow"><span/> Crédito em movimento</p><h2>Capital para transformar intenção em ação.</h2><p>Uma experiência simples, transparente e próxima — do primeiro cálculo à resposta final.</p><a className="button company-button" href="#simulador">Simular agora <span>↘</span></a></div><div className="credit-steps-3d interactive-3d" onPointerMove={move3d} onPointerLeave={reset3d} data-reveal>{["Simule","Solicite","Avance"].map((label,index)=><div key={label}><span>0{index+1}</span><strong>{label}</strong><i style={{height:`${45+index*25}%`}}/></div>)}</div></section>}

    {companyKey === "transport" && <section className="signature-section transport-signature" id="manutencao"><div className="signature-copy" data-reveal><p className="eyebrow"><span/> Disponibilidade operacional</p><h2>Manutenção que evita paragens.</h2><p>Inspeção, diagnóstico e intervenção técnica em máquinas e equipamentos, com foco em segurança, desempenho e continuidade da operação.</p><a className="button company-button" href="#contactos" onClick={(event) => { event.preventDefault(); setFormOpen(true); }}>Solicitar assistência <span>↗</span></a></div><div className="maintenance-deck interactive-3d" onPointerMove={move3d} onPointerLeave={reset3d} data-reveal><div className="maintenance-orbit"><span>24/7</span><i/><i/><i/></div><dl><div><dt>01</dt><dd><strong>Preventiva</strong><span>Planos de inspeção e conservação.</span></dd></div><div><dt>02</dt><dd><strong>Corretiva</strong><span>Diagnóstico e reparação no terreno.</span></dd></div><div><dt>03</dt><dd><strong>Disponibilidade</strong><span>Mais tempo produtivo para cada equipamento.</span></dd></div></dl></div></section>}

    <section className="process-section" id={companyKey === "credit" ? "como-funciona" : "processo"}><div data-reveal><p className="eyebrow dark"><span/> Como trabalhamos</p><h2>Um caminho claro,<br/>do início ao resultado.</h2></div><ol>{company.steps.map((step,index)=><li key={step} data-reveal><span>0{index+1}</span><strong>{step}</strong><i/></li>)}</ol></section>

    {companyKey === "credit" && <section className="simulator-section" id="simulador"><div className="simulator-intro" data-reveal><p className="eyebrow"><span/> Simulador</p><h2>Planeie antes de avançar.</h2><p>Prazo único de 1 mês e taxa fixa de 30%, independentemente do valor solicitado. Os valores são indicativos e não constituem uma proposta de crédito.</p></div><div className="calculator" data-reveal><label>Valor pretendido <strong>{money(amount)}</strong><input aria-label="Valor pretendido" type="range" min="5000" max="200000" step="5000" value={amount} onChange={e=>setAmount(Number(e.target.value))}/></label><div className="field-row fixed-fields"><label>Prazo<strong>1 mês</strong></label><label>Taxa fixa<strong>30%</strong></label></div><div className="calculation"><div><span>Capital</span><strong>{money(amount)}</strong></div><div><span>Juros (30%)</span><strong>{money(figures.interest)}</strong></div><div><span>Total a pagar em 1 mês</span><strong>{money(figures.total)}</strong></div><div className="installment"><span>Pagamento estimado</span><strong>{money(figures.installment)}<small>/1 mês</small></strong></div></div><button type="button" className="button company-button" onClick={() => setFormOpen(true)}>Solicitar crédito <span>↗</span></button></div></section>}

    <section className="company-cta" id="contactos"><p>PRONTO PARA COMEÇAR?</p><h2>{company.cta}</h2><a href="#pedido" onClick={(event) => { event.preventDefault(); setFormOpen(true); }}>{company.ctaLabel} <span>↗</span></a><div className="company-contact-line"><a href="tel:+258849306684">+258 84 930 6684</a><a href="mailto:seiuanealodio@gmail.com">seiuanealodio@gmail.com</a></div></section>

    <div className={`inquiry-modal ${formOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!formOpen} aria-labelledby="inquiry-title" onMouseDown={event => event.target === event.currentTarget && setFormOpen(false)}><div className="inquiry-panel"><button className="inquiry-close" type="button" onClick={() => setFormOpen(false)} aria-label="Fechar formulário">×</button><p className="eyebrow dark"><span/> Pedido de contacto</p><h2 id="inquiry-title">{company.ctaLabel}</h2><p>Preencha os dados abaixo. A equipa entrará em contacto consigo.</p><form onSubmit={submitInquiry}><div className="inquiry-grid"><label>Nome completo<input name="nome" required /></label><label>Telefone<input name="telefone" type="tel" required /></label><label>Email<input name="email" type="email" /></label>{inquiryFields[companyKey].map(field => <label className={field.kind === "textarea" ? "wide" : ""} key={field.name}>{field.label}{field.kind === "textarea" ? <textarea name={field.name} rows={4} required/> : field.options ? <select name={field.name} required><option value="">Selecione</option>{field.options.map(option => <option value={option} key={option}>{option}</option>)}</select> : <input name={field.name} type={field.type || "text"} required/>}</label>)}</div><button className="button company-button" type="submit">Enviar pedido <span>↗</span></button></form><small>Ao enviar, será aberto o seu aplicativo de email com os dados preenchidos.</small></div></div>

    <footer className="company-footer"><div><span className="company-footer-logo">{company.logo ? <img src={company.logo} alt={`${company.name} — logótipo`} /> : <span className="transmec-wordmark" aria-label="TransMec Solutions"><b>TRANS</b>MEC<small>SOLUTIONS</small></span>}</span></div><p><a href="tel:+258849306684">+258 84 930 6684</a><br/><a href="mailto:seiuanealodio@gmail.com">seiuanealodio@gmail.com</a><br/>Maputo, Moçambique</p><a href="/">← Voltar para The Holding</a></footer>
  </main>;
}
