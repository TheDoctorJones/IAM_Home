"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Mail, Phone } from "lucide-react"

interface NotificationSignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NotificationSignupModal({ open, onOpenChange }: NotificationSignupModalProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Notification signup:", { email, phone })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Stay Updated
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Notification Signup */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Get Task Alerts</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get notified when new approvals, reviews, or signatures are needed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Sign Up for Alerts
              </Button>
            </form>
          </div>

          {/* Right Column - Mobile App Ad */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Connected with the Docusign App</h3>
              <p className="text-sm text-gray-600">Monitor your agreement activity on the go.</p>
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-6">
                    {/* Mobile Phone Illustration */}
                    <div className="w-16 h-24 bg-gray-800 rounded-lg relative flex-shrink-0">
                      <div className="absolute top-2 left-2 right-2 bottom-6 bg-white rounded-sm"></div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-600 rounded-full"></div>
                    </div>

                    {/* QR Code Image - Increased by 50% */}
                    <div className="w-30 h-30 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
                      <img
                        src="/images/docusign-qr.png"
                        alt="QR Code to download Docusign mobile app"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Scan to download</p>
                    <p className="text-xs text-gray-600 mt-1">Available on iOS and Android</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
