"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, AlertTriangle, FileText, Building } from "lucide-react"

interface RiskyClausesModalProps {
  trigger: React.ReactNode
}

export default function RiskyClausesModal({ trigger }: RiskyClausesModalProps) {
  const [open, setOpen] = useState(false)

  const riskyClauses = [
    {
      id: 1,
      type: "Indemnification",
      description: "Unlimited indemnification for third-party claims",
      count: 3,
      severity: "high",
      examples: [
        { company: "TechGiant Corp", contract: "Enterprise SaaS Agreement" },
        { company: "Global Industries Inc.", contract: "Annual renewal - Platinum tier" },
      ],
    },
    {
      id: 2,
      type: "Auto-Renewal",
      description: "Automatic renewal with >90 day cancellation notice",
      count: 5,
      severity: "high",
      examples: [
        { company: "EastCoast Solutions", contract: "New territory expansion contract" },
        { company: "MegaCorp Enterprises", contract: "Multi-year service agreement" },
      ],
    },
    {
      id: 3,
      type: "Payment Terms",
      description: "Extended payment terms (Net-90)",
      count: 4,
      severity: "medium",
      examples: [
        { company: "Pacific Partners", contract: "Regional distribution agreement" },
        { company: "Innovate Solutions", contract: "Technology licensing agreement" },
      ],
    },
    {
      id: 4,
      type: "SLA Penalties",
      description: "Excessive penalties for SLA violations",
      count: 2,
      severity: "medium",
      examples: [
        { company: "DataTech Inc.", contract: "Cloud services agreement" },
        { company: "FinServ Group", contract: "Financial services platform" },
      ],
    },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-gray-600" />
              Non-Standard Terms Analysis
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {riskyClauses.map((clause) => (
              <div key={clause.id} className="border rounded-lg overflow-hidden">
                <div
                  className={`p-3 flex items-center justify-between ${
                    clause.severity === "high" ? "bg-gray-50" : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {clause.severity === "high" ? (
                      <AlertTriangle className="h-4 w-4 text-gray-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="font-medium">{clause.type}</span>
                    <Badge
                      variant="outline"
                      className={
                        clause.severity === "high"
                          ? "bg-gray-50 text-gray-700 border-gray-200"
                          : "bg-gray-100 text-gray-800 border-gray-300"
                      }
                    >
                      {clause.severity === "high" ? "High Risk" : "Medium Risk"}
                    </Badge>
                  </div>
                  <span className="text-sm">{clause.count} instances</span>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600 mb-3">{clause.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-gray-500">EXAMPLES:</h4>
                    {clause.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Building className="h-3 w-3 text-gray-500" />
                          <span>{example.company}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <FileText className="h-3 w-3" />
                          <span>{example.contract}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2 flex items-center justify-between border-t">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Total Non-Standard Terms</span>
              </div>
              <div className="font-bold text-gray-700">14 clauses across 9 contracts</div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
