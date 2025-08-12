export interface Agreement {
  id: string
  name: string
  type: string
  partyId: string // Reference to Party
  primaryContactId?: string // Reference to specific contact for this agreement
  status: string
  subStatus?: string
  phase?: string // Phase for completed agreements: Executed, Active, Open Obligations, Renewal Upcoming, Amendment in Progress, Expired, Terminated, Archived
  created: string
  lastUpdated: string
  value: string
  dueDate: string
  owner: string
  isOwner: boolean
  action: string
  urgent: boolean
  source: "manual" | "bulk" | "embedded"
  deleted: boolean
  effectiveDate?: string
  expirationDate?: string
  signingProgress?: number
  waitingOn?: string
  totalSigners?: number
  completedSigners?: number
  parentAgreementId?: string // For renewals and amendments
  documents: Document[]
}

export interface Document {
  id: string
  name: string
  type: string
  status: string
  subStatus?: string
  phase?: string // Phase for completed documents
  created: string
  lastUpdated: string
  owner: string
  isOwner: boolean
  action: string
  urgent: boolean
  deleted: boolean
  agreementId: string
  effectiveDate?: string
  expirationDate?: string
  value?: string
  keyTerms?: {
    paymentTerms?: string
    renewalClause?: string
    terminationNotice?: string
    liability?: string
    jurisdiction?: string
  }
  signatures?: {
    name: string
    role: string
    status: "pending" | "signed" | "declined"
    date?: string
  }[]
  riskFactors?: {
    type: "low" | "medium" | "high"
    description: string
  }[]
}

export interface DocumentSection {
  id: string
  title: string
  content: string
  order: number
}

export interface Signature {
  id: string
  signerName: string
  signerEmail: string
  role: string
  status: "pending" | "signed" | "declined"
  signedAt?: string
  ipAddress?: string
}

export interface KeyTerm {
  id: string
  term: string
  value: string
  section: string
}

export interface RiskFactor {
  id: string
  category: string
  description: string
  severity: "low" | "medium" | "high"
  recommendation?: string
}

