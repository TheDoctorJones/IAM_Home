import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, RefreshCw, AlertCircle } from "lucide-react"

export default function UpcomingRenewals() {
  const renewals = [
    {
      id: 1,
      vendor: "Acme Cloud Services",
      amount: 24000,
      date: "May 30, 2025",
      daysLeft: 16,
      status: "critical",
    },
    {
      id: 2,
      vendor: "TechStack Pro",
      amount: 18500,
      date: "June 15, 2025",
      daysLeft: 32,
      status: "warning",
    },
    {
      id: 3,
      vendor: "DataSafe Solutions",
      amount: 12000,
      date: "July 1, 2025",
      daysLeft: 48,
      status: "normal",
    },
    {
      id: 4,
      vendor: "Marketing Suite",
      amount: 9500,
      date: "July 15, 2025",
      daysLeft: 62,
      status: "normal",
    },
    {
      id: 5,
      vendor: "DevOps Tools",
      amount: 7800,
      date: "August 1, 2025",
      daysLeft: 79,
      status: "normal",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Renewals</CardTitle>
            <CardDescription>Contracts renewing soon</CardDescription>
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
                  <span className="font-medium">{renewal.vendor}</span>
                  {renewal.status === "critical" && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Critical
                    </Badge>
                  )}
                  {renewal.status === "warning" && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Warning
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {renewal.date} ({renewal.daysLeft} days)
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">${renewal.amount.toLocaleString()}</span>
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
