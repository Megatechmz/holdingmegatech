import type { Metadata } from "next";
import { CompanySite } from "../../../components/CompanySite";
import { companies, sectionLabels } from "../../../data/companies";
export async function generateMetadata({params}:{params:Promise<{section?:string[]}>}):Promise<Metadata>{const {section=[]}=await params;const label=sectionLabels[section[0]];const c=companies.legal;return{title:label?`${label} — ${c.name}`:`${c.name} — Consultoria em registo empresarial`,description:c.intro,openGraph:{title:label?`${label} — ${c.name}`:c.headline,description:c.intro,images:[]},twitter:{title:label?`${label} — ${c.name}`:c.headline,description:c.intro,images:[]}}}
export default async function Page({params}:{params:Promise<{section?:string[]}>}){const {section=[]}=await params;return <CompanySite companyKey="legal" active={section[0]}/>}
