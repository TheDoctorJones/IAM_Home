export interface DocumentTemplate {
  id: string
  title: string
  type: "contract" | "addendum" | "form" | "certificate" | "policy"
  status: "active" | "draft" | "archived"
  lastModified: string
  owner: string
  category: string
}

export interface ProcessTemplate {
  id: string
  title: string
  description: string
  version: string
  lastUpdated: string
  thumbnail: string
  category: string
  documents: string[]
  status: "active" | "draft" | "archived"
}

const generateRandomDate = () => {
  const now = new Date()
  const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000)
  const oneMinuteAgo = new Date(now.getTime() - 1 * 60 * 1000)
  const randomTime = twoYearsAgo.getTime() + Math.random() * (oneMinuteAgo.getTime() - twoYearsAgo.getTime())
  return new Date(randomTime).toISOString()
}

const generateRandomStatus = (): "active" | "draft" | "archived" => {
  const rand = Math.random()
  if (rand < 0.8) return "active"
  if (rand < 0.9) return "draft"
  return "archived"
}

export const processTemplates: ProcessTemplate[] = [
  {
    id: "proc-1",
    title: "Initial Engagement Package",
    description: "Complete initial engagement process with NDA, DPA, and evaluation agreements",
    version: "2.1",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "New Customer",
    documents: ["Non-Disclosure Agreement (NDA)", "Data Processing Addendum (DPA)", "Mutual Evaluation Agreement"],
    status: generateRandomStatus(),
  },
  {
    id: "proc-2",
    title: "New Customer Onboarding Package",
    description: "Complete onboarding process with MSA, order forms, SLA, and DPA",
    version: "3.2",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "New Customer",
    documents: [
      "Master Service Agreement (MSA)",
      "Order Form / Subscription Agreement",
      "Service Level Agreement (SLA)",
      "Data Processing Addendum (DPA)",
    ],
    status: generateRandomStatus(),
  },
  {
    id: "proc-3",
    title: "Mutual NDA (short form)",
    description: "Streamlined mutual non-disclosure agreement for quick execution",
    version: "1.8",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "New Customer",
    documents: ["Non-Disclosure Agreement (NDA)"],
    status: generateRandomStatus(),
  },
  {
    id: "proc-4",
    title: "Enterprise Expansion / Renewal Package",
    description: "Complete renewal process with expanded services and amendments",
    version: "2.7",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Existing Customer",
    documents: ["Renewal Agreement", "Expanded Order Form", "SLA Addendum", "Amendment"],
    status: generateRandomStatus(),
  },
  {
    id: "proc-5",
    title: "Complex Services Project Package",
    description: "Comprehensive project package with MSA, SOW, change orders, and payment terms",
    version: "4.1",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Existing Customer",
    documents: [
      "Master Service Agreement (MSA)",
      "Project Statement of Work (SOW)",
      "Change Order Template",
      "Payment Schedule Addendum",
    ],
    status: generateRandomStatus(),
  },
  {
    id: "proc-6",
    title: "Software License & Implementation Package",
    description: "Complete software licensing with implementation SOW, support agreement, and SLA",
    version: "3.5",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Existing Customer",
    documents: [
      "License Agreement",
      "Implementation Statement of Work (SOW)",
      "Support & Maintenance Agreement",
      "Service Level Agreement (SLA)",
    ],
    status: generateRandomStatus(),
  },
  {
    id: "proc-7",
    title: "One-Time Order Form",
    description: "Simple order form for one-time purchases or subscriptions",
    version: "1.3",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Existing Customer",
    documents: ["Order Form / Subscription Agreement"],
    status: generateRandomStatus(),
  },
  {
    id: "proc-8",
    title: "Change Order (single doc)",
    description: "Standalone change order template for project modifications",
    version: "2.0",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Existing Customer",
    documents: ["Change Order Template"],
    status: generateRandomStatus(),
  },
  {
    id: "proc-9",
    title: "Channel Partner / Reseller Package",
    description: "Complete partner package with reseller agreement, MDF, confidentiality, and training",
    version: "2.9",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Partner",
    documents: [
      "Partner / Reseller Agreement",
      "Marketing Development Funds (MDF) Agreement",
      "Confidentiality Agreement",
      "Training & Certification Agreement",
    ],
    status: generateRandomStatus(),
  },
  {
    id: "proc-10",
    title: "Compliance-Driven Sales Package",
    description: "Compliance-focused package with MSA, DPA, security addendum, and compliance certificate",
    version: "1.6",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Compliance",
    documents: [
      "Master Service Agreement (MSA)",
      "Data Processing Addendum (DPA)",
      "Security Addendum",
      "Industry Compliance Certificate",
    ],
    status: generateRandomStatus(),
  },
  {
    id: "proc-11",
    title: "DPA Execution",
    description: "Standalone data processing addendum for compliance requirements",
    version: "1.2",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Compliance",
    documents: ["Data Processing Addendum (DPA)"],
    status: generateRandomStatus(),
  },
  {
    id: "proc-12",
    title: "Compliance Certificate Request",
    description: "Process for requesting industry compliance certificates",
    version: "1.4",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Compliance",
    documents: ["Industry Compliance Certificate"],
    status: generateRandomStatus(),
  },
  {
    id: "proc-13",
    title: "SLA Acceptance",
    description: "Standalone service level agreement acceptance process",
    version: "1.1",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Compliance",
    documents: ["Service Level Agreement (SLA)"],
    status: generateRandomStatus(),
  },
  {
    id: "proc-14",
    title: "Termination / Transition Package",
    description: "Complete termination process with agreements and data deletion certificates",
    version: "2.3",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Termination",
    documents: ["Termination Agreement", "Transition Services Agreement", "Asset Return / Data Deletion Certificate"],
    status: generateRandomStatus(),
  },
  {
    id: "proc-15",
    title: "Termination Letter",
    description: "Simple termination letter for contract endings",
    version: "1.7",
    lastUpdated: generateRandomDate(),
    thumbnail: "/placeholder.svg?height=120&width=200",
    category: "Termination",
    documents: ["Termination Letter"],
    status: generateRandomStatus(),
  },
]

