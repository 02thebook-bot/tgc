"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

// Sample service times data
const sampleServiceTimes = [
  {
    id: 1,
    name: "Sunday Worship",
    day: "Sunday",
    time: "10:00 AM",
  },
  {
    id: 2,
    name: "Bible Study",
    day: "Wednesday",
    time: "7:00 PM",
  },
  {
    id: 3,
    name: "Prayer Meeting",
    day: "Friday",
    time: "6:30 PM",
  },
]

export default function ServiceTimesManagementPage() {
  const { toast } = useToast()
  const [serviceTimes, setServiceTimes] = useState(sampleServiceTimes)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState<any>(null)
  const [newService, setNewService] = useState({
    name: "",
    day: "",
    time: "",
  })

  const handleAddService = () => {
    const id = Math.max(0, ...serviceTimes.map((s) => s.id)) + 1
    setServiceTimes([...serviceTimes, { ...newService, id }])
    setNewService({
      name: "",
      day: "",
      time: "",
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Service time added",
      description: "The service time has been added successfully.",
    })
  }

  const handleEditService = () => {
    if (!currentService) return
    setServiceTimes(serviceTimes.map((service) => (service.id === currentService.id ? currentService : service)))
    setIsEditDialogOpen(false)
    toast({
      title: "Service time updated",
      description: "The service time has been updated successfully.",
    })
  }

  const handleDeleteService = () => {
    if (!currentService) return
    setServiceTimes(serviceTimes.filter((service) => service.id !== currentService.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Service time deleted",
      description: "The service time has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Service Times Management</h1>
          <p className="text-slate-600 dark:text-slate-300">Add, edit, and manage church service times.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Service Time
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service Time</DialogTitle>
              <DialogDescription>Add a new service time to the church schedule.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="service-name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Sunday Worship"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service-day" className="text-right">
                  Day
                </Label>
                <Input
                  id="service-day"
                  value={newService.day}
                  onChange={(e) => setNewService({ ...newService, day: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Sunday"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service-time" className="text-right">
                  Time
                </Label>
                <Input
                  id="service-time"
                  value={newService.time}
                  onChange={(e) => setNewService({ ...newService, time: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., 10:00 AM"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>Add Service Time</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceTimes.length > 0 ? (
                serviceTimes.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.day}</TableCell>
                    <TableCell>{service.time}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentService(service)
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
                            setCurrentService(service)
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
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                    No service times found. Add a new service time to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service Time</DialogTitle>
            <DialogDescription>Make changes to the service time details.</DialogDescription>
          </DialogHeader>
          {currentService && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-service-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-service-name"
                  value={currentService.name}
                  onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-service-day" className="text-right">
                  Day
                </Label>
                <Input
                  id="edit-service-day"
                  value={currentService.day}
                  onChange={(e) => setCurrentService({ ...currentService, day: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-service-time" className="text-right">
                  Time
                </Label>
                <Input
                  id="edit-service-time"
                  value={currentService.time}
                  onChange={(e) => setCurrentService({ ...currentService, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditService}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Service Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service Time</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service time? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentService && (
            <div className="py-4">
              <p className="font-medium">{currentService.name}</p>
              <p className="text-sm text-slate-500 mt-1">
                {currentService.day} at {currentService.time}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteService}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
