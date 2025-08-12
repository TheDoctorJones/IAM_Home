import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, FileText, Upload, CheckCircle, CreditCard } from "lucide-react"

export default function TaskList() {
  const tasks = [
    {
      id: 1,
      title: "Sign employment contract",
      company: "Acme Inc.",
      dueDate: "Today",
      type: "signature",
      priority: "urgent",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
    {
      id: 2,
      title: "Upload ID verification",
      company: "TechCorp",
      dueDate: "Today",
      type: "upload",
      priority: "urgent",
      icon: <Upload className="h-4 w-4 text-purple-600" />,
    },
    {
      id: 3,
      title: "Review service agreement",
      company: "CloudServices Ltd.",
      dueDate: "Tomorrow",
      type: "review",
      priority: "urgent",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    },
    {
      id: 4,
      title: "Process payment for consulting",
      company: "Consultio",
      dueDate: "In 2 days",
      type: "payment",
      priority: "normal",
      icon: <CreditCard className="h-4 w-4 text-amber-600" />,
    },
    {
      id: 5,
      title: "Sign NDA for project Alpha",
      company: "InnoTech",
      dueDate: "In 3 days",
      type: "signature",
      priority: "normal",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
    {
      id: 6,
      title: "Upload project requirements",
      company: "BuildCo",
      dueDate: "In 4 days",
      type: "upload",
      priority: "normal",
      icon: <Upload className="h-4 w-4 text-purple-600" />,
    },
    {
      id: 7,
      title: "Review contract amendments",
      company: "LegalEagle",
      dueDate: "In 5 days",
      type: "review",
      priority: "normal",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    },
    {
      id: 8,
      title: "Process quarterly payment",
      company: "SupplyChain Inc.",
      dueDate: "In 7 days",
      type: "payment",
      priority: "normal",
      icon: <CreditCard className="h-4 w-4 text-amber-600" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Tasks</CardTitle>
            <CardDescription>Manage all your pending signature tasks</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Sort
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Checkbox id={`task-${task.id}`} />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {task.icon}
                    <span className="font-medium">{task.title}</span>
                    {task.priority === "urgent" && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{task.company}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  {task.dueDate}
                </div>
                <Button size="sm">
                  {task.type === "signature" && "Sign"}
                  {task.type === "upload" && "Upload"}
                  {task.type === "review" && "Review"}
                  {task.type === "payment" && "Pay"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
