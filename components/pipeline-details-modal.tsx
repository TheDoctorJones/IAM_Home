"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, BarChart } from "lucide-react"

interface PipelineDetailsModalProps {
  trigger: React.ReactNode
}

export default function PipelineDetailsModal({ trigger }: PipelineDetailsModalProps) {
  const [open, setOpen] = useState(false)

  const revenueData = [
    { category: "Enterprise", amount: 1850000, percentage: 42, growth: 18 },
    { category: "Mid-Market", amount: 1250000, percentage: 28, growth: 22 },
    { category: "SMB", amount: 850000, percentage: 19, growth: 15 },
    { category: "Channel Partners", amount: 450000, percentage: 11, growth: 35 },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-gray-600" />
              Q2 Pipeline Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {revenueData.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${(item.amount / 1000000).toFixed(1)}M</span>
                    <span className="text-xs text-gray-600">+{item.growth}% YoY</span>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <div className="flex justify-end text-xs text-gray-500">{item.percentage}% of total</div>
              </div>
            ))}

            <div className="pt-2 flex items-center justify-between border-t">
              <span className="font-medium">Total Q2 Revenue</span>
              <div className="flex items-center gap-1 text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span className="font-bold">$4.4M</span>
                <span className="text-xs">+21% YoY</span>
              </div>
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
