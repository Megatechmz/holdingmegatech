import { CompanyComingSoon } from "../../../components/CompanyComingSoon";
import { companies } from "../../../data/companies";

export default function TransMecSolutionsPage() {
  return <CompanyComingSoon company={companies.transport} />;
}
