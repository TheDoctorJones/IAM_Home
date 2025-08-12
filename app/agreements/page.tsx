"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Search, Users, Upload, FileText, Settings, ChevronUp, ChevronDown } from "lucide-react"
import type { PersonaType } from "@/components/persona-switcher"
import { agreements, getCompletedDocuments, getPartyNameForAgreement } from "@/lib/data/agreements"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import GlobalHeader from "@/components/global-header"
import { useGlobalStartModal } from "@/hooks/use-global-start-modal"

export default function AgreementsPage() {
  const router = useRouter()
  const { openModal } = useGlobalStartModal()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedView, setSelectedView] = useState("all")
  const [showInsights, setShowInsights] = useState(true)
  const [currentPersona, setCurrentPersona] = useState<PersonaType>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("selectedPersona") as PersonaType) || "vp-sales"
    }
    return "vp-sales"
  })
  const [sortColumn, setSortColumn] = useState("lastUpdated")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const [visibleColumns, setVisibleColumns] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("agreements-visible-columns")
      return saved
        ? JSON.parse(saved)
        : {
            shared: true,
            name: true,
            type: true,
            party: true,
            status: true,
            phase: false,
            lastUpdated: true,
            value: true,
            effectiveDate: false,
            expirationDate: false,
            action: true,
          }
    }
    return {
      shared: true,
      name: true,
      type: true,
      party: true,
      status: true,
      phase: false,
      lastUpdated: true,
      value: true,
      effectiveDate: false,
      expirationDate: false,
      action: true,
    }
  })

  const [previousView, setPreviousView] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("agreements-previous-view") || "all"
    }
    return "all"
  })

  useEffect(() => {
    // Read view from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const viewParam = urlParams.get("view")
    if (viewParam) {
      setSelectedView(viewParam)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("agreements-visible-columns", JSON.stringify(visibleColumns))
  }, [visibleColumns])

  useEffect(() => {
    localStorage.setItem("agreements-previous-view", selectedView)
    setPreviousView(selectedView)
  }, [selectedView])

  const toggleColumn = (column: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }))
  }

  const handlePersonaChange = (persona: PersonaType) => {
    setCurrentPersona(persona)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPersona", persona)
    }
  }

  // Current date for the prototype
  const currentDate = new Date("2025-05-21T14:48:00Z")

  // Format time according to the provided rules using current prototype date
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = currentDate
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 1) return "Just now"
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`

    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`
    }

    if (diffDays < 7) {
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
      const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
      return `${dayName} at ${time}`
    }

    const diffYears = now.getFullYear() - date.getFullYear()
    if (diffYears < 1) {
      const month = date.toLocaleDateString("en-US", { month: "short" })
      const day = date.getDate()
      const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
      return `${month} ${day} at ${time}`
    }

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const renderSortableHeader = (column: string, label: string, className?: string) => {
    const isSorted = sortColumn === column
    return (
      <th
        scope="col"
        className={`px-6 py-3 cursor-pointer hover:bg-gray-100 select-none ${className || ""}`}
        onClick={() => handleSort(column)}
      >
        <div className="flex items-center gap-1">
          {label}
          <div className="flex flex-col">
            <ChevronUp
              className={`h-3 w-3 ${isSorted && sortDirection === "asc" ? "text-gray-800" : "text-gray-400"}`}
            />
            <ChevronDown
              className={`h-3 w-3 -mt-1 ${isSorted && sortDirection === "desc" ? "text-gray-800" : "text-gray-400"}`}
            />
          </div>
        </div>
      </th>
    )
  }

  // Adjust visible columns based on selected view
  const adjustedVisibleColumns = useMemo(() => {
    if (selectedView === "completed") {
      return {
        ...visibleColumns,
        status: false, // Hide status column in completed view
        phase: true, // Show phase column in completed view
        effectiveDate: true, // Show effective date by default in completed view
        expirationDate: true, // Show expiration date by default in completed view
      }
    }
    return visibleColumns
  }, [visibleColumns, selectedView])

  // Sort and filter agreements with stable sorting
  const filteredAndSortedAgreements = useMemo(() => {
    let dataToFilter: any[] = []

    if (selectedView === "completed") {
      // For completed view, show completed documents
      const completedDocs = getCompletedDocuments()
      dataToFilter = completedDocs.map((item, index) => ({
        id: item.document.id,
        name: item.document.name,
        type: item.document.type,
        partyId: item.agreement.partyId,
        party: getPartyNameForAgreement(item.agreement),
        status: item.document.status,
        subStatus: item.document.subStatus,
        created: item.document.created,
        lastUpdated: item.document.lastUpdated,
        value: item.agreement.value,
        dueDate: "Completed",
        owner: item.document.owner,
        isOwner: item.document.isOwner,
        action: "View",
        urgent: false,
        source: item.agreement.source,
        deleted: false,
        effectiveDate: item.agreement.effectiveDate,
        expirationDate: item.agreement.expirationDate,
        parentAgreement: item.agreement,
        isDocument: true,
        originalIndex: index,
        phase: item.document.phase,
      }))
    } else {
      // For other views, show agreements
      dataToFilter = agreements.map((agreement, index) => ({
        ...agreement,
        party: getPartyNameForAgreement(agreement),
        isDocument: false,
        originalIndex: index,
      }))
    }

    const filtered = dataToFilter.filter((item) => {
      // Filter out deleted agreements unless specifically viewing deleted
      if (selectedView !== "deleted" && item.deleted) return false
      if (selectedView === "deleted" && !item.deleted) return false

      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())

      if (selectedView === "all") return matchesSearch && !item.isDocument
      if (selectedView === "draft") return matchesSearch && item.status === "Draft" && !item.isDocument
      if (selectedView === "under-review") return matchesSearch && item.status === "Under Review" && !item.isDocument
      if (selectedView === "waiting-approval")
        return matchesSearch && item.status === "Waiting for Approval" && !item.isDocument
      if (selectedView === "waiting-signature")
        return matchesSearch && item.status === "Waiting for Signature" && !item.isDocument
      if (selectedView === "completed") return matchesSearch && item.isDocument
      if (selectedView === "voided") return matchesSearch && item.status === "Voided" && !item.isDocument
      if (selectedView === "expired") return matchesSearch && item.status === "Expired" && !item.isDocument
      if (selectedView === "deleted") return matchesSearch && item.status === "Deleted" && !item.isDocument

      return matchesSearch
    })

    // Sort the filtered results
    const sorted = filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortColumn) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "type":
          aValue = a.type.toLowerCase()
          bValue = b.type.toLowerCase()
          break
        case "party":
          aValue = a.party.toLowerCase()
          bValue = b.party.toLowerCase()
          break
        case "status":
          aValue = a.status.toLowerCase()
          bValue = b.status.toLowerCase()
          break
        case "phase":
          aValue = (a.phase || "").toLowerCase()
          bValue = (b.phase || "").toLowerCase()
          break
        case "lastUpdated":
          aValue = new Date(a.lastUpdated).getTime()
          bValue = new Date(b.lastUpdated).getTime()
          break
        case "value":
          // Extract numeric value from currency string
          aValue = Number.parseFloat(a.value.replace(/[$,]/g, "")) || 0
          bValue = Number.parseFloat(b.value.replace(/[$,]/g, "")) || 0
          break
        case "effectiveDate":
          aValue = a.effectiveDate ? new Date(a.effectiveDate).getTime() : 0
          bValue = b.expirationDate ? new Date(b.expirationDate).getTime() : 0
          break
        case "expirationDate":
          aValue = a.expirationDate ? new Date(a.expirationDate).getTime() : 0
          bValue = b.expirationDate ? new Date(b.expirationDate).getTime() : 0
          break
        default:
          // Fallback to original index for stable sorting
          aValue = a.originalIndex
          bValue = b.originalIndex
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return sorted
  }, [searchQuery, selectedView, sortColumn, sortDirection])

  // Get status badge styling or progress bar for waiting for signature
  const getStatusDisplay = (agreement) => {
    // Handle completed agreements with expired/terminated phases
    if (agreement.status === "Completed" && (agreement.phase === "Expired" || agreement.phase === "Terminated")) {
      return (
        <Badge variant="outline" className="bg-gray-400 text-gray-900 border-gray-600">
          {agreement.phase}
        </Badge>
      )
    }

    // Handle completed agreements with archived phase
    if (agreement.status === "Completed" && agreement.phase === "Archived") {
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          {agreement.phase}
        </Badge>
      )
    }

    if (agreement.status === "Waiting for Signature") {
      return (
        <div className="w-32">
          <Progress value={agreement.signingProgress || 0} className="h-2 mb-1 grayscale" />
          <div className="text-xs text-gray-500">Waiting on {agreement.waitingOn}</div>
        </div>
      )
    }

    switch (agreement.status) {
      case "Draft":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Draft
          </Badge>
        )
      case "Under Review":
        return (
          <Badge variant="outline" className="bg-gray-200 text-gray-800 border-gray-400">
            Under Review
          </Badge>
        )
      case "Waiting for Approval":
        return (
          <Badge variant="outline" className="bg-gray-300 text-gray-900 border-gray-500">
            Waiting for Approval
          </Badge>
        )
      case "Completed":
        return (
          <div>
            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
              Completed
            </Badge>
            {agreement.phase && <div className="text-xs text-gray-500 mt-1">{agreement.phase}</div>}
          </div>
        )
      case "Active":
        return (
          <div>
            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
              Active
            </Badge>
            {agreement.subStatus && (
              <div className="text-xs text-gray-500 mt-1">{agreement.subStatus.replace("active ", "")}</div>
            )}
          </div>
        )
      case "Expired":
        return (
          <Badge variant="outline" className="bg-gray-400 text-gray-900 border-gray-600">
            Expired
          </Badge>
        )
      case "Terminated":
        return (
          <Badge variant="outline" className="bg-gray-400 text-gray-900 border-gray-600">
            Terminated
          </Badge>
        )
      default:
        return <Badge variant="outline">{agreement.status}</Badge>
    }
  }

  // Get phase badge styling
  const getPhaseDisplay = (phase) => {
    if (!phase) return null

    switch (phase) {
      case "Executed":
      case "Active":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
            {phase}
          </Badge>
        )
      case "Open Obligations":
        return (
          <Badge variant="outline" className="bg-gray-300 text-gray-900 border-gray-500">
            {phase}
          </Badge>
        )
      case "Renewal Upcoming":
      case "Amendment in Progress":
        return (
          <Badge variant="outline" className="bg-gray-300 text-gray-900 border-gray-500">
            {phase}
          </Badge>
        )
      case "Expired":
      case "Terminated":
        return (
          <Badge variant="outline" className="bg-gray-400 text-gray-900 border-gray-600">
            {phase}
          </Badge>
        )
      case "Archived":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {phase}
          </Badge>
        )
      default:
        return <Badge variant="outline">{phase}</Badge>
    }
  }

  // Get action button styling
  const getActionButton = (action, urgent) => {
    switch (action) {
      case "Review":
        return (
          <Button size="sm" variant={urgent ? "default" : "outline"} className="w-24">
            Review
          </Button>
        )
      case "Approve":
        return (
          <Button size="sm" variant={urgent ? "default" : "outline"} className="w-24">
            Approve
          </Button>
        )
      case "Monitor":
        return (
          <Button size="sm" variant="outline" className="w-24 bg-transparent">
            Monitor
          </Button>
        )
      case "Follow Up":
        return (
          <Button size="sm" variant="outline" className="w-24 bg-transparent">
            Follow Up
          </Button>
        )
      default:
        return (
          <Button size="sm" variant="outline" className="w-24 bg-transparent">
            View
          </Button>
        )
    }
  }

  // Navigate to agreement detail or document viewer
  const navigateToAgreementDetail = (item) => {
    if (item.isDocument) {
      // For documents, go to document viewer
      router.push(`/documents/${item.id}`)
    } else {
      // For agreements, go to agreement detail
      router.push(`/agreements/${item.id}`)
    }
  }

  // Truncate long agreement names
  const truncateName = (name, maxLength = 50) => {
    if (name.length <= maxLength) return name
    return name.substring(0, maxLength) + "..."
  }

  return (
    <div className="flex min-h-screen flex-col">
      <GlobalHeader currentPage="agreements" currentPersona={currentPersona} onPersonaChange={handlePersonaChange} />

      {/* Updated container with mx-auto and px-4 */}
      <div className="container mx-auto px-4 py-6">
        {/* Updated gap-6 to space-y-6 */}
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Agreements</h1>
            </div>
            <div className="flex items-center gap-2">
              {selectedView === "completed" && (
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              )}
              <Button className="bg-gray-800" onClick={() => openModal(currentPersona, "agreements")}>
                <FileText className="mr-2 h-4 w-4" />
                Start
              </Button>
            </div>
          </div>

          {/* Insights Section */}
          {/* {showInsights && selectedView !== "deleted" && (
            <div className="space-y-3">
              <Alert className="bg-gray-100 border-gray-300">
                <AlertCircle className="h-4 w-4 text-gray-700" />
                <AlertDescription className="text-gray-800 flex items-center">
                  You have 2 agreements with upcoming renewals in the next 60 days.{" "}
                  <Button variant="link" className="p-0 h-auto text-gray-800 underline ml-1">
                    View Details
                  </Button>
                </AlertDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setShowInsights(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Alert>
            </div>
          )} */}

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search agreements by name, party, or type..."
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
                  <SelectItem value="all">All Agreements</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="waiting-approval">Waiting for Approval</SelectItem>
                  <SelectItem value="waiting-signature">Waiting for Signature</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="voided">Voided</SelectItem>
                  <SelectItem value="deleted">Deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Columns
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select Columns</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="shared"
                        checked={visibleColumns.shared}
                        onCheckedChange={() => toggleColumn("shared")}
                      />
                      <label htmlFor="shared" className="text-sm font-medium">
                        Shared
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="name" checked={visibleColumns.name} onCheckedChange={() => toggleColumn("name")} />
                      <label htmlFor="name" className="text-sm font-medium">
                        Agreement Name
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type" checked={visibleColumns.type} onCheckedChange={() => toggleColumn("type")} />
                      <label htmlFor="type" className="text-sm font-medium">
                        Type
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="party"
                        checked={visibleColumns.party}
                        onCheckedChange={() => toggleColumn("party")}
                      />
                      <label htmlFor="party" className="text-sm font-medium">
                        Party
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="status"
                        checked={visibleColumns.status}
                        onCheckedChange={() => toggleColumn("status")}
                      />
                      <label htmlFor="status" className="text-sm font-medium">
                        Status
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="phase"
                        checked={visibleColumns.phase}
                        onCheckedChange={() => toggleColumn("phase")}
                      />
                      <label htmlFor="phase" className="text-sm font-medium">
                        Phase
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="lastUpdated"
                        checked={visibleColumns.lastUpdated}
                        onCheckedChange={() => toggleColumn("lastUpdated")}
                      />
                      <label htmlFor="lastUpdated" className="text-sm font-medium">
                        Last Updated
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="value"
                        checked={visibleColumns.value}
                        onCheckedChange={() => toggleColumn("value")}
                      />
                      <label htmlFor="value" className="text-sm font-medium">
                        Value
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="effectiveDate"
                        checked={visibleColumns.effectiveDate}
                        onCheckedChange={() => toggleColumn("effectiveDate")}
                      />
                      <label htmlFor="effectiveDate" className="text-sm font-medium">
                        Effective Date
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="expirationDate"
                        checked={visibleColumns.expirationDate}
                        onCheckedChange={() => toggleColumn("expirationDate")}
                      />
                      <label htmlFor="expirationDate" className="text-sm font-medium">
                        Expiration Date
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="action"
                        checked={visibleColumns.action}
                        onCheckedChange={() => toggleColumn("action")}
                      />
                      <label htmlFor="action" className="text-sm font-medium">
                        Action
                      </label>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Agreements Table */}
          <Card>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      {adjustedVisibleColumns.shared && (
                        <th scope="col" className="px-3 py-3 w-12">
                          {/* Shared column header */}
                        </th>
                      )}
                      {adjustedVisibleColumns.name &&
                        renderSortableHeader(
                          "name",
                          selectedView === "completed" ? "Document Name" : "Agreement Name",
                          "w-80",
                        )}
                      {adjustedVisibleColumns.type && renderSortableHeader("type", "Type")}
                      {adjustedVisibleColumns.party && renderSortableHeader("party", "Party")}
                      {adjustedVisibleColumns.status && renderSortableHeader("status", "Status")}
                      {adjustedVisibleColumns.phase && renderSortableHeader("phase", "Phase")}
                      {adjustedVisibleColumns.lastUpdated && renderSortableHeader("lastUpdated", "Last Updated")}
                      {adjustedVisibleColumns.value && renderSortableHeader("value", "Value")}
                      {adjustedVisibleColumns.effectiveDate && renderSortableHeader("effectiveDate", "Effective Date")}
                      {adjustedVisibleColumns.expirationDate &&
                        renderSortableHeader("expirationDate", "Expiration Date")}
                      {adjustedVisibleColumns.action && (
                        <th scope="col" className="px-6 py-3 text-right">
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedAgreements.length > 0 ? (
                      filteredAndSortedAgreements.map((item) => (
                        <tr
                          key={item.id}
                          className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigateToAgreementDetail(item)}
                        >
                          {visibleColumns.shared && (
                            <td className="px-3 py-4 w-12">
                              {!item.isOwner && <Users className="h-4 w-4 text-gray-700" title="Shared with me" />}
                            </td>
                          )}
                          {visibleColumns.name && (
                            <td className="px-3 py-4 font-medium w-80">
                              <div>
                                <span title={item.name}>{truncateName(item.name)}</span>
                                {item.isDocument && item.parentAgreement && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    <a
                                      href={`/agreements/${item.parentAgreement.id}`}
                                      className="hover:text-blue-600 underline"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {truncateName(item.parentAgreement.name, 40)}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </td>
                          )}
                          {visibleColumns.type && <td className="px-6 py-4">{item.type}</td>}
                          {visibleColumns.party && <td className="px-6 py-4">{item.party}</td>}
                          {adjustedVisibleColumns.status && <td className="px-6 py-4">{getStatusDisplay(item)}</td>}
                          {adjustedVisibleColumns.phase && <td className="px-6 py-4">{getPhaseDisplay(item.phase)}</td>}
                          {visibleColumns.lastUpdated && (
                            <td className="px-6 py-4">{formatTimeAgo(item.lastUpdated)}</td>
                          )}
                          {visibleColumns.value && <td className="px-6 py-4">{item.value}</td>}
                          {adjustedVisibleColumns.effectiveDate && (
                            <td className="px-6 py-4">{item.effectiveDate || "-"}</td>
                          )}
                          {adjustedVisibleColumns.expirationDate && (
                            <td className="px-6 py-4">{item.expirationDate || "-"}</td>
                          )}
                          {visibleColumns.action && (
                            <td className="px-6 py-4 text-right">{getActionButton(item.action, item.urgent)}</td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={Object.values(adjustedVisibleColumns).filter(Boolean).length}
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          No agreements found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
