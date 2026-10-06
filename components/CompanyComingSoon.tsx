import Link from "next/link";
import type { companies } from "../data/companies";

type Company = (typeof companies)[keyof typeof companies];

export function CompanyComingSoon({ company }: { company: Company }) {
  return (
    <main className="coming-soon-page" style={{ "--coming-accent": company.accent } as React.CSSProperties}>
      <div className="coming-soon-grid" aria-hidden="true" />
      <div className="coming-soon-orb" aria-hidden="true" />
      <header className="coming-soon-header">
        <Link className="brand" href="/" aria-label="The Holding — início">
          <span className="brand-mark">T</span><span>THE <b>HOLDING</b></span>
        </Link>
        <Link className="coming-soon-back" href="/">← Voltar à The Holding</Link>
      </header>
      <section className="coming-soon-content">
        <p className="eyebrow"><span /> Uma empresa da The Holding</p>
        {company.logo && <img className="coming-soon-logo" src={company.logo} alt={`${company.name} — logótipo`} />}
        <p className="coming-soon-status"><i /> Página em preparação</p>
        <h1>{company.name}<br /><em>Brevemente.</em></h1>
        <p className="coming-soon-copy">Estamos a preparar esta área. Em breve, poderá conhecer melhor a empresa e as suas soluções.</p>
        <Link className="coming-soon-contact" href="/">Conhecer as outras empresas <span>↗</span></Link>
      </section>
      <footer className="coming-soon-footer">
        <span>© {new Date().getFullYear()} The Holding</span>
        <a href="tel:+258849306684">+258 84 930 6684</a>
        <a href="mailto:seiuanealodio@gmail.com">seiuanealodio@gmail.com</a>
      </footer>
    </main>
  );
}
