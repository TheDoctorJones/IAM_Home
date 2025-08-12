import type { DocumentLayout, DocumentType } from "@/lib/types/document-renderer"

export const documentLayouts: Record<DocumentType, DocumentLayout> = {
  contract: {
    title: "Service Agreement",
    sections: [
      { component: "header" },
      { component: "parties" },
      { component: "content", props: { showFullContent: true } },
      { component: "keyTerms" },
      { component: "signatures" },
      { component: "footer" },
    ],
  },
  msa: {
    title: "Master Service Agreement",
    sections: [
      { component: "header" },
      { component: "parties" },
      { component: "content", props: { showFullContent: true } },
      { component: "keyTerms" },
      { component: "signatures" },
      { component: "footer" },
    ],
  },
  nda: {
    title: "Non-Disclosure Agreement",
    sections: [
      { component: "header" },
      { component: "parties" },
      { component: "content", props: { showFullContent: false } },
      { component: "signatures" },
      { component: "footer" },
    ],
  },
  sow: {
    title: "Statement of Work",
    sections: [
      { component: "header" },
      { component: "parties" },
      { component: "content", props: { showFullContent: true } },
      { component: "keyTerms" },
      { component: "signatures" },
      { component: "footer" },
    ],
  },
  addendum: {
    title: "Contract Addendum",
    sections: [
      { component: "header" },
      { component: "content", props: { showFullContent: false } },
      { component: "signatures" },
      { component: "footer" },
    ],
  },
  amendment: {
    title: "Contract Amendment",
    sections: [
      { component: "header" },
      { component: "content", props: { showFullContent: false } },
      { component: "signatures" },
      { component: "footer" },
    ],
  },
  form: {
    title: "Application Form",
    sections: [{ component: "header" }, { component: "fields" }, { component: "signatures" }, { component: "footer" }],
  },
  "purchase-order": {
    title: "Purchase Order",
    sections: [
      { component: "header" },
      { component: "parties" },
      { component: "keyTerms" },
      { component: "signatures" },
      { component: "footer" },
    ],
  },
  invoice: {
    title: "Invoice",
    sections: [{ component: "header" }, { component: "keyTerms" }, { component: "footer" }],
  },
  proposal: {
    title: "Business Proposal",
    sections: [
      { component: "header" },
      { component: "parties" },
      { component: "content", props: { showFullContent: true } },
      { component: "keyTerms" },
      { component: "footer" },
    ],
  },
}
