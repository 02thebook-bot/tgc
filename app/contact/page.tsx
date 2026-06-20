import { PrayerRequestForm } from "@/components/prayer-request-form"
import { PastorContact } from "@/components/pastor-contact"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <PastorContact />

        <div>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Prayer Request</h2>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              We would be honored to pray for you. Please fill out the form below with your prayer request.
            </p>
            <PrayerRequestForm />
          </div>
        </div>
      </div>
    </div>
  )
}
