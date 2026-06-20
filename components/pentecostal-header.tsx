"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

const translations = {
  bengali: {
    title: "মাহেশপুর পেন্টিকস্টাল চার্চ",
    subtitle: "পবিত্র আত্মার শক্তিতে বিশ্বাস, আরাধনা এবং সেবা",
    cta: "আমাদের সাথে যোগ দিন",
  },
  hindi: {
    title: "माहेशपुर पेंटेकोस्टल चर्च",
    subtitle: "पवित्र आत्मा की शक्ति में विश्वास, आराधना और सेवा",
    cta: "हमसे जुड़ें",
  },
  english: {
    title: "Maheshpur Pentecostal Church",
    subtitle: "Faith, Worship, and Service in the Power of the Holy Spirit",
    cta: "Join Us",
  },
}

export function PentecostalHeader() {
  const { language } = useLanguage()
  const content = translations[language]

  return (
    <section className="relative h-[500px] w-full overflow-hidden rounded-lg mb-12">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 z-10"></div>
      <img src="/pentecostal-background.png" alt="Pentecostal Worship" className="h-full w-full object-cover" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
        <div className="flex justify-center mb-6">
          {/* Stylized flame icons */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-6 h-12 mx-1 rounded-full bg-red-500 origin-bottom`}
              animate={{
                scaleY: [1, 1.2, 1],
                backgroundColor: ["rgb(239, 68, 68)", "rgb(234, 179, 8)", "rgb(239, 68, 68)"],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">{content.subtitle}</p>
        <Link href="/contact">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
            {content.cta}
          </Button>
        </Link>
      </div>
    </section>
  )
}
