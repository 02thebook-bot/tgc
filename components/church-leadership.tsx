"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"

const leadership = {
  bengali: {
    title: "চার্চ নেতৃত্ব",
    leaders: [
      {
        name: "পাস্টর রবিন দাস",
        role: "সিনিয়র পাস্টর",
        bio: "পাস্টর রবিন দাস ২০০৫ সাল থেকে মাহেশপুর চার্চের সিনিয়র পাস্টর হিসেবে সেবা করছেন।",
      },
      {
        name: "সুনীল রায়",
        role: "এল্ডার",
        bio: "সুনীল রায় ১৯৯০ সাল থেকে চার্চের সাথে যুক্ত আছেন এবং ২০১০ সাল থেকে এল্ডার হিসেবে সেবা করছেন।",
      },
      {
        name: "প্রিয়া সেন",
        role: "যুব মিনিস্ট্রি লিডার",
        bio: "প্রিয়া সেন চার্চের যুব মিনিস্ট্রি পরিচালনা করেন এবং তরুণদের আধ্যাত্মিক বৃদ্ধিতে সাহায্য করেন।",
      },
    ],
  },
  hindi: {
    title: "चर्च नेतृत्व",
    leaders: [
      {
        name: "पास्टर रॉबिन दास",
        role: "वरिष्ठ पास्टर",
        bio: "पास्टर रॉबिन दास 2005 से माहेशपुर चर्च के वरिष्ठ पास्टर के रूप में सेवा कर रहे हैं।",
      },
      {
        name: "सुनील राय",
        role: "एल्डर",
        bio: "सुनील राय 1990 से चर्च से जुड़े हुए हैं और 2010 से एल्डर के रूप में सेवा कर रहे हैं।",
      },
      {
        name: "प्रिया सेन",
        role: "युवा मंत्रालय नेता",
        bio: "प्रिया सेन चर्च की युवा मंत्रालय का नेतृत्व करती हैं और युवाओं को आध्यात्मिक विकास में मदद करती हैं।",
      },
    ],
  },
  english: {
    title: "Church Leadership",
    leaders: [
      {
        name: "Pastor Robin Das",
        role: "Senior Pastor",
        bio: "Pastor Robin Das has been serving as the Senior Pastor of Maheshpur Church since 2005.",
      },
      {
        name: "Sunil Ray",
        role: "Elder",
        bio: "Sunil Ray has been associated with the church since 1990 and has been serving as an Elder since 2010.",
      },
      {
        name: "Priya Sen",
        role: "Youth Ministry Leader",
        bio: "Priya Sen leads the church's youth ministry and helps young people grow spiritually.",
      },
    ],
  },
}

export function ChurchLeadership() {
  const { language } = useLanguage()
  const content = leadership[language]

  return (
    <section className="my-12">
      <h2 className="text-2xl font-semibold mb-6">{content.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.leaders.map((leader, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=96&width=96&text=${encodeURIComponent(leader.name)}`}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{leader.name}</h3>
                <p className="text-slate-500 mb-2">{leader.role}</p>
                <p className="text-slate-600 dark:text-slate-300">{leader.bio}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
