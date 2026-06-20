"use client"

import { useState } from "react"
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
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Edit, Trash2, Check, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Sample testimonies data
const sampleTestimonies = [
  {
    id: 1,
    name: "Rajesh Das",
    content: "When I was sick, the church members prayed for me and I was miraculously healed. Glory to God!",
    date: new Date(2023, 10, 15),
    approved: true,
  },
  {
    id: 2,
    name: "Sumita Ray",
    content:
      "When I lost my job, I was devastated. But through the support and prayers of the church, I found a new and better job.",
    date: new Date(2023, 9, 20),
    approved: true,
  },
  {
    id: 3,
    name: "Amit Kumar",
    content:
      "I was struggling with addiction for years. After joining the church and through prayer, I've been clean for 6 months now.",
    date: new Date(2023, 11, 5),
    approved: false,
  },
]

export default function TestimoniesManagementPage() {
  const { toast } = useToast()
  const [testimonies, setTestimonies] = useState(sampleTestimonies)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTestimony, setCurrentTestimony] = useState<any>(null)

  const handleApproveTestimony = (id: number) => {
    setTestimonies(
      testimonies.map((testimony) =>
        testimony.id === id ? { ...testimony, approved: !testimony.approved } : testimony,
      ),
    )
    toast({
      title: "Status updated",
      description: "The testimony status has been updated successfully.",
    })
  }

  const handleEditTestimony = () => {
    if (!currentTestimony) return
    setTestimonies(
      testimonies.map((testimony) => (testimony.id === currentTestimony.id ? currentTestimony : testimony)),
    )
    setIsEditDialogOpen(false)
    toast({
      title: "Testimony updated",
      description: "The testimony has been updated successfully.",
    })
  }

  const handleDeleteTestimony = () => {
    if (!currentTestimony) return
    setTestimonies(testimonies.filter((testimony) => testimony.id !== currentTestimony.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Testimony deleted",
      description: "The testimony has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Testimonies Management</h1>
        <p className="text-slate-600 dark:text-slate-300">Review, edit, and manage testimonies from church members.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Testimony</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonies.length > 0 ? (
                testimonies.map((testimony) => (
                  <TableRow key={testimony.id}>
                    <TableCell className="font-medium">{testimony.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{testimony.content}</TableCell>
                    <TableCell>{formatDistanceToNow(testimony.date, { addSuffix: true })}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          testimony.approved
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {testimony.approved ? "Approved" : "Pending"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApproveTestimony(testimony.id)}
                          title={testimony.approved ? "Unapprove" : "Approve"}
                        >
                          {testimony.approved ? (
                            <X className="h-4 w-4 text-red-500" />
                          ) : (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentTestimony(testimony)
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
                            setCurrentTestimony(testimony)
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
                    No testimonies found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Testimony Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Testimony</DialogTitle>
            <DialogDescription>Make changes to the testimony details.</DialogDescription>
          </DialogHeader>
          {currentTestimony && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentTestimony.name}
                  onChange={(e) => setCurrentTestimony({ ...currentTestimony, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right pt-2">
                  Testimony
                </Label>
                <Textarea
                  id="edit-content"
                  value={currentTestimony.content}
                  onChange={(e) => setCurrentTestimony({ ...currentTestimony, content: e.target.value })}
                  className="col-span-3"
                  rows={6}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTestimony}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Testimony Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimony</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimony? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentTestimony && (
            <div className="py-4">
              <p className="font-medium">{currentTestimony.name}</p>
              <p className="text-sm text-slate-500 mt-1">{currentTestimony.content}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTestimony}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
