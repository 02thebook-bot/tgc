"use client"

import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"

const content = {
  english: {
    heading: "Gallery",
    subtitle: "Moments of worship, fellowship, and celebration in our church family.",
    images: [
      { src: "/gallery/worship-service.png", alt: "Congregation worshipping during Sunday service", label: "Sunday Worship" },
      { src: "/gallery/fellowship.png", alt: "Church community sharing a fellowship meal", label: "Fellowship Meal" },
      { src: "/gallery/baptism.png", alt: "Riverside baptism ceremony", label: "Baptism Service" },
    ],
  },
  hindi: {
    heading: "गैलरी",
    subtitle: "हमारे चर्च परिवार में आराधना, संगति और उत्सव के क्षण।",
    images: [
      { src: "/gallery/worship-service.png", alt: "रविवार की सेवा के दौरान आराधना करती मंडली", label: "रविवार आराधना" },
      { src: "/gallery/fellowship.png", alt: "संगति भोज साझा करता चर्च समुदाय", label: "संगति भोज" },
      { src: "/gallery/baptism.png", alt: "नदी किनारे बपतिस्मा समारोह", label: "बपतिस्मा सेवा" },
    ],
  },
  bengali: {
    heading: "গ্যালারি",
    subtitle: "আমাদের চার্চ পরিবারে আরাধনা, সহভাগিতা এবং উদযাপনের মুহূর্ত।",
    images: [
      { src: "/gallery/worship-service.png", alt: "রবিবারের সেবার সময় আরাধনারত মণ্ডলী", label: "রবিবারের আরাধনা" },
      { src: "/gallery/fellowship.png", alt: "সহভাগিতার ভোজ ভাগ করে নেওয়া চার্চ সম্প্রদায়", label: "সহভাগিতার ভোজ" },
      { src: "/gallery/baptism.png", alt: "নদীতীরে বাপ্তিস্ম অনুষ্ঠান", label: "বাপ্তিস্ম সেবা" },
    ],
  },
}

export function HomeGallery() {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {c.images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg overflow-hidden shadow-md group bg-card"
          >
            <div className="overflow-hidden">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="px-4 py-3 border-t">
              <p className="text-center text-sm font-medium text-foreground">{image.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