// Sample agreements data with realistic multi-document structure and proper status distribution
export const agreements: Agreement[] = [
  // TECHGIANT CORP - SHARED AGREEMENT (Complex multi-document structure)
  {
    id: "agr-001",
    name: "Enterprise Security Platform - TechGiant Corp Annual License",
    type: "Master Service Agreement",
    partyId: "party-001", // TechGiant Corp
    primaryContactId: "contact-001-1", // John Smith (CISO)
    status: "Under Review",
    subStatus: "Legal Review",
    created: "May 15, 2025",
    lastUpdated: "2025-05-21T14:30:00Z",
    value: "$450,000",
    dueDate: "May 30, 2025",
    owner: "Sarah Mitchell", // SHARED - not owned by current user
    isOwner: false, // SHARED
    action: "Monitor", // SHARED - limited action
    urgent: true,
    source: "manual",
    deleted: false,
    documents: [
      {
        id: "doc-001-msa",
        name: "Master Service Agreement v2.1",
        type: "Master Service Agreement",
        status: "Under Review",
        subStatus: "Legal Review",
        created: "May 15, 2025",
        lastUpdated: "2025-05-21T14:30:00Z",
        owner: "Sarah Mitchell",
        isOwner: false,
        action: "Monitor",
        urgent: true,
        deleted: false,
        agreementId: "agr-001",
        effectiveDate: "June 1, 2025",
        expirationDate: "May 31, 2026",
        value: "$450,000",
        phase: "Legal Review",
      },
      {
        id: "doc-001-sow1",
        name: "SOW #1 - Core Security Platform Implementation",
        type: "Statement of Work",
        status: "Under Review",
        subStatus: "Technical Review",
        created: "May 15, 2025",
        lastUpdated: "2025-05-20T16:00:00Z",
        owner: "Sarah Mitchell",
        isOwner: false,
        action: "Monitor",
        urgent: false,
        deleted: false,
        agreementId: "agr-001",
        effectiveDate: "June 1, 2025",
        expirationDate: "December 31, 2025",
        value: "$280,000",
        phase: "Technical Review",
      },
      {
        id: "doc-001-sow2",
        name: "SOW #2 - Advanced Threat Detection Module",
        type: "Statement of Work",
        status: "Draft",
        subStatus: "Preparing SOW",
        created: "May 18, 2025",
        lastUpdated: "2025-05-21T10:00:00Z",
        owner: "Sarah Mitchell",
        isOwner: false,
        action: "Monitor",
        urgent: false,
        deleted: false,
        agreementId: "agr-001",
        effectiveDate: "August 1, 2025",
        expirationDate: "May 31, 2026",
        value: "$170,000",
        phase: "Draft",
      },
    ],
  },

  // HEALTHSECURE SYSTEMS - Multiple related agreements
  {
    id: "agr-006",
    name: "Healthcare Security Suite - Annual License",
    type: "Software License Agreement",
    partyId: "party-013", // HealthSecure Systems
    primaryContactId: "contact-013-1", // Dr. Patricia Adams
    status: "Completed", // Changed from "Expired" to "Completed"
    subStatus: "Active",
    phase: "Renewal Upcoming", // Changed from "Expired" to "Active"
    created: "January 10, 2024",
    lastUpdated: "2024-02-15T10:00:00Z",
    value: "$280,000",
    dueDate: "Completed",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "February 15, 2024",
    expirationDate: "February 14, 2027", // Extended by 1 year
    documents: [
      {
        id: "doc-006-license",
        name: "Healthcare Security License v1.0",
        type: "Software License Agreement",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Renewal Upcoming", // Changed from "Expired" to "Active"
        created: "January 10, 2024",
        lastUpdated: "2024-02-15T10:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-006",
        effectiveDate: "February 15, 2024",
        expirationDate: "February 14, 2027", // Extended by 1 year
        value: "$280,000",
      },
      {
        id: "doc-006-sla",
        name: "Service Level Agreement",
        type: "Service Level Agreement",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Renewal Upcoming", // Changed from "Expired" to "Active"
        created: "January 10, 2024",
        lastUpdated: "2024-02-15T10:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-006",
        effectiveDate: "February 15, 2024",
        expirationDate: "February 14, 2027", // Extended by 1 year
      },
    ],
  },
  {
    id: "agr-007",
    name: "HIPAA Compliance Add-on Module",
    type: "Amendment",
    partyId: "party-013", // HealthSecure Systems
    primaryContactId: "contact-013-1", // Dr. Patricia Adams
    status: "Completed", // Changed from "Expired" to "Completed"
    subStatus: "Active",
    phase: "Open Obligations", // Changed from "Expired" to "Active"
    created: "March 20, 2024",
    lastUpdated: "2024-04-01T14:30:00Z",
    value: "$45,000",
    dueDate: "Completed",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "April 1, 2024",
    expirationDate: "February 14, 2027", // Extended to match parent agreement
    parentAgreementId: "agr-006",
    documents: [
      {
        id: "doc-007-amendment",
        name: "HIPAA Module Amendment",
        type: "Amendment",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Open Obligations", // Changed from "Expired" to "Active"
        created: "March 20, 2024",
        lastUpdated: "2024-04-01T14:30:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-007",
        effectiveDate: "April 1, 2024",
        expirationDate: "February 14, 2027", // Extended to match parent agreement
        value: "$45,000",
      },
    ],
  },
  {
    id: "agr-008",
    name: "2025 Renewal - Healthcare Security Suite",
    type: "Renewal Agreement",
    partyId: "party-013", // HealthSecure Systems
    primaryContactId: "contact-013-1", // Dr. Patricia Adams
    status: "Waiting for Signature",
    subStatus: "Customer Review",
    created: "December 15, 2024",
    lastUpdated: "2025-01-20T11:15:00Z",
    value: "$315,000",
    dueDate: "February 1, 2025",
    owner: "David Chen", // SHARED - not owned by current user
    isOwner: false, // SHARED
    action: "Follow Up", // SHARED - collaborative action
    urgent: true,
    source: "manual",
    signingProgress: 50,
    waitingOn: "Dr. Patricia Adams",
    totalSigners: 2,
    completedSigners: 1,
    deleted: false,
    parentAgreementId: "agr-006",
    documents: [
      {
        id: "doc-008-renewal",
        name: "2025 Renewal Agreement",
        type: "Renewal Agreement",
        status: "Waiting for Signature",
        subStatus: "Customer Review",
        created: "December 15, 2024",
        lastUpdated: "2025-01-20T11:15:00Z",
        owner: "David Chen",
        isOwner: false,
        action: "Follow Up",
        urgent: true,
        deleted: false,
        agreementId: "agr-008",
        effectiveDate: "February 15, 2025",
        expirationDate: "February 14, 2026",
        value: "$315,000",
        phase: "Signature",
      },
      {
        id: "doc-008-addendum",
        name: "Pricing Addendum - Volume Discount",
        type: "Addendum",
        status: "Waiting for Signature",
        subStatus: "Customer Review",
        created: "December 20, 2024",
        lastUpdated: "2025-01-20T11:15:00Z",
        owner: "David Chen",
        isOwner: false,
        action: "Follow Up",
        urgent: false,
        deleted: false,
        agreementId: "agr-008",
        effectiveDate: "February 15, 2025",
        expirationDate: "February 14, 2026",
        phase: "Signature",
      },
    ],
  },
  {
    id: "agr-009",
    name: "Professional Services - Security Assessment",
    type: "Statement of Work",
    partyId: "party-013", // HealthSecure Systems
    primaryContactId: "contact-013-2", // Mark Thompson
    status: "Expired", // Keeping this as expired
    subStatus: "Delivered",
    phase: "Expired", // Keeping this as expired
    created: "June 1, 2024",
    lastUpdated: "2024-08-15T16:00:00Z",
    value: "$25,000",
    dueDate: "Completed",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "June 15, 2024",
    expirationDate: "August 15, 2024", // Keeping original expiration date
    documents: [
      {
        id: "doc-009-sow",
        name: "Security Assessment SOW",
        type: "Statement of Work",
        status: "Expired", // Keeping this as expired
        subStatus: "Delivered",
        phase: "Expired", // Keeping this as expired
        created: "June 1, 2024",
        lastUpdated: "2024-08-15T16:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-009",
        effectiveDate: "June 15, 2024",
        expirationDate: "August 15, 2024", // Keeping original expiration date
        value: "$25,000",
      },
      {
        id: "doc-009-report",
        name: "Security Assessment Report",
        type: "Deliverable",
        status: "Expired", // Keeping this as expired
        subStatus: "Delivered",
        phase: "Expired", // Keeping this as expired
        created: "August 10, 2024",
        lastUpdated: "2024-08-15T16:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-009",
        effectiveDate: "August 15, 2024",
      },
    ],
  },

  // METRO FINANCIAL GROUP - Complex multi-document agreements
  {
    id: "agr-010",
    name: "Financial Services Security Platform",
    type: "Master Service Agreement",
    partyId: "party-014", // Metro Financial Group
    primaryContactId: "contact-014-1", // Jennifer Walsh
    status: "Completed", // Changed from "Expired" to "Completed"
    subStatus: "Active",
    phase: "Amendment in Progress", // Changed from "Expired" to "Active"
    created: "March 1, 2024",
    lastUpdated: "2024-04-15T09:30:00Z",
    value: "$195,000",
    dueDate: "Completed",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "April 15, 2024",
    expirationDate: "April 14, 2027", // Extended by 1 year
    documents: [
      {
        id: "doc-010-msa",
        name: "Master Service Agreement",
        type: "Master Service Agreement",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Amendment in Progress", // Changed from "Expired" to "Active"
        created: "March 1, 2024",
        lastUpdated: "2024-04-15T09:30:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-010",
        effectiveDate: "April 15, 2024",
        expirationDate: "April 14, 2027", // Extended by 1 year
        value: "$195,000",
      },
      {
        id: "doc-010-license",
        name: "Software License Schedule",
        type: "License Schedule",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Amendment in Progress", // Changed from "Expired" to "Active"
        created: "March 1, 2024",
        lastUpdated: "2024-04-15T09:30:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-010",
        effectiveDate: "April 15, 2024",
        expirationDate: "April 14, 2027", // Extended by 1 year
      },
      {
        id: "doc-010-sla",
        name: "Service Level Agreement",
        type: "Service Level Agreement",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Amendment in Progress", // Changed from "Expired" to "Active"
        created: "March 5, 2024",
        lastUpdated: "2024-04-15T09:30:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-010",
        effectiveDate: "April 15, 2024",
        expirationDate: "April 14, 2027", // Extended by 1 year
      },
    ],
  },
  {
    id: "agr-011",
    name: "SOX Compliance Module",
    type: "Amendment",
    partyId: "party-014", // Metro Financial Group
    primaryContactId: "contact-014-2", // David Kim
    status: "Completed", // Changed from "Expired" to "Completed"
    subStatus: "Active",
    phase: "Executed", // Changed from "Expired" to "Active"
    created: "May 10, 2024",
    lastUpdated: "2024-06-01T12:00:00Z",
    value: "$35,000",
    dueDate: "Completed",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "June 1, 2024",
    expirationDate: "April 14, 2027", // Extended to match parent agreement
    parentAgreementId: "agr-010",
    documents: [
      {
        id: "doc-011-amendment",
        name: "SOX Compliance Amendment",
        type: "Amendment",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Executed", // Changed from "Expired" to "Active"
        created: "May 10, 2024",
        lastUpdated: "2024-06-01T12:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-011",
        effectiveDate: "June 1, 2024",
        expirationDate: "April 14, 2027", // Extended to match parent agreement
        value: "$35,000",
      },
      {
        id: "doc-011-spec",
        name: "SOX Module Technical Specifications",
        type: "Technical Specification",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Approved",
        phase: "Executed", // Changed from "Expired" to "Active"
        created: "May 12, 2024",
        lastUpdated: "2024-06-01T12:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-011",
        effectiveDate: "June 1, 2024",
        expirationDate: "April 14, 2027", // Extended to match parent agreement
      },
    ],
  },
  {
    id: "agr-012",
    name: "Data Loss Prevention Add-on",
    type: "Amendment",
    partyId: "party-014", // Metro Financial Group
    primaryContactId: "contact-014-1", // Jennifer Walsh
    status: "Under Review",
    subStatus: "Pricing Review",
    created: "April 20, 2025",
    lastUpdated: "2025-05-15T10:30:00Z",
    value: "$28,000",
    dueDate: "June 1, 2025",
    owner: "You",
    isOwner: true,
    action: "Review",
    urgent: false,
    source: "manual",
    deleted: false,
    parentAgreementId: "agr-010",
    documents: [
      {
        id: "doc-012-amendment",
        name: "DLP Module Amendment",
        type: "Amendment",
        status: "Under Review",
        subStatus: "Pricing Review",
        created: "April 20, 2025",
        lastUpdated: "2025-05-15T10:30:00Z",
        owner: "You",
        isOwner: true,
        action: "Review",
        urgent: false,
        deleted: false,
        agreementId: "agr-012",
        effectiveDate: "June 1, 2025",
        expirationDate: "April 14, 2026",
        value: "$28,000",
        phase: "Review",
      },
    ],
  },
  {
    id: "agr-013",
    name: "2025 Renewal - Financial Security Platform",
    type: "Renewal Agreement",
    partyId: "party-014", // Metro Financial Group
    primaryContactId: "contact-014-1", // Jennifer Walsh
    status: "Draft",
    subStatus: "Preparing Renewal",
    created: "January 15, 2025",
    lastUpdated: "2025-02-10T14:00:00Z",
    value: "$210,000",
    dueDate: "March 15, 2025",
    owner: "Lisa Rodriguez", // SHARED - not owned by current user
    isOwner: false, // SHARED
    action: "View", // SHARED - view only
    urgent: false,
    source: "manual",
    deleted: false,
    parentAgreementId: "agr-010",
    documents: [
      {
        id: "doc-013-renewal",
        name: "2025 Financial Security Renewal",
        type: "Renewal Agreement",
        status: "Draft",
        subStatus: "Preparing Renewal",
        created: "January 15, 2025",
        lastUpdated: "2025-02-10T14:00:00Z",
        owner: "Lisa Rodriguez",
        isOwner: false,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-013",
        effectiveDate: "April 15, 2025",
        expirationDate: "April 14, 2026",
        value: "$210,000",
        phase: "Draft",
      },
    ],
  },
  {
    id: "agr-014",
    name: "Security Training Services",
    type: "Statement of Work",
    partyId: "party-014", // Metro Financial Group
    primaryContactId: "contact-014-2", // David Kim
    status: "Completed", // Changed from "Expired" to "Completed"
    subStatus: "Delivered",
    phase: "Archived", // Changed from "Expired" to "Active"
    created: "September 5, 2024",
    lastUpdated: "2024-11-30T17:00:00Z",
    value: "$15,000",
    dueDate: "Completed",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "September 15, 2024",
    expirationDate: "November 30, 2026", // Extended by 1 year
    documents: [
      {
        id: "doc-014-sow",
        name: "Security Training SOW",
        type: "Statement of Work",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Delivered",
        phase: "Archived", // Changed from "Expired" to "Active"
        created: "September 5, 2024",
        lastUpdated: "2024-11-30T17:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-014",
        effectiveDate: "September 15, 2024",
        expirationDate: "November 30, 2026", // Extended by 1 year
        value: "$15,000",
      },
      {
        id: "doc-014-materials",
        name: "Training Materials Package",
        type: "Deliverable",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Delivered",
        phase: "Archived", // Changed from "Expired" to "Active"
        created: "September 10, 2024",
        lastUpdated: "2024-11-30T17:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-014",
        effectiveDate: "September 15, 2024",
        expirationDate: "November 30, 2026", // Extended by 1 year
      },
    ],
  },

  // ADDITIONAL AGREEMENTS WITH VARIED STATUSES
  {
    id: "agr-015",
    name: "Campus Security Solution - Educational License",
    type: "Software License Agreement",
    partyId: "party-015", // EduTech University
    primaryContactId: "contact-015-1", // Professor James Miller
    status: "Waiting for Approval",
    subStatus: "Budget Approval",
    created: "April 1, 2025",
    lastUpdated: "2025-05-15T11:00:00Z",
    value: "$85,000",
    dueDate: "June 1, 2025",
    owner: "You",
    isOwner: true,
    action: "Follow Up",
    urgent: false,
    source: "manual",
    deleted: false,
    documents: [
      {
        id: "doc-015-license",
        name: "Educational Security License",
        type: "Software License Agreement",
        status: "Waiting for Approval",
        subStatus: "Budget Approval",
        created: "April 1, 2025",
        lastUpdated: "2025-05-15T11:00:00Z",
        owner: "You",
        isOwner: true,
        action: "Follow Up",
        urgent: false,
        deleted: false,
        agreementId: "agr-015",
        effectiveDate: "June 1, 2025",
        expirationDate: "May 31, 2026",
        value: "$85,000",
        phase: "Approval",
      },
      {
        id: "doc-015-discount",
        name: "Educational Discount Schedule",
        type: "Pricing Schedule",
        status: "Waiting for Approval",
        subStatus: "Budget Approval",
        created: "April 1, 2025",
        lastUpdated: "2025-05-15T11:00:00Z",
        owner: "You",
        isOwner: true,
        action: "Follow Up",
        urgent: false,
        deleted: false,
        agreementId: "agr-015",
        effectiveDate: "June 1, 2025",
        expirationDate: "May 31, 2026",
        phase: "Approval",
      },
    ],
  },
  // RETAILMAX CORPORATION - Complex enterprise agreement
  {
    id: "agr-018",
    name: "Retail Security Platform - Enterprise License",
    type: "Master Service Agreement",
    partyId: "party-017", // RetailMax Corporation
    primaryContactId: "contact-017-1", // Maria Gonzalez
    status: "Completed", // Changed from "Expired" to "Completed"
    subStatus: "Active",
    phase: "Active", // Changed from "Expired" to "Active"
    created: "November 1, 2023",
    lastUpdated: "2023-12-15T10:00:00Z",
    value: "$520,000",
    dueDate: "Completed",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "December 15, 2023",
    expirationDate: "December 14, 2025", // Extended by 1 year
    documents: [
      {
        id: "doc-018-msa",
        name: "Master Service Agreement",
        type: "Master Service Agreement",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Active", // Changed from "Expired" to "Active"
        created: "November 1, 2023",
        lastUpdated: "2023-12-15T10:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-018",
        effectiveDate: "December 15, 2023",
        expirationDate: "December 14, 2025", // Extended by 1 year
        value: "$520,000",
      },
      {
        id: "doc-018-sow1",
        name: "SOW #1 - Core Platform Implementation",
        type: "Statement of Work",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Delivered",
        phase: "Active", // Changed from "Expired" to "Active"
        created: "November 5, 2023",
        lastUpdated: "2024-03-15T10:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-018",
        effectiveDate: "December 15, 2023",
        expirationDate: "December 14, 2025", // Extended to match parent agreement
        value: "$320,000",
      },
      {
        id: "doc-018-sow2",
        name: "SOW #2 - Multi-Store Deployment",
        type: "Statement of Work",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Delivered",
        phase: "Active", // Changed from "Expired" to "Active"
        created: "February 1, 2024",
        lastUpdated: "2024-08-30T10:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-018",
        effectiveDate: "March 1, 2024",
        expirationDate: "December 14, 2025", // Extended to match parent agreement
        value: "$200,000",
      },
      {
        id: "doc-018-sla",
        name: "Service Level Agreement",
        type: "Service Level Agreement",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Active", // Changed from "Expired" to "Active"
        created: "November 1, 2023",
        lastUpdated: "2023-12-15T10:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-018",
        effectiveDate: "December 15, 2023",
        expirationDate: "December 14, 2025", // Extended by 1 year
      },
    ],
  },
  {
    id: "agr-020",
    name: "2025 Renewal - Retail Security Platform",
    type: "Renewal Agreement",
    partyId: "party-017", // RetailMax Corporation
    primaryContactId: "contact-017-1", // Maria Gonzalez
    status: "Completed",
    subStatus: "Active",
    phase: "Active",
    created: "September 15, 2024",
    lastUpdated: "2024-12-01T14:30:00Z",
    value: "$580,000",
    dueDate: "Completed",
    owner: "Jennifer Walsh", // SHARED - not owned by current user
    isOwner: false, // SHARED
    action: "View", // SHARED - view only
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "December 15, 2024",
    expirationDate: "December 14, 2025",
    parentAgreementId: "agr-018",
    documents: [
      {
        id: "doc-020-renewal",
        name: "2025 Retail Security Renewal",
        type: "Renewal Agreement",
        status: "Completed",
        subStatus: "Executed",
        phase: "Active",
        created: "September 15, 2024",
        lastUpdated: "2024-12-01T14:30:00Z",
        owner: "Jennifer Walsh",
        isOwner: false,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-020",
        effectiveDate: "December 15, 2024",
        expirationDate: "December 14, 2025",
        value: "$580,000",
      },
      {
        id: "doc-020-addendum",
        name: "Enhanced Features Addendum",
        type: "Addendum",
        status: "Completed",
        subStatus: "Executed",
        phase: "Active",
        created: "September 20, 2024",
        lastUpdated: "2024-12-01T14:30:00Z",
        owner: "Jennifer Walsh",
        isOwner: false,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-020",
        effectiveDate: "December 15, 2024",
        expirationDate: "December 14, 2025",
        value: "$60,000",
      },
    ],
  },
  {
    id: "agr-021",
    name: "Endpoint Protection Expansion",
    type: "Amendment",
    partyId: "party-017", // RetailMax Corporation
    primaryContactId: "contact-017-2", // Tom Bradley
    status: "Waiting for Signature",
    subStatus: "IT Review",
    created: "April 1, 2025",
    lastUpdated: "2025-05-10T11:20:00Z",
    value: "$95,000",
    dueDate: "June 15, 2025",
    owner: "You",
    isOwner: true,
    action: "Follow Up",
    urgent: false,
    source: "manual",
    signingProgress: 50,
    waitingOn: "Tom Bradley",
    totalSigners: 2,
    completedSigners: 1,
    deleted: false,
    parentAgreementId: "agr-020",
    documents: [
      {
        id: "doc-021-amendment",
        name: "Endpoint Protection Amendment",
        type: "Amendment",
        status: "Waiting for Signature",
        subStatus: "IT Review",
        created: "April 1, 2025",
        lastUpdated: "2025-05-10T11:20:00Z",
        owner: "You",
        isOwner: true,
        action: "Follow Up",
        urgent: false,
        deleted: false,
        agreementId: "agr-021",
        effectiveDate: "June 15, 2025",
        expirationDate: "December 14, 2025",
        value: "$95,000",
        phase: "Signature",
      },
      {
        id: "doc-021-spec",
        name: "Endpoint Protection Technical Specs",
        type: "Technical Specification",
        status: "Waiting for Approval",
        subStatus: "IT Review",
        created: "April 5, 2025",
        lastUpdated: "2025-05-10T11:20:00Z",
        owner: "You",
        isOwner: true,
        action: "Follow Up",
        urgent: false,
        deleted: false,
        agreementId: "agr-021",
        effectiveDate: "June 15, 2025",
        expirationDate: "December 14, 2025",
        phase: "Review",
      },
    ],
  },

  // GOVERNMENT SOLUTIONS - Complex federal agreements
  {
    id: "agr-031",
    name: "Federal Security Platform - FedRAMP License",
    type: "Master Service Agreement",
    partyId: "party-020", // Government Solutions Inc.
    primaryContactId: "contact-020-1", // Colonel (Ret.) William Hayes
    status: "Completed", // Changed from "Expired" to "Completed"
    subStatus: "Active",
    phase: "Executed", // Changed from "Expired" to "Active"
    created: "October 1, 2023",
    lastUpdated: "2023-12-01T10:00:00Z",
    value: "$750,000",
    dueDate: "Completed",
    owner: "Michael Torres", // SHARED - not owned by current user
    isOwner: false, // SHARED
    action: "View", // SHARED - view only
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "December 1, 2023",
    expirationDate: "November 30, 2027", // Extended by 2 years
    documents: [
      {
        id: "doc-031-msa",
        name: "Master Service Agreement",
        type: "Master Service Agreement",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Executed", // Changed from "Expired" to "Active"
        created: "October 1, 2023",
        lastUpdated: "2023-12-01T10:00:00Z",
        owner: "Michael Torres",
        isOwner: false,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-031",
        effectiveDate: "December 1, 2023",
        expirationDate: "November 30, 2027", // Extended by 2 years
        value: "$750,000",
      },
      {
        id: "doc-031-license",
        name: "FedRAMP Security License",
        type: "Software License Agreement",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Executed",
        phase: "Executed", // Changed from "Expired" to "Active"
        created: "October 1, 2023",
        lastUpdated: "2023-12-01T10:00:00Z",
        owner: "Michael Torres",
        isOwner: false,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-031",
        effectiveDate: "December 1, 2023",
        expirationDate: "November 30, 2027", // Extended by 2 years
      },
      {
        id: "doc-031-compliance",
        name: "FedRAMP Compliance Certificate",
        type: "Compliance Document",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Certified",
        phase: "Executed", // Changed from "Expired" to "Active"
        created: "November 15, 2023",
        lastUpdated: "2023-12-01T10:00:00Z",
        owner: "Michael Torres",
        isOwner: false,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-031",
        effectiveDate: "December 1, 2023",
        expirationDate: "November 30, 2027", // Extended by 2 years
      },
    ],
  },
  {
    id: "agr-033",
    name: "2025 Renewal - Federal Security Platform",
    type: "Renewal Agreement",
    partyId: "party-020", // Government Solutions Inc.
    primaryContactId: "contact-020-1", // Colonel (Ret.) William Hayes
    status: "Completed",
    subStatus: "Active",
    phase: "Active",
    created: "August 1, 2024",
    lastUpdated: "2024-11-15T16:30:00Z",
    value: "$825,000",
    dueDate: "Completed",
    owner: "Michael Torres", // SHARED - not owned by current user
    isOwner: false, // SHARED
    action: "View", // SHARED - view only
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "December 1, 2024",
    expirationDate: "November 30, 2025",
    parentAgreementId: "agr-031",
    documents: [
      {
        id: "doc-033-renewal",
        name: "2025 Federal Security Renewal",
        type: "Renewal Agreement",
        status: "Completed",
        subStatus: "Executed",
        phase: "Active",
        created: "August 1, 2024",
        lastUpdated: "2024-11-15T16:30:00Z",
        owner: "Michael Torres",
        isOwner: false,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-033",
        effectiveDate: "December 1, 2024",
        expirationDate: "November 30, 2025",
        value: "$825,000",
      },
      {
        id: "doc-033-enhancement",
        name: "Security Enhancement Package",
        type: "Addendum",
        status: "Completed",
        subStatus: "Executed",
        phase: "Active",
        created: "August 15, 2024",
        lastUpdated: "2024-11-15T16:30:00Z",
        owner: "Michael Torres",
        isOwner: false,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-033",
        effectiveDate: "December 1, 2024",
        expirationDate: "November 30, 2025",
        value: "$75,000",
      },
    ],
  },
  {
    id: "agr-034",
    name: "Zero Trust Architecture Implementation",
    type: "Statement of Work",
    partyId: "party-020", // Government Solutions Inc.
    primaryContactId: "contact-020-1", // Colonel (Ret.) William Hayes
    status: "Completed", // Changed from "Expired" to "Completed"
    subStatus: "Delivered",
    phase: "Terminated", // Changed from "Expired" to "Active"
    created: "March 1, 2024",
    lastUpdated: "2024-08-31T17:00:00Z",
    value: "$185,000",
    dueDate: "Completed",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "March 15, 2024",
    expirationDate: "August 31, 2026", // Extended by 1 year
    documents: [
      {
        id: "doc-034-sow",
        name: "Zero Trust Implementation SOW",
        type: "Statement of Work",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Delivered",
        phase: "Terminated", // Changed from "Expired" to "Active"
        created: "March 1, 2024",
        lastUpdated: "2024-08-31T17:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-034",
        effectiveDate: "March 15, 2024",
        expirationDate: "August 31, 2026", // Extended by 1 year
        value: "$185,000",
      },
      {
        id: "doc-034-architecture",
        name: "Zero Trust Architecture Design",
        type: "Technical Specification",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Approved",
        phase: "Terminated", // Changed from "Expired" to "Active"
        created: "March 10, 2024",
        lastUpdated: "2024-04-15T17:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-034",
        effectiveDate: "March 15, 2024",
        expirationDate: "August 31, 2026", // Extended by 1 year
      },
      {
        id: "doc-034-implementation",
        name: "Implementation Guide",
        type: "Deliverable",
        status: "Completed", // Changed from "Expired" to "Completed"
        subStatus: "Delivered",
        phase: "Terminated", // Changed from "Expired" to "Active"
        created: "August 25, 2024",
        lastUpdated: "2024-08-31T17:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-034",
        effectiveDate: "August 31, 2024",
        expirationDate: "August 31, 2026", // Added expiration date
      },
    ],
  },
  {
    id: "agr-024",
    name: "Medical Device Security Platform",
    type: "Master Service Agreement",
    partyId: "party-018", // MedDevice Solutions
    primaryContactId: "contact-018-1", // Dr. Rachel Green
    status: "Draft",
    subStatus: "Initial Draft",
    created: "May 1, 2025",
    lastUpdated: "2025-05-20T10:30:00Z",
    value: "$165,000",
    dueDate: "July 15, 2025",
    owner: "You",
    isOwner: true,
    action: "Edit",
    urgent: false,
    source: "manual",
    deleted: false,
    documents: [
      {
        id: "doc-024-msa",
        name: "Medical Device Security MSA",
        type: "Master Service Agreement",
        status: "Draft",
        subStatus: "Initial Draft",
        created: "May 1, 2025",
        lastUpdated: "2025-05-20T10:30:00Z",
        owner: "You",
        isOwner: true,
        action: "Edit",
        urgent: false,
        deleted: false,
        agreementId: "agr-024",
        effectiveDate: "July 15, 2025",
        expirationDate: "July 14, 2026",
        value: "$165,000",
        phase: "Draft",
      },
      {
        id: "doc-024-compliance",
        name: "FDA Compliance Addendum",
        type: "Compliance Document",
        status: "Draft",
        subStatus: "Preparing Compliance",
        created: "May 5, 2025",
        lastUpdated: "2025-05-20T10:30:00Z",
        owner: "You",
        isOwner: true,
        action: "Edit",
        urgent: false,
        deleted: false,
        agreementId: "agr-024",
        effectiveDate: "July 15, 2025",
        expirationDate: "July 14, 2026",
        value: "$165,000",
        phase: "Draft",
      },
    ],
  },
  {
    id: "agr-028",
    name: "Startup Security Essentials Package",
    type: "Software License Agreement",
    partyId: "party-019", // TechStart Innovations
    primaryContactId: "contact-019-1", // Kevin Park
    status: "Waiting for Signature",
    subStatus: "Final Review",
    created: "April 15, 2025",
    lastUpdated: "2025-05-18T11:30:00Z",
    value: "$35,000",
    dueDate: "June 1, 2025",
    owner: "You",
    isOwner: true,
    action: "Send Reminder",
    urgent: true,
    source: "manual",
    signingProgress: 75,
    waitingOn: "Kevin Park",
    totalSigners: 2,
    completedSigners: 1,
    deleted: false,
    documents: [
      {
        id: "doc-028-license",
        name: "Startup Security License",
        type: "Software License Agreement",
        status: "Waiting for Signature",
        subStatus: "Final Review",
        created: "April 15, 2025",
        lastUpdated: "2025-05-18T11:30:00Z",
        owner: "You",
        isOwner: true,
        action: "Send Reminder",
        urgent: true,
        deleted: false,
        agreementId: "agr-028",
        effectiveDate: "June 1, 2025",
        expirationDate: "May 31, 2026",
        value: "$35,000",
        phase: "Signature",
      },
    ],
  },
  // BULK SEND AGREEMENTS
  {
    id: "agr-035",
    name: "Employee Handbook Acknowledgment 2025",
    type: "Policy Acknowledgment",
    partyId: "party-001", // TechGiant Corp
    primaryContactId: "contact-001-2", // Lisa Chen (HR Director)
    status: "Waiting for Signature",
    subStatus: "32 of 45 completed",
    created: "March 1, 2025",
    lastUpdated: "2025-05-21T09:15:00Z",
    value: "$0",
    dueDate: "June 30, 2025",
    owner: "You",
    isOwner: true,
    action: "Monitor",
    urgent: false,
    source: "bulk",
    signingProgress: 71, // 32/45 = ~71%
    waitingOn: "13 employees",
    totalSigners: 45,
    completedSigners: 32,
    deleted: false,
    effectiveDate: "March 1, 2025",
    expirationDate: "December 31, 2025",
    documents: [
      {
        id: "doc-035-handbook",
        name: "Employee Handbook 2025",
        type: "Policy Acknowledgment",
        status: "Waiting for Signature",
        subStatus: "32 of 45 completed",
        created: "March 1, 2025",
        lastUpdated: "2025-05-21T09:15:00Z",
        owner: "You",
        isOwner: true,
        action: "Monitor",
        urgent: false,
        deleted: false,
        agreementId: "agr-035",
        effectiveDate: "March 1, 2025",
        expirationDate: "December 31, 2025",
        value: "$0",
        phase: "Signature",
      },
    ],
  },
  {
    id: "agr-036",
    name: "Vendor Onboarding Agreement - Q2 2025",
    type: "Vendor Agreement",
    partyId: "party-014", // Metro Financial Group
    primaryContactId: "contact-014-1", // Jennifer Walsh
    status: "Waiting for Signature",
    subStatus: "8 of 15 completed",
    created: "April 1, 2025",
    lastUpdated: "2025-05-20T14:45:00Z",
    value: "$0",
    dueDate: "July 1, 2025",
    owner: "You",
    isOwner: true,
    action: "Follow Up",
    urgent: false,
    source: "bulk",
    signingProgress: 53, // 8/15 = ~53%
    waitingOn: "7 vendors",
    totalSigners: 15,
    completedSigners: 8,
    deleted: false,
    effectiveDate: "April 1, 2025",
    expirationDate: "March 31, 2026",
    documents: [
      {
        id: "doc-036-vendor",
        name: "Vendor Onboarding Terms",
        type: "Vendor Agreement",
        status: "Waiting for Signature",
        subStatus: "8 of 15 completed",
        created: "April 1, 2025",
        lastUpdated: "2025-05-20T14:45:00Z",
        owner: "You",
        isOwner: true,
        action: "Follow Up",
        urgent: false,
        deleted: false,
        agreementId: "agr-036",
        effectiveDate: "April 1, 2025",
        expirationDate: "March 31, 2026",
        value: "$0",
        phase: "Signature",
      },
    ],
  },

  // CO-SELLER AGREEMENT
  {
    id: "agr-037",
    name: "Partner Application - Co-Seller Program",
    type: "Co-Seller Application",
    partyId: "party-multiple", // Multiple parties
    status: "Active",
    subStatus: "12 active submissions",
    created: "January 15, 2025",
    lastUpdated: "2025-05-21T11:30:00Z",
    value: "$0",
    dueDate: "Ongoing",
    owner: "You",
    isOwner: true,
    action: "Monitor",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "January 15, 2025",
    documents: [
      {
        id: "doc-037-application",
        name: "Co-Seller Partner Application",
        type: "Co-Seller Application",
        status: "Active",
        subStatus: "12 active submissions",
        created: "January 15, 2025",
        lastUpdated: "2025-05-21T11:30:00Z",
        owner: "You",
        isOwner: true,
        action: "Monitor",
        urgent: false,
        deleted: false,
        agreementId: "agr-037",
        effectiveDate: "January 15, 2025",
        value: "$0",
        phase: "Active",
      },
    ],
  },

  // DELETED AGREEMENTS
  {
    id: "agr-038",
    name: "Cloud Infrastructure Agreement - Draft",
    type: "Service Agreement",
    partyId: "party-017", // RetailMax Corporation
    status: "Deleted",
    subStatus: "Draft Abandoned",
    created: "February 10, 2025",
    lastUpdated: "2025-03-15T10:00:00Z",
    value: "$125,000",
    dueDate: "N/A",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: true,
    documents: [
      {
        id: "doc-038-service",
        name: "Cloud Infrastructure Service Agreement",
        type: "Service Agreement",
        status: "Deleted",
        subStatus: "Draft Abandoned",
        created: "February 10, 2025",
        lastUpdated: "2025-03-15T10:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: true,
        agreementId: "agr-038",
        phase: "Deleted",
      },
    ],
  },
  {
    id: "agr-039",
    name: "Marketing Partnership Agreement - Draft",
    type: "Partnership Agreement",
    partyId: "party-019", // TechStart Innovations
    status: "Deleted",
    subStatus: "Requirements Changed",
    created: "January 20, 2025",
    lastUpdated: "2025-02-28T16:30:00Z",
    value: "$50,000",
    dueDate: "N/A",
    owner: "Sarah Mitchell",
    isOwner: false,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: true,
    documents: [
      {
        id: "doc-039-partnership",
        name: "Marketing Partnership Terms",
        type: "Partnership Agreement",
        status: "Deleted",
        subStatus: "Requirements Changed",
        created: "January 20, 2025",
        lastUpdated: "2025-02-28T16:30:00Z",
        owner: "Sarah Mitchell",
        isOwner: false,
        action: "View",
        urgent: false,
        deleted: true,
        agreementId: "agr-039",
        phase: "Deleted",
      },
    ],
  },

  // INTERNAL AGREEMENTS
  {
    id: "agr-040",
    name: "Internal HR Policy Update - Remote Work Guidelines",
    type: "Policy Acknowledgment",
    partyId: "party-006", // Legal Department
    status: "Completed",
    subStatus: "All employees acknowledged",
    phase: "Active",
    created: "December 1, 2024",
    lastUpdated: "2024-12-15T14:00:00Z",
    value: "$0",
    dueDate: "Completed",
    owner: "You",
    isOwner: true,
    action: "View",
    urgent: false,
    source: "manual",
    deleted: false,
    effectiveDate: "December 15, 2024",
    expirationDate: "December 14, 2025",
    documents: [
      {
        id: "doc-040-policy",
        name: "Remote Work Policy 2025",
        type: "Policy Acknowledgment",
        status: "Completed",
        subStatus: "Executed",
        phase: "Active",
        created: "December 1, 2024",
        lastUpdated: "2024-12-15T14:00:00Z",
        owner: "You",
        isOwner: true,
        action: "View",
        urgent: false,
        deleted: false,
        agreementId: "agr-040",
        effectiveDate: "December 15, 2024",
        expirationDate: "December 14, 2025",
        value: "$0",
      },
    ],
  },
  {
    id: "agr-041",
    name: "Internal Contractor Onboarding Agreement Template",
    type: "Contractor Agreement",
    partyId: "party-011", // Procurement Department
    status: "Draft",
    subStatus: "Legal Review",
    created: "May 10, 2025",
    lastUpdated: "2025-05-20T11:00:00Z",
    value: "$0",
    dueDate: "June 15, 2025",
    owner: "You",
    isOwner: true,
    action: "Review",
    urgent: false,
    source: "manual",
    deleted: false,
    documents: [
      {
        id: "doc-041-contractor",
        name: "Standard Contractor Agreement Template",
        type: "Contractor Agreement",
        status: "Draft",
        subStatus: "Legal Review",
        created: "May 10, 2025",
        lastUpdated: "2025-05-20T11:00:00Z",
        owner: "You",
        isOwner: true,
        action: "Review",
        urgent: false,
        deleted: false,
        agreementId: "agr-041",
        effectiveDate: "July 1, 2025",
        expirationDate: "June 30, 2026",
        value: "$0",
        phase: "Review",
      },
    ],
  },
  {
    id: "agr-042",
    name: "Internal NDA Template - New Hire Standard",
    type: "Non-Disclosure Agreement",
    partyId: "party-006", // Legal Department
    status: "Under Review",
    subStatus: "HR Approval",
    created: "April 25, 2025",
    lastUpdated: "2025-05-18T15:30:00Z",
    value: "$0",
    dueDate: "June 1, 2025",
    owner: "You",
    isOwner: true,
    action: "Approve",
    urgent: false,
    source: "manual",
    deleted: false,
    documents: [
      {
        id: "doc-042-nda",
        name: "Standard Employee NDA Template",
        type: "Non-Disclosure Agreement",
        status: "Under Review",
        subStatus: "HR Approval",
        created: "April 25, 2025",
        lastUpdated: "2025-05-18T15:30:00Z",
        owner: "You",
        isOwner: true,
        action: "Approve",
        urgent: false,
        deleted: false,
        agreementId: "agr-042",
        effectiveDate: "June 1, 2025",
        expirationDate: "Perpetual",
        value: "$0",
        phase: "Review",
      },
    ],
  },
]

