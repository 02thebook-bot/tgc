"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare } from "lucide-react"

const pastorInfo = {
  bengali: {
    name: "পাস্টর রবিন দাস",
    title: "সিনিয়র পাস্টর",
    phone: "+91 9876543210",
    email: "pastor.robin@maheshpurchurch.org",
    chat: "গুগল চ্যাটে যোগাযোগ করুন",
    contactUs: "আমাদের সাথে যোগাযোগ করুন",
    availableAt: "উপলব্ধ: সোমবার - শনিবার, সকাল ৯টা - সন্ধ্যা ৬টা",
  },
  hindi: {
    name: "पास्टर रॉबिन दास",
    title: "वरिष्ठ पास्टर",
    phone: "+91 9876543210",
    email: "pastor.robin@maheshpurchurch.org",
    chat: "गूगल चैट पर संपर्क करें",
    contactUs: "हमसे संपर्क करें",
    availableAt: "उपलब्ध: सोमवार - शनिवार, सुबह 9 बजे - शाम 6 बजे",
  },
  english: {
    name: "Pastor Robin Das",
    title: "Senior Pastor",
    phone: "+91 9876543210",
    email: "pastor.robin@maheshpurchurch.org",
    chat: "Contact on Google Chat",
    contactUs: "Contact Us",
    availableAt: "Available: Monday - Saturday, 9 AM - 6 PM",
  },
}

export function PastorContact() {
  const { language } = useLanguage()
  const info = pastorInfo[language]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{info.contactUs}</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 overflow-hidden">
              <img src="/placeholder.svg?height=96&width=96" alt={info.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-semibold">{info.name}</h3>
            <p className="text-slate-600 dark:text-slate-300">{info.title}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-slate-600 dark:text-slate-300" />
              <span>{info.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={20} className="text-slate-600 dark:text-slate-300" />
              <span>{info.email}</span>
            </div>

            <p className="text-sm text-slate-500">{info.availableAt}</p>

            <Button className="w-full flex items-center gap-2">
              <MessageSquare size={18} />
              {info.chat}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
