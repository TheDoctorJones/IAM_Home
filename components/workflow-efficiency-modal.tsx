"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Workflow, AlertTriangle, Clock } from "lucide-react"

interface WorkflowEfficiencyModalProps {
  trigger: React.ReactNode
}

export default function WorkflowEfficiencyModal({ trigger }: WorkflowEfficiencyModalProps) {
  const [open, setOpen] = useState(false)

  const bottleneckAnalysis = [
    {
      stage: "Legal Review",
      avgTime: 5.2,
      targetTime: 3.0,
      impact: "High",
      affectedWorkflows: 3,
      suggestion: "Add additional legal reviewer or implement pre-approved clauses",
    },
    {
      stage: "Manager Approval",
      avgTime: 2.8,
      targetTime: 1.5,
      impact: "Medium",
      affectedWorkflows: 2,
      suggestion: "Implement delegation rules for routine approvals",
    },
    {
      stage: "Vendor Response",
      avgTime: 4.5,
      targetTime: 2.0,
      impact: "Medium",
      affectedWorkflows: 1,
      suggestion: "Set up automated reminders and escalation rules",
    },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-gray-600" />
              Workflow Efficiency Analysis
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Overall Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">12.4</div>
                <div className="text-sm text-gray-500">Avg. Days</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-700">8.5</div>
                <div className="text-sm text-gray-500">Target Days</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">82%</div>
                <div className="text-sm text-gray-500">Avg. Efficiency</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-500">Active Workflows</div>
              </div>
            </div>

            {/* Bottleneck Analysis */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Bottleneck Analysis</h3>
              <div className="space-y-3">
                {bottleneckAnalysis.map((bottleneck, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">{bottleneck.stage}</span>
                        <Badge
                          variant="outline"
                          className={`${
                            bottleneck.impact === "High"
                              ? "bg-gray-50 text-gray-700 border-gray-200"
                              : "bg-gray-100 text-gray-800 border-gray-300"
                          }`}
                        >
                          {bottleneck.impact} Impact
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Affects {bottleneck.affectedWorkflows} workflow{bottleneck.affectedWorkflows > 1 ? "s" : ""}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                      <div>
                        <span className="text-gray-500">Current: </span>
                        <span className="font-medium">{bottleneck.avgTime} days</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Target: </span>
                        <span className="font-medium">{bottleneck.targetTime} days</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                      <span className="font-medium">Suggestion: </span>
                      {bottleneck.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 border rounded-lg bg-amber-50/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Optimization Opportunity</h4>
                  <p className="text-sm text-gray-600">
                    Legal Review is the primary bottleneck across multiple workflows, adding an average of 2.2 days.
                    Implementing pre-approved clause libraries could reduce review time by 40%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
