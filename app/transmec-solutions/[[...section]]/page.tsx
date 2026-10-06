import type { Metadata } from "next";
import { CompanyComingSoon } from "../../../components/CompanyComingSoon";
import { companies } from "../../../data/companies";

export const metadata: Metadata = {
  title: "TransMec Solutions — Brevemente",
  description: "A página da TransMec Solutions está em preparação. Em breve, mais informações sobre transportes, logística e manutenção.",
};

export default function Page() {
  return <CompanyComingSoon company={companies.transport} />;
}
