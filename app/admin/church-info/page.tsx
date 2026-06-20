"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

export default function ChurchInfoManagementPage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // Sample church info data
  const [churchInfo, setChurchInfo] = useState({
    english: {
      title: "Welcome to The Glorious Church",
      content:
        "Maheshpur Church is a spiritual community where we teach God's word, pray, and worship together. Our goal is to spread Christ's love and make a positive impact in society. We believe that God has a purpose for every individual's life, and we want to help discover and fulfill that purpose.",
    },
  })

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Changes saved",
        description: "Church information has been updated successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Church Information</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Update the church description and information in different languages.
        </p>
      </div>

      <Tabs defaultValue="english" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="english">English</TabsTrigger>
          <TabsTrigger value="bengali">Bengali</TabsTrigger>
          <TabsTrigger value="hindi">Hindi</TabsTrigger>
        </TabsList>

        {Object.entries(churchInfo).map(([language, info]) => (
          <TabsContent key={language} value={language}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{language} Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor={`${language}-title`}>Title</Label>
                  <Input
                    id={`${language}-title`}
                    value={info.title}
                    onChange={(e) =>
                      setChurchInfo({
                        ...churchInfo,
                        [language]: { ...info, title: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor={`${language}-content`}>Content</Label>
                  <Textarea
                    id={`${language}-content`}
                    value={info.content}
                    onChange={(e) =>
                      setChurchInfo({
                        ...churchInfo,
                        [language]: { ...info, content: e.target.value },
                      })
                    }
                    rows={8}
                  />
                </div>

                <div className="flex justify-end mt-6">
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
        ))}
      </Tabs>
    </div>
  )
}
