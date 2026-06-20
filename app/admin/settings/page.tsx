"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

export default function SiteSettingsPage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // Sample settings
  const [settings, setSettings] = useState({
    churchName: "Maheshpur Church",
    churchAddress: "123 Church Street, Maheshpur, West Bengal, India",
    phoneNumber: "+91 9876543210",
    email: "info@maheshpurchurch.org",
    facebookUrl: "https://facebook.com/maheshpurchurch",
    instagramUrl: "https://instagram.com/maheshpurchurch",
    youtubeUrl: "https://youtube.com/maheshpurchurch",
    enableTestimonies: true,
    enableBibleVerseBot: true,
    footerText: "© 2023 Maheshpur Church. All rights reserved.",
  })

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your site settings have been updated successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
        <p className="text-slate-600 dark:text-slate-300">Configure general settings for your church website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="church-name">Church Name</Label>
              <Input
                id="church-name"
                value={settings.churchName}
                onChange={(e) => setSettings({ ...settings, churchName: e.target.value })}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="church-address">Church Address</Label>
              <Textarea
                id="church-address"
                value={settings.churchAddress}
                onChange={(e) => setSettings({ ...settings, churchAddress: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                value={settings.phoneNumber}
                onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="facebook-url">Facebook URL</Label>
              <Input
                id="facebook-url"
                value={settings.facebookUrl}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="instagram-url">Instagram URL</Label>
              <Input
                id="instagram-url"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <Input
                id="youtube-url"
                value={settings.youtubeUrl}
                onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-testimonies" className="cursor-pointer">
                Enable Testimonies
              </Label>
              <Switch
                id="enable-testimonies"
                checked={settings.enableTestimonies}
                onCheckedChange={(checked) => setSettings({ ...settings, enableTestimonies: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-bible-bot" className="cursor-pointer">
                Enable Bible Verse Bot
              </Label>
              <Switch
                id="enable-bible-bot"
                checked={settings.enableBibleVerseBot}
                onCheckedChange={(checked) => setSettings({ ...settings, enableBibleVerseBot: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="footer-text">Footer Text</Label>
              <Input
                id="footer-text"
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving ? (
            <>
              <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
