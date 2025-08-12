"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar, Building, Lock } from "lucide-react"

interface TermRiskDetailsModalProps {
  trigger: React.ReactNode
}

export default function TermRiskDetailsModal({ trigger }: TermRiskDetailsModalProps) {
  const [open, setOpen] = useState(false)

  const riskCategories = [
    {
      category: "Auto-Renewal Clauses",
      amount: 1200000,
      percentage: 57,
      count: 8,
      trend: "+15%",
      description: "Agreements with automatic renewal terms exceeding 12 months",
      severity: "high",
    },
    {
      category: "Extended Payment Terms",
      amount: 550000,
      percentage: 26,
      count: 5,
      trend: "+8%",
      description: "Payment terms exceeding 60 days (standard is 30)",
      severity: "medium",
    },
    {
      category: "Unlimited Liability",
      amount: 250000,
      percentage: 12,
      count: 3,
      trend: "+5%",
      description: "Agreements without liability caps or with unlimited indemnification",
      severity: "high",
    },
    {
      category: "Non-Standard SLAs",
      amount: 100000,
      percentage: 5,
      count: 4,
      trend: "-10%",
      description: "Service level agreements with penalties exceeding standard terms",
      severity: "low",
    },
  ]

  const highRiskAccounts = [
    {
      name: "TechGiant Corp",
      value: "$450,000",
      risk: "Auto-renewal + Unlimited liability",
      renewal: "45 days",
    },
    {
      name: "Global Industries Inc.",
      value: "$325,000",
      risk: "90-day payment terms",
      renewal: "60 days",
    },
    {
      name: "Innovate Solutions",
      value: "$275,000",
      risk: "Non-standard SLA penalties",
      renewal: "90 days",
    },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
              Financial Risk Exposure
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4 relative">
            <div>
              <h3 className="text-lg font-medium mb-3">Risk Categories</h3>
              <div className="space-y-4">
                {riskCategories.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span>{item.category}</span>
                        {item.severity === "high" && (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            High Risk
                          </Badge>
                        )}
                        {item.severity === "medium" && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                            Medium Risk
                          </Badge>
                        )}
                        {item.severity === "low" && (
                          <Badge variant="outline" className="bg-gray-200 text-gray-900 border-gray-400">
                            Low Risk
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">${(item.amount / 1000000).toFixed(1)}M</span>
                        <span className={`text-xs ${item.trend.startsWith("+") ? "text-gray-600" : "text-gray-400"}`}>
                          {item.trend}
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={item.percentage}
                      className={`h-2 ${
                        item.severity === "high"
                          ? "bg-gray-100"
                          : item.severity === "medium"
                            ? "bg-gray-200"
                            : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`h-full rounded-full ${
                          item.severity === "high"
                            ? "bg-gray-500"
                            : item.severity === "medium"
                              ? "bg-gray-600"
                              : "bg-gray-700"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </Progress>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{item.count} agreements</span>
                      <span>{item.percentage}% of total risk</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">High Risk Accounts</h3>
              <div className="space-y-3">
                {highRiskAccounts.map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{account.name}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{account.risk}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>Renewal in {account.renewal}</span>
                      </div>
                      <span className="font-medium text-gray-700">{account.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* White gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-5% via-white/80 via-15% to-white flex items-center justify-center">
              <div className="text-center p-6 bg-white/95 rounded-lg shadow-lg border max-w-sm">
                <Lock className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Unlock Risk Analytics</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get detailed insights into your financial risk exposure and high-risk accounts.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Upgrade Now</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
