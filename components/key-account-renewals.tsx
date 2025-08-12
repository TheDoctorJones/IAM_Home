import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, RefreshCw, AlertCircle, Building } from "lucide-react"

export default function KeyAccountRenewals() {
  const renewals = [
    {
      id: 1,
      customer: "Global Industries Inc.",
      amount: 325000,
      date: "May 30, 2025",
      daysLeft: 16,
      status: "critical",
      risk: "Price increase negotiation",
    },
    {
      id: 2,
      customer: "TechGiant Corp",
      amount: 450000,
      date: "June 15, 2025",
      daysLeft: 32,
      status: "warning",
      risk: "Evaluating competitors",
    },
    {
      id: 3,
      customer: "Innovate Solutions",
      amount: 275000,
      date: "July 1, 2025",
      daysLeft: 48,
      status: "normal",
      risk: "Expansion opportunity",
    },
    {
      id: 4,
      customer: "MegaCorp Enterprises",
      amount: 520000,
      date: "July 15, 2025",
      daysLeft: 62,
      status: "warning",
      risk: "New decision maker",
    },
    {
      id: 5,
      customer: "Pacific Partners",
      amount: 180000,
      date: "August 1, 2025",
      daysLeft: 79,
      status: "normal",
      risk: "Stable account",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Key Account Renewals</CardTitle>
            <CardDescription>High-value contracts up for renewal</CardDescription>
          </div>
          <RefreshCw className="h-5 w-5 text-amber-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {renewals.map((renewal) => (
            <div key={renewal.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{renewal.customer}</span>
                  {renewal.status === "critical" && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      At Risk
                    </Badge>
                  )}
                  {renewal.status === "warning" && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Needs Attention
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {renewal.date} ({renewal.daysLeft} days)
                </div>
                <div className="text-xs text-gray-500 mt-1">{renewal.risk}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-green-700">${renewal.amount.toLocaleString()}</span>
                <Button size="sm" variant={renewal.status === "critical" ? "default" : "outline"}>
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
