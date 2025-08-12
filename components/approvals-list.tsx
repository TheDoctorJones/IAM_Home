import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, AlertCircle } from "lucide-react"
import type { PersonaType } from "./persona-switcher"

interface ApprovalsListProps {
  hideTitle?: boolean
  persona?: PersonaType
}

export default function ApprovalsList({ hideTitle = false, persona = "vp-sales" }: ApprovalsListProps) {
  const getPersonaTasks = () => {
    switch (persona) {
      case "vp-sales":
        return [
          {
            id: 4,
            title: "New territory expansion contract",
            company: "EastCoast Solutions",
            value: "$275,000",
            dueDate: "In 2 days",
            type: "contract",
            priority: "high",
            status: "Grants exclusive rights in New York",
            action: "Sign",
          },
          {
            id: 3,
            title: "ACME Co-Marketing Field Event",
            company: "Marketing Department",
            value: "$25,000",
            dueDate: "In 3 days",
            type: "expense",
            priority: "high",
            status: "Q2 budgets lock in 3 days",
            action: "Approve",
          },
          {
            id: 2,
            title: "Annual renewal - Platinum tier",
            company: "Global Industries Inc.",
            value: "$325,000",
            dueDate: "Today",
            type: "renewal",
            priority: "urgent",
            status: "Exception requested for 32% discount",
            action: "Approve",
          },
          {
            id: 1,
            title: "Enterprise SaaS Agreement",
            company: "TechGiant Corp",
            value: "$450,000",
            dueDate: "Tomorrow",
            type: "contract",
            priority: "urgent",
            status: "Stuck in legal review for 5 days",
            action: "Review",
          },
        ]

      case "sales-rep":
        return [
          {
            id: 1,
            title: "Enterprise Software License",
            company: "TechGiant Corp",
            value: "$450,000",
            dueDate: "Today",
            type: "proposal",
            priority: "urgent",
            status: "Awaiting counterparty signature",
            action: "Follow Up",
          },
          {
            id: 2,
            title: "Mid-Market SaaS Deal",
            company: "Innovate Solutions",
            value: "$275,000",
            dueDate: "Tomorrow",
            type: "negotiation",
            priority: "high",
            status: "Price negotiation in progress",
            action: "Review",
          },
          {
            id: 3,
            title: "SMB Annual Contract",
            company: "StartupCo",
            value: "$85,000",
            dueDate: "In 2 days",
            type: "proposal",
            priority: "urgent",
            status: "Proposal sent, awaiting response",
            action: "Follow Up",
          },
          {
            id: 4,
            title: "Channel Partner Agreement",
            company: "Regional Reseller Inc.",
            value: "$150,000",
            dueDate: "In 3 days",
            type: "contract",
            priority: "urgent",
            status: "Legal review completed",
            action: "Send",
          },
        ]

      case "contract-ops":
        return [
          {
            id: 1,
            title: "Sales MSA Template v3.0",
            company: "Template Library",
            value: "Approval",
            dueDate: "Today",
            type: "template",
            priority: "urgent",
            status: "Legal review completed, ready for approval",
            action: "Approve",
          },
          {
            id: 3,
            title: "Procurement NDA Template",
            company: "Template Library",
            value: "Request",
            dueDate: "In 2 days",
            type: "template",
            priority: "normal",
            status: "New template creation request",
            action: "View",
          },
        ]

      case "org-admin":
        return [
          {
            id: 1,
            title: "User provisioning request",
            company: "Sales Department",
            value: "Provisioning",
            dueDate: "Today",
            type: "provisioning",
            priority: "urgent",
            status: "New hire onboarding batch",
            action: "Provision",
          },
          {
            id: 2,
            title: "Advanced Analytics access request",
            company: "Legal Team",
            value: "Request",
            dueDate: "Today",
            type: "feature",
            priority: "urgent",
            status: "User requesting premium feature access",
            action: "Review",
          },
          {
            id: 3,
            title: "Premium Templates access request",
            company: "Sales Operations",
            value: "Request",
            dueDate: "Tomorrow",
            type: "feature",
            priority: "high",
            status: "User requesting premium feature access",
            action: "Review",
          },
          {
            id: 4,
            title: "Enterprise Insights access request",
            company: "Contract Operations",
            value: "Request",
            dueDate: "In 2 days",
            type: "feature",
            priority: "normal",
            status: "User requesting premium feature access",
            action: "Review",
          },
        ]

      default:
        return []
    }
  }

  const tasks = getPersonaTasks()

  const getColumnHeaders = () => {
    switch (persona) {
      case "vp-sales":
        return ["AGREEMENT", "VALUE", "DUE DATE", "NOTE", "ACTION"]
      case "sales-rep":
        return ["DEAL", "VALUE", "DUE DATE", "STATUS", "ACTION"]
      case "contract-ops":
        return ["ITEM", "TYPE", "DUE DATE", "NOTE", "ACTION"]
      case "org-admin":
        return ["TASK", "TYPE", "DUE DATE", "NOTE", "ACTION"]
      default:
        return ["ITEM", "VALUE", "DUE DATE", "NOTE", "ACTION"]
    }
  }

  const headers = getColumnHeaders()

  return (
    <Card>
      {!hideTitle && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>
                {persona === "vp-sales"
                  ? "Agreements requiring your attention"
                  : persona === "sales-rep"
                    ? "Deals requiring your action"
                    : persona === "contract-ops"
                      ? "Templates and workflows requiring your attention"
                      : "System administration tasks requiring your attention"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className={hideTitle ? "pt-6" : ""}>
        <div className="hidden md:grid md:grid-cols-[2.5fr_1fr_1fr_1.6fr_1fr] gap-4 px-3 py-2 text-xs font-medium text-gray-500">
          <div>{headers[0]}</div>
          <div>{headers[1]}</div>
          <div>{headers[2]}</div>
          <div>{headers[3]}</div>
          <div className="text-right">{headers[4]}</div>
        </div>

        <div className="space-y-2 mt-2">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="grid md:grid-cols-[2.5fr_1fr_1fr_1.6fr_1fr] gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors items-center"
            >
              {/* Column 1: Title & Company */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{task.title}</span>
                  {task.priority === "urgent" && (
                    <Badge variant="outline" className="bg-gray-300 text-gray-900 border-gray-500">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Urgent
                    </Badge>
                  )}
                  {task.priority === "high" && (
                    <Badge variant="outline" className="bg-gray-200 text-gray-800 border-gray-400">
                      High Priority
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500">{task.company}</div>
              </div>

              {/* Column 2: Value */}
              <div className={`font-medium ${persona === "contract-ops" ? "text-gray-700" : "text-gray-800"}`}>
                {task.value}
              </div>

              {/* Column 3: Due Date */}
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-3 w-3" />
                {task.dueDate}
              </div>

              {/* Column 4: Status/Note */}
              <div className="text-sm text-gray-600">{task.status}</div>

              {/* Column 5: Action button */}
              <div className="flex justify-end">
                <Button size="sm" variant="outline" className="w-24 bg-transparent">
                  {task.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
