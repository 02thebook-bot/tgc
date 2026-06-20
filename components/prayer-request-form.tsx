"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formLabels = {
  bengali: {
    name: "নাম",
    believer: "আপনি কি বিশ্বাসী?",
    yes: "হ্যাঁ",
    no: "না",
    churchName: "চার্চের নাম",
    pastorName: "পাস্টরের নাম",
    refName: "রেফারেন্স নাম",
    prayerContent: "প্রার্থনার বিষয়",
    contact: "যোগাযোগ নম্বর",
    email: "ইমেইল",
    submit: "জমা দিন",
    placeholder: "আপনার প্রার্থনার অনুরোধ এখানে লিখুন...",
    success: "আপনার প্রার্থনার অনুরোধ সফলভাবে জমা দেওয়া হয়েছে!",
  },
  hindi: {
    name: "नाम",
    believer: "क्या आप विश्वासी हैं?",
    yes: "हां",
    no: "नहीं",
    churchName: "चर्च का नाम",
    pastorName: "पास्टर का नाम",
    refName: "संदर्भ नाम",
    prayerContent: "प्रार्थना का विषय",
    contact: "संपर्क नंबर",
    email: "ईमेल",
    submit: "जमा करें",
    placeholder: "अपना प्रार्थना अनुरोध यहां लिखें...",
    success: "आपका प्रार्थना अनुरोध सफलतापूर्वक जमा किया गया है!",
  },
  english: {
    name: "Name",
    believer: "Are you a believer?",
    yes: "Yes",
    no: "No",
    churchName: "Church Name",
    pastorName: "Pastor Name",
    refName: "Reference Name",
    prayerContent: "Prayer Content",
    contact: "Contact Number",
    email: "Email",
    submit: "Submit",
    placeholder: "Write your prayer request here...",
    success: "Your prayer request has been submitted successfully!",
  },
}

export function PrayerRequestForm() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const labels = formLabels[language]

  const [isBeliever, setIsBeliever] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    churchName: "",
    pastorName: "",
    refName: "",
    prayerContent: "",
    contact: "",
    email: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: labels.success,
        description: new Date().toLocaleString(),
      })

      setFormData({
        name: "",
        churchName: "",
        pastorName: "",
        refName: "",
        prayerContent: "",
        contact: "",
        email: "",
      })
      setIsBeliever(null)

      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">{labels.name}</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="believer">{labels.believer}</Label>
        <Select value={isBeliever || ""} onValueChange={setIsBeliever}>
          <SelectTrigger>
            <SelectValue placeholder={labels.believer} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">{labels.yes}</SelectItem>
            <SelectItem value="no">{labels.no}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isBeliever === "yes" && (
        <>
          <div>
            <Label htmlFor="churchName">{labels.churchName}</Label>
            <Input id="churchName" name="churchName" value={formData.churchName} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="pastorName">{labels.pastorName}</Label>
            <Input id="pastorName" name="pastorName" value={formData.pastorName} onChange={handleChange} required />
          </div>
        </>
      )}

      {isBeliever === "no" && (
        <div>
          <Label htmlFor="refName">{labels.refName}</Label>
          <Input id="refName" name="refName" value={formData.refName} onChange={handleChange} required />
        </div>
      )}

      <div>
        <Label htmlFor="prayerContent">{labels.prayerContent}</Label>
        <Textarea
          id="prayerContent"
          name="prayerContent"
          value={formData.prayerContent}
          onChange={handleChange}
          placeholder={labels.placeholder}
          rows={5}
          required
        />
      </div>

      <div>
        <Label htmlFor="contact">{labels.contact}</Label>
        <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="email">{labels.email}</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting || !isBeliever}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {labels.submit}...
          </span>
        ) : (
          labels.submit
        )}
      </Button>
    </form>
  )
}
