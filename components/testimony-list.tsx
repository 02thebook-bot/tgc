"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

// Sample testimonies
const testimonies = {
  bengali: [
    {
      id: 1,
      name: "রাজেশ দাস",
      content:
        "আমি যখন অসুস্থ ছিলাম, চার্চের সদস্যরা আমার জন্য প্রার্থনা করেছিল এবং আমি আশ্চর্যজনকভাবে সুস্থ হয়ে উঠেছি। ঈশ্বরের মহিমা হোক!",
      date: new Date(2023, 10, 15),
    },
    {
      id: 2,
      name: "সুমিতা রায়",
      content:
        "আমি যখন আমার চাকরি হারিয়েছিলাম, আমি হতাশ হয়ে পড়েছিলাম। কিন্তু চার্চের সমর্থন এবং প্রার্থনার মাধ্যমে, আমি একটি নতুন এবং আরও ভাল চাকরি পেয়েছি।",
      date: new Date(2023, 9, 20),
    },
  ],
  hindi: [
    {
      id: 1,
      name: "राजेश दास",
      content: "जब मैं बीमार था, चर्च के सदस्यों ने मेरे लिए प्रार्थना की और मैं चमत्कारिक रूप से ठीक हो गया। परमेश्वर की महिमा हो!",
      date: new Date(2023, 10, 15),
    },
    {
      id: 2,
      name: "सुमिता राय",
      content:
        "जब मैंने अपनी नौकरी खो दी थी, मैं निराश हो गया था। लेकिन चर्च के समर्थन और प्रार्थना के माध्यम से, मुझे एक नई और बेहतर नौकरी मिल गई।",
      date: new Date(2023, 9, 20),
    },
  ],
  english: [
    {
      id: 1,
      name: "Rajesh Das",
      content: "When I was sick, the church members prayed for me and I was miraculously healed. Glory to God!",
      date: new Date(2023, 10, 15),
    },
    {
      id: 2,
      name: "Sumita Ray",
      content:
        "When I lost my job, I was devastated. But through the support and prayers of the church, I found a new and better job.",
      date: new Date(2023, 9, 20),
    },
  ],
}

export function TestimonyList() {
  const { language } = useLanguage()
  const currentTestimonies = testimonies[language]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        {language === "english" ? "Recent Testimonies" : language === "hindi" ? "हाल की गवाहियां" : "সাম্প্রতিক সাক্ষ্য"}
      </h2>

      {currentTestimonies.map((testimony) => (
        <Card key={testimony.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{testimony.name}</h3>
              <span className="text-sm text-slate-500">{formatDistanceToNow(testimony.date, { addSuffix: true })}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{testimony.content}</p>
          </CardContent>
        </Card>
      ))}

      {currentTestimonies.length === 0 && (
        <p className="text-center text-slate-500 py-8">
          {language === "english"
            ? "No testimonies yet. Be the first to share!"
            : language === "hindi"
              ? "अभी तक कोई गवाही नहीं। साझा करने वाले पहले व्यक्ति बनें!"
              : "এখনও কোন সাক্ষ্য নেই। প্রথম শেয়ার করুন!"}
        </p>
      )}
    </div>
  )
}
