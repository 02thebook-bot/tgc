"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const formLabels = {
  bengali: {
    name: "নাম",
    content: "সাক্ষ্য",
    contact: "যোগাযোগ নম্বর",
    email: "ইমেইল",
    submit: "জমা দিন",
    placeholder: "আপনার সাক্ষ্য এখানে লিখুন...",
    success: "আপনার সাক্ষ্য সফলভাবে জমা দেওয়া হয়েছে!",
  },
  hindi: {
    name: "नाम",
    content: "गवाही",
    contact: "संपर्क नंबर",
    email: "ईमेल",
    submit: "जमा करें",
    placeholder: "अपनी गवाही यहां लिखें...",
    success: "आपकी गवाही सफलतापूर्वक जमा की गई है!",
  },
  english: {
    name: "Name",
    content: "Testimony",
    contact: "Contact Number",
    email: "Email",
    submit: "Submit",
    placeholder: "Write your testimony here...",
    success: "Your testimony has been submitted successfully!",
  },
}

export function TestimonyForm() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const labels = formLabels[language]

  const [formData, setFormData] = useState({
    name: "",
    content: "",
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
        content: "",
        contact: "",
        email: "",
      })

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
        <Label htmlFor="content">{labels.content}</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
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
