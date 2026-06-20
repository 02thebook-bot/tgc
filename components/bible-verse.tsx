"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

// Fallback verses in case API fails
const fallbackVerses: BibleVerseData[] = [
  {
    bengali: {
      text: "কারণ ঈশ্বর জগতকে এমন ভালবাসলেন যে, তিনি তাঁর একমাত্র পুত্রকে দান করলেন, যেন যে কেউ তাঁর ওপর বিশ্বাস করে সে বিনষ্ট না হয় বরং অনন্ত জীবন পায়।",
      reference: "যোহন ৩:১৬",
    },
    hindi: {
      text: "क्योंकि परमेश्वर ने जगत से ऐसा प्रेम रखा कि उसने अपना एकलौता पुत्र दे दिया, ताकि जो कोई उस पर विश्वास करे, वह नाश न हो, परन्तु अनन्त जीवन पाए।",
      reference: "यूहन्ना 3:16",
    },
    english: {
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      reference: "John 3:16",
      translation: "NIV",
    },
  },
  {
    bengali: {
      text: "আমি সবকিছু করতে পারি তাঁর মাধ্যমে যিনি আমাকে শক্তি দেন।",
      reference: "ফিলিপীয় ৪:১৩",
    },
    hindi: {
      text: "जो मुझे सामर्थ्य देता है उसमें मैं सब कुछ कर सकता हूँ।",
      reference: "फिलिप्पियों 4:13",
    },
    english: {
      text: "I can do all things through Christ who strengthens me.",
      reference: "Philippians 4:13",
      translation: "NKJV",
    },
  },
  {
    bengali: {
      text: "প্রভু আমার রাখাল, আমার অভাব হবে না।",
      reference: "গীতসংহিতা ২৩:১",
    },
    hindi: {
      text: "यहोवा मेरा चरवाहा है, मुझे कुछ घटी न होगी।",
      reference: "भजन संहिता 23:1",
    },
    english: {
      text: "The Lord is my shepherd; I shall not want.",
      reference: "Psalm 23:1",
      translation: "KJV",
    },
  },
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

// Available translations
const translations = [
  { value: "esv", label: "English Standard Version (ESV)" },
  { value: "kjv", label: "King James Version (KJV)" },
  { value: "niv", label: "New International Version (NIV)" },
  { value: "nlt", label: "New Living Translation (NLT)" },
  { value: "amp", label: "Amplified Bible (AMP)" },
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

export function BibleVerse() {
  const { language } = useLanguage()
  const [verse, setVerse] = useState<BibleVerseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [reference, setReference] = useState(getTodaysVerseReference())
  const [translation, setTranslation] = useState("esv")

  const fetchVerse = async () => {
    setLoading(true)
    setIsUsingFallback(false)

    try {
      // Check if we have the verse in localStorage and it's from today with the same translation
      const cachedVerseData = localStorage.getItem(`bibleVerse-${translation}`)
      const cachedDate = localStorage.getItem(`bibleVerseDate-${translation}`)
      const today = new Date().toDateString()

      if (cachedVerseData && cachedDate === today) {
        const parsedData = JSON.parse(cachedVerseData)
        setVerse(parsedData)
        setIsUsingFallback(parsedData.source === "fallback")
        setLoading(false)
        return
      }

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
      localStorage.setItem(`bibleVerseDate-${translation}`, today)

      setVerse(verseData)
    } catch (err) {
      console.error("Failed to fetch Bible verse:", err)

      // Use a random fallback verse
      const fallbackIndex = Math.floor(Math.random() * fallbackVerses.length)
      setVerse(fallbackVerses[fallbackIndex])
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
    // Get a random verse reference
    const randomIndex = Math.floor(Math.random() * verseReferences.length)
    setReference(verseReferences[randomIndex])
  }

  const handleTranslationChange = (value: string) => {
    setTranslation(value)
  }

  if (loading) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-4 w-1/4 ml-auto" />
        </CardContent>
      </Card>
    )
  }

  if (!verse) return null

  const currentVerse = verse[language]

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {isUsingFallback && (
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
      )}

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {language === "english" ? "Verse of the Day" : language === "hindi" ? "आज का वचन" : "আজকের বাক্য"}
            </h3>
            <div className="flex items-center gap-2">
              {language === "english" && (
                <Select value={translation} onValueChange={handleTranslationChange}>
                  <SelectTrigger className="w-[180px]">
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
              <Button variant="ghost" size="sm" onClick={handleRefresh} className="flex items-center gap-1">
                <RefreshCw size={14} />
                <span className="sr-only">Refresh</span>
              </Button>
            </div>
          </div>
          <p className="text-xl mb-4 italic">{currentVerse.text}</p>
          <div className="flex justify-between items-center">
            <p className="font-semibold">{currentVerse.reference}</p>
            {language === "english" && currentVerse.translation && (
              <p className="text-sm text-slate-500">{currentVerse.translation}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
