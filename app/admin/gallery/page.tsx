"use client"

import type React from "react"

import { useState, useRef } from "react"
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
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Upload } from "lucide-react"

// Sample gallery images
const sampleImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=300&width=400&text=Church+Building",
    alt: "Church Building",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=300&width=400&text=Sunday+Service",
    alt: "Sunday Service",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=300&width=400&text=Youth+Group",
    alt: "Youth Group",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=300&width=400&text=Community+Outreach",
    alt: "Community Outreach",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=300&width=400&text=Christmas+Celebration",
    alt: "Christmas Celebration",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=300&width=400&text=Easter+Service",
    alt: "Easter Service",
  },
]

export default function GalleryManagementPage() {
  const { toast } = useToast()
  const [images, setImages] = useState(sampleImages)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<any>(null)
  const [newImage, setNewImage] = useState({
    src: "",
    alt: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setImagePreview(result)
        setNewImage({ ...newImage, src: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddImage = () => {
    if (!imagePreview) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      })
      return
    }

    const id = Math.max(0, ...images.map((img) => img.id)) + 1
    setImages([...images, { ...newImage, id }])
    setNewImage({
      src: "",
      alt: "",
    })
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    setIsAddDialogOpen(false)
    toast({
      title: "Image added",
      description: "The image has been added to the gallery successfully.",
    })
  }

  const handleDeleteImage = () => {
    if (!currentImage) return
    setImages(images.filter((image) => image.id !== currentImage.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Image deleted",
      description: "The image has been removed from the gallery.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gallery Management</h1>
          <p className="text-slate-600 dark:text-slate-300">Add and remove images from the church gallery.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
              <DialogDescription>Upload a new image to the church gallery.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <div className="w-full h-48 border rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <Upload className="mx-auto h-10 w-10 mb-2" />
                      <p>No image selected</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="gallery-image">Upload Image</Label>
                <Input
                  id="gallery-image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="image-alt">Image Description</Label>
                <Input
                  id="image-alt"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                  placeholder="Describe the image"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddImage}>Add to Gallery</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="rounded-lg overflow-hidden aspect-video">
                  <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setCurrentImage(image)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 truncate">{image.alt}</p>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Upload className="mx-auto h-12 w-12 mb-4 text-slate-400" />
              <p>No images in the gallery. Add images to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Image Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentImage && (
            <div className="py-4">
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src={currentImage.src || "/placeholder.svg"}
                  alt={currentImage.alt}
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="text-sm text-slate-500">{currentImage.alt}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteImage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
