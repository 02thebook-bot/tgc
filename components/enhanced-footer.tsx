"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"

const translations = {
  bengali: {
    subscribe: "আমাদের নিউজলেটার সাবস্ক্রাইব করুন",
    subscribeDesc: "সর্বশেষ আপডেট এবং ইভেন্টের জন্য সাইন আপ করুন",
    email: "আপনার ইমেইল",
    signUp: "সাইন আপ",
    quickLinks: "দ্রুত লিঙ্ক",
    contactUs: "যোগাযোগ করুন",
    serviceTime: "সেবার সময়",
    copyright: "সর্বস্বত্ব সংরক্ষিত",
  },
  hindi: {
    subscribe: "हमारे न्यूज़लेटर की सदस्यता लें",
    subscribeDesc: "नवीनतम अपडेट और कार्यक्रमों के लिए साइन अप करें",
    email: "आपका ईमेल",
    signUp: "साइन अप करें",
    quickLinks: "त्वरित लिंक",
    contactUs: "संपर्क करें",
    serviceTime: "सेवा समय",
    copyright: "सर्वाधिकार सुरक्षित",
  },
  english: {
    subscribe: "Subscribe to Our Newsletter",
    subscribeDesc: "Sign up for latest updates and events",
    email: "Your email",
    signUp: "Sign Up",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    serviceTime: "Service Times",
    copyright: "All rights reserved",
  },
}

export function EnhancedFooter() {
  const { language } = useLanguage()
  const content = translations[language]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-t">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 flex justify-center">
                  <div className="w-1.5 h-4 bg-worship-red rounded-full transform origin-bottom animate-flame"></div>
                </div>
              </div>
              <h3 className="text-lg font-semibold gradient-text">The Glorious Church</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              A place of worship, community, and spiritual growth.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-600 hover:text-worship-red dark:text-slate-300 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-600 hover:text-worship-red dark:text-slate-300 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-600 hover:text-worship-red dark:text-slate-300 transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{content.quickLinks}</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Live Testimony", path: "/live-testimony" },
                { name: "Songs", path: "/songs" },
                { name: "Contact", path: "/contact" },
                { name: "About", path: "/about" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-slate-600 hover:text-primary dark:text-slate-300 flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{content.contactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <MapPin size={18} className="mt-1 text-worship-red" />
                <span>123 Church Street, Maheshpur, West Bengal, India</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Phone size={18} className="text-worship-red" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Mail size={18} className="text-worship-red" />
                <span>info@maheshpurchurch.org</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{content.serviceTime}</h3>
            <ul className="space-y-3 text-slate-600 dark:text-slate-300">
              <li>Sunday Worship: 10:00 AM</li>
              <li>Bible Study: Wednesday 7:00 PM</li>
              <li>Prayer Meeting: Friday 6:30 PM</li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">{content.subscribe}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{content.subscribeDesc}</p>
              <div className="flex gap-2">
                <Input placeholder={content.email} className="bg-white dark:bg-slate-800" />
                <Button className="bg-worship-red hover:bg-red-600 text-white">{content.signUp}</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="border-t mt-10 pt-6 text-center text-slate-600 dark:text-slate-300">
          <p>
            &copy; {new Date().getFullYear()} Maheshpur Church. {content.copyright}.
          </p>
        </div>
      </div>
    </footer>
  )
}
