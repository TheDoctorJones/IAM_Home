"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, AlertTriangle, Building } from "lucide-react"

interface DealVelocityModalProps {
  trigger: React.ReactNode
}

export default function DealVelocityModal({ trigger }: DealVelocityModalProps) {
  const [open, setOpen] = useState(false)

  const velocityData = [
    {
      stage: "Proposal",
      currentTime: 5.2,
      targetTime: 4.0,
      percentage: 25,
      color: "#000000",
      status: "over",
    },
    {
      stage: "Negotiation",
      currentTime: 8.5,
      targetTime: 7.0,
      percentage: 35,
      color: "#666666",
      status: "over",
    },
    {
      stage: "Contract Review",
      currentTime: 7.8,
      targetTime: 5.0,
      percentage: 30,
      color: "#999999",
      status: "over",
    },
    {
      stage: "Signature",
      currentTime: 2.5,
      targetTime: 3.0,
      percentage: 10,
      color: "#CCCCCC",
      status: "under",
    },
  ]

  const slowDeals = [
    {
      name: "TechGiant Corp",
      value: "$450,000",
      stage: "Contract Review",
      daysInStage: 8,
      issue: "Legal review bottleneck",
    },
    {
      name: "Global Industries Inc.",
      value: "$325,000",
      stage: "Negotiation",
      daysInStage: 12,
      issue: "Price negotiation stalled",
    },
    {
      name: "Innovate Solutions",
      value: "$275,000",
      stage: "Proposal",
      daysInStage: 7,
      issue: "Awaiting stakeholder review",
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
              Deal Velocity Analysis
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Overall Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">24 days</div>
                <div className="text-sm text-gray-500">Avg. Time to Close</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-700">21 days</div>
                <div className="text-sm text-gray-500">Target Time</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">+3 days</div>
                <div className="text-sm text-gray-500">Over Target</div>
              </div>
            </div>

            {/* Stage Breakdown */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Time by Stage</h3>
              <div className="space-y-3">
                {velocityData.map((stage, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }}></div>
                        <span className="font-medium">{stage.stage}</span>
                        {stage.status === "over" && (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            Over Target
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{stage.currentTime} days</span>
                        <span className="text-xs text-gray-500">(target: {stage.targetTime}d)</span>
                      </div>
                    </div>
                    <Progress value={stage.percentage} className="h-2">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${stage.percentage}%`,
                          backgroundColor: stage.color,
                        }}
                      />
                    </Progress>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{stage.percentage}% of total time</span>
                      <span className={stage.status === "over" ? "text-gray-600" : "text-gray-400"}>
                        {stage.status === "over" ? "+" : "-"}
                        {Math.abs(stage.currentTime - stage.targetTime).toFixed(1)} days vs target
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slow Deals */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Deals Requiring Attention</h3>
              <div className="space-y-2">
                {slowDeals.map((deal, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{deal.name}</span>
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                          {deal.stage}
                        </Badge>
                      </div>
                      <span className="font-medium text-gray-700">{deal.value}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-sm text-gray-600">
                      <span>{deal.daysInStage} days in current stage</span>
                      <span>{deal.issue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 border rounded-lg bg-amber-50/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Velocity Improvement Opportunity</h4>
                  <p className="text-sm text-gray-600">
                    Contract Review stage is the biggest bottleneck, taking 56% longer than target. Consider escalating
                    legal reviews or implementing pre-approved templates.
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
