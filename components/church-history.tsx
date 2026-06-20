"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"

const history = {
  bengali: {
    title: "আমাদের ইতিহাস",
    content:
      "মাহেশপুর চার্চের যাত্রা শুরু হয়েছিল ১৯৮৫ সালে, যখন একটি ছোট বিশ্বাসী গোষ্ঠী একটি ছোট বাড়িতে প্রার্থনা করার জন্য একত্রিত হয়েছিল। বছরের পর বছর ধরে, সম্প্রদায় বৃদ্ধি পেয়েছে এবং ২০০০ সালে আমরা আমাদের বর্তমান চার্চ ভবন নির্মাণ করেছি। আমাদের মিশন হল খ্রিস্টের ভালবাসা ছড়িয়ে দেওয়া এবং সমাজে ইতিবাচক প্রভাব ফেলা।",
  },
  hindi: {
    title: "हमारा इतिहास",
    content:
      "माहेशपुर चर्च की यात्रा 1985 में शुरू हुई थी, जब विश्वासियों का एक छोटा समूह एक छोटे घर में प्रार्थना करने के लिए इकट्ठा हुआ था। वर्षों के दौरान, समुदाय बढ़ता गया और 2000 में हमने अपने वर्तमान चर्च भवन का निर्माण किया। हमारा मिशन मसीह के प्रेम को फैलाना और समाज पर सकारात्मक प्रभाव डालना है।",
  },
  english: {
    title: "Our History",
    content:
      "The journey of Maheshpur Church began in 1985, when a small group of believers gathered to pray in a small house. Over the years, the community grew and in 2000 we constructed our current church building. Our mission is to spread Christ's love and make a positive impact in society.",
  },
}

export function ChurchHistory() {
  const { language } = useLanguage()
  const content = history[language]

  return (
    <section className="my-12">
      <h2 className="text-2xl font-semibold mb-6">{content.title}</h2>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-600 dark:text-slate-300">{content.content}</p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Church History"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
