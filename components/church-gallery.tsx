"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"

const gallery = {
  bengali: {
    title: "চার্চ গ্যালারি",
  },
  hindi: {
    title: "चर्च गैलरी",
  },
  english: {
    title: "Church Gallery",
  },
}

export function ChurchGallery() {
  const { language } = useLanguage()
  const content = gallery[language]

  // Sample gallery images
  const images = [
    {
      src: "/placeholder.svg?height=300&width=400&text=Church+Building",
      alt: "Church Building",
    },
    {
      src: "/placeholder.svg?height=300&width=400&text=Sunday+Service",
      alt: "Sunday Service",
    },
    {
      src: "/placeholder.svg?height=300&width=400&text=Youth+Group",
      alt: "Youth Group",
    },
    {
      src: "/placeholder.svg?height=300&width=400&text=Community+Outreach",
      alt: "Community Outreach",
    },
    {
      src: "/placeholder.svg?height=300&width=400&text=Christmas+Celebration",
      alt: "Christmas Celebration",
    },
    {
      src: "/placeholder.svg?height=300&width=400&text=Easter+Service",
      alt: "Easter Service",
    },
  ]

  return (
    <section className="my-12">
      <h2 className="text-2xl font-semibold mb-6">{content.title}</h2>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
