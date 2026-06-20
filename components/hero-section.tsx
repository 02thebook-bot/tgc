"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Music, Heart, BookOpen, Gift } from "lucide-react"
import { useState, useEffect } from "react"

const translations = {
  bengali: {
    title: "মাহেশপুর পেন্টিকস্টাল চার্চ",
    subtitle: "পবিত্র আত্মার শক্তিতে বিশ্বাস, আরাধনা এবং সেবা",
    description:
      "আমাদের সাথে যোগ দিন এবং আপনার আধ্যাত্মিক যাত্রায় বৃদ্ধি পান। আমরা একটি সম্প্রদায় যা ঈশ্বরের ভালবাসা এবং পবিত্র আত্মার শক্তিতে বিশ্বাস করে।",
    worship: "আরাধনা",
    community: "সম্প্রদায়",
    bible: "বাইবেল অধ্যয়ন",
    donation: "দান",
    cta: "আমাদের সাথে যোগ দিন",
  },
  hindi: {
    title: "माहेशपुर पेंटेकोस्टल चर्च",
    subtitle: "पवित्र आत्मा की शक्ति में विश्वास, आराधना और सेवा",
    description:
      "हमारे साथ जुड़ें और अपनी आध्यात्मिक यात्रा में बढ़ें। हम एक समुदाय हैं जो परमेश्वर के प्रेम और पवित्र आत्मा की शक्ति में विश्वास करता है।",
    worship: "आराधना",
    community: "समुदाय",
    bible: "बाइबिल अध्ययन",
    donation: "दान",
    cta: "हमसे जुड़ें",
  },
  english: {
    title: "Maheshpur Pentecostal Church",
    subtitle: "Faith, Worship, and Service in the Power of the Holy Spirit",
    description:
      "Join us and grow in your spiritual journey. We are a community that believes in God's love and the power of the Holy Spirit.",
    worship: "Worship",
    community: "Community",
    bible: "Bible Study",
    donation: "Donation",
    cta: "Join Us",
  },
}

export function HeroSection() {
  const { language } = useLanguage()
  const content = translations[language]

  // Add state for client-side rendering
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true when component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const flameVariants = {
    animate: {
      scaleY: [1, 1.2, 1],
      backgroundColor: ["#FF5A5F", "#FFD700", "#FF5A5F"],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  // Generate random positions for particles
  const generateParticles = () => {
    if (!isMounted) return []

    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 500),
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 20,
    }))
  }

  // Only generate particles on the client side
  const particles = isMounted ? generateParticles() : []

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center py-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-800/70 to-primary-700/60 z-10"></div>
      <div className="absolute inset-0 bg-[url('/pentecostal-background.png')] bg-cover bg-center bg-no-repeat"></div>

      {/* Animated particles - only render on client side */}
      {isMounted && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full bg-worship-gold opacity-60"
              initial={{
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                y: [null, "-100vh"],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6 space-x-2">
            {/* Stylized flame icons */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-6 h-12 rounded-full bg-worship-red"
                variants={flameVariants}
                animate="animate"
                style={{ originY: 1, delay: i * 0.2 }}
              />
            ))}
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-4 leading-tight font-serif">
            {content.title}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-6 text-white/90">
            {content.subtitle}
          </motion.p>

          <motion.p variants={itemVariants} className="text-lg mb-8 max-w-2xl mx-auto text-white/80">
            {content.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Music className="w-5 h-5 mr-2 text-worship-gold" />
              <span>{content.worship}</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Heart className="w-5 h-5 mr-2 text-worship-red" />
              <span>{content.community}</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <BookOpen className="w-5 h-5 mr-2 text-worship-blue" />
              <span>{content.bible}</span>
            </div>
            <Link
              href="/donation"
              className="flex items-center bg-worship-gold/90 hover:bg-worship-gold text-primary-900 font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <Gift className="w-5 h-5 mr-2" />
              <span>{content.donation}</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-worship-red hover:bg-red-600 text-white rounded-full px-8 py-6 text-lg group"
              >
                {content.cta}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-20"></div>
    </section>
  )
}
