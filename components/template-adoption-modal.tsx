"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LayoutTemplateIcon as Template, TrendingUp, CheckCircle } from "lucide-react"

interface TemplateAdoptionModalProps {
  trigger: React.ReactNode
}

export default function TemplateAdoptionModal({ trigger }: TemplateAdoptionModalProps) {
  const [open, setOpen] = useState(false)

  const templateData = [
    {
      name: "Sales MSA Template v2.1",
      category: "Sales",
      adoption: 95,
      usage: 47,
      avgSignatureTime: 6.2,
      improvement: 18,
      status: "excellent",
    },
    {
      name: "HR Employment Agreement",
      category: "HR",
      adoption: 88,
      usage: 34,
      avgSignatureTime: 4.1,
      improvement: 12,
      status: "good",
    },
    {
      name: "Procurement Vendor Agreement",
      category: "Procurement",
      adoption: 92,
      usage: 28,
      avgSignatureTime: 8.5,
      improvement: 22,
      status: "excellent",
    },
    {
      name: "Legal NDA Template",
      category: "Legal",
      adoption: 76,
      usage: 19,
      avgSignatureTime: 3.2,
      improvement: 5,
      status: "needs-improvement",
    },
  ]

  const departmentStats = [
    { department: "Sales", adoption: 89, templates: 12, growth: 15 },
    { department: "HR", adoption: 85, templates: 8, growth: 8 },
    { department: "Procurement", adoption: 92, templates: 6, growth: 22 },
    { department: "Legal", adoption: 78, templates: 4, growth: 5 },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Template className="h-5 w-5 text-gray-600" />
              Template Adoption Analysis
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Overall Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">89%</div>
                <div className="text-sm text-gray-500">Overall Adoption</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-700">30</div>
                <div className="text-sm text-gray-500">Active Templates</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">544</div>
                <div className="text-sm text-gray-500">Monthly Usage</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">+12%</div>
                <div className="text-sm text-gray-500">QoQ Growth</div>
              </div>
            </div>

            {/* Template Performance */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Template Performance</h3>
              <div className="space-y-3">
                {templateData.map((template, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{template.name}</span>
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          {template.category}
                        </Badge>
                        {template.status === "excellent" && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Excellent
                          </Badge>
                        )}
                        {template.status === "needs-improvement" && (
                          <Badge variant="outline" className="bg-gray-200 text-gray-900 border-gray-400">
                            Needs Review
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{template.usage} uses this month</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-gray-500">Adoption Rate</div>
                        <div className="flex items-center gap-2">
                          <Progress value={template.adoption} className="h-1 flex-1" />
                          <span className="font-medium">{template.adoption}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Avg. Signature Time</div>
                        <div className="font-medium">{template.avgSignatureTime} days</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Performance vs Previous</div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-gray-600" />
                          <span className="text-gray-600 font-medium">+{template.improvement}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/*
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Department Adoption</h3>
              <div className="space-y-2">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{dept.department}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-sm">
                        <span className="text-gray-500">Templates: </span>
                        <span className="font-medium">{dept.templates}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={dept.adoption} className="h-2 w-20" />
                        <span className="text-sm font-medium w-8">{dept.adoption}%</span>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">+{dept.growth}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            */}

            <div className="p-3 border rounded-lg bg-green-50/30">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Adoption Success</h4>
                  <p className="text-sm text-gray-600">
                    Template adoption has increased 12% this quarter. Procurement shows highest growth at +22%. Consider
                    promoting successful templates across departments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
