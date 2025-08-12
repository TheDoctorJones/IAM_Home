"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, AlertTriangle, TrendingDown, Calendar } from "lucide-react"

interface LicenseUtilizationModalProps {
  trigger: React.ReactNode
}

export default function LicenseUtilizationModal({ trigger }: LicenseUtilizationModalProps) {
  const [open, setOpen] = useState(false)

  const licenseData = [
    {
      tier: "Enterprise",
      total: 150,
      active: 115,
      utilization: 77,
      cost: 89,
      trend: -5,
      status: "needs-attention",
    },
    {
      tier: "Professional",
      total: 75,
      active: 68,
      utilization: 91,
      cost: 45,
      trend: 8,
      status: "good",
    },
    {
      tier: "Standard",
      total: 200,
      active: 185,
      utilization: 93,
      cost: 67,
      trend: 12,
      status: "excellent",
    },
    {
      tier: "Basic",
      total: 50,
      active: 42,
      utilization: 84,
      cost: 15,
      trend: -2,
      status: "good",
    },
  ]

  const unusedLicenses = [
    {
      user: "John Smith",
      department: "Sales",
      tier: "Enterprise",
      lastActive: "45 days ago",
      cost: "$89/month",
    },
    {
      user: "Maria Garcia",
      department: "Legal",
      tier: "Enterprise",
      lastActive: "38 days ago",
      cost: "$89/month",
    },
    {
      user: "David Wilson",
      department: "Operations",
      tier: "Professional",
      lastActive: "52 days ago",
      cost: "$45/month",
    },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              License Utilization Analysis
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Overall Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">475</div>
                <div className="text-sm text-gray-500">Total Licenses</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-700">410</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">86%</div>
                <div className="text-sm text-gray-500">Utilization Rate</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-900">$5.8K</div>
                <div className="text-sm text-gray-500">Unused Cost/Month</div>
              </div>
            </div>

            {/* License Tier Breakdown */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">License Tier Performance</h3>
              <div className="space-y-3">
                {licenseData.map((license, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{license.tier}</span>
                        {license.status === "excellent" && (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            Excellent
                          </Badge>
                        )}
                        {license.status === "needs-attention" && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Needs Attention
                          </Badge>
                        )}
                        {license.status === "good" && (
                          <Badge variant="outline" className="bg-gray-200 text-gray-900 border-gray-400">
                            Good
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">${license.cost}/month per seat</div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-gray-500">Utilization</div>
                        <div className="flex items-center gap-2">
                          <Progress value={license.utilization} className="h-1 flex-1" />
                          <span className="font-medium">{license.utilization}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Active/Total</div>
                        <div className="font-medium">
                          {license.active}/{license.total}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Unused Seats</div>
                        <div className="font-medium">{license.total - license.active}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Trend</div>
                        <div
                          className={`flex items-center gap-1 ${license.trend >= 0 ? "text-gray-600" : "text-gray-400"}`}
                        >
                          <TrendingDown className={`h-3 w-3 ${license.trend >= 0 ? "rotate-180" : ""}`} />
                          <span className="font-medium">
                            {license.trend >= 0 ? "+" : ""}
                            {license.trend}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unused Licenses */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Inactive License Holders</h3>
              <div className="space-y-2">
                {unusedLicenses.map((license, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{license.user}</span>
                        <Badge variant="outline" className="bg-gray-300 text-black border-gray-500">
                          {license.department}
                        </Badge>
                      </div>
                      <span className="font-medium text-gray-700">{license.cost}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-sm text-gray-600">
                      <span>{license.tier} License</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Last active: {license.lastActive}</span>
                      </div>
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
                    65 unused licenses across all tiers could save $5,800/month. Consider downgrading inactive users or
                    reallocating licenses to departments with higher demand.
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
