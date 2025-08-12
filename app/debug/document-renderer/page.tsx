"use client"

import { useState } from "react"
import { DocumentRenderer } from "@/components/document-renderer"
import type { DocumentType, DocumentMode, DocumentData } from "@/lib/types/document-renderer"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const sampleDataSets: Record<string, DocumentData> = {
  "tech-startup": {
    companyName: "TechGiant Corp",
    clientName: "StartupCo Inc",
    documentNumber: "MSA-2024-001",
    effectiveDate: "January 1, 2024",
    expirationDate: "December 31, 2024",
    contractValue: "$250,000",
    paymentTerms: "Net 30 days",
    signatures: [
      {
        name: "John Smith",
        role: "CEO",
        company: "TechGiant Corp",
        status: "signed",
        date: "2024-01-15",
      },
      {
        name: "Sarah Johnson",
        role: "CTO",
        company: "StartupCo Inc",
        status: "pending",
      },
    ],
    fields: [
      { label: "Full Name", type: "text" },
      { label: "Email Address", type: "text" },
      { label: "Phone Number", type: "text" },
      { label: "Date of Birth", type: "date" },
      { label: "Employment Status", type: "select" },
      { label: "Annual Income", type: "number" },
      { label: "Preferred Contact Method", type: "select" },
    ],
  },
  "consulting-firm": {
    companyName: "Strategic Consulting LLC",
    clientName: "Global Manufacturing Inc",
    documentNumber: "CON-2024-045",
    effectiveDate: "March 15, 2024",
    expirationDate: "March 14, 2025",
    contractValue: "$500,000",
    paymentTerms: "Net 45 days",
    signatures: [
      {
        name: "Michael Chen",
        role: "Managing Partner",
        company: "Strategic Consulting LLC",
        status: "signed",
        date: "2024-03-10",
      },
      {
        name: "Lisa Rodriguez",
        role: "VP Operations",
        company: "Global Manufacturing Inc",
        status: "signed",
        date: "2024-03-12",
      },
    ],
    fields: [
      { label: "Company Name", type: "text" },
      { label: "Business Registration Number", type: "text" },
      { label: "Primary Contact", type: "text" },
      { label: "Industry Type", type: "select" },
      { label: "Annual Revenue", type: "number" },
      { label: "Number of Employees", type: "number" },
      { label: "Service Requirements", type: "text" },
    ],
  },
  "healthcare-provider": {
    companyName: "MedTech Solutions",
    clientName: "Regional Hospital Network",
    documentNumber: "HLT-2024-078",
    effectiveDate: "June 1, 2024",
    expirationDate: "May 31, 2027",
    contractValue: "$1,200,000",
    paymentTerms: "Net 60 days",
    signatures: [
      {
        name: "Dr. Amanda Foster",
        role: "Chief Medical Officer",
        company: "MedTech Solutions",
        status: "pending",
      },
      {
        name: "Robert Kim",
        role: "Director of IT",
        company: "Regional Hospital Network",
        status: "pending",
      },
    ],
    fields: [
      { label: "Patient Name", type: "text" },
      { label: "Date of Service", type: "date" },
      { label: "Insurance Provider", type: "text" },
      { label: "Policy Number", type: "text" },
      { label: "Treatment Type", type: "select" },
      { label: "Emergency Contact", type: "text" },
      { label: "Special Instructions", type: "text" },
    ],
  },
  "financial-services": {
    companyName: "Capital Investment Group",
    clientName: "Emerging Markets Fund",
    documentNumber: "FIN-2024-156",
    effectiveDate: "September 1, 2024",
    expirationDate: "August 31, 2029",
    contractValue: "$2,500,000",
    paymentTerms: "Net 15 days",
    signatures: [
      {
        name: "Jennifer Walsh",
        role: "Senior Portfolio Manager",
        company: "Capital Investment Group",
        status: "signed",
        date: "2024-08-28",
      },
      {
        name: "David Park",
        role: "Fund Administrator",
        company: "Emerging Markets Fund",
        status: "signed",
        date: "2024-08-30",
      },
    ],
    fields: [
      { label: "Account Holder Name", type: "text" },
      { label: "Social Security Number", type: "text" },
      { label: "Investment Amount", type: "number" },
      { label: "Risk Tolerance", type: "select" },
      { label: "Investment Timeline", type: "select" },
      { label: "Banking Information", type: "text" },
      { label: "Beneficiary Information", type: "text" },
    ],
  },
  "real-estate": {
    companyName: "Premier Property Management",
    clientName: "Downtown Development Corp",
    documentNumber: "RE-2024-203",
    effectiveDate: "November 1, 2024",
    expirationDate: "October 31, 2026",
    contractValue: "$750,000",
    paymentTerms: "Net 30 days",
    signatures: [
      {
        name: "Maria Gonzalez",
        role: "Property Manager",
        company: "Premier Property Management",
        status: "pending",
      },
      {
        name: "Thomas Anderson",
        role: "Development Director",
        company: "Downtown Development Corp",
        status: "pending",
      },
    ],
    fields: [
      { label: "Property Address", type: "text" },
      { label: "Lease Start Date", type: "date" },
      { label: "Monthly Rent", type: "number" },
      { label: "Security Deposit", type: "number" },
      { label: "Pet Policy", type: "select" },
      { label: "Tenant Name", type: "text" },
      { label: "Emergency Contact", type: "text" },
    ],
  },
}

export default function DocumentRendererDebugPage() {
  const [selectedType, setSelectedType] = useState<DocumentType>("contract")
  const [selectedMode, setSelectedMode] = useState<DocumentMode>("agreement")
  const [selectedDataSet, setSelectedDataSet] = useState<string>("tech-startup")

  const currentData = sampleDataSets[selectedDataSet]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Document Renderer Debug</h1>
          <p className="text-muted-foreground">Test the document renderer component with different types and modes</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Document Type</label>
                <Select value={selectedType} onValueChange={(value: DocumentType) => setSelectedType(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="addendum">Addendum</SelectItem>
                    <SelectItem value="form">Form</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mode</label>
                <div className="flex gap-2">
                  <Button
                    variant={selectedMode === "agreement" ? "default" : "outline"}
                    onClick={() => setSelectedMode("agreement")}
                    size="sm"
                  >
                    Agreement Mode
                  </Button>
                  <Button
                    variant={selectedMode === "template" ? "default" : "outline"}
                    onClick={() => setSelectedMode("template")}
                    size="sm"
                  >
                    Template Mode
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sample Data</label>
                <Select value={selectedDataSet} onValueChange={setSelectedDataSet}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech-startup">Tech Startup</SelectItem>
                    <SelectItem value="consulting-firm">Consulting Firm</SelectItem>
                    <SelectItem value="healthcare-provider">Healthcare Provider</SelectItem>
                    <SelectItem value="financial-services">Financial Services</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Current Settings</label>
                <div className="flex gap-2">
                  <Badge variant="secondary">{selectedType}</Badge>
                  <Badge variant="default">{selectedMode}</Badge>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="text-sm text-muted-foreground mb-4">
                Sample Data: {JSON.stringify(currentData, null, 2).substring(0, 100)}...
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <DocumentRenderer type={selectedType} mode={selectedMode} data={currentData} />
        </div>
      </div>
    </div>
  )
}
