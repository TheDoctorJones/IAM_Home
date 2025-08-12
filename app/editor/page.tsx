"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DocumentRenderer } from "@/components/document-renderer"
import type { DocumentType, DocumentData } from "@/lib/types/document-renderer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { documentTemplates } from "@/lib/data/templates"
import {
  Share2,
  Eye,
  Save,
  ArrowLeft,
  User,
  Calendar,
  Hash,
  Mail,
  Building,
  PenTool,
  Type,
  Plus,
  ChevronDown,
  FileText,
  CheckSquare,
  Circle,
  Stamp,
  Check,
  X,
  StickyNote,
  Calculator,
  Paperclip,
  CreditCard,
  Shield,
  MapPin,
  Trash2,
  Move,
} from "lucide-react"

interface PlacedField {
  id: string
  type: string
  label: string
  x: number
  y: number
  width: number
  height: number
  placeholder: string
  recipient?: string
  selected?: boolean
}

interface ContextMenu {
  x: number
  y: number
  fieldIds: string[]
}

const signatureFields = [
  { id: "signature", label: "Signature", icon: PenTool },
  { id: "initials", label: "Initials", icon: Type },
  { id: "date-signed", label: "Date Signed", icon: Calendar },
]

const personalInfoFields = [
  { id: "name", label: "Name", icon: User },
  { id: "email", label: "Email", icon: Mail },
  { id: "company", label: "Company", icon: Building },
  { id: "title", label: "Title", icon: User },
  { id: "ssn", label: "SSN", icon: Shield },
  { id: "zip", label: "Zip", icon: MapPin },
]

const inputFields = [
  { id: "text", label: "Text", icon: FileText },
  { id: "number", label: "Number", icon: Hash },
  { id: "checkbox", label: "Checkbox", icon: CheckSquare },
  { id: "dropdown", label: "Dropdown", icon: ChevronDown },
  { id: "radio", label: "Radio", icon: Circle },
]

const actionFields = [
  { id: "stamp", label: "Stamp", icon: Stamp },
  { id: "approve", label: "Approve", icon: Check },
  { id: "decline", label: "Decline", icon: X },
]

const otherFields = [
  { id: "note", label: "Note", icon: StickyNote },
  { id: "formula", label: "Formula", icon: Calculator },
  { id: "attachment", label: "Attachment", icon: Paperclip },
  { id: "payment", label: "Payment", icon: CreditCard },
]

interface PlacedFieldProps {
  field: PlacedField
  onMove: (id: string, x: number, y: number, isSelected: boolean) => void
  onResize: (id: string, width: number, height: number) => void
  onSelect: (id: string, multiSelect?: boolean) => void
  onEdit: (id: string, placeholder: string) => void
  isSelected: boolean
}

