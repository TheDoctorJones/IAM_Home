"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Award, Target } from "lucide-react"

interface TeamPerformanceModalProps {
  trigger: React.ReactNode
}

export default function TeamPerformanceModal({ trigger }: TeamPerformanceModalProps) {
  const [open, setOpen] = useState(false)

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Enterprise Sales",
      quota: 95,
      deals: 4,
      pipeline: "$1.2M",
      trend: "up",
    },
    {
      name: "David Chen",
      role: "Mid-Market Sales",
      quota: 87,
      deals: 7,
      pipeline: "$850K",
      trend: "up",
    },
    {
      name: "Maria Rodriguez",
      role: "SMB Sales",
      quota: 102,
      deals: 12,
      pipeline: "$620K",
      trend: "up",
    },
    {
      name: "James Wilson",
      role: "Strategic Accounts",
      quota: 78,
      deals: 2,
      pipeline: "$1.5M",
      trend: "down",
    },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              Team Performance Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${
                        member.quota >= 100
                          ? "bg-gray-50 text-gray-700 border-gray-200"
                          : member.quota >= 80
                            ? "bg-gray-100 text-gray-800 border-gray-300"
                            : "bg-gray-200 text-gray-900 border-gray-400"
                      }`}
                    >
                      {member.quota}% of quota
                    </Badge>
                    {member.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-gray-600" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-gray-400 rotate-180" />
                    )}
                  </div>
                </div>
                <Progress value={member.quota} className="h-2" />
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span>{member.deals} active deals</span>
                  </div>
                  <div className="font-medium">{member.pipeline} pipeline</div>
                </div>
              </div>
            ))}

            <div className="pt-3 flex items-center justify-between border-t">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Team Average</span>
              </div>
              <div className="font-bold text-gray-600">92% of quota</div>
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
