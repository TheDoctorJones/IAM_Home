"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface SecurityScoreModalProps {
  trigger: React.ReactNode
}

export default function SecurityScoreModal({ trigger }: SecurityScoreModalProps) {
  const [open, setOpen] = useState(false)

  const securityMetrics = [
    {
      category: "Access Control",
      score: 92,
      maxScore: 100,
      status: "excellent",
      issues: 2,
      description: "User permissions and role management",
    },
    {
      category: "Authentication",
      score: 88,
      maxScore: 100,
      status: "good",
      issues: 3,
      description: "Multi-factor authentication and login security",
    },
    {
      category: "Data Protection",
      score: 85,
      maxScore: 100,
      status: "good",
      issues: 4,
      description: "Encryption and data handling policies",
    },
    {
      category: "Audit & Compliance",
      score: 78,
      maxScore: 100,
      status: "needs-attention",
      issues: 6,
      description: "Logging, monitoring, and compliance tracking",
    },
  ]

  const securityIssues = [
    {
      severity: "high",
      title: "Inactive admin accounts",
      description: "3 users with admin privileges haven't logged in for >60 days",
      affected: "3 users",
      action: "Review and revoke",
    },
    {
      severity: "medium",
      title: "Weak password policies",
      description: "12 users haven't updated passwords in >90 days",
      affected: "12 users",
      action: "Force password reset",
    },
    {
      severity: "medium",
      title: "Missing MFA enrollment",
      description: "8 users in sensitive roles don't have MFA enabled",
      affected: "8 users",
      action: "Enforce MFA",
    },
    {
      severity: "low",
      title: "Outdated access reviews",
      description: "Quarterly access review is 2 weeks overdue",
      affected: "All users",
      action: "Schedule review",
    },
  ]

  const complianceStatus = [
    { framework: "SOC 2 Type II", status: "compliant", lastAudit: "March 2025", nextAudit: "March 2026" },
    { framework: "GDPR", status: "compliant", lastAudit: "January 2025", nextAudit: "January 2026" },
    { framework: "HIPAA", status: "needs-review", lastAudit: "December 2024", nextAudit: "June 2025" },
    { framework: "ISO 27001", status: "in-progress", lastAudit: "N/A", nextAudit: "August 2025" },
  ]

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-600" />
              Security Score Analysis
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Overall Score */}
            {/*
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">87/100</div>
                <div className="text-sm text-gray-500">Overall Score</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-700">15</div>
                <div className="text-sm text-gray-500">Open Issues</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">98%</div>
                <div className="text-sm text-gray-500">Compliance Rate</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">+3</div>
                <div className="text-sm text-gray-500">Points This Month</div>
              </div>
            </div>
            */}

            {/* Security Categories */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Security Categories</h3>
              <div className="space-y-3">
                {securityMetrics.map((metric, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{metric.category}</span>
                        {metric.status === "excellent" && (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Excellent
                          </Badge>
                        )}
                        {metric.status === "needs-attention" && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Needs Attention
                          </Badge>
                        )}
                        {metric.status === "good" && (
                          <Badge variant="outline" className="bg-gray-200 text-gray-900 border-gray-400">
                            Good
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{metric.issues} issues</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-gray-500">Score</div>
                        <div className="flex items-center gap-2">
                          <Progress value={(metric.score / metric.maxScore) * 100} className="h-1 flex-1" />
                          <span className="font-medium">
                            {metric.score}/{metric.maxScore}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Description</div>
                        <div className="text-gray-600">{metric.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Status */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Compliance Framework Status</h3>
              <div className="grid grid-cols-2 gap-3">
                {complianceStatus.map((compliance, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{compliance.framework}</span>
                      {compliance.status === "compliant" && (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Compliant
                        </Badge>
                      )}
                      {compliance.status === "needs-review" && (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                          <Clock className="mr-1 h-3 w-3" />
                          Needs Review
                        </Badge>
                      )}
                      {compliance.status === "in-progress" && (
                        <Badge variant="outline" className="bg-gray-200 text-gray-900 border-gray-400">
                          In Progress
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      <div>Last audit: {compliance.lastAudit}</div>
                      <div>Next audit: {compliance.nextAudit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Improvement */}
            {/*
            <div className="p-3 border rounded-lg bg-green-50/30">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Security Improvement</h4>
                  <p className="text-sm text-gray-600">
                    Security score improved by 3 points this month. Focus on resolving the 3 high-priority issues to
                    reach 90+ score and maintain excellent security posture.
                  </p>
                </div>
              </div>
            </div>
            */}
          </div>

          {/* Dialog Footer */}
          {/*
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
          */}
        </DialogContent>
      </Dialog>
    </>
  )
}