const PlacedFieldComponent = ({ field, onMove, onResize, onSelect, onEdit, isSelected }: PlacedFieldProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(field.placeholder)
  const dragStart = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ width: 0, height: 0, x: 0, y: 0 })

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.current.x
        const newY = e.clientY - dragStart.current.y
        onMove(field.id, Math.max(0, newX), Math.max(0, newY), isSelected)
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.x
        const deltaY = e.clientY - resizeStart.current.y
        const newWidth = Math.max(50, resizeStart.current.width + deltaX)
        const newHeight = Math.max(20, resizeStart.current.height + deltaY)
        onResize(field.id, newWidth, newHeight)
      }
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging, isResizing, field.id, onMove, onResize])

  useEffect(() => {
    if (isDragging || isResizing) {
      // Notify parent that this field is being manipulated
      const event = new CustomEvent("fieldManipulation", { detail: { fieldId: field.id, isActive: true } })
      document.dispatchEvent(event)
    } else {
      // Notify parent that manipulation has stopped
      const event = new CustomEvent("fieldManipulation", { detail: { fieldId: field.id, isActive: false } })
      document.dispatchEvent(event)
    }
  }, [isDragging, isResizing, field.id])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onSelect(field.id, e.shiftKey)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("field-content")) {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
      dragStart.current = { x: e.clientX - field.x, y: e.clientY - field.y }
    }
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeStart.current = {
      width: field.width,
      height: field.height,
      x: e.clientX,
      y: e.clientY,
    }
    onSelect(field.id, e.shiftKey)
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleEditSubmit = () => {
    onEdit(field.id, editValue)
    setIsEditing(false)
  }

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit()
    } else if (e.key === "Escape") {
      setEditValue(field.placeholder)
      setIsEditing(false)
    }
  }

  const handleEditBlur = () => {
    handleEditSubmit()
  }

  const renderFieldContent = () => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditBlur}
          onKeyDown={handleEditKeyDown}
          className="w-full h-full bg-transparent border-none outline-none text-xs"
          autoFocus
        />
      )
    }

    return <div className="field-content text-xs text-gray-700 p-1 truncate">{field.placeholder}</div>
  }

  return (
    <div
      className={`absolute border-2 bg-blue-50 bg-opacity-50 cursor-move select-none ${
        isSelected ? "border-blue-600" : "border-blue-300"
      }`}
      style={{
        left: field.x,
        top: field.y,
        width: field.width,
        height: field.height,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {renderFieldContent()}

      {isSelected && (
        <>
          <div
            className="absolute bottom-0 right-0 w-3 h-3 bg-blue-600 cursor-se-resize"
            onMouseDown={handleResizeMouseDown}
          />
          <div className="absolute top-0 left-0 w-4 h-4 bg-blue-600 cursor-move flex items-center justify-center">
            <Move className="w-2 h-2 text-white" />
          </div>
        </>
      )}
    </div>
  )
}

const FieldContextMenu = ({
  contextMenu,
  onClose,
  onDelete,
  onChangeType,
  selectedFields,
  isVisible = true,
}: {
  contextMenu: ContextMenu
  onClose: () => void
  onDelete: () => void
  onChangeType: (type: string) => void
  selectedFields: PlacedField[]
  isVisible?: boolean
}) => {
  const allFieldTypes = [...signatureFields, ...personalInfoFields, ...inputFields, ...actionFields, ...otherFields]

  const currentFieldType = selectedFields.length === 1 ? selectedFields[0].type : ""

  return (
    <div
      className={`absolute bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ left: contextMenu.x, top: contextMenu.y }}
    >
      {selectedFields.length > 1 && (
        <div className="px-3 py-1 text-xs text-gray-500 border-b">
          {selectedFields.length} field{selectedFields.length > 1 ? "s" : ""} selected
        </div>
      )}

      <div className="px-3 py-2">
        <Select onValueChange={onChangeType} value={currentFieldType}>
          <SelectTrigger className="w-32 h-6 text-xs">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {allFieldTypes.map((type) => (
              <SelectItem key={type.id} value={type.id} className="text-xs">
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        onClick={onDelete}
        className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center"
      >
        <Trash2 className="w-3 h-3 mr-2" />
        Delete
      </button>
    </div>
  )
}

export default function DocumentEditor() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const documentRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  const templateId = searchParams.get("template")
  const template = documentTemplates.find((t) => t.id === templateId)

  const [documentTitle, setDocumentTitle] = useState(template?.title || "Document Template")
  const [documentType, setDocumentType] = useState<DocumentType>((template?.type as DocumentType) || "contract")
  const [draggedField, setDraggedField] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [placedFields, setPlacedFields] = useState<PlacedField[]>([])
  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>([])
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 })
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 })
  const [isDraggingAnyField, setIsDraggingAnyField] = useState(false)
  const [isAnyFieldBeingManipulated, setIsAnyFieldBeingManipulated] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  const [dragStartPositions, setDragStartPositions] = useState<Record<string, { x: number; y: number }>>({})

  const templateStatus = template?.status || "draft"
  const templateOwner = template?.owner || "Unknown"
  const templateLastModified = template?.lastModified || new Date().toISOString()
  const templateCategory = template?.category || "General"

  const templateData: DocumentData = {
    name: template?.title || "Untitled Document",
    companyName: "[COMPANY_NAME]",
    clientName: "[CLIENT_NAME]",
    documentNumber: "[DOCUMENT_NUMBER]",
    effectiveDate: "[EFFECTIVE_DATE]",
    expirationDate: "[EXPIRATION_DATE]",
    contractValue: "[CONTRACT_VALUE]",
    paymentTerms: "[PAYMENT_TERMS]",
  }

  useEffect(() => {
    const handleFieldManipulation = (e: CustomEvent) => {
      const { isActive } = e.detail
      setIsAnyFieldBeingManipulated(isActive)
      if (!isActive) {
        // Clear drag start positions when drag ends
        setDragStartPositions({})
      }
    }

    document.addEventListener("fieldManipulation", handleFieldManipulation as EventListener)
    return () => {
      document.removeEventListener("fieldManipulation", handleFieldManipulation as EventListener)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const handleDragStart = (fieldId: string) => {
    setDraggedField(fieldId)
  }

  const handleDragEnd = () => {
    if (draggedField && selectedFieldIds.length > 1 && selectedFieldIds.includes(draggedField)) {
      // Keep the current selection intact when dragging multiple fields
      // selectedFieldIds already contains the correct selection
    }
    setDraggedField(null)
  }

  const handleDocumentDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedField || !documentRef.current) return

    const rect = documentRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const allFields = [...signatureFields, ...personalInfoFields, ...inputFields, ...actionFields, ...otherFields]
    const fieldType = allFields.find((f) => f.id === draggedField)

    if (fieldType) {
      const newField: PlacedField = {
        id: `${draggedField}-${Date.now()}`,
        type: draggedField,
        label: fieldType.label,
        x: Math.max(0, x - 50),
        y: Math.max(0, y - 15),
        width: 120,
        height: 30,
        placeholder: fieldType.label,
        recipient: "all",
      }

      setPlacedFields((prev) => [...prev, newField])
    }
    setDraggedField(null)
  }

  const handleDocumentDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const moveField = (fieldId: string, x: number, y: number, isPartOfSelection = false) => {
    if (isPartOfSelection && selectedFieldIds.length > 1 && selectedFieldIds.includes(fieldId)) {
      // Multi-field drag: move all selected fields together
      const draggedField = placedFields.find((f) => f.id === fieldId)
      if (!draggedField) return

      // Calculate the offset from the dragged field's original position
      const originalPos = dragStartPositions[fieldId]
      if (!originalPos) {
        // Store initial positions if not already stored
        const initialPositions: Record<string, { x: number; y: number }> = {}
        selectedFieldIds.forEach((id) => {
          const field = placedFields.find((f) => f.id === id)
          if (field) {
            initialPositions[id] = { x: field.x, y: field.y }
          }
        })
        setDragStartPositions(initialPositions)
        return
      }

      const deltaX = x - originalPos.x
      const deltaY = y - originalPos.y

      // Move all selected fields by the same delta
      setPlacedFields((prev) =>
        prev.map((field) => {
          if (selectedFieldIds.includes(field.id)) {
            const fieldOriginalPos = dragStartPositions[field.id]
            if (fieldOriginalPos) {
              return {
                ...field,
                x: Math.max(0, fieldOriginalPos.x + deltaX),
                y: Math.max(0, fieldOriginalPos.y + deltaY),
              }
            }
          }
          return field
        }),
      )
    } else {
      // Single field drag
      setPlacedFields((prev) => prev.map((field) => (field.id === fieldId ? { ...field, x, y } : field)))
    }
  }

  const handleFieldResize = (id: string, width: number, height: number) => {
    setPlacedFields((prev) => prev.map((field) => (field.id === id ? { ...field, width, height } : field)))
  }

  const handleFieldSelect = (id: string, multiSelect = false) => {
    if (multiSelect) {
      setSelectedFieldIds((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
    } else {
      setSelectedFieldIds([id])
    }
    setTimeout(() => {
      editorRef.current?.focus()
    }, 0)
  }

  const handleFieldEdit = (id: string, placeholder: string) => {
    setPlacedFields((prev) => prev.map((field) => (field.id === id ? { ...field, placeholder } : field)))
  }

  useEffect(() => {
    if (selectedFieldIds.length > 0 && !isDraggingAnyField && !isAnyFieldBeingManipulated) {
      const selectedFields = placedFields.filter((f) => selectedFieldIds.includes(f.id))
      if (selectedFields.length > 0) {
        const field = selectedFields[0]

        setContextMenu({
          x: field.x,
          y: field.y + field.height + 5,
          fieldIds: selectedFieldIds,
        })
      }
    } else {
      setContextMenu(null)
    }
  }, [selectedFieldIds, placedFields, isDraggingAnyField, isAnyFieldBeingManipulated])

  const handleDeleteFields = () => {
    setPlacedFields((prev) => prev.filter((f) => !selectedFieldIds.includes(f.id)))
    setSelectedFieldIds([])
    setContextMenu(null)
  }

  const handleChangeFieldType = (newType: string) => {
    const allFields = [...signatureFields, ...personalInfoFields, ...inputFields, ...actionFields, ...otherFields]
    const fieldType = allFields.find((f) => f.id === newType)

    if (fieldType) {
      setPlacedFields((prev) =>
        prev.map((field) =>
          selectedFieldIds.includes(field.id)
            ? { ...field, type: newType, label: fieldType.label, placeholder: fieldType.label }
            : field,
        ),
      )
    }
    setContextMenu(null)
  }

  const renderFieldCard = (field: any) => {
    const IconComponent = field.icon
    return (
      <Card
        key={field.id}
        className={`cursor-grab hover:bg-gray-50 transition-colors border-gray-200 ${
          draggedField === field.id ? "opacity-50" : ""
        }`}
        draggable
        onDragStart={() => handleDragStart(field.id)}
        onDragEnd={handleDragEnd}
      >
        <CardContent className="p-4 py-2">
          <div className="flex items-center space-x-3">
            <IconComponent className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900 text-sm">{field.label}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleDocumentMouseDown = (e: React.MouseEvent) => {
    // Only start selection if clicking on the document background (not on fields)
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".document-renderer")) {
      const rect = documentRef.current?.getBoundingClientRect()
      if (rect) {
        setIsSelecting(true)
        setSelectionStart({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
        setSelectionEnd({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
        setSelectedFieldIds([])
        setContextMenu(null)
      }
    }
  }

  const handleDocumentMouseMove = (e: React.MouseEvent) => {
    if (isSelecting && documentRef.current) {
      const rect = documentRef.current.getBoundingClientRect()
      setSelectionEnd({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleDocumentMouseUp = () => {
    if (isSelecting) {
      // Find fields within selection box
      const selectionBox = {
        left: Math.min(selectionStart.x, selectionEnd.x),
        top: Math.min(selectionStart.y, selectionEnd.y),
        right: Math.max(selectionStart.x, selectionEnd.x),
        bottom: Math.max(selectionStart.y, selectionEnd.y),
      }

      const selectedFields = placedFields.filter((field) => {
        const fieldRight = field.x + field.width
        const fieldBottom = field.y + field.height

        return (
          field.x < selectionBox.right &&
          fieldRight > selectionBox.left &&
          field.y < selectionBox.bottom &&
          fieldBottom > selectionBox.top
        )
      })

      setSelectedFieldIds(selectedFields.map((f) => f.id))
      setIsSelecting(false)
    }
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isSelecting && documentRef.current) {
        const rect = documentRef.current.getBoundingClientRect()
        setSelectionEnd({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleGlobalMouseUp = () => {
      if (isSelecting) {
        handleDocumentMouseUp()
      }
    }

    if (isSelecting) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isSelecting, selectionStart, placedFields])

  const renderSelectionBox = () => {
    if (!isSelecting) return null

    const left = Math.min(selectionStart.x, selectionEnd.x)
    const top = Math.min(selectionStart.y, selectionEnd.y)
    const width = Math.abs(selectionEnd.x - selectionStart.x)
    const height = Math.abs(selectionEnd.y - selectionStart.y)

    return (
      <div
        className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-20 pointer-events-none z-10"
        style={{
          left,
          top,
          width,
          height,
        }}
      />
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold text-white">{template?.title || "Untitled Document"}</h1>
            <Badge
              variant={templateStatus === "active" ? "default" : templateStatus === "draft" ? "secondary" : "outline"}
              className="ml-2 bg-gray-400 text-black"
            >
              {templateStatus.charAt(0).toUpperCase() + templateStatus.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => console.log("Share document")}
              className="text-white hover:bg-gray-800 p-2"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Preview document")}
              className="text-white border-gray-600 hover:bg-gray-800 bg-transparent"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              size="sm"
              onClick={() => console.log("Save document")}
              className="hover:bg-gray-200 bg-white text-black"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Fields</h2>
              <Plus className="w-5 h-5 text-gray-600" />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Assign fields to</label>
              <Select>
                <SelectTrigger className="w-full bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All parties</SelectItem>
                  <SelectItem value="client">Client only</SelectItem>
                  <SelectItem value="company">Company only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <Input
                placeholder="Search fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-gray-200"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 uppercase tracking-wide text-xs text-gray-400 font-semibold">SIGNATURE</h3>
                <div className="space-y-2">{signatureFields.map((field) => renderFieldCard(field))}</div>
              </div>

              <div>
                <h3 className="mb-3 uppercase tracking-wide text-xs text-gray-400 font-semibold">PERSONAL INFO</h3>
                <div className="space-y-2">{personalInfoFields.map((field) => renderFieldCard(field))}</div>
              </div>

              <div>
                <h3 className="mb-3 uppercase tracking-wide text-xs text-gray-400 font-semibold">INPUT FIELDS</h3>
                <div className="space-y-2">{inputFields.map((field) => renderFieldCard(field))}</div>
              </div>

              <div>
                <h3 className="mb-3 uppercase tracking-wide text-xs text-gray-400 font-semibold">ACTION FIELDS</h3>
                <div className="space-y-2">{actionFields.map((field) => renderFieldCard(field))}</div>
              </div>

              <div>
                <h3 className="mb-3 uppercase tracking-wide text-xs text-gray-400 font-semibold">OTHER FIELDS</h3>
                <div className="space-y-2">{otherFields.map((field) => renderFieldCard(field))}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={editorRef}
          className="flex-1 p-6 overflow-auto bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === "Delete" || e.key === "Backspace") && selectedFieldIds.length > 0) {
              e.preventDefault()
              e.stopPropagation()
              handleDeleteFields()
            }
          }}
        >
          <div className="flex justify-center">
            <div className="max-w-4xl w-full relative">
              <div
                ref={documentRef}
                className="relative select-none" // Add select-none to prevent text selection
                onDrop={handleDocumentDrop}
                onDragOver={handleDocumentDragOver}
                onMouseDown={handleDocumentMouseDown} // Add mouse down handler
                onMouseMove={handleDocumentMouseMove} // Add mouse move handler
                onMouseUp={handleDocumentMouseUp} // Add mouse up handler
              >
                <div className="document-renderer">
                  {" "}
                  {/* Add wrapper class for targeting */}
                  <DocumentRenderer type={documentType} mode="template" data={templateData} className="shadow-lg" />
                </div>

                {renderSelectionBox()}

                {placedFields.map((field) => (
                  <PlacedFieldComponent
                    key={field.id}
                    field={field}
                    onMove={moveField}
                    onResize={handleFieldResize}
                    onSelect={handleFieldSelect}
                    onEdit={handleFieldEdit}
                    isSelected={selectedFieldIds.includes(field.id)}
                  />
                ))}

                {contextMenu && (
                  <FieldContextMenu
                    contextMenu={contextMenu}
                    onClose={() => setContextMenu(null)}
                    onDelete={handleDeleteFields}
                    onChangeType={handleChangeFieldType}
                    selectedFields={placedFields.filter((f) => contextMenu.fieldIds.includes(f.id))}
                    isVisible={!isAnyFieldBeingManipulated && !isScrolling}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
