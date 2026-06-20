import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Admin credentials as specified
const ADMIN_CREDENTIALS = {
  email: "admin@vpk.zohomail.in",
  password: "Vipking@123$",
}

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate credentials
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    // Set a secure HTTP-only cookie
    cookies().set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return { success: true }
  }

  return { success: false, error: "Invalid credentials" }
}

export async function logoutAdmin() {
  cookies().delete("admin-session")
  redirect("/")
}

export function isAdminAuthenticated() {
  const session = cookies().get("admin-session")
  return session?.value === "authenticated"
}

export function requireAdmin() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login")
  }
}
