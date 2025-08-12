"use client"

import { useState } from "react"
import { parties, getPartiesByType, getPartiesByCategory } from "@/lib/data/parties"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, User, ExternalLink, Users, Phone, Mail } from "lucide-react"
import type { PersonaType } from "@/components/persona-switcher"
import GlobalHeader from "@/components/global-header"

export default function PartiesPage() {
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

  const companyParties = getPartiesByType("company")
  const individualParties = getPartiesByType("individual")
  const externalParties = getPartiesByCategory("external")
  const internalParties = getPartiesByCategory("internal")

  const getTypeIcon = (type: string) => {
    return type === "company" ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />
  }

  const getTypeColor = (type: string) => {
    return type === "company" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
  }

  const getCategoryColor = (category: string) => {
    return category === "external" ? "bg-orange-100 text-orange-800" : "bg-purple-100 text-purple-800"
  }

  const getIndustryTypeColor = (industryType: string) => {
    const colors = {
      account: "bg-emerald-100 text-emerald-800",
      vendor: "bg-amber-100 text-amber-800",
      employee: "bg-indigo-100 text-indigo-800",
      client: "bg-rose-100 text-rose-800",
      partner: "bg-cyan-100 text-cyan-800",
      other: "bg-gray-100 text-gray-800",
    }
    return colors[industryType as keyof typeof colors] || colors.other
  }

  return (
    <div className="flex min-h-screen flex-col">
      <GlobalHeader currentPage="agreements" currentPersona={currentPersona} onPersonaChange={handlePersonaChange} />

      <div className="container py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Parties</h1>
            <p className="text-muted-foreground">Manage all parties and their contact information</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Parties</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{parties.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Companies</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyParties.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">External</CardTitle>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{externalParties.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Internal</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{internalParties.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Parties Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Parties</CardTitle>
              <CardDescription>Complete list of all parties in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Industry Type</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Primary Contact</TableHead>
                    <TableHead>Total Contacts</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parties.map((party) => {
                    const primaryContact = party.contacts.find((c) => c.isPrimary && c.isActive)
                    return (
                      <TableRow key={party.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(party.type)}
                            <div>
                              <div className="font-medium">{party.name}</div>
                              {party.legalName && party.legalName !== party.name && (
                                <div className="text-sm text-muted-foreground">{party.legalName}</div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getTypeColor(party.type)}>
                            {party.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getCategoryColor(party.category)}>
                            {party.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getIndustryTypeColor(party.industryType)}>
                            {party.industryType}
                          </Badge>
                        </TableCell>
                        <TableCell>{party.industry || "—"}</TableCell>
                        <TableCell>{party.size ? <Badge variant="outline">{party.size}</Badge> : "—"}</TableCell>
                        <TableCell>
                          {primaryContact ? (
                            <div className="space-y-1">
                              <div className="font-medium text-sm">{primaryContact.name}</div>
                              <div className="text-xs text-muted-foreground">{primaryContact.title}</div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                {primaryContact.email}
                              </div>
                              {primaryContact.phone && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {primaryContact.phone}
                                </div>
                              )}
                            </div>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{party.contacts.length}</Badge>
                        </TableCell>
                        <TableCell>
                          {party.website ? (
                            <a
                              href={party.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Visit
                            </a>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={party.isActive ? "default" : "secondary"}>
                            {party.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
