import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, Award, Target } from "lucide-react"

export default function TeamPerformance() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Enterprise Sales",
      quota: 95,
      deals: 4,
      pipeline: "$1.2M",
      trend: "up",
    },
    {
      name: "David Chen",
      role: "Mid-Market Sales",
      quota: 87,
      deals: 7,
      pipeline: "$850K",
      trend: "up",
    },
    {
      name: "Maria Rodriguez",
      role: "SMB Sales",
      quota: 102,
      deals: 12,
      pipeline: "$620K",
      trend: "up",
    },
    {
      name: "James Wilson",
      role: "Strategic Accounts",
      quota: 78,
      deals: 2,
      pipeline: "$1.5M",
      trend: "down",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Q2 quota attainment and pipeline</CardDescription>
          </div>
          <Users className="h-5 w-5 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {teamMembers.map((member, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${
                      member.quota >= 100
                        ? "bg-green-50 text-green-700 border-green-200"
                        : member.quota >= 80
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {member.quota}% of quota
                  </Badge>
                  {member.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                  )}
                </div>
              </div>
              <Progress value={member.quota} className="h-2" />
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span>{member.deals} active deals</span>
                </div>
                <div className="font-medium">{member.pipeline} pipeline</div>
              </div>
            </div>
          ))}

          <div className="pt-3 flex items-center justify-between border-t">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <span className="font-medium">Team Average</span>
            </div>
            <div className="font-bold text-blue-600">92% of quota</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
