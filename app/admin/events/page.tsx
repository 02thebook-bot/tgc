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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2 } from "lucide-react"

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: "Sunday Worship",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Church Hall",
    description: "Weekly worship service for all ages.",
  },
  {
    id: 2,
    title: "Bible Study",
    date: "Every Wednesday",
    time: "7:00 PM",
    location: "Fellowship Hall",
    description: "Weekly Bible study and discussion.",
  },
  {
    id: 3,
    title: "Youth Meeting",
    date: "Every Friday",
    time: "6:00 PM",
    location: "Youth Center",
    description: "Fellowship, games, and Bible study for youth.",
  },
]

export default function EventsManagementPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState(sampleEvents)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<any>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })

  const handleAddEvent = () => {
    const id = Math.max(0, ...events.map((e) => e.id)) + 1
    setEvents([...events, { ...newEvent, id }])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Event added",
      description: "The event has been added successfully.",
    })
  }

  const handleEditEvent = () => {
    if (!currentEvent) return
    setEvents(events.map((event) => (event.id === currentEvent.id ? currentEvent : event)))
    setIsEditDialogOpen(false)
    toast({
      title: "Event updated",
      description: "The event has been updated successfully.",
    })
  }

  const handleDeleteEvent = () => {
    if (!currentEvent) return
    setEvents(events.filter((event) => event.id !== currentEvent.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Event deleted",
      description: "The event has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Events Management</h1>
          <p className="text-slate-600 dark:text-slate-300">Add, edit, and manage upcoming church events.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Add a new event to the church calendar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="event-title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="event-date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Every Sunday, June 15, 2023"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-time" className="text-right">
                  Time
                </Label>
                <Input
                  id="event-time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., 10:00 AM"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="event-location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="event-description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="event-description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length > 0 ? (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentEvent(event)
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
                            setCurrentEvent(event)
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
                    No events found. Add a new event to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Make changes to the event details.</DialogDescription>
          </DialogHeader>
          {currentEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-event-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-event-title"
                  value={currentEvent.title}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-event-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="edit-event-date"
                  value={currentEvent.date}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-event-time" className="text-right">
                  Time
                </Label>
                <Input
                  id="edit-event-time"
                  value={currentEvent.time}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-event-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="edit-event-location"
                  value={currentEvent.location}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-event-description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="edit-event-description"
                  value={currentEvent.description}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEvent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Event Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentEvent && (
            <div className="py-4">
              <p className="font-medium">{currentEvent.title}</p>
              <p className="text-sm text-slate-500 mt-1">
                {currentEvent.date} at {currentEvent.time}, {currentEvent.location}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
