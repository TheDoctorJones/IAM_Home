"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type PersonaType = "vp-sales" | "sales-rep" | "contract-ops" | "org-admin" | "new-user"

interface Persona {
  id: PersonaType
  name: string
  role: string
  avatar: string
  initials: string
}

const personas: Persona[] = [
  {
    id: "vp-sales",
    name: "Michael Chen",
    role: "VP of Sales\n(Power Signer, Analyzer)",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MC",
  },
  {
    id: "sales-rep",
    name: "Sarah Johnson",
    role: "Sales Representative\n(Preparer)",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SJ",
  },
  {
    id: "contract-ops",
    name: "Alex Rodriguez",
    role: "Contract Operations\n(Process Builder)",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AR",
  },
  {
    id: "org-admin",
    name: "Jordan Kim",
    role: "Admin\n(Application Administrator)",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JK",
  },
  {
    id: "new-user",
    name: "Taylor Smith",
    role: "New User\n(Getting Started)",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "TS",
  },
]

interface PersonaSwitcherProps {
  currentPersona: PersonaType
  onPersonaChange: (persona: PersonaType) => void
}

export default function PersonaSwitcher({ currentPersona, onPersonaChange }: PersonaSwitcherProps) {
  const current = personas.find((p) => p.id === currentPersona) || personas[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={current.avatar || "/placeholder.svg"} alt={current.name} />
            <AvatarFallback>{current.initials}</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <div className="text-xs text-gray-500 mb-2">Switch Persona</div>
          {personas.map((persona) => (
            <DropdownMenuItem
              key={persona.id}
              onClick={() => onPersonaChange(persona.id)}
              className="flex items-center gap-3 p-3 cursor-pointer"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={persona.avatar || "/placeholder.svg"} alt={persona.name} />
                <AvatarFallback>{persona.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium text-sm">{persona.name}</div>
                <div className="text-xs text-gray-500 whitespace-pre-line">{persona.role}</div>
              </div>
              {currentPersona === persona.id && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
