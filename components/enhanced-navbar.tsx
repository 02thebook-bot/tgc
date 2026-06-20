"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, User, LogOut } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Live Testimony", path: "/live-testimony" },
  { name: "Songs", path: "/songs" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/about" },
]

// EDIT THIS: paste the URL of your live stream (YouTube, Facebook, etc.).
// It will open in a new tab when the "Live" button is clicked.
const LIVE_STREAM_URL = "https://www.youtube.com/"

export function EnhancedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if user is admin on client side
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/admin/check")
        const data = await response.json()
        setIsAdmin(data.isAuthenticated)
      } catch (error) {
        console.error("Error checking admin status:", error)
        setIsAdmin(false)
      }
    }

    checkAdmin()
  }, [pathname])

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      setIsAdmin(false)
      router.refresh()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md" : "bg-transparent dark:bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 flex justify-center">
                <div className="w-2 h-6 bg-worship-red rounded-full transform origin-bottom animate-flame"></div>
              </div>
            </div>
            <span className="text-xl font-bold gradient-text">The Glorious Church</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative animated-underline",
                  pathname === item.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
          >
            <a
              href={LIVE_STREAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-500"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
              </span>
              Live
            </a>
          </motion.div>
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-4"
        >
          <LanguageSwitcher />

          {/* Admin Login/Logout Button */}
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Admin</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User size={16} />
                <span>Admin Login</span>
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </motion.div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          {isAdmin && (
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm" className="flex items-center">
                <User size={16} />
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="rounded-full"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t bg-white/90 dark:bg-slate-900/90 backdrop-blur-md"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary block py-2",
                      pathname === item.path ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: navItems.length * 0.05 }}
              >
                <a
                  href={LIVE_STREAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-red-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
                  </span>
                  Live
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: (navItems.length + 1) * 0.05 }}
                className="pt-2"
              >
                <LanguageSwitcher />
              </motion.div>

              {/* Admin Login/Logout in Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: (navItems.length + 1) * 0.05 }}
                className="pt-2"
              >
                {isAdmin ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                ) : (
                  <Link href="/admin/login">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <User size={16} />
                      <span>Admin Login</span>
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
