import type { ReactNode } from "react"
import { isAdminAuthenticated } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, LogOut } from "lucide-react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = isAdminAuthenticated()

  // Only show admin navigation if authenticated
  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-xl font-bold">
            Maheshpur Church Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white">
                <Home size={18} className="mr-2" />
                View Site
              </Button>
            </Link>
            <form action="/api/admin/logout" method="POST">
              <Button variant="ghost" size="sm" className="text-white">
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-slate-50 dark:bg-slate-900">{children}</main>
    </div>
  )
}
