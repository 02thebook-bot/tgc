"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"

const descriptions = {
  bengali: {
    title: "মাহেশপুর চার্চে স্বাগতম",
    content:
      "মাহেশপুর চার্চ একটি আধ্যাত্মিক সম্প্রদায় যেখানে আমরা ঈশ্বরের বাক্য শিক্ষা দেই, প্রার্থনা করি এবং একসাথে উপাসনা করি। আমাদের লক্ষ্য হল খ্রিস্টের ভালবাসা ছড়িয়ে দেওয়া এবং সমাজে ইতিবাচক প্রভাব ফেলা। আমরা বিশ্বাস করি যে প্রত্যেক ব্যক্তির জীবনে ঈশ্বরের একটি উদ্দেশ্য আছে এবং আমরা সেই উদ্দেশ্য আবিষ্কার করতে এবং পূরণ করতে সাহায্য করতে চাই।",
  },
  hindi: {
    title: "माहेशपुर चर्च में आपका स्वागत है",
    content:
      "माहेशपुर चर्च एक आध्यात्मिक समुदाय है जहां हम परमेश्वर के वचन को सिखाते हैं, प्रार्थना करते हैं और एक साथ आराधना करते हैं। हमारा लक्ष्य मसीह के प्रेम को फैलाना और समाज पर सकारात्मक प्रभाव डालना है। हम विश्वास करते हैं कि परमेश्वर के पास हर व्यक्ति के जीवन के लिए एक उद्देश्य है और हम उस उद्देश्य को खोजने और पूरा करने में मदद करना चाहते हैं।",
  },
  english: {
    title: "Welcome to the glorious church",
    content:
      "Maheshpur Church is a spiritual community where we teach God's word, pray, and worship together. Our goal is to spread Christ's love and make a positive impact in society. We believe that God has a purpose for every individual's life, and we want to help discover and fulfill that purpose.",
  },
}

export function ChurchDescription() {
  const { language } = useLanguage()
  const content = descriptions[language]

  return (
    <section className="my-12">
      <Card className="bg-slate-50 dark:bg-slate-900">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">{content.title}</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">{content.content}</p>
        </CardContent>
      </Card>
    </section>
  )
}
