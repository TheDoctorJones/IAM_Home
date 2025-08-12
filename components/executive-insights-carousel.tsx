"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Target,
  BarChart3,
  Building,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  Workflow,
  Users,
} from "lucide-react"
import type { PersonaType } from "./persona-switcher"

interface ExecutiveInsightsCarouselProps {
  persona: PersonaType
}

export default function ExecutiveInsightsCarousel({ persona }: ExecutiveInsightsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dealModalOpen, setDealModalOpen] = useState(false)
  const [renewalModalOpen, setRenewalModalOpen] = useState(false)
  const [isAutoCycling, setIsAutoCycling] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Define insights based on persona
  const getInsights = () => {
    switch (persona) {
      case "vp-sales":
        return [
          {
            id: 1,
            title: "Template optimization",
            description: (
              <>
                Your 'Unlimited Liability' clauses increase negotiation time by 340% vs standard liability caps.{" "}
                <button onClick={() => setDealModalOpen(true)} className="text-gray-800 underline hover:text-gray-900">
                  View affected contracts
                </button>{" "}
                to prioritize template updates.
              </>
            ),
            icon: <Target className="h-5 w-5 text-gray-700" />,
            color: "blue",
          },
          {
            id: 2,
            title: "Key account renewals at risk",
            description: (
              <>
                Two strategic accounts with $775K in ARR have renewal dates within 30 days.{" "}
                <button
                  onClick={() => setRenewalModalOpen(true)}
                  className="text-gray-800 underline hover:text-gray-900"
                >
                  View renewal details
                </button>{" "}
                to prepare.
              </>
            ),
            icon: <AlertTriangle className="h-5 w-5 text-gray-900" />,
            color: "red",
          },
          {
            id: 3,
            title: "Hidden portfolio risk exposure",
            description:
              "47% of your vendor agreements lack force majeure provisions, creating potential supply chain risk worth $1.2M in exposure.",
            icon: <BarChart3 className="h-5 w-5 text-gray-800" />,
            color: "green",
          },
        ]

      case "sales-rep":
        return [
          {
            id: 1,
            title: "Counterparty signature behavior",
            description:
              "TechGiant Corp's legal team averages 8.4 days for contract review. Schedule follow-up for day 6 to maintain momentum.",
            icon: <Clock className="h-5 w-5 text-gray-600" />,
            color: "amber",
          },
          {
            id: 2,
            title: "Template selection optimization",
            description:
              "Deals using MSA Template v2.3 close 18% faster than v2.1. Switch to the newer template for pending proposals.",
            icon: <Target className="h-5 w-5 text-gray-700" />,
            color: "blue",
          },
          {
            id: 3,
            title: "Negotiation pattern insight",
            description:
              "Contracts with >3 redline rounds have 67% lower close rates. Consider escalating Global Industries deal after round 2.",
            icon: <Users className="h-5 w-5 text-gray-700" />,
            color: "purple",
          },
        ]

      case "contract-ops":
        return [
          {
            id: 1,
            title: "Template performance insight",
            description:
              "Sales MSA template v2.1 shows 40% faster signature time. Consider promoting to all sales teams.",
            icon: <FileText className="h-5 w-5 text-gray-800" />,
            color: "green",
          },
          {
            id: 2,
            title: "Workflow bottleneck detected",
            description:
              "Legal review stage averaging 5.2 days vs 3-day target. Review approval routing for optimization.",
            icon: <Workflow className="h-5 w-5 text-gray-600" />,
            color: "amber",
          },
          {
            id: 3,
            title: "Compliance improvement",
            description:
              "Template standardization increased to 89% this quarter. Focus on remaining non-compliant agreements.",
            icon: <CheckCircle className="h-5 w-5 text-gray-700" />,
            color: "blue",
          },
        ]
      case "org-admin":
        return [
          {
            id: 1,
            title: "License utilization optimization",
            description:
              "23% of Enterprise licenses are unused for >30 days. Reallocating could save $18K annually in licensing costs.",
            icon: <Target className="h-5 w-5 text-gray-700" />,
            color: "blue",
          },
          {
            id: 2,
            title: "Security compliance alert",
            description:
              "12 users have admin permissions without recent activity. Review and revoke unnecessary elevated access.",
            icon: <AlertTriangle className="h-5 w-5 text-gray-900" />,
            color: "red",
          },
          {
            id: 3,
            title: "Feature adoption opportunity",
            description:
              "Advanced Analytics feature has <20% adoption rate. Consider training sessions to increase utilization.",
            icon: <CheckCircle className="h-5 w-5 text-gray-800" />,
            color: "green",
          },
        ]

      default:
        return []
    }
  }

  const insights = getInsights()

  // Auto-cycle through insights
  useEffect(() => {
    if (!isAutoCycling || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % insights.length)
    }, 4000) // 4 second intervals

    return () => clearInterval(interval)
  }, [insights.length, isAutoCycling, isPaused])

  // Resume auto-cycling after manual navigation
  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false)
      }, 8000) // Resume after 8 seconds

      return () => clearTimeout(timeout)
    }
  }, [isPaused])

  const nextInsight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % insights.length)
    setIsPaused(true)
  }

  const prevInsight = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + insights.length) % insights.length)
    setIsPaused(true)
  }

  const currentInsight = insights[currentIndex]

  const keyDeals = [
    {
      name: "TechGiant Corp",
      value: "$450,000",
      stage: "Contract Review",
      probability: "85%",
      closeDate: "May 30, 2025",
    },
    {
      name: "Global Industries Inc.",
      value: "$325,000",
      stage: "Negotiation",
      probability: "70%",
      closeDate: "June 5, 2025",
    },
    {
      name: "Innovate Solutions",
      value: "$275,000",
      stage: "Proposal",
      probability: "60%",
      closeDate: "June 15, 2025",
    },
  ]

  const keyRenewals = [
    {
      name: "MegaCorp Enterprises",
      value: "$450,000",
      renewalDate: "June 1, 2025",
      status: "At Risk",
      reason: "Evaluating competitors",
    },
    {
      name: "EastCoast Solutions",
      value: "$325,000",
      renewalDate: "June 15, 2025",
      status: "Needs Attention",
      reason: "Price sensitivity",
    },
  ]

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="relative min-h-[80px]">
          {insights.map((insight, index) => (
            <div
              key={insight.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{insight.icon}</div>
                <div>
                  <div className="text-lg font-bold">{insight.title}</div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 flex justify-end gap-2 mt-auto">
          <Button size="sm" variant="outline" className="text-black h-8 w-8 p-0 bg-transparent" onClick={prevInsight}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="text-black h-8 w-8 p-0 bg-transparent" onClick={nextInsight}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Deals Modal */}
      <Dialog open={dealModalOpen} onOpenChange={setDealModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-gray-700" />
              Key Enterprise Deals
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <p className="text-sm text-gray-600">
              These 3 deals represent $1.05M in potential revenue and are critical to meeting your Q2 targets.
            </p>

            <div className="space-y-3 mt-4">
              {keyDeals.map((deal, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{deal.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">{deal.value}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Target className="h-3.5 w-3.5" />
                      <span>Stage: {deal.stage}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3.5 w-3.5" />
                      <span>Probability: {deal.probability}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Close: {deal.closeDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setDealModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Key Renewals Modal */}
      <Dialog open={renewalModalOpen} onOpenChange={setRenewalModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gray-900" />
              Key Account Renewals
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <p className="text-sm text-gray-600">
              These accounts represent $775K in annual recurring revenue and require immediate attention.
            </p>

            <div className="space-y-3 mt-4">
              {keyRenewals.map((renewal, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{renewal.name}</span>
                      {renewal.status === "At Risk" ? (
                        <Badge variant="outline" className="bg-gray-300 text-gray-900 border-gray-500">
                          At Risk
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-200 text-gray-800 border-gray-400">
                          Needs Attention
                        </Badge>
                      )}
                    </div>
                    <span className="font-medium text-gray-800">{renewal.value}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Renewal: {renewal.renewalDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Issue: {renewal.reason}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setRenewalModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
