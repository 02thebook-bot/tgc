import { requireAdmin } from "@/lib/auth"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, MessageSquare, Calendar, Clock, Users, ImageIcon, Settings, FileText, Home } from "lucide-react"

export default function AdminDashboardPage() {
  // This will redirect to login if not authenticated
  requireAdmin()

  const adminModules = [
    {
      title: "Home Page",
      description: "Edit logo and background images",
      icon: Home,
      link: "/admin/home-page",
    },
    {
      title: "Songs Management",
      description: "Add, edit, and delete songs in all languages",
      icon: Music,
      link: "/admin/songs",
    },
    {
      title: "Testimonies",
      description: "Manage testimonies from church members",
      icon: MessageSquare,
      link: "/admin/testimonies",
    },
    {
      title: "Events",
      description: "Manage upcoming church events",
      icon: Calendar,
      link: "/admin/events",
    },
    {
      title: "Service Times",
      description: "Update church service schedules",
      icon: Clock,
      link: "/admin/service-times",
    },
    {
      title: "Leadership",
      description: "Manage church leadership profiles",
      icon: Users,
      link: "/admin/leadership",
    },
    {
      title: "Gallery",
      description: "Manage church photo gallery",
      icon: ImageIcon,
      link: "/admin/gallery",
    },
    {
      title: "Church Info",
      description: "Update church description and information",
      icon: FileText,
      link: "/admin/church-info",
    },
    {
      title: "Site Settings",
      description: "General website settings",
      icon: Settings,
      link: "/admin/settings",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Welcome to the Maheshpur Church admin panel. Manage your church website content here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module) => (
          <Link key={module.title} href={module.link}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <module.icon className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{module.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{module.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
