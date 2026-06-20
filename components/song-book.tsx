"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "./language-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

// Sample songs for demonstration
const songs = [
  {
    id: 1,
    bengali: {
      title: "প্রভু আমার রাখাল",
      lyrics: "প্রভু আমার রাখাল, আমার অভাব হবে না।\nতিনি আমাকে সবুজ ঘাসের মাঠে শুইয়ে দেন,\nতিনি আমাকে শান্তির জলের কাছে নিয়ে যান।",
    },
    hindi: {
      title: "यहोवा मेरा चरवाहा",
      lyrics:
        "यहोवा मेरा चरवाहा है, मुझे कुछ घटी न होगी।\nवह मुझे हरी हरी चराइयों में बैठाता है;\nवह मुझे सुखदाई जल के झरने के पास ले चलता है।",
    },
    english: {
      title: "The Lord is My Shepherd",
      lyrics:
        "The Lord is my shepherd; I shall not want.\nHe makes me lie down in green pastures.\nHe leads me beside still waters.",
    },
  },
  {
    id: 2,
    bengali: {
      title: "ঈশ্বরের ভালবাসা",
      lyrics:
        "ঈশ্বরের ভালবাসা কত মহান,\nতাঁর করুণা অনন্তকাল স্থায়ী।\nতিনি আমাদের পাপ থেকে মুক্ত করেছেন,\nতাঁর পুত্রের মাধ্যমে আমাদের উদ্ধার করেছেন।",
    },
    hindi: {
      title: "परमेश्वर का प्रेम",
      lyrics:
        "परमेश्वर का प्रेम कितना महान है,\nउसकी करुणा अनंतकाल तक है।\nउसने हमें पाप से मुक्त किया है,\nअपने पुत्र के द्वारा हमें उद्धार दिया है।",
    },
    english: {
      title: "God's Love",
      lyrics:
        "How great is the love of God,\nHis mercy endures forever.\nHe has freed us from sin,\nSaved us through His Son.",
    },
  },
  {
    id: 3,
    bengali: {
      title: "ধন্যবাদ দাও",
      lyrics: "ধন্যবাদ দাও প্রভুকে, কারণ তিনি ভাল।\nতাঁর করুণা চিরকাল স্থায়ী।\nতিনি আমাদের সৃষ্টি করেছেন,\nতিনি আমাদের রক্ষা করেন।",
    },
    hindi: {
      title: "धन्यवाद दो",
      lyrics: "धन्यवाद दो प्रभु को, क्योंकि वह भला है।\nउसकी करुणा सदा के लिए है।\nउसने हमें बनाया है,\nवह हमारी रक्षा करता है।",
    },
    english: {
      title: "Give Thanks",
      lyrics:
        "Give thanks to the Lord, for He is good.\nHis mercy endures forever.\nHe has created us,\nHe protects us.",
    },
  },
  {
    id: 4,
    bengali: {
      title: "আমার হৃদয় তোমার",
      lyrics: "আমার হৃদয় তোমার, প্রভু\nআমার জীবন তোমার হাতে\nতোমার ইচ্ছা পূর্ণ হোক আমার মধ্যে\nআমি তোমার দাস।",
    },
    hindi: {
      title: "मेरा हृदय तेरा है",
      lyrics: "मेरा हृदय तेरा है, प्रभु\nमेरा जीवन तेरे हाथों में\nतेरी इच्छा पूरी हो मुझमें\nमैं तेरा दास हूँ।",
    },
    english: {
      title: "My Heart is Yours",
      lyrics: "My heart is Yours, Lord\nMy life is in Your hands\nMay Your will be done in me\nI am Your servant.",
    },
  },
  {
    id: 5,
    bengali: {
      title: "আনন্দের গান",
      lyrics: "আনন্দের গান গাও প্রভুর উদ্দেশ্যে\nতাঁর প্রশংসা করো সমস্ত পৃথিবী\nতিনি মহান, তিনি শক্তিশালী\nতাঁর নাম উচ্চ করো।",
    },
    hindi: {
      title: "आनंद का गीत",
      lyrics: "आनंद का गीत गाओ प्रभु के लिए\nउसकी स्तुति करो सारी पृथ्वी\nवह महान है, वह शक्तिशाली है\nउसका नाम ऊंचा करो।",
    },
    english: {
      title: "Song of Joy",
      lyrics: "Sing a song of joy to the Lord\nPraise Him all the earth\nHe is great, He is mighty\nLift up His name.",
    },
  },
]

interface SongBookProps {
  searchTerm?: string
  sortAlphabetically?: boolean
}

export function SongBook({ searchTerm = "", sortAlphabetically = true }: SongBookProps) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState(language)

  // Filter and sort songs based on search term and sort preference
  const processedSongs = useMemo(() => {
    // Filter songs by search term
    const filtered = songs.filter((song) => {
      const title = song[activeTab as keyof typeof song]?.title.toLowerCase() || ""
      return title.includes(searchTerm.toLowerCase())
    })

    // Sort songs alphabetically if enabled
    if (sortAlphabetically) {
      return [...filtered].sort((a, b) => {
        const titleA = a[activeTab as keyof typeof a]?.title || ""
        const titleB = b[activeTab as keyof typeof b]?.title || ""
        return titleA.localeCompare(titleB)
      })
    }

    return filtered
  }, [activeTab, searchTerm, sortAlphabetically])

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue={language} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="bengali">Bengali</TabsTrigger>
          <TabsTrigger value="hindi">Hindi</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>

        {["bengali", "hindi", "english"].map((lang) => (
          <TabsContent key={lang} value={lang} className="space-y-6">
            {processedSongs.length > 0 ? (
              processedSongs.map((song) => (
                <Card key={song.id}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{song[lang as keyof typeof song]?.title}</h3>
                    <div className="whitespace-pre-line">{song[lang as keyof typeof song]?.lyrics}</div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">
                {language === "english"
                  ? "No songs found. Try a different search term."
                  : language === "hindi"
                    ? "कोई गाना नहीं मिला। कोई अलग खोज शब्द आज़माएं।"
                    : "কোন গান পাওয়া যায়নি। অন্য একটি অনুসন্ধান শব্দ চেষ্টা করুন।"}
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
