import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { GlobalStartModalProvider } from "@/hooks/use-global-start-modal"
import GlobalStartModal from "@/components/global-start-modal"
import { useGlobalStartModal } from "@/hooks/use-global-start-modal"
import ThemeProvider from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

function GlobalStartModalWrapper() {
  const { isOpen, closeModal, persona, currentPage } = useGlobalStartModal()

  return <GlobalStartModal open={isOpen} onOpenChange={closeModal} persona={persona} currentPage={currentPage} />
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <GlobalStartModalProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <GlobalStartModalWrapper />
            <Toaster />
          </ThemeProvider>
        </GlobalStartModalProvider>
      </body>
    </html>
  )
}
