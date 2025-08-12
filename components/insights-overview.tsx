import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, DollarSign, RefreshCw, FileText } from "lucide-react"

export default function InsightsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights Overview</CardTitle>
        <CardDescription>Summary of your agreement portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-3 border rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <DollarSign className="h-4 w-4" />
                <span>Total Commitments</span>
              </div>
              <span className="text-xl font-bold">$245,500</span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <RefreshCw className="h-4 w-4" />
                <span>Upcoming Renewals</span>
              </div>
              <span className="text-xl font-bold">5</span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <FileText className="h-4 w-4" />
                <span>Active Agreements</span>
              </div>
              <span className="text-xl font-bold">24</span>
            </div>
            <div className="flex flex-col p-3 border rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <PieChart className="h-4 w-4" />
                <span>Vendor Categories</span>
              </div>
              <span className="text-xl font-bold">8</span>
            </div>
          </div>

          <div className="flex justify-center p-4">
            <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Agreement distribution by category</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
