"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Send,
  PenTool,
  LayoutTemplateIcon as Template,
  FileText,
  BarChart3,
  Users,
  Settings,
  Workflow,
  Shield,
  Plus,
} from "lucide-react"
import type { PersonaType } from "./persona-switcher"
import { processTemplates } from "@/lib/data/templates"

type GlobalStartModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  persona: PersonaType
  currentPage?: string
}

export default function GlobalStartModal({ open, onOpenChange, persona, currentPage = "home" }: GlobalStartModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  const templateCategories = Array.from(new Set(processTemplates.map((template) => template.category)))

  const getQuickActions = () => {
    const defaultActions = [
      { icon: <PenTool className="h-5 w-5" />, title: "Sign Document" },
      { icon: <Send className="h-5 w-5" />, title: "Send Document" },
      { icon: <Template className="h-5 w-5" />, title: "Create Template" },
    ]

    // Add persona and page-specific actions
    const personaActions: Record<PersonaType, any[]> = {
      "vp-sales": [
        ...defaultActions,
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: "View Reports",
        },
      ],
      "sales-rep": [...defaultActions, { icon: <FileText className="h-5 w-5" />, title: "Create Proposal" }],
      "contract-ops": [
        ...defaultActions,
        { icon: <Workflow className="h-5 w-5" />, title: "Build Workflow" },
        {
          icon: <Settings className="h-5 w-5" />,
          title: "Manage Templates",
        },
      ],
      "org-admin": [
        { icon: <Users className="h-5 w-5" />, title: "Manage Users" },
        {
          icon: <Settings className="h-5 w-5" />,
          title: "System Settings",
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "Security Review",
        },
      ],
      "new-user": [
        ...defaultActions,
        {
          icon: <FileText className="h-5 w-5" />,
          title: "Getting Started",
        },
      ],
    }

    // Add page-specific actions
    if (currentPage === "agreements") {
      return [
        {
          icon: <Plus className="h-5 w-5" />,
          title: "New Agreement",
        },
        ...personaActions[persona],
      ]
    }

    return personaActions[persona] || defaultActions
  }

  const filteredTemplates = processTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || template.category === selectedType

    return matchesSearch && matchesType
  })

  const handleUseTemplate = (templateId: string) => {
    console.log(`Using template: ${templateId}`)
    onOpenChange(false)
    // In a real app, this would navigate to the prepare screen
  }

  const handleQuickAction = (actionTitle: string) => {
    console.log(`Quick action: ${actionTitle}`)
    onOpenChange(false)
    // In a real app, this would trigger the appropriate action
  }

  const quickActions = getQuickActions().slice(0, 3)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-semibold">Get Started</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
          {/* Search Bar and Filter */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search templates or actions..."
                className="pl-10 py-6 text-sm"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48 py-6">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {templateCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3 flex-shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                  onClick={() => handleQuickAction(action.title)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-gray-600 mt-0.5">{action.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900">{action.title}</h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="flex-shrink-0" />

          {/* Agreement Processes */}
          <div className="flex-1 flex flex-col space-y-3 min-h-0">
            <div className="flex-shrink-0">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Agreement Processes</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Document Thumbnail */}
                        <div className="w-12 h-16 bg-gray-50 border rounded flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100"></div>
                          <div className="absolute top-1 left-1 right-1 space-y-0.5">
                            <div className="h-0.5 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-0.5 bg-gray-300 rounded w-full"></div>
                            <div className="h-0.5 bg-gray-300 rounded w-2/3"></div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 line-clamp-1 text-base">{template.title}</h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{template.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTemplates.length === 0 && (searchQuery || selectedType !== "all") && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No templates found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
