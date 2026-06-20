import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Maheshpur Church</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              A place of worship, community, and spiritual growth.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-600 hover:text-primary dark:text-slate-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/live-testimony" className="text-slate-600 hover:text-primary dark:text-slate-300">
                  Live Testimony
                </Link>
              </li>
              <li>
                <Link href="/songs" className="text-slate-600 hover:text-primary dark:text-slate-300">
                  Songs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-primary dark:text-slate-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-primary dark:text-slate-300">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Service Times</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>Sunday Worship: 10:00 AM</li>
              <li>Bible Study: Wednesday 7:00 PM</li>
              <li>Prayer Meeting: Friday 6:30 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-slate-600 dark:text-slate-300">
          <p>&copy; {new Date().getFullYear()} Maheshpur Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
