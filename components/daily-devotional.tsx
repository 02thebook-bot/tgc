"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const content = {
  english: {
    heading: "Daily Devotional",
    subtitle: "A moment of reflection to begin your day with God.",
    title: "Walking in His Light",
    body: "Each morning is a fresh invitation to trust the Lord. When we surrender our worries and turn our hearts toward Him, He gives us peace that surpasses understanding. Take a quiet moment today to thank God for His faithfulness and to seek His guidance in every step.",
    prayer:
      "Prayer: Lord, lead me by Your light today. Fill my heart with peace and let my words and actions reflect Your love. Amen.",
    label: "Today's Reflection",
  },
  hindi: {
    heading: "दैनिक भक्ति",
    subtitle: "परमेश्वर के साथ अपना दिन शुरू करने के लिए चिंतन का एक क्षण।",
    title: "उसकी ज्योति में चलना",
    body: "हर सुबह प्रभु पर भरोसा करने का एक नया निमंत्रण है। जब हम अपनी चिंताओं को समर्पित करते हैं और अपना हृदय उसकी ओर मोड़ते हैं, तो वह हमें ऐसी शांति देता है जो समझ से परे है। आज एक शांत क्षण लेकर परमेश्वर की विश्वासयोग्यता के लिए धन्यवाद दें।",
    prayer: "प्रार्थना: हे प्रभु, आज मुझे अपनी ज्योति से चला। मेरे हृदय को शांति से भर दे। आमीन।",
    label: "आज का चिंतन",
  },
  bengali: {
    heading: "দৈনিক ভক্তি",
    subtitle: "ঈশ্বরের সাথে আপনার দিন শুরু করার জন্য একটি ধ্যানের মুহূর্ত।",
    title: "তাঁর আলোয় চলা",
    body: "প্রতিটি সকাল প্রভুর উপর বিশ্বাস রাখার এক নতুন আমন্ত্রণ। আমরা যখন আমাদের দুশ্চিন্তা সমর্পণ করি এবং তাঁর দিকে হৃদয় ফেরাই, তখন তিনি আমাদের এমন শান্তি দেন যা বোধের অতীত। আজ একটি শান্ত মুহূর্ত নিয়ে ঈশ্বরের বিশ্বস্ততার জন্য ধন্যবাদ দিন।",
    prayer: "প্রার্থনা: প্রভু, আজ আমাকে তোমার আলোয় পরিচালিত করো। আমার হৃদয় শান্তিতে পূর্ণ করো। আমেন।",
    label: "আজকের ধ্যান",
  },
}

export function DailyDevotional() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <section className="my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold mb-4 gradient-text">{c.heading}</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">{c.subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="max-w-3xl mx-auto card-hover border-t-4 border-t-worship-purple overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-purple-100 text-worship-purple">
                <Sparkles size={18} />
              </div>
              <span className="text-sm font-medium uppercase tracking-wide text-worship-purple">{c.label}</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">{c.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{c.body}</p>
            <p className="italic text-primary-700 dark:text-primary-300 border-l-4 border-worship-gold pl-4">
              {c.prayer}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
