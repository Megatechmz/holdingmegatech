import { CompanyComingSoon } from "../../../components/CompanyComingSoon";
import { companies } from "../../../data/companies";

export default function LegacyMegaMicrocreditoPage() {
  return <CompanyComingSoon company={companies.credit} />;
}