// Helper function to get completed documents
export function getCompletedDocuments(): { document: Document; agreement: Agreement }[] {
  return agreements
    .filter((agreement) => agreement.status === "Completed")
    .flatMap((agreement) =>
      agreement.documents
        .filter((document) => document.status === "Completed")
        .map((document) => ({ document, agreement })),
    )
}

// Helper function to get party name for an agreement
export function getPartyNameForAgreement(agreement: Agreement): string {
  // This is a placeholder function that maps party IDs to names
  // In a real application, this would likely fetch from a parties database
  const partyNames: Record<string, string> = {
    "party-001": "TechGiant Corp",
    "party-013": "HealthSecure Systems",
    "party-014": "Metro Financial Group",
    "party-015": "EduTech University",
    "party-017": "RetailMax Corporation",
    "party-018": "MedDevice Solutions",
    "party-019": "TechStart Innovations",
    "party-020": "Government Solutions Inc.",
    "party-multiple": "Multiple",
    "party-006": "Legal Department",
    "party-011": "Procurement Department",
  }

  return partyNames[agreement.partyId] || "Unknown Party"
}

// Helper function to get an agreement by ID
export function getAgreementById(id: string): Agreement | undefined {
  return agreements.find((agreement) => agreement.id === id)
}

// Helper function to get a document by ID
export function getDocumentById(id: string): { document: Document; agreement: Agreement } | null {
  for (const agreement of agreements) {
    const document = agreement.documents.find((doc) => doc.id === id)
    if (document) {
      return { document, agreement }
    }
  }
  return null
}
