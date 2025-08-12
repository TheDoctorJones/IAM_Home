export const AGREEMENT_TYPES = ["New Customer", "Existing Customer", "Partner", "Compliance", "Termination"] as const

export type AgreementType = (typeof AGREEMENT_TYPES)[number]
