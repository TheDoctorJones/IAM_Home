"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  TrendingUp,
  Target,
  Clock,
  Users,
  LayoutTemplateIcon as Template,
  Workflow,
  CheckCircle,
  Lock,
  FileText,
} from "lucide-react"
import ApprovalsList from "@/components/approvals-list"
import NewUserChecklist from "@/components/new-user-checklist"
import GlobalSearch from "@/components/global-search"
import TermRiskDetailsModal from "@/components/term-risk-details-modal"
import SignatureCycleModal from "@/components/signature-cycle-modal"
import type { PersonaType } from "@/components/persona-switcher"
import TemplateAdoptionModal from "@/components/template-adoption-modal"
import WorkflowEfficiencyModal from "@/components/workflow-efficiency-modal"
import ExecutiveInsightsCarousel from "@/components/executive-insights-carousel"
import LicenseUtilizationModal from "@/components/license-utilization-modal"
import SecurityScoreModal from "@/components/security-score-modal"
import NotificationSignupModal from "@/components/notification-signup-modal"
import GlobalHeader from "@/components/global-header"

import { useGlobalStartModal } from "@/hooks/use-global-start-modal"

export default function HomePage() {
  const [currentPersona, setCurrentPersona] = useState<PersonaType>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("selectedPersona") as PersonaType) || "vp-sales"
    }
    return "vp-sales"
  })

  const handlePersonaChange = (persona: PersonaType) => {
    setCurrentPersona(persona)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPersona", persona)
    }
  }

  const { openModal } = useGlobalStartModal()
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)

  const getPersonaData = () => {
    switch (currentPersona) {
      case "vp-sales":
        return {
          name: "Michael",
          insights: [
            {
              id: 1,
              title: "Template performance optimization",
              description:
                "Your 'Unlimited Liability' clauses increase negotiation time by 340% vs standard liability caps. Consider updating standard templates.",
              icon: <Target className="h-5 w-5 text-blue-600" />,
            },
            {
              id: 2,
              title: "Key account renewals at risk",
              description:
                "Two strategic accounts with $775K in ARR have renewal dates within 30 days. View renewal details to prepare.",
              icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
            },
            {
              id: 3,
              title: "Template standardization opportunity",
              description:
                "47% of agreements use non-standard templates created by sales reps, creating 2.3x longer review cycles and increased risk exposure.",
              icon: <TrendingUp className="h-5 w-5 text-green-600" />,
            },
          ],
          widget1: {
            title: "Agreement Risk Score",
            badge: { text: "Medium Risk", color: "gray", icon: <AlertTriangle className="mr-1 h-3 w-3" /> },
            value: "72/100",
            change: "\n+5 points vs last quarter\nBased on 284 agreements scanned across Q1–Q3",
            changeColor: "amber",
          },
          widget2: {
            title: "Signature Cycle Time",
            badge: { text: "Improving QoQ", color: "dark-gray", icon: <TrendingUp className="mr-1 h-3 w-3" /> },
            value: "8.2 days",
            change: "-1.5 days vs last quarter",
            changeColor: "green",
          },
          businessInsightsTitle: "Today's Insights",
        }

      case "sales-rep":
        return {
          name: "Sarah",
          insights: [
            {
              id: 1,
              title: "Counterparty signature behavior",
              description:
                "TechGiant Corp's legal team averages 8.4 days for contract review. Schedule follow-up for day 6 to maintain momentum.",
              icon: <Clock className="h-5 w-5 text-amber-600" />,
            },
            {
              id: 2,
              title: "Template selection optimization",
              description:
                "Deals using MSA Template v2.3 close 18% faster than v2.1. Switch to the newer template for pending proposals.",
              icon: <Target className="h-5 w-5 text-blue-600" />,
            },
            {
              id: 3,
              title: "Negotiation pattern insight",
              description:
                "Contracts with >3 redline rounds have 67% lower close rates. Consider escalating Global Industries deal after round 2.",
              icon: <Users className="h-5 w-5 text-purple-600" />,
            },
          ],
          widget1: {
            title: "Frequently Used Templates",
            badge: { text: "", color: "gray", icon: null },
            value: "",
            change: "",
            changeColor: "blue",
          },
          widget2: {
            title: "",
            badge: { text: "", color: "gray", icon: null },
            value: "",
            change: "",
            changeColor: "blue",
          },
          businessInsightsTitle: "Today's Insights",
        }

      case "contract-ops":
        return {
          name: "Alex",
          insights: [
            {
              id: 1,
              title: "Template performance insight",
              description:
                "Multiple template versions show varying performance - v2.3 MSA closes 18% faster than v2.1, while NDA v1.4 has 23% fewer redlines than v1.2.",
              icon: <Template className="h-5 w-5 text-green-600" />,
            },
            {
              id: 2,
              title: "Workflow bottleneck detected",
              description:
                "Legal review stage averaging 5.2 days vs 3-day target. Review approval routing for optimization.",
              icon: <Workflow className="h-5 w-5 text-amber-600" />,
            },
            {
              id: 3,
              title: "Compliance improvement",
              description:
                "Template standardization increased to 89% this quarter. Focus on remaining non-compliant agreements.",
              icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
            },
          ],
          widget1: {
            title: "Template Adoption",
            badge: { text: "Improving", color: "dark-gray", icon: <TrendingUp className="mr-1 h-3 w-3" /> },
            value: "89%",
            change: "+7% vs last quarter",
            changeColor: "green",
          },
          widget2: {
            title: "Workflow Efficiency",
            badge: { text: "Needs Review", color: "gray", icon: <Clock className="mr-1 h-3 w-3" /> },
            value: "12.4 days",
            change: "\n+1.2 days vs target",
            changeColor: "amber",
          },
          businessInsightsTitle: "Today's Insights",
        }

      case "org-admin":
        return {
          name: "Jordan",
          insights: [
            {
              id: 1,
              title: "License utilization optimization",
              description:
                "23% of Enterprise licenses are unused for >30 days. Reallocating could save $18K annually in licensing costs.",
              icon: <Target className="h-5 w-5 text-blue-600" />,
            },
            {
              id: 2,
              title: "Security compliance alert",
              description:
                "12 users have admin permissions without recent activity. Review and revoke unnecessary elevated access.",
              icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
            },
            {
              id: 3,
              title: "Feature adoption opportunity",
              description:
                "Advanced Analytics feature has <20% adoption rate. Consider training sessions to increase utilization.",
              icon: <TrendingUp className="h-5 w-5 text-green-600" />,
            },
          ],
          widget1: {
            title: "",
            badge: { text: "", color: "gray", icon: null },
            value: "",
            change: "",
            changeColor: "blue",
          },
          widget2: {
            title: "Security Score",
            badge: { text: "Good", color: "dark-gray", icon: <CheckCircle className="mr-1 h-3 w-3" /> },
            value: "87/100",
            change: "\n+3 points vs last month",
            changeColor: "green",
          },
          widget3: {
            title: "Top Feature Requests",
            badge: { text: "This Month", color: "gray", icon: <TrendingUp className="mr-1 h-3 w-3" /> },
            value: "",
            change: "",
            changeColor: "blue",
          },
          businessInsightsTitle: "Today's Insights",
        }

      case "new-user":
        return {
          name: "Taylor",
          insights: [],
          widget1: {
            title: "",
            badge: { text: "", color: "gray", icon: null },
            value: "",
            change: "",
            changeColor: "blue",
          },
          widget2: {
            title: "",
            badge: { text: "", color: "gray", icon: null },
            value: "",
            change: "",
            changeColor: "blue",
          },
          businessInsightsTitle: "Welcome to Docusign",
        }

      default:
        return {
          name: "User",
          insights: [],
          widget1: {
            title: "",
            badge: { text: "", color: "gray" as const, icon: null },
            value: "",
            change: "",
            changeColor: "blue" as const,
          },
          widget2: {
            title: "",
            badge: { text: "", color: "gray" as const, icon: null },
            value: "",
            change: "",
            changeColor: "blue" as const,
          },
          businessInsightsTitle: "Today's Insights",
        }
    }
  }

  const personaData = getPersonaData()

  const pendingTasksCount =
    {
      "vp-sales": 4,
      "sales-rep": 4,
      "contract-ops": 2,
      "org-admin": 4,
      "new-user": 0,
    }[currentPersona] || 0

  // Template data for sales-rep persona
  const frequentlyUsedTemplates = [
    {
      id: "template-001",
      title: "Master Service Agreement",
      version: "v2.3",
      type: "MSA",
    },
    {
      id: "template-002",
      title: "Software License Agreement",
      version: "v1.8",
      type: "License",
    },
    {
      id: "template-003",
      title: "Statement of Work",
      version: "v3.1",
      type: "SOW",
    },
    {
      id: "template-004",
      title: "Non-Disclosure Agreement",
      version: "v2.0",
      type: "NDA",
    },
    {
      id: "template-005",
      title: "Reseller Agreement",
      version: "v1.5",
      type: "Reseller",
    },
    {
      id: "template-006",
      title: "Change Order",
      version: "v1.0",
      type: "CO",
    },
  ]

  const handleUseTemplate = (templateId: string) => {
    // Navigate to prepare screen - placeholder for now
    console.log(`Using template: ${templateId}`)
    // In a real app, this would navigate to the prepare screen
    // router.push(`/prepare/${templateId}`)
  }

  const renderTemplateCard = (template: any) => (
    <div key={template.id} className="flex-1 min-w-0">
      <Card className="h-full flex items-center">
        <CardContent className="p-3">
          <div className="space-y-3">
            {/* Document Thumbnail */}
            <div className="w-full h-20 bg-gray-50 border rounded flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100"></div>
              {/* Simulated document lines */}
              <div className="absolute top-2 left-2 right-2 space-y-1">
                <div className="h-0.5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-0.5 bg-gray-300 rounded w-full"></div>
                <div className="h-0.5 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>

            {/* Template Info */}
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900 leading-tight">{template.title}</h4>
                <p className="text-xs text-gray-500">{template.version}</p>
              </div>

              {/* Use Button */}
              <Button
                size="sm"
                variant="outline"
                className="w-full h-7 text-xs bg-transparent"
                onClick={() => handleUseTemplate(template.id)}
              >
                Use
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="relative">
      <main className="flex min-h-screen flex-col relative z-10">
        <GlobalHeader currentPage="home" currentPersona={currentPersona} onPersonaChange={handlePersonaChange} />

        <div className="container mx-auto px-4 py-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mx-0 gap-[16] leading-7">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    {currentPersona === "new-user"
                      ? `Welcome to Docusign, ${personaData.name}`
                      : `Welcome back, ${personaData.name}`}
                  </h2>
                  <p className="text-gray-500">
                    {currentPersona === "new-user" ? (
                      "Let's get you started"
                    ) : (
                      <>
                        <span className="font-bold">{pendingTasksCount} tasks</span> require your attention (
                        <button
                          onClick={() => setNotificationModalOpen(true)}
                          className="text-gray-500 hover:text-gray-700 underline"
                        >
                          get notified
                        </button>
                        )
                      </>
                    )}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
                  <div className="w-full md:w-[41.6rem]">
                    <GlobalSearch />
                  </div>
                  <Button className="bg-gray-800" onClick={() => openModal(currentPersona, "home")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                </div>
              </div>

              {currentPersona === "new-user" ? (
                <NewUserChecklist />
              ) : (
                <ApprovalsList hideTitle={true} persona={currentPersona} />
              )}

              {currentPersona === "new-user" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Try a Docusign Template</h3>
                  <Card className="h-full">
                    <CardContent className="h-full flex items-center p-6">
                      <div className="flex gap-3 w-full">
                        {frequentlyUsedTemplates.slice(0, 6).map((template) => (
                          <div key={template.id} className="w-40 flex-shrink-0">
                            <Card className="h-56 flex flex-col">
                              <CardContent className="p-4 flex flex-col h-full">
                                <div className="space-y-3 flex-1">
                                  {/* Document Thumbnail */}
                                  <div className="w-full h-24 bg-gray-50 border rounded flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100"></div>
                                    {/* Simulated document lines */}
                                    <div className="absolute top-2 left-2 right-2 space-y-1">
                                      <div className="h-0.5 bg-gray-300 rounded w-3/4"></div>
                                      <div className="h-0.5 bg-gray-300 rounded w-full"></div>
                                      <div className="h-0.5 bg-gray-300 rounded w-2/3"></div>
                                    </div>
                                  </div>

                                  {/* Template Info */}
                                  <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
                                        {template.title}
                                      </h4>
                                    </div>

                                    {/* Use Button */}
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="w-full h-8 text-xs bg-transparent mt-3"
                                      onClick={() => handleUseTemplate(template.id)}
                                    >
                                      Use
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}

                        {/* Gallery Callout */}
                        <div className="flex-1 min-w-48">
                          <Card className="h-56 flex flex-col border-0 border-dashed border-gray-300 bg-gray-0">
                            <CardContent className="p-4 flex flex-col h-full items-center justify-center text-center">
                              <div className="space-y-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                                  <Template className="h-6 w-6 text-gray-500" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900 mb-1">Explore More</h4>
                                  <p className="text-xs text-gray-600 mb-3">Browse our full template gallery</p>
                                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                    View All Templates
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentPersona !== "new-user" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Agreement Insights</h3>

                  {currentPersona === "vp-sales" ? (
                    <>
                      <div
                        className={`grid gap-6 ${currentPersona === "org-admin" ? "md:grid-cols-3" : "md:grid-cols-3"}`}
                      >
                        <Card style={{ backgroundColor: "#F9FAFB" }} className="flex flex-col">
                          <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-sm font-medium">
                              {currentPersona === "vp-sales"
                                ? "New This Week"
                                : currentPersona === "sales-rep"
                                  ? "New This Week"
                                  : "New This Week"}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <ExecutiveInsightsCarousel persona={currentPersona} />
                          </CardContent>
                        </Card>

                        {currentPersona === "sales-rep" ? (
                          // Template Cards for Sales Rep (spans 2 columns)
                          <div className="md:col-span-2">
                            <Card className="h-full relative">
                              <CardContent className="absolute inset-0 flex items-center justify-center p-6">
                                <div className="flex gap-3">
                                  {frequentlyUsedTemplates.slice(0, 5).map(renderTemplateCard)}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ) : (
                          <>
                            <Card className="flex flex-col">
                              <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{personaData.widget2.title}</CardTitle>
                                {personaData.widget2.badge.text && (
                                  <Badge
                                    variant="outline"
                                    className={`${
                                      personaData.widget2.badge.color === "gray"
                                        ? "bg-gray-100 text-gray-700 border-gray-300"
                                        : personaData.widget2.badge.color === "dark-gray"
                                          ? "bg-gray-200 text-gray-800 border-gray-400"
                                          : "bg-gray-100 text-gray-600 border-gray-300"
                                    }`}
                                  >
                                    {personaData.widget2.badge.icon}
                                    {personaData.widget2.badge.text}
                                  </Badge>
                                )}
                              </CardHeader>
                              <CardContent className="flex-grow pb-2">
                                <div className="text-2xl font-bold">{personaData.widget2.value}</div>
                                <p className="text-xs text-gray-500" style={{ whiteSpace: "pre-line" }}>
                                  <span
                                    className={`font-medium ${
                                      personaData.widget2.changeColor === "green"
                                        ? "text-gray-800"
                                        : personaData.widget2.changeColor === "amber"
                                          ? "text-gray-600"
                                          : "text-gray-700"
                                    }`}
                                  >
                                    {personaData.widget2.change}
                                  </span>
                                </p>
                                {currentPersona === "vp-sales" && (
                                  <>
                                    <div className="mt-2">
                                      <div className="h-2 w-full flex rounded-full overflow-hidden">
                                        <div
                                          className="h-full"
                                          style={{ width: "38%", backgroundColor: "#18181B" }}
                                        ></div>
                                        <div
                                          className="h-full"
                                          style={{ width: "34%", backgroundColor: "#6B7280" }}
                                        ></div>
                                        <div
                                          className="h-full"
                                          style={{ width: "20%", backgroundColor: "#9CA3AF" }}
                                        ></div>
                                        <div
                                          className="h-full"
                                          style={{ width: "8%", backgroundColor: "#D1D5DB" }}
                                        ></div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <div
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: "#18181B" }}
                                        ></div>
                                        <span>Legal (3.1d)</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <div
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: "#6B7280" }}
                                        ></div>
                                        <span>Counterparty (2.8d)</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <div
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: "#9CA3AF" }}
                                        ></div>
                                        <span>Internal (1.6d)</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <div
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: "#D1D5DB" }}
                                        ></div>
                                        <span>Signature (0.7d)</span>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </CardContent>
                              <CardFooter className="pt-0 flex justify-end mt-auto">
                                {currentPersona === "vp-sales" ? (
                                  <SignatureCycleModal
                                    trigger={
                                      <Button size="sm" variant="outline" className="text-black bg-transparent">
                                        View Details
                                      </Button>
                                    }
                                  />
                                ) : currentPersona === "contract-ops" ? (
                                  <WorkflowEfficiencyModal
                                    trigger={
                                      <Button size="sm" variant="outline" className="text-black bg-transparent">
                                        View Details
                                      </Button>
                                    }
                                  />
                                ) : (
                                  <SecurityScoreModal
                                    trigger={
                                      <Button size="sm" variant="outline" className="text-black bg-transparent">
                                        View Details
                                      </Button>
                                    }
                                  />
                                )}
                              </CardFooter>
                            </Card>

                            <Card className="flex flex-col">
                              <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{personaData.widget1.title}</CardTitle>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    personaData.widget1.badge.color === "gray"
                                      ? "bg-gray-100 text-gray-700 border-gray-300"
                                      : personaData.widget1.badge.color === "dark-gray"
                                        ? "bg-gray-200 text-gray-800 border-gray-400"
                                        : "bg-gray-100 text-gray-600 border-gray-300"
                                  }`}
                                >
                                  {personaData.widget1.badge.icon}
                                  {personaData.widget1.badge.text}
                                </Badge>
                              </CardHeader>
                              <CardContent className="flex-grow">
                                <div
                                  className={`font-bold ${currentPersona === "org-admin" || currentPersona === "vp-sales" ? "text-5xl" : "text-2xl"}`}
                                >
                                  {personaData.widget1.value}
                                </div>
                                <p className="text-xs text-gray-500" style={{ whiteSpace: "pre-line" }}>
                                  <span
                                    className={`font-medium ${
                                      personaData.widget1.changeColor === "green"
                                        ? "text-gray-800"
                                        : personaData.widget1.changeColor === "amber"
                                          ? "text-gray-600"
                                          : "text-gray-700"
                                    }`}
                                  >
                                    {personaData.widget1.change.includes("+") ? "" : ""}
                                    {personaData.widget1.change}
                                  </span>
                                </p>
                              </CardContent>
                              <CardFooter className="pt-0 flex justify-end mt-auto">
                                {currentPersona === "vp-sales" ? (
                                  <TermRiskDetailsModal
                                    trigger={
                                      <Button size="sm" variant="outline" className="text-black bg-transparent">
                                        <Lock className="mr-2 h-4 w-4" />
                                        Upgrade to View Details
                                      </Button>
                                    }
                                  />
                                ) : currentPersona === "contract-ops" ? (
                                  <TemplateAdoptionModal
                                    trigger={
                                      <Button size="sm" variant="outline" className="text-black bg-transparent">
                                        View Details
                                      </Button>
                                    }
                                  />
                                ) : (
                                  <LicenseUtilizationModal
                                    trigger={
                                      <Button size="sm" variant="outline" className="text-black bg-transparent">
                                        View Details
                                      </Button>
                                    }
                                  />
                                )}
                              </CardFooter>
                            </Card>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <div
                      className={`grid gap-6 ${currentPersona === "org-admin" ? "md:grid-cols-3" : "md:grid-cols-3"}`}
                    >
                      <Card style={{ backgroundColor: "#F9FAFB" }} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                          <CardTitle className="text-sm font-medium">
                            {currentPersona === "vp-sales"
                              ? "New This Week"
                              : currentPersona === "sales-rep"
                                ? "New This Week"
                                : "New This Week"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <ExecutiveInsightsCarousel persona={currentPersona} />
                        </CardContent>
                      </Card>

                      {currentPersona === "sales-rep" ? (
                        // Template Cards for Sales Rep (spans 2 columns)
                        <div className="md:col-span-2 relative">
                          <h3 className="absolute -top-10 left-0 text-xl font-bold z-10">Favorite Templates</h3>
                          <Card className="h-full">
                            <CardContent className="h-full flex items-center p-6">
                              <div className="flex gap-3 w-full">
                                {frequentlyUsedTemplates.slice(0, 5).map(renderTemplateCard)}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ) : currentPersona === "org-admin" ? (
                        // Only show security score widget for org-admin
                        <>
                          {/* Security Score widget */}
                          <Card className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">{personaData.widget2.title}</CardTitle>
                              {personaData.widget2.badge.text && (
                                <Badge
                                  variant="outline"
                                  className={`${
                                    personaData.widget2.badge.color === "gray"
                                      ? "bg-gray-100 text-gray-700 border-gray-300"
                                      : personaData.widget2.badge.color === "dark-gray"
                                        ? "bg-gray-200 text-gray-800 border-gray-400"
                                        : "bg-gray-100 text-gray-600 border-gray-300"
                                  }`}
                                >
                                  {personaData.widget2.badge.icon}
                                  {personaData.widget2.badge.text}
                                </Badge>
                              )}
                            </CardHeader>
                            <CardContent className="flex-grow -mb-2">
                              <div className="text-5xl font-bold">{personaData.widget2.value}</div>
                              <p className="text-xs text-gray-500" style={{ whiteSpace: "pre-line" }}>
                                <span
                                  className={`font-medium ${
                                    personaData.widget2.changeColor === "green"
                                      ? "text-gray-800"
                                      : personaData.widget2.changeColor === "amber"
                                        ? "text-gray-600"
                                        : "text-gray-700"
                                  }`}
                                >
                                  {personaData.widget2.change}
                                </span>
                              </p>
                            </CardContent>
                            <CardFooter className="pt-0 flex justify-end mt-auto">
                              <SecurityScoreModal
                                trigger={
                                  <Button size="sm" variant="outline" className="text-black bg-transparent">
                                    View Details
                                  </Button>
                                }
                              />
                            </CardFooter>
                          </Card>

                          {/* Top Feature Requests widget */}
                          <Card className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">Top Feature Requests</CardTitle>
                              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                                <TrendingUp className="mr-1 h-3 w-3" />
                                This Month
                              </Badge>
                            </CardHeader>
                            <CardContent className="flex-grow -mb-2">
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">Advanced Analytics</span>
                                    <span className="text-xs font-medium text-gray-800">13</span>
                                  </div>
                                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-800 rounded-full" style={{ width: "43%" }}></div>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">Enterprise Insights</span>
                                    <span className="text-xs font-medium text-gray-800">9</span>
                                  </div>
                                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-600 rounded-full" style={{ width: "30%" }}></div>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">API Integrations</span>
                                    <span className="text-xs font-medium text-gray-800">5</span>
                                  </div>
                                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-400 rounded-full" style={{ width: "17%" }}></div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0 flex justify-end mt-auto">
                              <Button size="sm" variant="outline" className="text-black bg-transparent">
                                View All Requests
                              </Button>
                            </CardFooter>
                          </Card>
                        </>
                      ) : (
                        <>
                          <Card className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">{personaData.widget1.title}</CardTitle>
                              <Badge
                                variant="outline"
                                className={`${
                                  personaData.widget1.badge.color === "gray"
                                    ? "bg-gray-100 text-gray-700 border-gray-300"
                                    : personaData.widget1.badge.color === "dark-gray"
                                      ? "bg-gray-200 text-gray-800 border-gray-400"
                                      : "bg-gray-100 text-gray-600 border-gray-300"
                                }`}
                              >
                                {personaData.widget1.badge.icon}
                                {personaData.widget1.badge.text}
                              </Badge>
                            </CardHeader>
                            <CardContent className="flex-grow -mb-2">
                              <div className={`font-bold ${currentPersona === "org-admin" ? "text-5xl" : "text-2xl"}`}>
                                {personaData.widget1.value}
                              </div>
                              <p className="text-xs text-gray-500" style={{ whiteSpace: "pre-line" }}>
                                <span
                                  className={`font-medium ${
                                    personaData.widget1.changeColor === "green"
                                      ? "text-gray-800"
                                      : personaData.widget1.changeColor === "amber"
                                        ? "text-gray-600"
                                        : "text-gray-700"
                                  }`}
                                >
                                  {personaData.widget1.change.includes("+") ? "" : ""}
                                  {personaData.widget1.change}
                                </span>
                              </p>
                              {currentPersona === "vp-sales" && (
                                <>
                                  <div className="mt-2">
                                    <div className="h-2 w-full flex rounded-full overflow-hidden">
                                      <div
                                        className="h-full"
                                        style={{ width: "45%", backgroundColor: "#18181B" }}
                                      ></div>
                                      <div
                                        className="h-full"
                                        style={{ width: "35%", backgroundColor: "#6B7280" }}
                                      ></div>
                                      <div
                                        className="h-full"
                                        style={{ width: "20%", backgroundColor: "#9CA3AF" }}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="space-y-1 mt-2">
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: "#18181B" }}
                                      ></div>
                                      <span>High-risk clauses: 45%</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: "#6B7280" }}
                                      ></div>
                                      <span>Medium-risk terms: 35%</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: "#9CA3AF" }}
                                      ></div>
                                      <span>Low-risk standard: 20%</span>
                                    </div>
                                  </div>
                                </>
                              )}
                              {currentPersona === "contract-ops" && (
                                <>
                                  <div className="mt-2">
                                    <div className="h-2 w-full flex rounded-full overflow-hidden">
                                      <div
                                        className="h-full"
                                        style={{ width: "62%", backgroundColor: "#18181B" }}
                                      ></div>
                                      <div
                                        className="h-full"
                                        style={{ width: "38%", backgroundColor: "#6B7280" }}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="space-y-1 mt-2">
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: "#18181B" }}
                                      ></div>
                                      <span>v2.3 usage: 62%</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: "#6B7280" }}
                                      ></div>
                                      <span>v2.1 usage: 38%</span>
                                    </div>
                                  </div>
                                </>
                              )}
                            </CardContent>
                            <CardFooter className="pt-0 flex justify-end mt-auto">
                              {currentPersona === "vp-sales" ? (
                                <TermRiskDetailsModal
                                  trigger={
                                    <Button size="sm" variant="outline" className="text-black bg-transparent">
                                      View Details
                                    </Button>
                                  }
                                />
                              ) : currentPersona === "contract-ops" ? (
                                <TemplateAdoptionModal
                                  trigger={
                                    <Button size="sm" variant="outline" className="text-black bg-transparent">
                                      View Details
                                    </Button>
                                  }
                                />
                              ) : (
                                <LicenseUtilizationModal
                                  trigger={
                                    <Button size="sm" variant="outline" className="text-black bg-transparent">
                                      View Details
                                    </Button>
                                  }
                                />
                              )}
                            </CardFooter>
                          </Card>

                          <Card className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">{personaData.widget2.title}</CardTitle>
                              {personaData.widget2.badge.text && (
                                <Badge
                                  variant="outline"
                                  className={`${
                                    personaData.widget2.badge.color === "gray"
                                      ? "bg-gray-100 text-gray-700 border-gray-300"
                                      : personaData.widget2.badge.color === "dark-gray"
                                        ? "bg-gray-200 text-gray-800 border-gray-400"
                                        : "bg-gray-100 text-gray-600 border-gray-300"
                                  }`}
                                >
                                  {personaData.widget2.badge.icon}
                                  {personaData.widget2.badge.text}
                                </Badge>
                              )}
                            </CardHeader>
                            <CardContent className="flex-grow -mb-2">
                              <div className="text-5xl font-bold">{personaData.widget2.value}</div>
                              <p className="text-xs text-gray-500" style={{ whiteSpace: "pre-line" }}>
                                <span
                                  className={`font-medium ${
                                    personaData.widget2.changeColor === "green"
                                      ? "text-gray-800"
                                      : personaData.widget2.changeColor === "amber"
                                        ? "text-gray-600"
                                        : "text-gray-700"
                                  }`}
                                >
                                  {personaData.widget2.change}
                                </span>
                              </p>
                            </CardContent>
                            <CardFooter className="pt-0 flex justify-end mt-auto">
                              <WorkflowEfficiencyModal
                                trigger={
                                  <Button size="sm" variant="outline" className="text-black bg-transparent">
                                    View Details
                                  </Button>
                                }
                              />
                            </CardFooter>
                          </Card>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            {currentPersona === "contract-ops" && (
              <div className="mt-6">
                <Card className="w-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Video Thumbnail */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100"></div>
                          <div className="relative z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <div className="w-0 h-0 border-l-[6px] border-l-blue-600 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              Maximize Your Salesforce Integration
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              Learn advanced techniques from Docusign pros to streamline your contract workflows with
                              Salesforce
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>• Docusign University</span>
                              <span>• 15 minutes</span>
                              <span>• Intermediate</span>
                            </div>
                          </div>

                          <Button variant="outline" className="ml-4 flex-shrink-0 text-black bg-transparent">
                            Start Course
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
        <NotificationSignupModal open={notificationModalOpen} onOpenChange={setNotificationModalOpen} />
      </main>
    </div>
  )
}
