"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, Info, Copy, Check, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BibleVerseData {
  bengali: {
    text: string
    reference: string
  }
  hindi: {
    text: string
    reference: string
  }
  english: {
    text: string
    reference: string
    translation?: string
  }
}

// Available translations
const translations = [
  { value: "esv", label: "English Standard Version (ESV)" },
  { value: "kjv", label: "King James Version (KJV)" },
  { value: "niv", label: "New International Version (NIV)" },
  { value: "nlt", label: "New Living Translation (NLT)" },
  { value: "amp", label: "Amplified Bible (AMP)" },
]

// List of Bible verses to rotate through
const verseReferences = [
  "John 3:16",
  "Psalm 23:1",
  "Proverbs 3:5-6",
  "Philippians 4:13",
  "Romans 8:28",
  "Jeremiah 29:11",
  "Isaiah 40:31",
  "Matthew 11:28",
  "Romans 12:2",
  "Psalm 46:1",
  "Acts 2:4",
  "1 Corinthians 14:2",
]

// Function to get today's verse reference based on the date
function getTodaysVerseReference() {
  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
  return verseReferences[dayOfYear % verseReferences.length]
}

// Function to fetch verse from API
async function fetchBibleVerse(reference: string, translation = "esv") {
  try {
    const response = await fetch(
      `/api/bible-verse?reference=${encodeURIComponent(reference)}&translation=${translation}`,
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching Bible verse:", error)
    throw error
  }
}

export function EnhancedBibleVerse() {
  const { language } = useLanguage()
  const [verse, setVerse] = useState<BibleVerseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [reference, setReference] = useState(getTodaysVerseReference())
  const [translation, setTranslation] = useState("esv")
  const [copied, setCopied] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchVerse = async () => {
    setLoading(true)
    setIsUsingFallback(false)

    try {
      // Fetch from API
      const data = await fetchBibleVerse(reference, translation)

      // Create verse data with translations
      const verseData: BibleVerseData = {
        english: {
          text: data.text,
          reference: data.reference,
          translation: data.translation,
        },
        // For Bengali and Hindi, we would ideally use a translation API or a Bible API that supports these languages
        // For now, we'll use a simple mapping for demonstration
        bengali: {
          text: data.text + " (Bengali translation would be here)",
          reference: data.reference + " (Bengali)",
        },
        hindi: {
          text: data.text + " (Hindi translation would be here)",
          reference: data.reference + " (Hindi)",
        },
      }

      // Check if we're using fallback data
      setIsUsingFallback(data.source === "fallback")

      // Save to localStorage with date
      localStorage.setItem(`bibleVerse-${translation}`, JSON.stringify({ ...verseData, source: data.source }))
      localStorage.setItem(`bibleVerseDate-${translation}`, new Date().toDateString())

      setVerse(verseData)
    } catch (err) {
      console.error("Failed to fetch Bible verse:", err)
      setIsUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVerse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, translation])

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Get a random verse reference
    const randomIndex = Math.floor(Math.random() * verseReferences.length)
    setReference(verseReferences[randomIndex])

    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleTranslationChange = (value: string) => {
    setTranslation(value)
  }

  const handleCopy = () => {
    if (!verse) return

    const currentVerse = verse[language]
    const textToCopy = `${currentVerse.text} - ${currentVerse.reference}`

    navigator.clipboard.writeText(textToCopy)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleShare = () => {
    if (!verse) return

    const currentVerse = verse[language]
    const textToShare = `${currentVerse.text} - ${currentVerse.reference}`

    if (navigator.share) {
      navigator.share({
        title: "Bible Verse",
        text: textToShare,
      })
    } else {
      handleCopy()
    }
  }

  if (loading) {
    return (
      <Card className="max-w-3xl mx-auto verse-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="h-20 w-full mb-4" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!verse) return null

  const currentVerse = verse[language]

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <AnimatePresence>
        {isUsingFallback && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900/30">
              <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <AlertDescription className="text-yellow-600 dark:text-yellow-400">
                {language === "english"
                  ? "Using offline Bible verse data. Set up the ESV API for live verses."
                  : language === "hindi"
                    ? "ऑफलाइन बाइबिल वर्स डेटा का उपयोग कर रहे हैं। लाइव वर्सेस के लिए ESV API सेटअप करें।"
                    : "অফলাইন বাইবেল পদ্য ডেটা ব্যবহার করছে। লাইভ পদ্যের জন্য ESV API সেটআপ করুন।"}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="verse-card overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold gradient-text">
                {language === "english" ? "Verse of the Day" : language === "hindi" ? "आज का वचन" : "আজকের বাক্য"}
              </h3>
              <div className="flex items-center gap-2">
                {language === "english" && (
                  <Select value={translation} onValueChange={handleTranslationChange}>
                    <SelectTrigger className="w-[180px] bg-white/50 dark:bg-slate-800/50">
                      <SelectValue placeholder="Select translation" />
                    </SelectTrigger>
                    <SelectContent>
                      {translations.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRefresh}
                        className="rounded-full"
                        disabled={isRefreshing}
                      >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                        <span className="sr-only">Refresh</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get a new verse</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-2 top-0 text-4xl text-primary-300/30 font-serif">"</div>
              <p className="text-xl mb-6 italic pl-6 pr-6 relative z-10">{currentVerse.text}</p>
              <div className="absolute -right-2 bottom-0 text-4xl text-primary-300/30 font-serif">"</div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="font-semibold text-primary-700 dark:text-primary-300">{currentVerse.reference}</p>
              <div className="flex items-center gap-2">
                {language === "english" && currentVerse.translation && (
                  <span className="text-sm text-slate-500">{currentVerse.translation}</span>
                )}
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleCopy} className="rounded-full h-8 w-8">
                          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? "Copied!" : "Copy verse"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share verse</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
