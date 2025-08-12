import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp } from "lucide-react"

export default function FinancialCommitments() {
  const commitments = [
    { category: "Software Subscriptions", amount: 85000, percentage: 35 },
    { category: "Consulting Services", amount: 65000, percentage: 26 },
    { category: "Infrastructure", amount: 45500, percentage: 19 },
    { category: "Marketing", amount: 30000, percentage: 12 },
    { category: "Other", amount: 20000, percentage: 8 },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Financial Commitments</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </div>
          <DollarSign className="h-5 w-5 text-green-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {commitments.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{item.category}</span>
                <span className="font-medium">${item.amount.toLocaleString()}</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
              <div className="flex justify-end text-xs text-gray-500">{item.percentage}% of total</div>
            </div>
          ))}

          <div className="pt-2 flex items-center justify-between border-t">
            <span className="font-medium">Total Commitments</span>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="font-bold">$245,500</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
