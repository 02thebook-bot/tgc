"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Search } from "lucide-react"

// Sample songs data
const sampleSongs = [
  {
    id: 1,
    title: "Amazing Grace",
    lyrics: "Amazing grace, how sweet the sound\nThat saved a wretch like me...",
    language: "english",
  },
  {
    id: 2,
    title: "How Great Thou Art",
    lyrics: "O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made...",
    language: "english",
  },
 
]

export default function SongsManagementPage() {
  const { toast } = useToast()
  const [songs, setSongs] = useState(sampleSongs)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentSong, setCurrentSong] = useState<any>(null)
  const [newSong, setNewSong] = useState({
    title: "",
    lyrics: "",
    language: "english",
  })

  // Filter songs based on search term and active tab
  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || song.language === activeTab
    return matchesSearch && matchesTab
  })

  // Sort songs alphabetically
  const sortedSongs = [...filteredSongs].sort((a, b) => a.title.localeCompare(b.title))

  const handleAddSong = () => {
    const id = Math.max(0, ...songs.map((s) => s.id)) + 1
    setSongs([...songs, { ...newSong, id }])
    setNewSong({ title: "", lyrics: "", language: "english" })
    setIsAddDialogOpen(false)
    toast({
      title: "Song added",
      description: "The song has been added successfully.",
    })
  }

  const handleEditSong = () => {
    if (!currentSong) return
    setSongs(songs.map((song) => (song.id === currentSong.id ? currentSong : song)))
    setIsEditDialogOpen(false)
    toast({
      title: "Song updated",
      description: "The song has been updated successfully.",
    })
  }

  const handleDeleteSong = () => {
    if (!currentSong) return
    setSongs(songs.filter((song) => song.id !== currentSong.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Song deleted",
      description: "The song has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Songs Management</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Add, edit, and delete songs in Bengali, Hindi, and English.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Search songs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="bengali">Bengali</TabsTrigger>
              <TabsTrigger value="hindi">Hindi</TabsTrigger>
              <TabsTrigger value="english">English</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Song
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Song</DialogTitle>
                <DialogDescription>Add a new song to the song book.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="song-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="song-title"
                    value={newSong.title}
                    onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="song-language" className="text-right">
                    Language
                  </Label>
                  <Select
                    value={newSong.language}
                    onValueChange={(value) => setNewSong({ ...newSong, language: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bengali">Bengali</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="song-lyrics" className="text-right pt-2">
                    Lyrics
                  </Label>
                  <Textarea
                    id="song-lyrics"
                    value={newSong.lyrics}
                    onChange={(e) => setNewSong({ ...newSong, lyrics: e.target.value })}
                    className="col-span-3"
                    rows={10}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSong}>Add Song</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Language</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSongs.length > 0 ? (
                sortedSongs.map((song) => (
                  <TableRow key={song.id}>
                    <TableCell className="font-medium">{song.title}</TableCell>
                    <TableCell className="capitalize">{song.language}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentSong(song)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() => {
                            setCurrentSong(song)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-slate-500">
                    No songs found. Add a new song or try a different search term.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Song Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Song</DialogTitle>
            <DialogDescription>Make changes to the song details.</DialogDescription>
          </DialogHeader>
          {currentSong && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-song-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-song-title"
                  value={currentSong.title}
                  onChange={(e) => setCurrentSong({ ...currentSong, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-song-language" className="text-right">
                  Language
                </Label>
                <Select
                  value={currentSong.language}
                  onValueChange={(value) => setCurrentSong({ ...currentSong, language: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bengali">Bengali</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-song-lyrics" className="text-right pt-2">
                  Lyrics
                </Label>
                <Textarea
                  id="edit-song-lyrics"
                  value={currentSong.lyrics}
                  onChange={(e) => setCurrentSong({ ...currentSong, lyrics: e.target.value })}
                  className="col-span-3"
                  rows={10}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSong}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Song Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Song</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this song? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentSong && (
            <div className="py-4">
              <p className="font-medium">{currentSong.title}</p>
              <p className="text-sm text-slate-500 capitalize">{currentSong.language}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSong}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
