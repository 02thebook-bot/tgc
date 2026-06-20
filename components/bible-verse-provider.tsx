"use client"

import { createContext, useContext, type ReactNode } from "react"

interface BibleVerseContextType {
  fetchVerse: (reference: string) => Promise<{
    text: string
    reference: string
  }>
  fetchHindiVerse: (reference: string) => Promise<{
    text: string
    reference: string
  }>
  fetchBengaliVerse: (reference: string) => Promise<{
    text: string
    reference: string
  }>
}

const BibleVerseContext = createContext<BibleVerseContextType | undefined>(undefined)

export function BibleVerseProvider({ children }: { children: ReactNode }) {
  const fetchVerse = async (reference: string) => {
    try {
      const response = await fetch(`/api/bible-verse?reference=${encodeURIComponent(reference)}`)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching Bible verse:", error)
      throw error
    }
  }

  const fetchHindiVerse = async (reference: string) => {
    try {
      const response = await fetch(`/api/bible-verse-hindi?reference=${encodeURIComponent(reference)}`)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching Hindi Bible verse:", error)
      throw error
    }
  }

  const fetchBengaliVerse = async (reference: string) => {
    try {
      const response = await fetch(`/api/bible-verse-bengali?reference=${encodeURIComponent(reference)}`)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching Bengali Bible verse:", error)
      throw error
    }
  }

  return (
    <BibleVerseContext.Provider value={{ fetchVerse, fetchHindiVerse, fetchBengaliVerse }}>
      {children}
    </BibleVerseContext.Provider>
  )
}

export function useBibleVerse() {
  const context = useContext(BibleVerseContext)
  if (context === undefined) {
    throw new Error("useBibleVerse must be used within a BibleVerseProvider")
  }
  return context
}
