export type DocumentType = "contract" | "addendum" | "form"

export type DocumentMode = "agreement" | "template"

export interface DocumentData {
  companyName?: string
  clientName?: string
  documentNumber?: string
  effectiveDate?: string
  expirationDate?: string
  contractValue?: string
  paymentTerms?: string
  signatures?: Array<{
    name: string
    role: string
    company?: string
    status: "pending" | "signed" | "declined"
    date?: string
  }>
  fields?: Array<{
    label: string
    type: "text" | "date" | "select" | "number"
  }>
}

export interface DocumentSection {
  component: "header" | "parties" | "content" | "keyTerms" | "signatures" | "fields" | "footer"
  props?: any
}

export interface DocumentLayout {
  title: string
  sections: DocumentSection[]
}
