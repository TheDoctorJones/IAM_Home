"use client"

import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Send,
  BarChart3,
  Shield,
  Users,
  Settings,
  LayoutTemplateIcon as Template,
  Workflow,
  PenTool,
} from "lucide-react"
import type { PersonaType } from "./persona-switcher"

interface StartModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  persona: PersonaType
}

export default function StartModal({ open, onOpenChange, persona }: StartModalProps) {
  const getPersonaContent = () => {
    switch (persona) {
      case "vp-sales":
        return {
          primaryActions: [
            {
              title: "Review Tasks",
              description: "Complete approvals, signatures, and reviews requiring your attention",
              badge: "4",
              hasBorder: true,
              borderColor: "gray" as const,
            },
            {
              title: "Review Risks",
              description: "Review flagged terms, policy violations, and risk exposures",
              badge: "2",
              hasBorder: true,
              borderColor: "gray" as const,
            },
            {
              title: "Monitor Performance",
              description: "Analyze deal velocity, team performance, and revenue metrics",
              icon: <BarChart3 className="h-4 w-4 text-gray-600" />,
              hasBorder: false,
            },
            {
              title: "Monitor Compliance",
              description: "Monitor compliance scores and approve policy exceptions",
              icon: <Shield className="h-4 w-4 text-gray-600" />,
              hasBorder: false,
            },
          ],
          secondaryActions: [
            { icon: <Send className="h-6 w-6 text-gray-500" />, title: "Send Agreement" },
            { icon: <PenTool className="h-6 w-6 text-gray-500" />, title: "Sign Agreement" },
            { icon: <BarChart3 className="h-6 w-6 text-gray-500" />, title: "Generate Report" },
          ],
        }

      case "sales-rep":
        return {
          primaryActions: [
            {
              title: "Active Deals",
              description: "Review and advance your active deals through the pipeline",
              badge: "7",
              hasBorder: true,
              borderColor: "gray" as const,
            },
            {
              title: "Pending Signatures",
              description: "Follow up on agreements waiting for counterparty signatures",
              badge: "3",
              hasBorder: true,
              borderColor: "gray" as const,
            },
            {
              title: "Quota Progress",
              description: "Track your progress toward quarterly and annual quotas",
              icon: <BarChart3 className="h-4 w-4 text-gray-600" />,
              hasBorder: false,
            },
            {
              title: "Deal Velocity",
              description: "Monitor time-to-close and identify bottlenecks in your deals",
              icon: <Shield className="h-4 w-4 text-gray-600" />,
              hasBorder: false,
            },
          ],
          secondaryActions: [
            { icon: <Send className="h-6 w-6 text-gray-500" />, title: "Send Agreement" },
            { icon: <PenTool className="h-6 w-6 text-gray-500" />, title: "Sign Agreement" },
            { icon: <BarChart3 className="h-6 w-6 text-gray-500" />, title: "Generate Report" },
          ],
        }

      case "contract-ops":
        return {
          primaryActions: [
            {
              title: "Template Reviews",
              description: "Review and approve pending template updates and new templates",
              badge: "5",
              hasBorder: true,
              borderColor: "gray" as const,
            },
            {
              title: "Workflow Issues",
              description: "Address workflow bottlenecks and process optimization requests",
              badge: "2",
              hasBorder: true,
              borderColor: "gray" as const,
            },
            {
              title: "Template Analytics",
              description: "Analyze template performance and usage patterns",
              icon: <BarChart3 className="h-4 w-4 text-gray-600" />,
              hasBorder: false,
            },
            {
              title: "Compliance Monitoring",
              description: "Monitor template compliance and standardization metrics",
              icon: <Shield className="h-4 w-4 text-gray-600" />,
              hasBorder: false,
            },
          ],
          secondaryActions: [
            { icon: <Template className="h-6 w-6 text-gray-500" />, title: "New Template" },
            { icon: <Workflow className="h-6 w-6 text-gray-500" />, title: "Build Workflow" },
            { icon: <Settings className="h-6 w-6 text-gray-500" />, title: "Process Settings" },
          ],
        }

      case "org-admin":
        return {
          primaryActions: [
            {
              title: "User Management",
              description: "Provision new users, manage permissions, and review access controls",
              badge: "4",
              hasBorder: true,
              borderColor: "gray" as const,
            },
            {
              title: "Security Review",
              description: "Review security alerts, audit permissions, and manage compliance",
              badge: "2",
              hasBorder: true,
              borderColor: "gray" as const,
            },
            {
              title: "License Management",
              description: "Monitor license utilization and optimize seat allocation",
              icon: <BarChart3 className="h-4 w-4 text-gray-600" />,
              hasBorder: false,
            },
            {
              title: "System Configuration",
              description: "Manage system settings, feature rollouts, and integrations",
              icon: <Settings className="h-4 w-4 text-gray-600" />,
              hasBorder: false,
            },
          ],
          secondaryActions: [
            { icon: <Users className="h-6 w-6 text-gray-500" />, title: "Add Users" },
            { icon: <Settings className="h-6 w-6 text-gray-500" />, title: "System Settings" },
            { icon: <BarChart3 className="h-6 w-6 text-gray-500" />, title: "Usage Report" },
          ],
        }

      default:
        return {
          primaryActions: [],
          secondaryActions: [],
        }
    }
  }

  const content = getPersonaContent()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Quick Start</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="What would you like to do?" className="pl-10 py-6 text-sm" autoFocus />
          </div>

          {/* Primary Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              {persona === "vp-sales"
                ? "Review & Monitor"
                : persona === "sales-rep"
                  ? "Deals & Pipeline"
                  : persona === "contract-ops"
                    ? "Templates & Workflows"
                    : "System Administration"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {content.primaryActions.map((action, index) => (
                <PrimaryActionCard key={index} {...action} />
              ))}
            </div>
          </div>

          <Separator />

          {/* Secondary Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {persona === "vp-sales"
                ? "Create & Send"
                : persona === "sales-rep"
                  ? "Create & Send"
                  : persona === "contract-ops"
                    ? "Build & Configure"
                    : "Manage & Configure"}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {content.secondaryActions.map((action, index) => (
                <SecondaryActionCard key={index} {...action} />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface PrimaryActionCardProps {
  title: string
  description: string
  badge?: string
  icon?: React.ReactNode
  hasBorder: boolean
  borderColor?: "gray"
}

function PrimaryActionCard({
  title,
  description,
  badge,
  icon,
  hasBorder,
  borderColor = "gray",
}: PrimaryActionCardProps) {
  const borderClass = `border-l-gray-500`
  const badgeClass = `bg-gray-100 text-gray-700`

  return (
    <Card
      className={`hover:bg-gray-50 cursor-pointer transition-colors ${hasBorder ? `border-l-4 ${borderClass}` : ""}`}
    >
      <CardContent className="p-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{title}</h3>
            {badge && <span className={`text-xs ${badgeClass} px-2 py-1 rounded-full font-medium`}>{badge}</span>}
            {icon && icon}
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface SecondaryActionCardProps {
  icon: React.ReactNode
  title: string
}

function SecondaryActionCard({ icon, title }: SecondaryActionCardProps) {
  return (
    <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
      <CardContent className="p-3 text-center">
        <div className="flex flex-col items-center gap-2">
          <div>{icon}</div>
          <div>
            <h4 className="font-medium text-sm">{title}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
