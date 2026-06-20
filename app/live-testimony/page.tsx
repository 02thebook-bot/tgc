import { TestimonyForm } from "@/components/testimony-form"
import { TestimonyList } from "@/components/testimony-list"

export default function LiveTestimonyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Live Testimonies</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TestimonyList />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Share Your Testimony</h2>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              Your testimony can inspire and strengthen the faith of others. Share how God has worked in your life.
            </p>
            <TestimonyForm />
          </div>
        </div>
      </div>
    </div>
  )
}
