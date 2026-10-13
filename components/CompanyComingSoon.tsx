import type { companies } from "../data/companies";
import { ContactDetails } from "./ContactDetails";

type Company = (typeof companies)[keyof typeof companies];

export function CompanyComingSoon({ company }: { company: Company }) {
  return (
    <main className="coming-soon-page" style={{ "--coming-accent": company.accent } as React.CSSProperties}>
      <div className="coming-soon-grid" aria-hidden="true" />
      <div className="coming-soon-orb" aria-hidden="true" />
      <header className="coming-soon-header">
        <a className="brand" href="/" aria-label="The Holding — início">
          <span className="brand-mark">T</span><span>THE <b>HOLDING</b></span>
        </a>
        <a className="coming-soon-back" href="/">← Voltar à The Holding</a>
      </header>
      <section className="coming-soon-content">
        <p className="eyebrow"><span /> Uma empresa da The Holding</p>
        {company.logo && <img className="coming-soon-logo" src={company.logo} alt={`${company.name} — logótipo`} />}
        <p className="coming-soon-status"><i /> Página em preparação</p>
        <h1>{company.name}<br /><em>Brevemente.</em></h1>
        <p className="coming-soon-copy">Estamos a preparar esta área. Em breve, poderá conhecer melhor a empresa e as suas soluções.</p>
        <a className="coming-soon-contact" href="/#empresas">Conhecer as outras empresas <span>↗</span></a>
      </section>
      <footer className="coming-soon-footer">
        <span>© 2026 Copyrights The Holding. Todos Direitos Reservados.</span>
        <ContactDetails className="coming-soon-contact-details" />
      </footer>
    </main>
  );
}
