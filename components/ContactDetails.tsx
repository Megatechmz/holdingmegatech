type ContactDetailsProps = { className?: string };

export function ContactDetails({ className = "" }: ContactDetailsProps) {
  return (
    <div className={`contact-details ${className}`.trim()}>
      <a href="tel:+258829305684">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a14 14 0 0 1-6-6l3-2-2-5Z" /></svg>
        <small>Telefone</small>
        <span>82 930 5684</span>
      </a>
      <a href="mailto:as.megatechmz@gmail.com">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3z" /><path d="m3 6 9 7 9-7" /></svg>
        <small>Email</small>
        <span>as.megatechmz@gmail.com</span>
      </a>
      <a href="https://www.google.com/maps/search/?api=1&query=Maputo%2C%20Mo%C3%A7ambique" target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
        <small>Localização</small>
        <span>Maputo, Moçambique</span>
      </a>
    </div>
  );
}
