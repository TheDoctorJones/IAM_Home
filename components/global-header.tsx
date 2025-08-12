"use client"

import Link from "next/link"
import PersonaSwitcher, { type PersonaType } from "@/components/persona-switcher"

interface GlobalHeaderProps {
  currentPage: "home" | "agreements" | "templates" | "insights" | "admin"
  currentPersona: PersonaType
  onPersonaChange: (persona: PersonaType) => void
}

export default function GlobalHeader({ currentPage, currentPersona, onPersonaChange }: GlobalHeaderProps) {
  const getNavLinkClass = (page: string) => {
    const baseClass = "text-sm font-medium transition-colors relative min-w-[100px] px-4 py-4 text-center block"
    if (currentPage === page) {
      return `${baseClass} text-gray-900 font-bold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-1 after:bg-black`
    }
    return `${baseClass} text-gray-500 hover:text-gray-900`
  }

  const getMenuItems = () => {
    const menuItems = [
      { key: "home", label: "Home", href: "/" },
      { key: "agreements", label: "Agreements", href: "/" },
      { key: "templates", label: "Templates", href: "/" },
      { key: "insights", label: "Insights", href: "/" },
      { key: "admin", label: "Admin", href: "/" },
    ]

    switch (currentPersona) {
      case "vp-sales":
        return menuItems.filter((item) => ["home", "agreements", "templates", "insights"].includes(item.key))
      case "sales-rep":
        return menuItems.filter((item) => ["home", "agreements", "insights"].includes(item.key))
      case "contract-ops":
        return menuItems.filter((item) => ["home", "agreements", "templates", "insights"].includes(item.key))
      case "org-admin":
        return menuItems.filter((item) => ["home", "templates", "admin"].includes(item.key))
      case "new-user":
        return menuItems.filter((item) => ["home", "agreements", "templates", "insights"].includes(item.key))
      default:
        return menuItems.filter((item) => ["home", "agreements", "templates", "insights"].includes(item.key))
    }
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Docusign
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {getMenuItems().map((item) => (
            <Link key={item.key} href={item.href} className={getNavLinkClass(item.key)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <PersonaSwitcher currentPersona={currentPersona} onPersonaChange={onPersonaChange} />
        </div>
      </div>
    </header>
  )
}
