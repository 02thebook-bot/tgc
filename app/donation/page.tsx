"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, Copy, Check, Gift } from "lucide-react"

// EDIT THESE: replace with the church's real bank account details.
const ACCOUNT_NAME = "HIOUS CHRISTIAN CENTER"
const ACCOUNT_NUMBER = ""
const BANK_NAME = "ACCESS BANK"
const IFSC_CODE = ""

const translations = {
  english: {
    title: "Support Our Ministry",
    subtitle: "Your generous giving helps us spread the Gospel and serve our community.",
    note: "Please use the account details below to send your offering or donation. Tap the copy icon to copy any value.",
    accountName: "Account Name",
    accountNumber: "Account Number",
    bank: "Bank Name",
    ifsc: "IFSC Code",
    copied: "Copied!",
    back: "Go Back to Home",
    thanks: "Thank you for your kindness and support. God bless you.",
  },
  hindi: {
    title: "हमारी सेवकाई का समर्थन करें",
    subtitle: "आपका उदार दान हमें सुसमाचार फैलाने और समुदाय की सेवा करने में मदद करता है।",
    note: "अपना भेंट या दान भेजने के लिए नीचे दिए गए खाता विवरण का उपयोग करें। किसी भी मान को कॉपी करने के लिए कॉपी आइकन पर टैप करें।",
    accountName: "खाता नाम",
    accountNumber: "खाता संख्या",
    bank: "बैंक का नाम",
    ifsc: "आईएफएससी कोड",
    copied: "कॉपी हो गया!",
    back: "होम पर वापस जाएं",
    thanks: "आपकी दयालुता और समर्थन के लिए धन्यवाद। परमेश्वर आपको आशीष दे।",
  },
  bengali: {
    title: "আমাদের পরিচর্যাকে সমর্থন করুন",
    subtitle: "আপনার উদার দান আমাদের সুসমাচার ছড়িয়ে দিতে এবং সম্প্রদায়ের সেবা করতে সাহায্য করে।",
    note: "আপনার নৈবেদ্য বা দান পাঠাতে নীচের অ্যাকাউন্টের বিবরণ ব্যবহার করুন। যেকোনো মান কপি করতে কপি আইকনে ট্যাপ করুন।",
    accountName: "অ্যাকাউন্টের নাম",
    accountNumber: "অ্যাকাউন্ট নম্বর",
    bank: "ব্যাঙ্কের নাম",
    ifsc: "আইএফএসসি কোড",
    copied: "কপি হয়েছে!",
    back: "হোমে ফিরে যান",
    thanks: "আপনার দয়া ও সমর্থনের জন্য ধন্যবাদ। ঈশ্বর আপনাকে আশীর্বাদ করুন।",
  },
}

export default function DonationPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const fields = [
    { key: "name", label: t.accountName, value: ACCOUNT_NAME },
    { key: "number", label: t.accountNumber, value: ACCOUNT_NUMBER },
    { key: "bank", label: t.bank, value: BANK_NAME },
    { key: "ifsc", label: t.ifsc, value: IFSC_CODE },
  ]

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center py-20">
      {/* Background with overlay - matches the main hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-800/70 to-primary-700/60 z-10" />
      <div className="absolute inset-0 bg-[url('/pentecostal-background.png')] bg-cover bg-center bg-no-repeat" />

      <div className="container relative z-20 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center text-white"
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-worship-gold text-primary-900">
              <Gift className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t.title}</h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">{t.subtitle}</p>

          <Card className="text-left bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-6">{t.note}</p>
              <div className="space-y-4">
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4"
                  >
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{field.label}</p>
                      <p className="text-base font-semibold text-foreground break-all">{field.value}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 gap-1.5"
                      onClick={() => handleCopy(field.key, field.value)}
                      aria-label={`Copy ${field.label}`}
                    >
                      {copiedKey === field.key ? (
                        <>
                          <Check className="h-4 w-4 text-green-600" />
                          {t.copied}
                        </>
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">{t.thanks}</p>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center">
            <Link href="/">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full px-8 py-6 text-lg group bg-worship-gold hover:bg-worship-gold/90 text-primary-900"
              >
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                {t.back}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  )
}
