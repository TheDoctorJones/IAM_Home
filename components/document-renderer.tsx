import type { DocumentType, DocumentMode, DocumentData } from "@/lib/types/document-renderer"
import { documentLayouts } from "@/lib/data/document-layouts"
import { FileText } from "lucide-react"

interface DocumentRendererProps {
  type: DocumentType
  mode: DocumentMode
  data: DocumentData
  className?: string
}

export function DocumentRenderer({ type, mode, data, className = "" }: DocumentRendererProps) {
  const layout = documentLayouts[type]

  if (!layout) {
    return <div className="p-8 text-center text-muted-foreground">Document type "{type}" not found</div>
  }

  // Helper function to get value or placeholder based on mode
  const getValue = (value: string | undefined, placeholder: string): string => {
    if (mode === "template") {
      return placeholder
    }
    return value || placeholder.replace(/[[\]]/g, "")
  }

  // Component renderers
  const renderHeader = () => (
    <div className="flex items-center justify-between mb-8 pb-4 border-b">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
          <FileText className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{data.name || layout.title}</h1>
          <p className="text-sm text-muted-foreground">{getValue(data.documentNumber, "[DOC-NUMBER]")}</p>
        </div>
      </div>
    </div>
  )

  const renderParties = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Parties</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Company</h4>
          {mode === "template" ? (
            <div className="space-y-1">
              <div className="text-sm">[COMPANY_NAME]</div>
              <div className="text-sm">[COMPANY_ADDRESS]</div>
              <div className="text-sm">[COMPANY_CITY], [STATE] [ZIP]</div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-sm font-medium">{data.companyName || "Company Name"}</div>
              <div className="text-sm text-muted-foreground">123 Business Street</div>
              <div className="text-sm text-muted-foreground">Business City, ST 12345</div>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium mb-2">Client</h4>
          {mode === "template" ? (
            <div className="space-y-1">
              <div className="text-sm">[CLIENT_NAME]</div>
              <div className="text-sm">[CLIENT_ADDRESS]</div>
              <div className="text-sm">[CLIENT_CITY], [STATE] [ZIP]</div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-sm font-medium">{data.clientName || "Client Name"}</div>
              <div className="text-sm text-muted-foreground">456 Client Avenue</div>
              <div className="text-sm text-muted-foreground">Client City, ST 67890</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderContent = (props: any = {}) => {
    const { showFullContent = true } = props
    let sectionCount = showFullContent ? 4 : 2

    // Special case for addendum - always show at least 5 sections
    if (type === "addendum") {
      sectionCount = 5
    }

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Terms and Conditions</h3>
        <div className="space-y-6">
          {Array.from({ length: sectionCount }, (_, i) => (
            <div key={i}>
              <h4 className="font-medium mb-2">{i + 1}. Section Title</h4>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/5"></div>
                {showFullContent && (
                  <>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderKeyTerms = () => (
    <div className="mb-8 p-4 bg-muted/50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Key Terms Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm font-medium">Effective Date:</span>
          <p className="text-sm">{getValue(data.effectiveDate, "[EFFECTIVE_DATE]")}</p>
        </div>
        <div>
          <span className="text-sm font-medium">Expiration:</span>
          <p className="text-sm">{getValue(data.expirationDate, "[EXPIRATION_DATE]")}</p>
        </div>
        <div>
          <span className="text-sm font-medium">Contract Value:</span>
          <p className="text-sm">{getValue(data.contractValue, "[CONTRACT_VALUE]")}</p>
        </div>
        <div>
          <span className="text-sm font-medium">Payment Terms:</span>
          <p className="text-sm">{getValue(data.paymentTerms, "[PAYMENT_TERMS]")}</p>
        </div>
      </div>
    </div>
  )

  const renderSignatures = () => {
    // Default signature data with template placeholders
    const defaultSignatures = [
      {
        name: "[SIGNER_1_NAME]",
        role: "[SIGNER_1_ROLE]",
        company: "[SIGNER_1_COMPANY]",
        status: "pending" as const,
        date: "[SIGNED_DATE_1]",
      },
      {
        name: "[SIGNER_2_NAME]",
        role: "[SIGNER_2_ROLE]",
        company: "[SIGNER_2_COMPANY]",
        status: "pending" as const,
        date: "[SIGNED_DATE_2]",
      },
    ]

    const signatures = mode === "template" ? defaultSignatures : data.signatures || defaultSignatures

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Signatures</h3>
        <div className="grid grid-cols-2 gap-4">
          {signatures.map((sig, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  {mode === "template" ? sig.name : sig.name || `[SIGNER_${i + 1}_NAME]`}
                </span>
                {mode !== "template" && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      sig.status === "signed"
                        ? "bg-green-100 text-green-800"
                        : sig.status === "declined"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {sig.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {mode === "template" ? sig.role : sig.role || `[SIGNER_${i + 1}_ROLE]`}
              </p>
              {mode === "template" && <p className="text-sm text-muted-foreground mb-2">{sig.company}</p>}
              {mode === "agreement" && sig.status === "signed" ? (
                <div className="h-8 flex items-center mb-2 px-2">
                  <span
                    className="text-lg text-blue-800 font-bold italic transform -rotate-1"
                    style={{ fontFamily: "cursive" }}
                  >
                    {sig.name}
                  </span>
                </div>
              ) : (
                <div className="h-8 bg-muted rounded mb-2"></div>
              )}
              <p className="text-xs text-muted-foreground">
                {mode === "template" ? `Signed: ${sig.date}` : sig.date ? `Signed: ${sig.date}` : "Pending signature"}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderFields = () => {
    const defaultFields = [
      { label: getValue(undefined, "[APPLICANT_NAME]"), type: "text" as const },
      { label: getValue(undefined, "[EMAIL_ADDRESS]"), type: "text" as const },
      { label: getValue(undefined, "[PHONE_NUMBER]"), type: "text" as const },
      { label: getValue(undefined, "[DATE_OF_BIRTH]"), type: "date" as const },
      { label: getValue(undefined, "[EMPLOYMENT_STATUS]"), type: "select" as const },
      { label: getValue(undefined, "[ANNUAL_INCOME]"), type: "number" as const },
      { label: getValue(undefined, "[PREFERRED_CONTACT_METHOD]"), type: "select" as const },
    ]

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Form Fields</h3>
        <div className="space-y-4">
          {(data.fields || defaultFields).map((field, i) => (
            <div key={i} className="space-y-1">
              <label className="text-sm font-medium">{field.label}</label>
              <div className="h-10 bg-muted rounded border"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderFooter = () => (
    <div className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
      <p>Document ID: {getValue(data.documentNumber, "[DOCUMENT_ID]")}</p>
      <p>Generated on {new Date().toLocaleDateString()}</p>
    </div>
  )

  // Component mapping
  const componentMap = {
    header: renderHeader,
    parties: renderParties,
    content: renderContent,
    keyTerms: renderKeyTerms,
    signatures: renderSignatures,
    fields: renderFields,
    footer: renderFooter,
  }

  return (
    <div className={`bg-white shadow-lg border ${className}`} style={{ borderRadius: "5px" }}>
      <div
        className="mx-auto bg-white"
        style={{
          width: "8.5in",
          minHeight: "11in",
          maxWidth: "100%",
          padding: "0.75in",
          boxSizing: "border-box",
          borderRadius: "5px",
        }}
      >
        <div className="min-h-full">
          {layout.sections.map((section, index) => {
            const Component = componentMap[section.component]
            return Component ? <div key={index}>{Component(section.props)}</div> : null
          })}
        </div>
      </div>
    </div>
  )
}
