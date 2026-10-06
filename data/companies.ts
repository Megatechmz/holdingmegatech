export type CompanyKey = "tech" | "legal" | "credit" | "transport";

export const companies = {
  tech: {
    key: "tech", slug: "megatechnology", name: "Megatechnology", short: "MEGA/TECH", className: "theme-tech", comingSoon: false,
    eyebrow: "Tecnologia · Produto · Inovação", headline: "Tecnologia que transforma negócios.",
    intro: "Desenhamos e implementamos produtos digitais, sistemas e infraestruturas que tornam organizações mais rápidas, conectadas e preparadas para crescer.",
    logo: "/brands/megatechnology-trimmed.png", showcaseImage: "/showcases/megatechnology-showcase.jpg", accent: "#22c7ec", accent2: "#0057b8", dark: "#030b1d", pale: "#eefaff", statement: "Do primeiro protótipo à operação em escala.",
    services: ["Websites & plataformas", "Software à medida", "Aplicações mobile", "UX/UI Design", "Integrações & APIs", "Cloud & infraestrutura", "Automação de processos", "Consultoria tecnológica"],
    showcaseTitle: "Soluções construídas para o mundo real.",
    showcases: [
      { tag: "Produto digital", title: "Plataforma de operações", note: "Dados, equipas e decisões no mesmo lugar." },
      { tag: "Experiência", title: "Ecossistema de serviços", note: "Uma jornada digital simples de ponta a ponta." },
      { tag: "Infraestrutura", title: "Cloud conectado", note: "Arquitetura resiliente e pronta para crescer." },
    ],
    steps: ["Descobrir", "Desenhar", "Construir", "Evoluir"], cta: "Vamos transformar a sua ideia numa solução digital.", ctaLabel: "Iniciar um projeto",
  },
  legal: {
    key: "legal", slug: "legal-start", name: "Legal Start Consulting", short: "LEGAL/START", className: "theme-legal", comingSoon: false,
    eyebrow: "Consultoria em registo empresarial", headline: "A sua empresa, formalizada com clareza.",
    intro: "Acompanhamos empreendedores em todas as etapas do registo empresarial, da preparação dos documentos à formalização da empresa.",
    logo: "/brands/legal-start-consulting-trimmed.png", showcaseImage: "/showcases/legal-start-showcase.jpg", accent: "#d3a349", accent2: "#062b4c", dark: "#031a2e", pale: "#f6f1e7", statement: "Registo empresarial simples, organizado e acompanhado.",
    services: ["Reserva de nome", "Constituição da empresa", "Registo comercial", "Obtenção de NUIT", "Licenciamento inicial", "Organização documental"],
    showcaseTitle: "Tudo o que precisa para formalizar a sua empresa.",
    showcases: [
      { tag: "Preparação", title: "Nome & documentação", note: "Organizamos os elementos necessários para iniciar o registo." },
      { tag: "Formalização", title: "Registo da empresa", note: "Acompanhamos o processo junto das entidades competentes." },
      { tag: "Conclusão", title: "Documentos organizados", note: "Entregamos o processo finalizado e pronto para a atividade." },
    ],
    steps: ["Contacto", "Recolha de dados", "Preparação documental", "Submissão do registo", "Entrega"], cta: "Vamos formalizar a sua empresa.", ctaLabel: "Iniciar o registo",
  },
  credit: {
    key: "credit", slug: "magnus-microcredito", name: "Magnus Microcrédito", short: "MAGNUS/CRÉDITO", className: "theme-credit", comingSoon: true,
    eyebrow: "Microcrédito · Em preparação", headline: "Magnus Microcrédito. Brevemente.",
    intro: "A página da Magnus Microcrédito está em preparação. Em breve, partilharemos mais informações.",
    accent: "#b8ff3d", accent2: "#75992a", dark: "#061713", pale: "#f2f0e8", statement: "Uma nova solução financeira está a caminho.",
    services: ["Crédito pessoal", "Crédito para negócio", "Capital de giro", "Equipamento produtivo", "Crédito para emergências", "Soluções personalizadas"],
    showcaseTitle: "Financiamento que acompanha a sua realidade.",
    showcases: [
      { tag: "Pessoal", title: "Planos que cabem na vida", note: "Objetivos importantes com prestação previsível." },
      { tag: "Negócio", title: "Capital para avançar", note: "Reforço para stock, operação e oportunidades." },
      { tag: "Produtivo", title: "Ferramentas para crescer", note: "Equipamentos que aumentam a sua capacidade." },
    ],
    steps: ["Simule", "Solicite", "Envie documentos", "Aguarde a análise", "Receba a resposta"], cta: "O seu próximo passo pode começar hoje.", ctaLabel: "Solicitar crédito",
  },
  transport: {
    key: "transport", slug: "transmec-solutions", name: "TransMec Solutions", short: "TRANS/MEC", className: "theme-transport", comingSoon: true,
    eyebrow: "Transportes · Logística · Manutenção", headline: "Movemos operações. Mantemos máquinas em ação.",
    intro: "Soluções integradas de transporte e logística, manutenção preventiva e corretiva de máquinas e equipamentos para operações seguras, eficientes e contínuas.",
    logo: "/brands/transmec-solutions.png", showcaseImage: "/showcases/transmec-solutions-showcase.jpg", accent: "#08a9b8", accent2: "#232323", dark: "#0b1517", pale: "#eef7f7", statement: "Carga em movimento. Equipamentos disponíveis.",
    services: ["Transporte de carga", "Logística integrada", "Distribuição e entregas", "Planeamento de rotas", "Manutenção preventiva", "Manutenção corretiva", "Assistência técnica", "Gestão de equipamentos"],
    showcaseTitle: "Operações fortes, da estrada à oficina.",
    showcases: [
      { tag: "Operações", title: "Transporte & logística", note: "Planeamento, acompanhamento e entrega com segurança." },
      { tag: "Disponibilidade", title: "Manutenção preventiva", note: "Intervenções programadas para reduzir paragens." },
      { tag: "Resposta técnica", title: "Manutenção corretiva", note: "Diagnóstico e reparação para retomar a operação." },
    ],
    steps: ["Diagnóstico", "Planeamento", "Mobilização", "Execução", "Acompanhamento"], cta: "Vamos mover e proteger a sua operação.", ctaLabel: "Solicitar cotação",
  },
} as const;

export const sectionLabels: Record<string, string> = {
  sobre: "Sobre", servicos: "Serviços", solucoes: "Soluções", projetos: "Projetos", contactos: "Contactos",
  "areas-atuacao": "Áreas de atuação", produtos: "Produtos", "como-funciona": "Como funciona", simulador: "Simulador", manutencao: "Manutenção",
};
