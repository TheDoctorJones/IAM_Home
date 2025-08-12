"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  PrinterIcon as Print,
  PanelRightClose,
  PanelRightOpen,
  FileText,
  Calendar,
  DollarSign,
  Building,
  User,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { getDocumentById, type Agreement, type Document } from "@/lib/data/agreements"
import { DocumentRenderer } from "@/components/document-renderer"
import type { DocumentType } from "@/lib/types/document-renderer"

export default function DocumentViewerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { id } = params
  const [agreementData, setAgreementData] = useState<{ agreement: Agreement; document: Document } | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(100)

  // Check if user came from agreement detail page
  const fromAgreement = searchParams.get("from") === "agreement"
  const agreementId = searchParams.get("agreementId")

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))

      const foundData = getDocumentById(id)
      if (foundData) {
        setAgreementData(foundData)
      }

      setLoading(false)
    }

    loadDocument()
  }, [id])

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50))
  }

  const handleBackClick = () => {
    if (fromAgreement && agreementId) {
      // If user came from agreement detail page, go back to that agreement
      router.push(`/agreements/${agreementId}`)
    } else {
      // Otherwise, go back to agreements list with the correct view
      const currentView = localStorage.getItem("agreements-previous-view") || "all"
      router.push(`/agreements?view=${currentView}`)
    }
  }

  const getRiskBadge = (type: "low" | "medium" | "high") => {
    switch (type) {
      case "low":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-gray-200 text-gray-800 border-gray-400">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-gray-400 text-gray-900 border-gray-600">High Risk</Badge>
    }
  }

  const getPhaseBadge = (phase: string) => {
    return <Badge className="bg-gray-100 text-gray-700 border-gray-300">{phase}</Badge>
  }

  // Map document types to DocumentRenderer types
  const mapDocumentType = (docType: string): DocumentType => {
    const typeMap: Record<string, DocumentType> = {
      "Master Service Agreement": "contract",
      "Software License Agreement": "contract",
      "Service Agreement": "contract",
      "License Agreement": "contract",
      "Partnership Agreement": "contract",
      "Contractor Agreement": "contract",
      "Non-Disclosure Agreement": "contract",
      "Renewal Agreement": "contract",
      "Co-Seller Application": "form",
      "Policy Acknowledgment": "form",
      "Vendor Agreement": "form",
      Amendment: "addendum",
      Addendum: "addendum",
      "Statement of Work": "contract",
      "Service Level Agreement": "contract",
      "License Schedule": "contract",
      "Technical Specification": "contract",
      Deliverable: "contract",
      "Compliance Document": "contract",
      "Pricing Schedule": "contract",
    }

    return typeMap[docType] || "contract"
  }

  // Generate sample key terms based on document type
  const getSampleKeyTerms = (doc: Document) => {
    if (doc.keyTerms) return doc.keyTerms

    const sampleTerms = {
      paymentTerms: "",
      renewalClause: "",
      terminationNotice: "",
      liability: "",
      jurisdiction: "",
    }

    switch (doc.type) {
      case "Master Service Agreement":
        sampleTerms.paymentTerms = "Net 30 days from invoice date"
        sampleTerms.renewalClause = "Auto-renewal for 1 year unless terminated with 60 days notice"
        sampleTerms.terminationNotice = "60 days written notice required"
        sampleTerms.liability = "Limited to 12 months of fees paid"
        sampleTerms.jurisdiction = "State of Delaware"
        break
      case "Software License Agreement":
        sampleTerms.paymentTerms = "Annual payment in advance"
        sampleTerms.renewalClause = "Auto-renewal with 5% increase"
        sampleTerms.terminationNotice = "90 days written notice required"
        sampleTerms.liability = "Limited to fees paid in previous 12 months"
        sampleTerms.jurisdiction = "State of California"
        break
      case "Statement of Work":
        sampleTerms.paymentTerms = "50% upfront, 50% upon completion"
        sampleTerms.terminationNotice = "30 days written notice required"
        sampleTerms.liability = "Limited to fees paid for the specific SOW"
        sampleTerms.jurisdiction = "State of New York"
        break
      case "Amendment":
        sampleTerms.paymentTerms = "As per original agreement"
        sampleTerms.renewalClause = "Extends original agreement terms"
        sampleTerms.terminationNotice = "As per original agreement"
        sampleTerms.jurisdiction = "As per original agreement"
        break
      default:
        sampleTerms.paymentTerms = "Net 30 days"
        sampleTerms.renewalClause = "Annual renewal upon mutual agreement"
        sampleTerms.terminationNotice = "60 days written notice"
        sampleTerms.liability = "Limited to fees paid"
        sampleTerms.jurisdiction = "Governing law of contract state"
    }

    return sampleTerms
  }

  // Generate sample risk factors based on document type and status
  const getSampleRiskFactors = (doc: Document) => {
    if (doc.riskFactors && doc.riskFactors.length > 0) return doc.riskFactors

    const riskFactors = []

    // Add risks based on document type
    if (doc.type === "Master Service Agreement") {
      riskFactors.push({
        type: "medium",
        description: "Broad indemnification clause may increase liability exposure",
      })
      riskFactors.push({
        type: "low",
        description: "Standard confidentiality provisions with 3-year term",
      })
    } else if (doc.type === "Software License Agreement") {
      riskFactors.push({
        type: "high",
        description: "Unlimited liability clause requires legal review",
      })
      riskFactors.push({
        type: "medium",
        description: "IP indemnification scope is broader than our standard terms",
      })
    } else if (doc.type === "Statement of Work") {
      riskFactors.push({
        type: "low",
        description: "Delivery timeline is aggressive but achievable",
      })
    }

    // Add risks based on document status
    if (doc.status === "Expired") {
      riskFactors.push({
        type: "high",
        description: "Agreement has expired and requires immediate renewal",
      })
    } else if (doc.status === "Draft") {
      riskFactors.push({
        type: "medium",
        description: "Several key terms still under negotiation",
      })
    }

    // If no specific risks were added, add a default low risk
    if (riskFactors.length === 0) {
      riskFactors.push({
        type: "low",
        description: "Standard terms aligned with company policy",
      })
    }

    return riskFactors
  }

  // Generate sample signatures based on document status
  const getSampleSignatures = (doc: Document) => {
    if (doc.signatures && doc.signatures.length > 0) return doc.signatures

    const signatures = []

    if (doc.status === "Completed" || doc.status === "Active") {
      signatures.push({
        name: "Alex Johnson",
        role: "Your Company Representative",
        status: "signed",
        date: doc.effectiveDate || "January 15, 2025",
      })
      signatures.push({
        name: "Sarah Williams",
        role: "Client Representative",
        status: "signed",
        date: doc.effectiveDate || "January 15, 2025",
      })
    } else if (doc.status === "Waiting for Signature") {
      signatures.push({
        name: "Alex Johnson",
        role: "Your Company Representative",
        status: "signed",
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      })
      signatures.push({
        name: "Sarah Williams",
        role: "Client Representative",
        status: "pending",
      })
    } else {
      signatures.push({
        name: "Alex Johnson",
        role: "Your Company Representative",
        status: "pending",
      })
      signatures.push({
        name: "Sarah Williams",
        role: "Client Representative",
        status: "pending",
      })
    }

    return signatures
  }

  if (loading || !agreementData) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading document...</p>
          </div>
        </div>
      </div>
    )
  }

  const { agreement, document } = agreementData

  // Get sample data for the modules
  const keyTerms = getSampleKeyTerms(document)
  const riskFactors = getSampleRiskFactors(document)
  const signatures = getSampleSignatures(document)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Document Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBackClick}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{document.name}</h1>
              <p className="text-sm text-gray-500">{agreement.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 min-w-[60px] text-center">{zoomLevel}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm">
              <Print className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "top center",
              }}
            >
              <DocumentRenderer
                type={mapDocumentType(document.type)}
                mode="agreement"
                data={{
                  name: document.type,
                  companyName: "Your Company Name",
                  clientName: "Client Company Name",
                  documentNumber: document.id,
                  effectiveDate: document.effectiveDate,
                  expirationDate: document.expirationDate,
                  contractValue: document.value || agreement.value,
                  paymentTerms: keyTerms.paymentTerms,
                  signatures: signatures.map((sig) => ({
                    name: sig.name,
                    role: sig.role,
                    status: sig.status as "pending" | "signed" | "declined",
                    date: sig.date,
                  })),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-80 bg-white border-l flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">Document Details</h2>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">{document.name}</div>
                      <div className="text-xs text-gray-500">{document.type}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">{agreement.party}</div>
                      <div className="text-xs text-gray-500">Counterparty</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">{document.owner}</div>
                      <div className="text-xs text-gray-500">Document Owner</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <Badge className="bg-gray-100 text-gray-700 border-gray-300">{document.status}</Badge>
                  </div>

                  {document.phase && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Phase</span>
                      {getPhaseBadge(document.phase)}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contract Dates */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Contract Dates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {document.effectiveDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">{document.effectiveDate}</div>
                        <div className="text-xs text-gray-500">Effective Date</div>
                      </div>
                    </div>
                  )}

                  {document.expirationDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">{document.expirationDate}</div>
                        <div className="text-xs text-gray-500">Expiration Date</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">{document.lastUpdated}</div>
                      <div className="text-xs text-gray-500">Last Updated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Information */}
              {(document.value || agreement.value) && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Financial Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-lg font-semibold">{document.value || agreement.value}</div>
                        <div className="text-xs text-gray-500">Contract Value</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Key Terms Module */}
              <div className="border rounded-lg bg-white">
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-900">Key Terms</h3>
                </div>
                <div className="p-4 space-y-3">
                  {keyTerms.paymentTerms && (
                    <div>
                      <div className="text-xs text-gray-500">Payment Terms</div>
                      <div className="text-sm font-medium">{keyTerms.paymentTerms}</div>
                    </div>
                  )}
                  {keyTerms.renewalClause && (
                    <div>
                      <div className="text-xs text-gray-500">Renewal Clause</div>
                      <div className="text-sm font-medium">{keyTerms.renewalClause}</div>
                    </div>
                  )}
                  {keyTerms.terminationNotice && (
                    <div>
                      <div className="text-xs text-gray-500">Termination Notice</div>
                      <div className="text-sm font-medium">{keyTerms.terminationNotice}</div>
                    </div>
                  )}
                  {keyTerms.liability && (
                    <div>
                      <div className="text-xs text-gray-500">Liability</div>
                      <div className="text-sm font-medium">{keyTerms.liability}</div>
                    </div>
                  )}
                  {keyTerms.jurisdiction && (
                    <div>
                      <div className="text-xs text-gray-500">Jurisdiction</div>
                      <div className="text-sm font-medium">{keyTerms.jurisdiction}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Risk Assessment Module */}
              <div className="border rounded-lg bg-white">
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Risk Assessment
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {riskFactors.map((risk, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        {getRiskBadge(risk.type)}
                        {risk.type === "high" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="text-xs text-gray-600">{risk.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signatures Module */}
              <div className="border rounded-lg bg-white">
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-900">Signatures</h3>
                </div>
                <div className="p-4 space-y-3">
                  {signatures.map((signature, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{signature.name}</div>
                        <div className="text-xs text-gray-500">{signature.role}</div>
                      </div>
                      <div className="text-right">
                        {signature.status === "signed" ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-gray-700" />
                            <span className="text-xs text-gray-800">Signed</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-600">Pending</span>
                        )}
                        {signature.date && <div className="text-xs text-gray-500">{signature.date}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
