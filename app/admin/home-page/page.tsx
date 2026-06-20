"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Upload, Save, Trash2 } from "lucide-react"

export default function HomePageManagementPage() {
  const { toast } = useToast()
  const logoInputRef = useRef<HTMLInputElement>(null)
  const backgroundInputRef = useRef<HTMLInputElement>(null)

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setBackgroundPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Home Page Management</h1>
        <p className="text-slate-600 dark:text-slate-300">Update your church website's logo and background images.</p>
      </div>

      <Tabs defaultValue="logo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="background">Background Image</TabsTrigger>
        </TabsList>

        <TabsContent value="logo">
          <Card>
            <CardHeader>
              <CardTitle>Church Logo</CardTitle>
              <CardDescription>
                Update the church logo that appears in the navigation bar. Recommended size: 200x200px.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 border rounded-lg flex items-center justify-center overflow-hidden">
                  {logoPreview ? (
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Logo Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <Upload className="mx-auto h-10 w-10 mb-2" />
                      <p>No logo selected</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                <Label htmlFor="logo">Upload Logo</Label>
                <Input id="logo" type="file" accept="image/*" ref={logoInputRef} onChange={handleLogoChange} />
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setLogoPreview(null)
                    if (logoInputRef.current) logoInputRef.current.value = ""
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="background">
          <Card>
            <CardHeader>
              <CardTitle>Background Image</CardTitle>
              <CardDescription>
                Update the background image for the home page. Recommended size: 1920x1080px.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-full h-60 border rounded-lg flex items-center justify-center overflow-hidden">
                  {backgroundPreview ? (
                    <img
                      src={backgroundPreview || "/placeholder.svg"}
                      alt="Background Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <Upload className="mx-auto h-10 w-10 mb-2" />
                      <p>No background image selected</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="background">Upload Background Image</Label>
                <Input
                  id="background"
                  type="file"
                  accept="image/*"
                  ref={backgroundInputRef}
                  onChange={handleBackgroundChange}
                />
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setBackgroundPreview(null)
                    if (backgroundInputRef.current) backgroundInputRef.current.value = ""
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
