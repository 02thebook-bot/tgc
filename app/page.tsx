"use client"

import { EnhancedBibleVerse } from "@/components/enhanced-bible-verse"
import { ChurchDescription } from "@/components/church-description"
import { EnhancedUpcomingEvents } from "@/components/enhanced-upcoming-events"
import { DailyDevotional } from "@/components/daily-devotional"
import { PreviousTeachings } from "@/components/previous-teachings"
import { HomeGallery } from "@/components/home-gallery"
import { HeroSection } from "@/components/hero-section"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div>
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ChurchDescription />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Bible Verse of the Day</h2>
          <EnhancedBibleVerse />
        </motion.section>

        <DailyDevotional />

        <EnhancedUpcomingEvents />

        <PreviousTeachings />

        <HomeGallery />
      </div>
    </div>
  )
}
