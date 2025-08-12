import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, RefreshCw, DollarSign } from "lucide-react"

export default function AiInsights() {
  const insights = [
    {
      id: 1,
      title: "Potential savings opportunity",
      description: "You have 3 overlapping SaaS subscriptions that could be consolidated to save $12,400 annually.",
      icon: <DollarSign className="h-5 w-5 text-gray-700" />,
    },
    {
      id: 2,
      title: "Negotiation window",
      description:
        "Optimal time to renegotiate TechStack Pro contract is now, based on market rates and your usage patterns.",
      icon: <TrendingUp className="h-5 w-5 text-gray-700" />,
    },
    {
      id: 3,
      title: "Auto-renewal alert",
      description:
        "Acme Cloud Services will auto-renew in 16 days. Historical usage suggests you're only using 60% of licensed capacity.",
      icon: <RefreshCw className="h-5 w-5 text-gray-700" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI-Assisted Insights</CardTitle>
            <CardDescription>Smart recommendations for your agreements</CardDescription>
          </div>
          <Lightbulb className="h-5 w-5 text-gray-700" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-3 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{insight.icon}</div>
                <div className="space-y-1">
                  <h4 className="font-medium">{insight.title}</h4>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                  <div className="pt-2">
                    <Button size="sm" variant="outline">
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full bg-transparent">
            <Lightbulb className="mr-2 h-4 w-4 text-gray-700" />
            Generate More Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
