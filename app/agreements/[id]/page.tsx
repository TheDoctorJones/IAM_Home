"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ChevronLeft,
  FileText,
  Clock,
  AlertCircle,
  Star,
  Share2,
  MessageSquare,
  CheckCircle,
  Building,
  CalendarClock,
  DollarSign,
  User,
  PenTool,
  Eye,
  Plus,
  Users,
  RefreshCw,
  Phone,
  Mail,
  Circle,
  Check,
  Database,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { getAgreementById, type Agreement } from "@/lib/data/agreements"
import { getPartyById, getPrimaryContactForParty } from "@/lib/data/parties"

export default function AgreementDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [agreement, setAgreement] = useState<Agreement | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAgreement = async () => {
      setLoading(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const foundAgreement = getAgreementById(id)
      if (foundAgreement) {
        setAgreement(foundAgreement)
      }

      setLoading(false)
    }

    loadAgreement()
  }, [id])

  const handleBackClick = () => {
    // Navigate back to agreements list with the correct view
    const currentView = localStorage.getItem("agreements-previous-view") || "all"
    router.push(`/agreements?view=${currentView}`)
  }

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
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
      case "Waiting for Signature":
        return (
          <Badge variant="outline" className="bg-gray-200 text-gray-800 border-gray-400">
            Waiting for Signature
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
            Completed
          </Badge>
        )
      case "Active":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
            Active
          </Badge>
        )
      case "Voided":
        return (
          <Badge variant="outline" className="bg-gray-400 text-gray-900 border-gray-600">
            Voided
          </Badge>
        )
      case "Published":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
            Published
          </Badge>
        )
      case "Expired":
        return (
          <Badge variant="outline" className="bg-gray-400 text-gray-900 border-gray-600">
            Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get phase badge styling
  const getPhaseBadge = (phase: string) => {
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
          <Badge variant="outline" className="bg-gray-200 text-gray-800 border-gray-400">
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

  // Check if agreement needs Salesforce writeback
  const needsSalesforceWriteback = (agreement: Agreement) => {
    // Add Salesforce writeback for specific Master Service Agreements
    const salesforceIntegratedAgreements = [
      "agr-001", // TechGiant Corp - Enterprise Security Platform
      "agr-010", // Metro Financial Group - Financial Services Security Platform
      "agr-018", // RetailMax Corporation - Retail Security Platform
      "agr-031", // Government Solutions Inc. - Federal Security Platform
    ]

    return agreement.type === "Master Service Agreement" && salesforceIntegratedAgreements.includes(agreement.id)
  }

  // Get workflow steps based on agreement type and status
  const getWorkflowSteps = (agreement: Agreement) => {
    // Special workflow for Co-Seller Applications
    if (agreement.type === "Co-Seller Application") {
      const coSellerSteps = [
        { id: "draft", label: "Draft Created", description: "Application form drafted and prepared" },
        { id: "review", label: "Under Review", description: "Legal and business review completed" },
        { id: "approval", label: "Approved", description: "Application form approved for publication" },
        { id: "active", label: "Active", description: "Live on external site collecting submissions" },
      ]

      // For Co-Seller Applications, determine current step based on status
      let currentStepIndex = 0
      switch (agreement.status) {
        case "Draft":
          currentStepIndex = 0
          break
        case "Under Review":
          currentStepIndex = 1
          break
        case "Waiting for Approval":
          currentStepIndex = 2
          break
        case "Active":
        case "Published":
          currentStepIndex = 3
          break
        default:
          currentStepIndex = 3 // Default to active for Co-Seller Applications
      }

      return coSellerSteps.map((step, index) => ({
        ...step,
        status: index < currentStepIndex ? "completed" : index === currentStepIndex ? "current" : "pending",
        isLast: index === coSellerSteps.length - 1,
      }))
    }

    // Enhanced workflow for Master Service Agreements with Salesforce integration
    if (needsSalesforceWriteback(agreement)) {
      const msaSteps = [
        { id: "draft", label: "Draft Created", description: "Agreement drafted and prepared" },
        { id: "review", label: "Under Review", description: "Legal and business review in progress" },
        { id: "approval", label: "Approval", description: "Waiting for internal approval" },
        { id: "signature", label: "Signature", description: "Sent for signature" },
        { id: "completed", label: "Completed", description: "Agreement fully executed" },
        { id: "writeback", label: "Data Writeback", description: "Updating Salesforce record" },
      ]

      // Determine current step based on status
      let currentStepIndex = 0
      switch (agreement.status) {
        case "Draft":
          currentStepIndex = 0
          break
        case "Under Review":
          currentStepIndex = 1
          break
        case "Waiting for Approval":
          currentStepIndex = 2
          break
        case "Waiting for Signature":
          currentStepIndex = 3
          break
        case "Completed":
          // For completed agreements, check if writeback is done
          // For demo purposes, we'll assume writeback is completed for older agreements
          const createdDate = new Date(agreement.created)
          const now = new Date()
          const daysSinceCreated = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))

          if (daysSinceCreated > 30) {
            // Older agreements have completed writeback
            currentStepIndex = 5
          } else {
            // Recent agreements might still be in writeback process
            currentStepIndex = 4
          }
          break
        case "Active":
          currentStepIndex = 5
          break
        case "Expired":
        case "Voided":
          currentStepIndex = 5
          break
        default:
          currentStepIndex = 0
      }

      return msaSteps.map((step, index) => ({
        ...step,
        status: index < currentStepIndex ? "completed" : index === currentStepIndex ? "current" : "pending",
        isLast: index === msaSteps.length - 1,
      }))
    }

    // Default workflow for regular agreements
    const baseSteps = [
      { id: "draft", label: "Draft Created", description: "Agreement drafted and prepared" },
      { id: "review", label: "Under Review", description: "Legal and business review in progress" },
      { id: "approval", label: "Approval", description: "Waiting for internal approval" },
      { id: "signature", label: "Signature", description: "Sent for signature" },
      { id: "completed", label: "Completed", description: "Agreement fully executed" },
    ]

    // Determine current step based on status
    let currentStepIndex = 0
    switch (agreement.status) {
      case "Draft":
        currentStepIndex = 0
        break
      case "Under Review":
        currentStepIndex = 1
        break
      case "Waiting for Approval":
        currentStepIndex = 2
        break
      case "Waiting for Signature":
        currentStepIndex = 3
        break
      case "Completed":
      case "Active":
        currentStepIndex = 4
        break
      case "Expired":
      case "Voided":
        // For expired/voided, show all steps as completed but mark as ended
        currentStepIndex = 4
        break
      default:
        currentStepIndex = 0
    }

    return baseSteps.map((step, index) => ({
      ...step,
      status: index < currentStepIndex ? "completed" : index === currentStepIndex ? "current" : "pending",
      isLast: index === baseSteps.length - 1,
    }))
  }

  // Get all tasks for the agreement
  const getAllTasks = (agreement: Agreement) => {
    const tasks = []

    // Add type-specific tasks
    if (agreement.type === "Master Service Agreement") {
      tasks.push(
        {
          id: "legal-review",
          name: "Legal Review",
          status: "Pending",
          type: "review",
          icon: Clock,
        },
        {
          id: "finance-review",
          name: "Finance Review",
          status: "Due Tomorrow",
          type: "review",
          icon: Clock,
        },
      )
    }

    // Add general tasks based on status
    if (agreement.status === "Under Review") {
      tasks.push({
        id: "business-review",
        name: "Business Review",
        status: "In Progress",
        type: "review",
        icon: Clock,
      })
    }

    return tasks
  }

  // Render loading state
  if (loading || !agreement) {
    return (
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <Button variant="ghost" className="mb-4 w-24" onClick={handleBackClick}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="md:col-span-2">
              <div className="h-10 w-full bg-gray-200 animate-pulse rounded mb-4"></div>
              <Card>
                <CardHeader>
                  <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
                </CardHeader>
                <CardContent>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 w-full bg-gray-200 animate-pulse rounded mb-3"></div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Get party and contact information
  const party = getPartyById(agreement.partyId)
  const primaryContact = agreement.primaryContactId
    ? party?.contacts.find((c) => c.id === agreement.primaryContactId)
    : getPrimaryContactForParty(agreement.partyId)

  // Helper function to render status-specific details
  const renderStatusSpecificDetails = (agreement: Agreement) => {
    switch (agreement.status) {
      case "Waiting for Signature":
        return (
          <div className="mt-3">
            {agreement.signingProgress && (
              <>
                <Progress value={agreement.signingProgress} className="h-2 mb-1" />
                <div className="text-xs text-gray-500">
                  {agreement.completedSigners} of {agreement.totalSigners} signatures completed
                </div>
                <div className="text-xs text-gray-500">Waiting on: {agreement.waitingOn}</div>
              </>
            )}
          </div>
        )
      case "Under Review":
        return (
          <div className="mt-3">
            <div className="text-xs text-gray-500">Review in progress</div>
          </div>
        )
      case "Completed":
        return (
          <div className="mt-3">
            <div className="text-xs text-gray-500">Agreement completed</div>
          </div>
        )
      default:
        return null
    }
  }

  // Helper function to render type-specific details
  const renderTypeSpecificDetails = (agreement: Agreement) => {
    switch (agreement.type) {
      case "Renewal":
        return (
          <div>
            <div className="text-sm font-medium text-gray-500">Source</div>
            <div className="mt-1 flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Annual Renewal</span>
            </div>
          </div>
        )
      case "Non-Disclosure Agreement":
        if (agreement.source === "bulk") {
          return (
            <div>
              <div className="text-sm font-medium text-gray-500">Recipients</div>
              <div className="mt-1 flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{agreement.totalSigners} total recipients</span>
              </div>
            </div>
          )
        }
        return null
      default:
        return null
    }
  }

  // Helper function to render type-specific documents
  const renderTypeSpecificDocuments = (agreement: Agreement) => {
    switch (agreement.type) {
      case "Master Service Agreement":
        return (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Risk Analysis</CardTitle>
              <CardDescription>AI-powered risk assessment of contract terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Contract Terms Review</div>
                    <Badge variant="outline" className="bg-gray-200 text-gray-800 border-gray-400">
                      Medium Risk
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Standard terms with minor deviations. Review recommended for liability and payment clauses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  // Render agreement details
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        {/* Back button and header */}
        <div>
          <Button variant="ghost" className="mb-4" onClick={handleBackClick}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Agreements
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{agreement.name}</h1>
              {agreement.isOwner && <Star className="h-4 w-4 text-amber-500" />}
              {agreement.urgent && <AlertCircle className="h-4 w-4 text-red-500" />}
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Share Agreement</DialogTitle>
                    <DialogDescription>Manage participants and sharing settings for this agreement</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Current Participants */}
                    <div>
                      <h4 className="font-medium mb-4">Current Participants</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{agreement.owner.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{agreement.owner}</div>
                              <div className="text-sm text-gray-500">Agreement Owner</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-gray-50">
                              Owner
                            </Badge>
                            <Button size="sm" variant="ghost">
                              Edit
                            </Button>
                          </div>
                        </div>

                        {/* Show party contacts */}
                        {party?.contacts.map((contact) => (
                          <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-sm text-gray-500">
                                  {contact.title} • {party.name}
                                </div>
                                {contact.email && <div className="text-xs text-gray-400">{contact.email}</div>}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={contact.isPrimary ? "bg-blue-50" : "bg-gray-50"}>
                                {contact.isPrimary ? "Primary Contact" : "Contact"}
                              </Badge>
                              <Button size="sm" variant="ghost">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add Participant */}
                    <div>
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Participant
                      </Button>
                    </div>

                    {/* Status-specific sharing content */}
                    {agreement.status === "Waiting for Signature" && (
                      <div>
                        <h4 className="font-medium mb-4">Signature Status</h4>
                        <div className="p-3 border rounded-lg">
                          <div className="text-sm text-gray-600">
                            {agreement.completedSigners} of {agreement.totalSigners} signatures completed
                          </div>
                          <div className="text-sm text-gray-600 mt-1">Waiting on: {agreement.waitingOn}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments
              </Button>
            </div>
          </div>
        </div>

        {/* Agreement details and tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar with agreement details */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Agreement Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Status</div>
                <div className="mt-1 flex items-center gap-2">
                  {getStatusBadge(agreement.status)}
                  {agreement.subStatus && <span className="text-sm text-gray-600">{agreement.subStatus}</span>}
                </div>

                {/* Status-specific content */}
                {renderStatusSpecificDetails(agreement)}
              </div>

              {agreement.phase && (
                <div>
                  <div className="text-sm font-medium text-gray-500">Phase</div>
                  <div className="mt-1 flex items-center gap-2">{getPhaseBadge(agreement.phase)}</div>
                </div>
              )}

              <div>
                <div className="text-sm font-medium text-gray-500">Type</div>
                <div className="mt-1 text-sm">{agreement.type}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500">Party</div>
                <div className="mt-1 flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">{party?.name || "Unknown Party"}</div>
                    {party && (
                      <div className="text-xs text-gray-500">
                        {party.type === "company" ? "Company" : "Individual"} • {party.industryType}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Primary Contact */}
              {primaryContact && (
                <div>
                  <div className="text-sm font-medium text-gray-500">Primary Contact</div>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{primaryContact.name}</span>
                    </div>
                    {primaryContact.title && <div className="text-xs text-gray-500 ml-6">{primaryContact.title}</div>}
                    {primaryContact.email && (
                      <div className="flex items-center gap-2 ml-6">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{primaryContact.email}</span>
                      </div>
                    )}
                    {primaryContact.phone && (
                      <div className="flex items-center gap-2 ml-6">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{primaryContact.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Type-specific content */}
              {renderTypeSpecificDetails(agreement)}

              <div>
                <div className="text-sm font-medium text-gray-500">Value</div>
                <div className="mt-1 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{agreement.value}</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500">Due Date</div>
                <div className="mt-1 flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-gray-400" />
                  <span className={`text-sm ${agreement.urgent ? "text-red-600 font-medium" : ""}`}>
                    {agreement.dueDate}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500">Owner</div>
                <div className="mt-1 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{agreement.owner}</span>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm font-medium text-gray-500">Created</div>
                <div className="mt-1 text-sm">{agreement.created}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500">Last Updated</div>
                <div className="mt-1 text-sm">{agreement.lastUpdated}</div>
              </div>

              {agreement.effectiveDate && (
                <div>
                  <div className="text-sm font-medium text-gray-500">Effective Date</div>
                  <div className="mt-1 text-sm">{agreement.effectiveDate}</div>
                </div>
              )}

              {agreement.expirationDate && (
                <div>
                  <div className="text-sm font-medium text-gray-500">Expiration Date</div>
                  <div className="mt-1 text-sm">{agreement.expirationDate}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right content area with tabs */}
          <div className="md:col-span-2">
            <Tabs defaultValue="documents">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Agreement Documents</CardTitle>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Document
                      </Button>
                    </div>
                    <CardDescription>All documents associated with this agreement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {agreement.documents && agreement.documents.length > 0 ? (
                        agreement.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium">{doc.name}</div>
                                <div className="text-sm text-gray-500">{doc.type}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {getStatusBadge(doc.status)}
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 bg-transparent"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/documents/${doc.id}?from=agreement&agreementId=${agreement.id}`)
                                }}
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                                <PenTool className="h-4 w-4" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No documents found for this agreement.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Type-specific document content */}
                {renderTypeSpecificDocuments(agreement)}
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Agreement Progress</CardTitle>
                    <CardDescription>Track the progress of this agreement through each stage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getWorkflowSteps(agreement).map((step, index) => (
                        <div key={step.id} className="flex items-start gap-3">
                          {/* Step indicator */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                step.status === "completed"
                                  ? "bg-gray-200 border-gray-600 text-gray-800"
                                  : step.status === "current"
                                    ? "bg-gray-300 border-gray-700 text-gray-900"
                                    : "bg-gray-100 border-gray-300 text-gray-500"
                              }`}
                            >
                              {step.status === "completed" ? (
                                step.id === "writeback" ? (
                                  <Database className="h-2 w-2" />
                                ) : (
                                  <Check className="h-2 w-2" />
                                )
                              ) : step.status === "current" ? (
                                step.id === "writeback" ? (
                                  <Database className="h-2 w-2 fill-current" />
                                ) : (
                                  <Circle className="h-2 w-2 fill-current" />
                                )
                              ) : step.id === "writeback" ? (
                                <Database className="h-2 w-2" />
                              ) : (
                                <Circle className="h-2 w-2" />
                              )}
                            </div>
                            {!step.isLast && (
                              <div
                                className={`w-0.5 h-8 mt-1 ${
                                  step.status === "completed" ? "bg-gray-400" : "bg-gray-200"
                                }`}
                              />
                            )}
                          </div>

                          {/* Step content */}
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <h4
                                className={`font-medium ${
                                  step.status === "current" ? "text-gray-900" : "text-gray-900"
                                }`}
                              >
                                {step.label}
                              </h4>
                              {step.status === "current" && (
                                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{step.description}</p>

                            {/* Show additional details for current step */}
                            {step.status === "current" && (
                              <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                                {agreement.status === "Under Review" && (
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-900">Review Details:</div>
                                    <div className="text-sm text-gray-800">
                                      {agreement.subStatus || "Legal and business review in progress"}
                                    </div>
                                    <div className="text-xs text-gray-700">
                                      Last updated: {new Date(agreement.lastUpdated).toLocaleDateString()}
                                    </div>
                                  </div>
                                )}
                                {agreement.status === "Waiting for Signature" && agreement.signingProgress && (
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-900">Signature Progress:</div>
                                    <Progress value={agreement.signingProgress} className="h-2" />
                                    <div className="text-sm text-gray-800">
                                      {agreement.completedSigners} of {agreement.totalSigners} signatures completed
                                    </div>
                                    <div className="text-xs text-gray-700">Waiting on: {agreement.waitingOn}</div>
                                  </div>
                                )}
                                {agreement.status === "Waiting for Approval" && (
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-900">Approval Status:</div>
                                    <div className="text-sm text-gray-800">
                                      {agreement.subStatus || "Pending internal approval"}
                                    </div>
                                  </div>
                                )}
                                {agreement.status === "Active" && agreement.type === "Co-Seller Application" && (
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-900">Application Status:</div>
                                    <div className="text-sm text-gray-800">
                                      {agreement.subStatus
                                        ? agreement.subStatus.replace("active ", "")
                                        : "Live and collecting submissions"}
                                    </div>
                                    <div className="text-xs text-gray-700">
                                      Last updated: {new Date(agreement.lastUpdated).toLocaleDateString()}
                                    </div>
                                  </div>
                                )}
                                {step.id === "writeback" && (
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-900">Salesforce Integration:</div>
                                    <div className="text-sm text-gray-800">
                                      Syncing agreement data to Salesforce opportunity record
                                    </div>
                                    <div className="text-xs text-gray-700">Expected completion: Within 5 minutes</div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Show completion details for completed steps */}
                            {step.status === "completed" && (
                              <div className="text-xs text-gray-500">
                                {step.id === "writeback" ? (
                                  <>Salesforce record updated on {new Date(agreement.created).toLocaleDateString()}</>
                                ) : (
                                  <>Completed on {new Date(agreement.created).toLocaleDateString()}</>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tasks Tab */}
              <TabsContent value="tasks">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Tasks</CardTitle>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Task
                      </Button>
                    </div>
                    <CardDescription>All tasks related to this agreement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getAllTasks(agreement).length > 0 ? (
                        getAllTasks(agreement).map((task) => {
                          const IconComponent = task.icon
                          return (
                            <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <IconComponent className="h-5 w-5 text-gray-400" />
                                <span className="font-medium">{task.name}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  task.status === "Pending"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : task.status === "Due Tomorrow"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : task.status === "In Progress"
                                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                        : "bg-gray-50 text-gray-700 border-gray-200"
                                }
                              >
                                {task.status}
                              </Badge>
                            </div>
                          )
                        })
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No tasks found for this agreement.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