export const documentTemplates: DocumentTemplate[] = [
  {
    id: "doc-1",
    title: "Non-Disclosure Agreement (NDA)",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Legal Team",
    category: "New Customer",
  },
  {
    id: "doc-2",
    title: "Data Processing Addendum (DPA)",
    type: "addendum",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Compliance Team",
    category: "New Customer",
  },
  {
    id: "doc-3",
    title: "Mutual Evaluation Agreement",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Sales Team",
    category: "New Customer",
  },
  {
    id: "doc-4",
    title: "Master Service Agreement (MSA)",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Legal Team",
    category: "New Customer",
  },
  {
    id: "doc-5",
    title: "Order Form / Subscription Agreement",
    type: "form",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Sales Team",
    category: "New Customer",
  },
  {
    id: "doc-6",
    title: "Service Level Agreement (SLA)",
    type: "addendum",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Operations Team",
    category: "New Customer",
  },
  {
    id: "doc-7",
    title: "Renewal Agreement",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Account Management",
    category: "Existing Customer",
  },
  {
    id: "doc-8",
    title: "Expanded Order Form",
    type: "form",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Sales Team",
    category: "Existing Customer",
  },
  {
    id: "doc-9",
    title: "SLA Addendum",
    type: "addendum",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Operations Team",
    category: "Existing Customer",
  },
  {
    id: "doc-10",
    title: "Amendment",
    type: "addendum",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Legal Team",
    category: "Existing Customer",
  },
  {
    id: "doc-11",
    title: "Project Statement of Work (SOW)",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Project Management",
    category: "Existing Customer",
  },
  {
    id: "doc-12",
    title: "Change Order Template",
    type: "addendum",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Project Management",
    category: "Existing Customer",
  },
  {
    id: "doc-13",
    title: "Payment Schedule Addendum",
    type: "addendum",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Finance Team",
    category: "Existing Customer",
  },
  {
    id: "doc-14",
    title: "License Agreement",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Legal Team",
    category: "Existing Customer",
  },
  {
    id: "doc-15",
    title: "Implementation Statement of Work (SOW)",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Implementation Team",
    category: "Existing Customer",
  },
  {
    id: "doc-16",
    title: "Support & Maintenance Agreement",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Support Team",
    category: "Existing Customer",
  },
  {
    id: "doc-17",
    title: "Partner / Reseller Agreement",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Business Development",
    category: "Partner",
  },
  {
    id: "doc-18",
    title: "Marketing Development Funds (MDF) Agreement",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Marketing Team",
    category: "Partner",
  },
  {
    id: "doc-19",
    title: "Confidentiality Agreement",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Legal Team",
    category: "Partner",
  },
  {
    id: "doc-20",
    title: "Training & Certification Agreement",
    type: "policy",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Training Team",
    category: "Partner",
  },
  {
    id: "doc-21",
    title: "Security Addendum",
    type: "addendum",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Security Team",
    category: "Compliance",
  },
  {
    id: "doc-22",
    title: "Industry Compliance Certificate",
    type: "certificate",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Compliance Team",
    category: "Compliance",
  },
  {
    id: "doc-23",
    title: "Termination Agreement",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Legal Team",
    category: "Termination",
  },
  {
    id: "doc-24",
    title: "Transition Services Agreement",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "Operations Team",
    category: "Termination",
  },
  {
    id: "doc-25",
    title: "Asset Return / Data Deletion Certificate",
    type: "certificate",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "IT Team",
    category: "Termination",
  },
  {
    id: "doc-26",
    title: "Termination Letter",
    type: "contract",
    status: "active", // Set all document templates to active status
    lastModified: generateRandomDate(),
    owner: "HR Team",
    category: "Termination",
  },
]
