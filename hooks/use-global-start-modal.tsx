"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { PersonaType } from "@/components/persona-switcher"

interface GlobalStartModalContextType {
  isOpen: boolean
  openModal: (persona: PersonaType, currentPage?: string) => void
  closeModal: () => void
  persona: PersonaType
  currentPage: string
}

const GlobalStartModalContext = createContext<GlobalStartModalContextType | undefined>(undefined)

export function GlobalStartModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [persona, setPersona] = useState<PersonaType>("new-user")
  const [currentPage, setCurrentPage] = useState("home")

  const openModal = (persona: PersonaType, currentPage = "home") => {
    setPersona(persona)
    setCurrentPage(currentPage)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <GlobalStartModalContext.Provider value={{ isOpen, openModal, closeModal, persona, currentPage }}>
      {children}
    </GlobalStartModalContext.Provider>
  )
}

export function useGlobalStartModal() {
  const context = useContext(GlobalStartModalContext)
  if (context === undefined) {
    throw new Error("useGlobalStartModal must be used within a GlobalStartModalProvider")
  }
  return context
}
