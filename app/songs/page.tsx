"use client"

import { useState } from "react"
import { SongBook } from "@/components/song-book"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SortAsc } from "lucide-react"

export default function SongsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortAlphabetically, setSortAlphabetically] = useState(true)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Songs Book</h1>

      <div className="mb-8 max-w-3xl mx-auto text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Our trilingual song book contains worship songs in Bengali, Hindi, and English. Use the language tabs to
          switch between languages.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <Input
              type="text"
              placeholder="Search songs..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setSortAlphabetically(!sortAlphabetically)}
          >
            <SortAsc size={18} />
            <span>{sortAlphabetically ? "A-Z Sorting" : "Default Order"}</span>
          </Button>
        </div>
      </div>

      <SongBook searchTerm={searchTerm} sortAlphabetically={sortAlphabetically} />
    </div>
  )
}
