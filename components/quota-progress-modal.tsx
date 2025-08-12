"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Calendar } from "lucide-react"

interface QuotaProgressModalProps {
  trigger: React.ReactNode
}

export default function QuotaProgressModal({ trigger }: QuotaProgressModalProps) {
  const [open, setOpen] = useState(false)

  const quotaData = {
    current: 780000,
    target: 1000000,
    percentage: 78,
    remaining: 220000,
    daysLeft: 15,
    deals: [
      {
        name: "TechGiant Corp",
        value: 450000,
        stage: "Contract Review",
        probability: 85,
        expectedClose: "May 30, 2025",
      },
      {
        name: "Innovate Solutions",
        value: 275000,
        stage: "Negotiation",
        probability: 70,
        expectedClose: "June 5, 2025",
      },
      {
        name: "StartupCo",
        value: 85000,
        stage: "Proposal",
        probability: 60,
        expectedClose: "June 10, 2025",
      },
    ],
  }

  const monthlyProgress = [
    { month: "Jan", achieved: 180000, target: 167000 },
    { month: "Feb", achieved: 165000, target: 167000 },
    { month: "Mar", achieved: 195000, target: 167000 },
    { month: "Apr", achieved: 240000, target: 167000 },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-gray-600" />
              Quota Progress Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Current Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Q2 2025 Progress</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    <TrendingUp className="mr-1 h-3 w-3 text-gray-600" />
                    On Track
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-600">${(quotaData.current / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-500">Achieved</div>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-700">${(quotaData.target / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-500">Target</div>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-800">${(quotaData.remaining / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-500">Remaining</div>
                </div>
              </div>

              <Progress value={quotaData.percentage} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{quotaData.percentage}% complete</span>
                <span>{quotaData.daysLeft} days remaining</span>
              </div>
            </div>

            {/* Key Deals */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Key Deals to Close Gap</h3>
              <div className="space-y-2">
                {quotaData.deals.map((deal, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{deal.name}</div>
                        <div className="text-sm text-gray-500">{deal.stage}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-700">${(deal.value / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-gray-500">{deal.probability}% probability</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>Expected close: {deal.expectedClose}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trend */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Monthly Performance</h3>
              <div className="space-y-2">
                {monthlyProgress.map((month, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-12">{month.month}</span>
                    <div className="flex-1 mx-4">
                      <Progress value={(month.achieved / month.target) * 100} className="h-2" />
                    </div>
                    <div className="text-sm text-right">
                      <span className={`font-medium text-gray-600`}>${(month.achieved / 1000).toFixed(0)}K</span>
                      <span className="text-gray-500"> / ${(month.target / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                ))}
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
