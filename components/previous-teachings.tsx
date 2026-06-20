"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Calendar, Headphones } from "lucide-react"
import { motion } from "framer-motion"

// EDIT THESE: paste the audio link for each teaching (podcast, mp3, YouTube, etc.).
// They open in a new tab when the audio button is clicked. Order matches the teachings below.
const teachingAudioUrls = ["#", "#", "#"]

const content = {
  english: {
    heading: "Previous Teachings",
    subtitle: "Revisit past messages and grow deeper in the Word.",
    listenLabel: "Listen to Audio",
    teachings: [
      {
        title: "Living by Faith, Not by Sight",
        speaker: "Pastor John",
        date: "June 8, 2026",
        image: "/teachings/sermon-faith.png",
      },
      {
        title: "The Power of Persistent Prayer",
        speaker: "Pastor John",
        date: "June 1, 2026",
        image: "/teachings/sermon-prayer.png",
      },
      {
        title: "Hope That Anchors the Soul",
        speaker: "Pastor John",
        date: "May 25, 2026",
        image: "/teachings/sermon-hope.png",
      },
    ],
  },
  hindi: {
    heading: "पिछली शिक्षाएँ",
    subtitle: "पिछले संदेशों को फिर से देखें और वचन में गहराई तक बढ़ें।",
    listenLabel: "ऑडियो सुनें",
    teachings: [
      {
        title: "विश्वास से जीना, दृष्टि से नहीं",
        speaker: "पास्टर जॉन",
        date: "8 जून, 2026",
        image: "/teachings/sermon-faith.png",
      },
      {
        title: "निरंतर प्रार्थना की शक्ति",
        speaker: "पास्टर जॉन",
        date: "1 जून, 2026",
        image: "/teachings/sermon-prayer.png",
      },
      {
        title: "आशा जो आत्मा को स्थिर करती है",
        speaker: "पास्टर जॉन",
        date: "25 मई, 2026",
        image: "/teachings/sermon-hope.png",
      },
    ],
  },
  bengali: {
    heading: "পূর্ববর্তী শিক্ষা",
    subtitle: "অতীতের বার্তাগুলি আবার দেখুন এবং বাক্যে আরও গভীরে বৃদ্ধি পান।",
    listenLabel: "অডিও শুনুন",
    teachings: [
      {
        title: "বিশ্বাসে চলা, দৃষ্টিতে নয়",
        speaker: "পাস্টর জন",
        date: "৮ জুন, ২০২৬",
        image: "/teachings/sermon-faith.png",
      },
      {
        title: "অবিরাম প্রার্থনার শক্তি",
        speaker: "পাস্টর জন",
        date: "১ জুন, ২০২৬",
        image: "/teachings/sermon-prayer.png",
      },
      {
        title: "আশা যা আত্মাকে স্থির করে",
        speaker: "পাস্টর জন",
        date: "২৫ মে, ২০২৬",
        image: "/teachings/sermon-hope.png",
      },
    ],
  },
}

export function PreviousTeachings() {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {c.teachings.map((teaching, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="card-hover overflow-hidden h-full group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={teaching.image || "/placeholder.svg"}
                  alt={teaching.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-2">{teaching.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{teaching.speaker}</p>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                  <Calendar size={14} className="text-worship-purple" />
                  <span>{teaching.date}</span>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-primary hover:bg-primary-700 text-primary-foreground"
                >
                  <a href={teachingAudioUrls[index] || "#"} target="_blank" rel="noopener noreferrer">
                    <Headphones className="mr-2 h-5 w-5" />
                    {c.listenLabel}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
