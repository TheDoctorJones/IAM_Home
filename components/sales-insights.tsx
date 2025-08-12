import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, AlertTriangle, Target, BarChart3 } from "lucide-react"

export default function SalesInsights() {
  const insights = [
    {
      id: 1,
      title: "End of quarter push needed",
      description:
        "Current pipeline conversion rate is 5% below target. Focus on these 3 key enterprise deals to close the gap.",
      icon: <Target className="h-5 w-5 text-blue-600" />,
    },
    {
      id: 2,
      title: "Competitive threat alert",
      description:
        "TechGiant Corp is being actively pursued by competitor. Schedule executive meeting to secure renewal.",
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
    },
    {
      id: 3,
      title: "YoY growth opportunity",
      description:
        "Mid-Market segment showing strongest growth at +22% YoY. Consider reallocating resources to capitalize on momentum.",
      icon: <BarChart3 className="h-5 w-5 text-green-600" />,
    },
  ]

  return (
    <Card className="border-blue-100 bg-blue-50/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Executive Insights</CardTitle>
            <CardDescription>Strategic recommendations for your attention</CardDescription>
          </div>
          <Lightbulb className="h-5 w-5 text-amber-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-3 border bg-white rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">{insight.icon}</div>
                <div>
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                  <div className="pt-2">
                    <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            <Lightbulb className="mr-2 h-4 w-4" />
            View Quarterly Forecast
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
