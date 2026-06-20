import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { EnhancedNavbar } from "@/components/enhanced-navbar"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { LanguageProvider } from "@/components/language-provider"
import { Toaster } from "@/components/ui/toaster"
import BibleVerseBot from "@/components/bible-verse-bot"
import { BibleVerseProvider } from "@/components/bible-verse-provider"

// Define fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "The Glorious Church",
  description: "Official website of The Glorious Church",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BibleVerseProvider>
            <LanguageProvider>
              <div className="flex min-h-screen flex-col">
                <EnhancedNavbar />
                <main className="flex-1">{children}</main>
                <BibleVerseBot />
                <EnhancedFooter />
                <Toaster />
              </div>
            </LanguageProvider>
          </BibleVerseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
