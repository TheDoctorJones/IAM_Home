import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, User, Settings, FileText, Play } from "lucide-react"

export default function NewUserChecklist() {
  const checklistItems = [
    {
      id: 1,
      title: "Sign your first agreement",
      description: "Successfully signed your first document",
      completed: true,
      icon: <CheckCircle className="h-4 w-4 text-gray-500" />,
      stats: "Complete",
    },
    {
      id: 2,
      title: "Complete your profile setup",
      description: "Add your signature and contact information",
      completed: false,
      icon: <User className="h-4 w-4 text-gray-600" />,
      stats: "Not Started",
    },
    {
      id: 3,
      title: "Configure account settings",
      description: "Set up notifications and preferences",
      completed: false,
      icon: <Settings className="h-4 w-4 text-gray-600" />,
      stats: "Not Started",
    },
    {
      id: 4,
      title: "Send your first document",
      description: "Try sending a document for signature",
      completed: false,
      icon: <FileText className="h-4 w-4 text-gray-600" />,
      stats: "Not Started",
    },
  ]

  const completedCount = checklistItems.filter((item) => item.completed).length
  const totalItems = checklistItems.length

  return (
    <Card className="pt-6">
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checklist Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Quick Start Checklist</h3>
              <Badge variant="secondary" className="text-xs">
                {completedCount} of {totalItems} completed
              </Badge>
            </div>
            {checklistItems.map((item) => (
              <div
                key={item.id}
                className={`grid grid-cols-12 gap-4 items-center p-3 border rounded-lg transition-colors ${
                  item.completed ? "bg-gray-100 border-gray-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="col-span-4 flex items-center gap-3">
                  {item.icon}
                  <span className={`font-medium ${item.completed ? "line-through text-gray-500" : ""}`}>
                    {item.title}
                  </span>
                </div>

                {/* Column 3: Subtext - double width, smaller text */}
                <div className="col-span-4 flex flex-col">
                  <div className={`text-xs ${item.completed ? "line-through text-gray-400" : "text-gray-500"}`}>
                    {item.description}
                  </div>
                </div>

                {/* Column 4: Stats - badges */}
                <div className="col-span-2 flex justify-center">
                  <Badge variant="secondary" className="text-xs">
                    {item.stats}
                  </Badge>
                </div>

                {/* Column 5: Button - aligned to far right */}
                <div className="col-span-2 flex justify-end">
                  {item.completed ? (
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      Start
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Instructional Video */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 h-full flex flex-col">
              {/* Video Thumbnail */}
              <div className="flex-grow bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-40 to-gray-100"></div>
                <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Play className="h-6 w-6 text-gray-600 ml-1" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">Learn the basics of sending your first document.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
