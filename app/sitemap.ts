import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://the-holding.seiuanealodio.chatgpt.site";
  const routes = [
    "",
    "/megatechnology", "/megatechnology/sobre", "/megatechnology/servicos", "/megatechnology/solucoes", "/megatechnology/projetos", "/megatechnology/contactos",
    "/legal-start", "/legal-start/sobre", "/legal-start/servicos", "/legal-start/areas-atuacao", "/legal-start/contactos",
    "/magnus-microcredito",
    "/transmec-solutions",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
