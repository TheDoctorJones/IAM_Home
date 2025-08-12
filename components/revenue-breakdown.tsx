import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import type { PersonaType } from "./persona-switcher"

interface RevenueBreakdownProps {
  persona?: PersonaType
}

export default function RevenueBreakdown({ persona = "vp-sales" }: RevenueBreakdownProps) {
  const getPersonaData = () => {
    switch (persona) {
      case "vp-sales":
        return {
          title: "Agreement Risk Distribution",
          description: "Portfolio risk by contract type",
          data: [
            { category: "Auto-Renewal Clauses", amount: 1200000, percentage: 57, growth: 15, color: "#374151" },
            { category: "Extended Payment Terms", amount: 550000, percentage: 26, growth: 8, color: "#6B7280" },
            { category: "Unlimited Liability", amount: 250000, percentage: 12, growth: 5, color: "#9CA3AF" },
            { category: "Non-Standard SLAs", amount: 100000, percentage: 5, growth: -10, color: "#E5E7EB" },
          ],
          totalLabel: "Total Risk Exposure",
          insight:
            "Auto-renewal clauses represent 57% of portfolio risk. Implementing 90-day notice periods could reduce exposure by $400K annually.",
          citation: "Source: Salesforce",
        }

      case "sales-rep":
        return {
          title: "Signature Cycle Breakdown",
          description: "Time spent by agreement stage",
          data: [
            { category: "Legal Review", amount: 31, percentage: 38, growth: -18, color: "#374151" },
            { category: "Counterparty Review", amount: 28, percentage: 34, growth: -12, color: "#6B7280" },
            { category: "Internal Approval", amount: 16, percentage: 20, growth: -25, color: "#9CA3AF" },
            { category: "Final Signature", amount: 7, percentage: 8, growth: -10, color: "#E5E7EB" },
          ],
          totalLabel: "Avg. Cycle Time",
          insight:
            "Legal review takes 38% of total cycle time. Using pre-approved templates could reduce this stage by 40%.",
          citation: null,
        }

      case "contract-ops":
        return {
          title: "Template Performance",
          description: "Signature speed by template type",
          data: [
            { category: "Sales MSA v2.3", amount: 62, percentage: 45, growth: 22, color: "#374151" },
            { category: "HR Employment", amount: 41, percentage: 29, growth: 15, color: "#6B7280" },
            { category: "Procurement Standard", amount: 28, percentage: 16, growth: 8, color: "#9CA3AF" },
            { category: "Legal NDA", amount: 18, percentage: 10, growth: 5, color: "#E5E7EB" },
          ],
          totalLabel: "Avg. Signature Time",
          insight:
            "Sales MSA v2.3 shows 22% faster signature times. Migrating all sales templates to v2.3 could save 2.1 days per deal.",
          citation: null,
        }
      case "org-admin":
        return {
          title: "User Activity Distribution",
          description: "Active users by department",
          data: [
            { category: "Sales Team", amount: 89, percentage: 42, growth: 12, color: "#374151" },
            { category: "Legal Department", amount: 67, percentage: 32, growth: 8, color: "#6B7280" },
            { category: "Operations", amount: 34, percentage: 16, growth: 15, color: "#9CA3AF" },
            { category: "Executive", amount: 21, percentage: 10, growth: 5, color: "#E5E7EB" },
          ],
          totalLabel: "Active Users",
          insight:
            "Sales team shows highest growth at +12% in user activity. Consider expanding their feature access to capitalize on engagement.",
          citation: null,
        }

      default:
        return {
          title: "Data Breakdown",
          description: "Current period analysis",
          data: [],
          totalLabel: "Total",
          insight: "",
          citation: null,
        }
    }
  }

  const personaData = getPersonaData()
  const { title, description, data, totalLabel, insight, citation } = personaData

  // Calculate total
  const total = data.reduce((sum, item) => sum + item.amount, 0)
  const formattedTotal =
    persona === "vp-sales"
      ? `$${(total / 1000000).toFixed(1)}M`
      : persona === "sales-rep"
        ? `${total} days`
        : persona === "contract-ops"
          ? `${(total / 10).toFixed(1)} days`
          : `${total} users`

  // Calculate average growth
  const avgGrowth = Math.round(data.reduce((sum, item) => sum + item.growth * (item.percentage / 100), 0))

  // Size of the donut chart
  const size = 160
  const strokeWidth = 25
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Calculate the starting point for each segment
  let currentOffset = 0

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[1.25rem] font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3 items-center">
          {/* Donut Chart - Left Column */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <g transform={`translate(${size / 2}, ${size / 2})`}>
                  {data.map((item, index) => {
                    const strokeDasharray = (item.percentage / 100) * circumference
                    const strokeDashoffset = currentOffset
                    currentOffset += strokeDasharray

                    return (
                      <circle
                        key={index}
                        r={radius}
                        fill="none"
                        stroke={item.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${strokeDasharray} ${circumference}`}
                        strokeDashoffset={-strokeDashoffset}
                        transform="rotate(-90)"
                      />
                    )
                  })}
                  <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold">
                    {formattedTotal}
                  </text>
                  <text x="0" y="16" textAnchor="middle" dominantBaseline="middle" className="text-xs text-gray-500">
                    {avgGrowth >= 0 ? "+" : ""}
                    {avgGrowth}% {persona === "vp-sales" ? "QoQ" : persona === "sales-rep" ? "improvement" : "faster"}
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Legend - Right Column */}
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm whitespace-nowrap">{item.category}</span>
                </div>
                <span className="text-sm font-medium text-right">
                  {persona === "vp-sales"
                    ? `$${(item.amount / 1000000).toFixed(1)}M`
                    : persona === "sales-rep"
                      ? `${item.amount}%`
                      : persona === "contract-ops"
                        ? `${(item.amount / 10).toFixed(1)}d`
                        : `${item.amount} users`}
                </span>
                <span className={`text-xs whitespace-nowrap ${item.growth >= 0 ? "text-gray-800" : "text-gray-900"}`}>
                  {item.growth >= 0 ? "+" : ""}
                  {item.growth}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <div className="w-full">
          <div className="flex items-start gap-2 w-full bg-gray-100 p-3 rounded-lg">
            <Sparkles className="h-4 w-4 text-gray-700 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-700">{insight}</p>
            </div>
          </div>
          {citation && <div className="mt-2 text-xs text-gray-500 text-right">{citation}</div>}
        </div>
      </CardFooter>
    </Card>
  )
}
