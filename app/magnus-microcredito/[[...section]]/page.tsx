import type { Metadata } from "next";
import { CompanyComingSoon } from "../../../components/CompanyComingSoon";
import { companies } from "../../../data/companies";

export const metadata: Metadata = {
  title: "Magnus Microcrédito — Brevemente",
  description: "A página da Magnus Microcrédito está em preparação. Em breve, mais informações.",
};

export default function Page() {
  return <CompanyComingSoon company={companies.credit} />;
}
