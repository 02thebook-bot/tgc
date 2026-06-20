"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
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
import { Plus, Edit, Trash2 } from "lucide-react"

// Sample leadership data
const sampleLeadership = [
  {
    id: 1,
    name: "Pastor Robin Das",
    role: "Senior Pastor",
    bio: "Pastor Robin Das has been serving as the Senior Pastor of Maheshpur Church since 2005.",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    id: 2,
    name: "Sunil Ray",
    role: "Elder",
    bio: "Sunil Ray has been associated with the church since 1990 and has been serving as an Elder since 2010.",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    id: 3,
    name: "Priya Sen",
    role: "Youth Ministry Leader",
    bio: "Priya Sen leads the church's youth ministry and helps young people grow spiritually.",
    image: "/placeholder.svg?height=96&width=96",
  },
]

export default function LeadershipManagementPage() {
  const { toast } = useToast()
  const [leaders, setLeaders] = useState(sampleLeadership)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentLeader, setCurrentLeader] = useState<any>(null)
  const [newLeader, setNewLeader] = useState({
    name: "",
    role: "",
    bio: "",
    image: "/placeholder.svg?height=96&width=96",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        if (isEdit) {
          setEditImagePreview(result)
          if (currentLeader) {
            setCurrentLeader({ ...currentLeader, image: result })
          }
        } else {
          setImagePreview(result)
          setNewLeader({ ...newLeader, image: result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddLeader = () => {
    const id = Math.max(0, ...leaders.map((l) => l.id)) + 1
    setLeaders([...leaders, { ...newLeader, id }])
    setNewLeader({
      name: "",
      role: "",
      bio: "",
      image: "/placeholder.svg?height=96&width=96",
    })
    setImagePreview(null)
    setIsAddDialogOpen(false)
    toast({
      title: "Leader added",
      description: "The leader has been added successfully.",
    })
  }

  const handleEditLeader = () => {
    if (!currentLeader) return
    setLeaders(leaders.map((leader) => (leader.id === currentLeader.id ? currentLeader : leader)))
    setIsEditDialogOpen(false)
    setEditImagePreview(null)
    toast({
      title: "Leader updated",
      description: "The leader has been updated successfully.",
    })
  }

  const handleDeleteLeader = () => {
    if (!currentLeader) return
    setLeaders(leaders.filter((leader) => leader.id !== currentLeader.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Leader deleted",
      description: "The leader has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Leadership Management</h1>
          <p className="text-slate-600 dark:text-slate-300">Add, edit, and manage church leadership profiles.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Leader
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Leader</DialogTitle>
              <DialogDescription>Add a new leader to the church leadership team.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <img src={imagePreview || newLeader.image} alt="Leader" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto mb-4">
                <Label htmlFor="leader-image">Upload Photo</Label>
                <Input
                  id="leader-image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="leader-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="leader-name"
                  value={newLeader.name}
                  onChange={(e) => setNewLeader({ ...newLeader, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="leader-role" className="text-right">
                  Role
                </Label>
                <Input
                  id="leader-role"
                  value={newLeader.role}
                  onChange={(e) => setNewLeader({ ...newLeader, role: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="leader-bio" className="text-right pt-2">
                  Bio
                </Label>
                <Textarea
                  id="leader-bio"
                  value={newLeader.bio}
                  onChange={(e) => setNewLeader({ ...newLeader, bio: e.target.value })}
                  className="col-span-3"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLeader}>Add Leader</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaders.length > 0 ? (
                leaders.map((leader) => (
                  <TableRow key={leader.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={leader.image || "/placeholder.svg"}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{leader.name}</TableCell>
                    <TableCell>{leader.role}</TableCell>
                    <TableCell className="max-w-xs truncate">{leader.bio}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentLeader(leader)
                            setEditImagePreview(null)
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
                            setCurrentLeader(leader)
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
                  <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                    No leaders found. Add a new leader to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Leader Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Leader</DialogTitle>
            <DialogDescription>Make changes to the leader's profile.</DialogDescription>
          </DialogHeader>
          {currentLeader && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <img
                    src={editImagePreview || currentLeader.image}
                    alt={currentLeader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto mb-4">
                <Label htmlFor="edit-leader-image">Upload Photo</Label>
                <Input
                  id="edit-leader-image"
                  type="file"
                  accept="image/*"
                  ref={editFileInputRef}
                  onChange={(e) => handleImageChange(e, true)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-leader-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-leader-name"
                  value={currentLeader.name}
                  onChange={(e) => setCurrentLeader({ ...currentLeader, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-leader-role" className="text-right">
                  Role
                </Label>
                <Input
                  id="edit-leader-role"
                  value={currentLeader.role}
                  onChange={(e) => setCurrentLeader({ ...currentLeader, role: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-leader-bio" className="text-right pt-2">
                  Bio
                </Label>
                <Textarea
                  id="edit-leader-bio"
                  value={currentLeader.bio}
                  onChange={(e) => setCurrentLeader({ ...currentLeader, bio: e.target.value })}
                  className="col-span-3"
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditLeader}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Leader Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Leader</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this leader? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentLeader && (
            <div className="py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={currentLeader.image || "/placeholder.svg"}
                  alt={currentLeader.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{currentLeader.name}</p>
                <p className="text-sm text-slate-500">{currentLeader.role}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLeader}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
