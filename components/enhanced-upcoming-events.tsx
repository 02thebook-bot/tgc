"use client"

import { useLanguage } from "./language-provider"
import { EnhancedEventCard } from "./enhanced-event-card"
import { motion } from "framer-motion"

const events = {
  bengali: [
    {
      title: "রবিবারের আরাধনা",
      date: "প্রতি রবিবার",
      time: "সকাল ১০:০০",
      location: "মূল চার্চ হল",
      description: "সাপ্তাহিক আরাধনা সেবা সমস্ত বয়সের জন্য।",
    },
    {
      title: "বাইবেল অধ্যয়ন",
      date: "প্রতি বুধবার",
      time: "সন্ধ্যা ৭:০০",
      location: "ফেলোশিপ হল",
      description: "সাপ্তাহিক বাইবেল অধ্যয়ন এবং আলোচনা।",
    },
    {
      title: "যুব সভা",
      date: "প্রতি শুক্রবার",
      time: "সন্ধ্যা ৬:০০",
      location: "যুব কেন্দ্র",
      description: "যুবকদের জন্য ফেলোশিপ, খেলাধুলা এবং বাইবেল অধ্যয়ন।",
    },
  ],
  hindi: [
    {
      title: "रविवार की आराधना",
      date: "हर रविवार",
      time: "सुबह 10:00",
      location: "मुख्य चर्च हॉल",
      description: "सभी उम्र के लिए साप्ताहिक आराधना सेवा।",
    },
    {
      title: "बाइबिल अध्ययन",
      date: "हर बुधवार",
      time: "शाम 7:00",
      location: "फेलोशिप हॉल",
      description: "साप्ताहिक बाइबिल अध्ययन और चर्चा।",
    },
    {
      title: "युवा सभा",
      date: "हर शुक्रवार",
      time: "शाम 6:00",
      location: "युवा केंद्र",
      description: "युवाओं के लिए फेलोशिप, खेल और बाइबिल अध्ययन।",
    },
  ],
  english: [
    {
      title: "Sunday Worship",
      date: "Every Sunday",
      time: "10:00 AM",
      location: "Main Church Hall",
      description: "Weekly worship service for all ages.",
    },
    {
      title: "Bible Study",
      date: "Every Wednesday",
      time: "7:00 PM",
      location: "Fellowship Hall",
      description: "Weekly Bible study and discussion.",
    },
    {
      title: "Youth Meeting",
      date: "Every Friday",
      time: "6:00 PM",
      location: "Youth Center",
      description: "Fellowship, games, and Bible study for youth.",
    },
  ],
}

export function EnhancedUpcomingEvents() {
  const { language } = useLanguage()
  const currentEvents = events[language]

  return (
    <section className="my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold mb-4 gradient-text">
          {language === "english" ? "Upcoming Events" : language === "hindi" ? "आगामी कार्यक्रम" : "আসন্ন অনুষ্ঠান"}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {language === "english"
            ? "Join us for these upcoming events and grow in your faith journey."
            : language === "hindi"
              ? "इन आगामी कार्यक्रमों में हमारे साथ जुड़ें और अपनी विश्वास यात्रा में बढ़ें।"
              : "এই আসন্ন অনুষ্ঠানগুলিতে আমাদের সাথে যোগ দিন এবং আপনার বিশ্বাসের যাত্রায় বৃদ্ধি পান।"}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentEvents.map((event, index) => (
          <EnhancedEventCard
            key={index}
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            description={event.description}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
