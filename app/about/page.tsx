import { ChurchHistory } from "@/components/church-history"
import { ChurchGallery } from "@/components/church-gallery"
import { ChurchLeadership } from "@/components/church-leadership"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">About The Glorious Church</h1>

      <ChurchHistory />

      <ChurchLeadership />

      <ChurchGallery />
    </div>
  )
}
