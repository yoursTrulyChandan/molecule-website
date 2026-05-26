import { getDocumentData } from "@/lib/documents-storage";
import Header from "./Header";

export default async function HeaderServer() {
  const docs = await getDocumentData();
  return (
    <Header
      investorCharterUrl={docs.investorCharter.url}
      disclosureDocumentUrl={docs.disclosureDocument.url}
    />
  );
}
