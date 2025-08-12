"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Clock, Building, AlertCircle, Repeat, PenTool } from "lucide-react"

interface SignatureCycleModalProps {
  trigger: React.ReactNode
}

export default function SignatureCycleModal({ trigger }: SignatureCycleModalProps) {
  const [open, setOpen] = useState(false)

  const cycleTimeData = [
    {
      stage: "Legal Review",
      averageTime: 3.1,
      previousTime: 3.8,
      change: -0.7,
      percentage: 38,
      color: "#000000",
      bottlenecks: "Contract redlines, non-standard terms",
    },
    {
      stage: "Counterparty",
      averageTime: 2.8,
      previousTime: 3.5,
      change: -0.7,
      percentage: 34,
      color: "#666666",
      bottlenecks: "Multiple approvers, legal review",
    },
    {
      stage: "Internal Approval",
      averageTime: 1.6,
      previousTime: 2.1,
      change: -0.5,
      percentage: 20,
      color: "#999999",
      bottlenecks: "Finance review, executive availability",
    },
    {
      stage: "Final Signature",
      averageTime: 0.7,
      previousTime: 0.8,
      change: -0.1,
      percentage: 8,
      color: "#CCCCCC",
      bottlenecks: "Signer availability, technical issues",
    },
  ]

  const counterpartyData = [
    {
      company: "TechGiant Corp",
      avgTime: 4.2,
      redlineFrequency: "High (5+ rounds)",
      signerDelay: 1.8,
      status: "slow",
    },
    {
      company: "Global Industries Inc.",
      avgTime: 3.5,
      redlineFrequency: "Medium (2-4 rounds)",
      signerDelay: 1.2,
      status: "medium",
    },
    {
      company: "Innovate Solutions",
      avgTime: 1.8,
      redlineFrequency: "Low (0-1 rounds)",
      signerDelay: 0.5,
      status: "fast",
    },
    {
      company: "EastCoast Solutions",
      avgTime: 2.3,
      redlineFrequency: "Medium (2-4 rounds)",
      signerDelay: 0.8,
      status: "medium",
    },
    {
      company: "MegaCorp Enterprises",
      avgTime: 3.9,
      redlineFrequency: "High (5+ rounds)",
      signerDelay: 1.5,
      status: "slow",
    },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              Signature Cycle Analysis
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="cycle-time" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cycle-time">Cycle Time Breakdown</TabsTrigger>
              <TabsTrigger value="counterparty">Counterparty Behavior</TabsTrigger>
            </TabsList>

            <TabsContent value="cycle-time" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Time by Stage</h3>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Total Avg: 8.2 days</span>
                  <span className="text-xs text-gray-600">-1.5 days vs Q1</span>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                {cycleTimeData.map((stage, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }}></div>
                        <span className="font-medium">{stage.stage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{stage.averageTime} days</span>
                        <span className={`text-xs ${stage.change < 0 ? "text-gray-600" : "text-gray-400"}`}>
                          {stage.change < 0 ? "" : "+"}
                          {stage.change} days
                        </span>
                      </div>
                    </div>
                    <Progress value={stage.percentage} className="h-3">
                      <div
                        className="h-full rounded-full relative"
                        style={{
                          width: `${stage.percentage}%`,
                          backgroundColor:
                            index === 0 ? "#000000" : index === 1 ? "#666666" : index === 2 ? "#999999" : "#CCCCCC",
                        }}
                      >
                        {stage.percentage >= 15 && (
                          <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                            {stage.percentage}%
                          </span>
                        )}
                      </div>
                    </Progress>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Bottlenecks: {stage.bottlenecks}</span>
                      <span>{stage.percentage}% of total time</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border rounded-lg bg-blue-50/30 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Optimization Opportunity</h4>
                    <p className="text-sm text-gray-600">
                      Legal review and counterparty stages account for 72% of total cycle time. Implementing
                      pre-approved templates could reduce legal review by up to 40%.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="counterparty" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Counterparty Signature Behavior</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Sorted by time to signature</span>
                </div>
              </div>

              <div className="space-y-3">
                {counterpartyData.map((company, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{company.company}</span>
                        {company.status === "slow" && (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            Slow
                          </Badge>
                        )}
                        {company.status === "medium" && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                            Average
                          </Badge>
                        )}
                        {company.status === "fast" && (
                          <Badge variant="outline" className="bg-gray-200 text-gray-900 border-gray-400">
                            Fast
                          </Badge>
                        )}
                      </div>
                      <span className="font-medium">{company.avgTime} days avg</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Repeat className="h-3.5 w-3.5" />
                        <span>Redlines: {company.redlineFrequency}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <PenTool className="h-3.5 w-3.5" />
                        <span>Signer delay: {company.signerDelay} days</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border rounded-lg bg-blue-50/30 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Behavior Insights</h4>
                    <p className="text-sm text-gray-600">
                      Companies with high redline frequency take 2.3x longer to complete signatures. Consider
                      pre-negotiation calls with TechGiant Corp and MegaCorp to reduce redline rounds.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="pt-4 flex justify-end">
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
