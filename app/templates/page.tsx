"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  FileSpreadsheetIcon,
  FileText,
  File,
  FilePenLineIcon,
  FileIcon,
  Edit,
  MoreVertical,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import GlobalHeader from "@/components/global-header"
import type { PersonaType } from "@/components/persona-switcher"
import { useGlobalStartModal } from "@/hooks/use-global-start-modal"
import { processTemplates, documentTemplates, type DocumentTemplate } from "@/lib/data/templates"
import { formatRelativeTime } from "@/lib/utils/date-format"

export default function TemplatesPage() {
  const [currentPersona, setCurrentPersona] = useState<PersonaType>(
    () =>
      (typeof window !== "undefined" ? (localStorage.getItem("selectedPersona") as PersonaType) : null) || "vp-sales",
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedView, setSelectedView] = useState("all")
  const [showAllProcesses, setShowAllProcesses] = useState(false)
  const [favoriteTemplates, setFavoriteTemplates] = useState<Set<string>>(new Set())

  const { openModal } = useGlobalStartModal()
  const router = useRouter()

  const handlePersonaChange = (persona: PersonaType) => {
    setCurrentPersona(persona)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPersona", persona)
    }
  }

  const allCategories = Array.from(
    new Set([...processTemplates.map((t) => t.category), ...documentTemplates.map((t) => t.category)]),
  )

  const handleFavoriteToggle = (templateId: string) => {
    const newFavorites = new Set(favoriteTemplates)
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId)
    } else {
      newFavorites.add(templateId)
      toast({
        title: "Favorite template saved",
        duration: 2000,
      })
    }
    setFavoriteTemplates(newFavorites)
  }

  const handleEditTemplate = (templateId: string) => {
    router.push(`/editor?template=${templateId}`)
  }

  // Filter templates based on search and view
  const filteredProcessTemplates = processTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesView = selectedView === "all" || template.status === selectedView || template.category === selectedView
    return matchesSearch && matchesView
  })

  const filteredDocumentTemplates = documentTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.owner.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesView = selectedView === "all" || template.status === selectedView || template.category === selectedView
    return matchesSearch && matchesView
  })

  const displayedProcessTemplates = showAllProcesses ? filteredProcessTemplates : filteredProcessTemplates.slice(0, 6)

  const getTypeIcon = (type: DocumentTemplate["type"]) => {
    switch (type) {
      case "contract":
        return <FilePenLineIcon className="h-4 w-4 text-gray-500" />
      case "addendum":
        return <FileIcon className="h-4 w-4 text-gray-500" />
      case "form":
        return <FileSpreadsheetIcon className="h-4 w-4 text-gray-500" />
      default:
        return <File className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-gray-100 text-gray-600 border-gray-200",
      draft: "bg-gray-100 text-gray-800 border-gray-300",
      archived: "bg-gray-0 text-gray-400 border-gray-100",
    }
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants] || variants.active}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader currentPage="templates" currentPersona={currentPersona} onPersonaChange={handlePersonaChange} />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-gray-800" onClick={() => openModal(currentPersona, "templates")}>
                <FileText className="mr-2 h-4 w-4" />
                Start
              </Button>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search templates by name, type, or category..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Templates</SelectItem>
                  {allCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Process Templates Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Agreement Process Templates</h2>
              {filteredProcessTemplates.length > 6 && (
                <Button
                  variant="link"
                  onClick={() => setShowAllProcesses(!showAllProcesses)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {showAllProcesses ? "Show Less" : "View All"}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProcessTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow relative">
                  <div className="flex justify-between items-start p-4 pb-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                      onClick={() => handleFavoriteToggle(template.id)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          favoriteTemplates.has(template.id)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-400 hover:text-yellow-400"
                        }`}
                      />
                    </Button>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(template.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Use</DropdownMenuItem>
                          <DropdownMenuItem>Preview</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <CardContent className="space-y-2 leading-3 mt-2 px-6">
                    <h3 className="font-semibold text-lg line-clamp-1 leading-8">{template.title}</h3>
                    <p className="text-gray-600 line-clamp-2 text-xs leading-4">{template.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-gray-500 text-[0.65rem]">
                      Last modified {formatRelativeTime(template.lastUpdated)}
                    </span>
                    <Button
                      className="bg-transparent"
                      variant="outline"
                      onClick={() => handleEditTemplate(template.id)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Document Templates Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold pb-2 pt-4">Document Templates</h2>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 w-12 px-3 pl-px">
                      {/* Type icon column - no title like agreements table */}
                    </th>
                    <th scope="col" className="py-3 cursor-pointer hover:bg-gray-100 select-none w-80 px-0">
                      <div className="flex items-center gap-1">Title</div>
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer hover:bg-gray-100 select-none">
                      <div className="flex items-center gap-1">Status</div>
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer hover:bg-gray-100 select-none">
                      <div className="flex items-center gap-1">Last Modified</div>
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer hover:bg-gray-100 select-none">
                      <div className="flex items-center gap-1">Owner</div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      {""}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocumentTemplates.map((template) => (
                    <tr key={template.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap pb-4 pr-0 pl-4">{getTypeIcon(template.type)}</td>
                      <td className="py-4 whitespace-nowrap px-0">
                        <span className="text-gray-900 text-sm font-semibold">{template.title}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(template.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {formatRelativeTime(template.lastModified)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{template.owner}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="flex items-center gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => handleEditTemplate(template.id)}>
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4 text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Use</DropdownMenuItem>
                              <DropdownMenuItem>Preview</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
