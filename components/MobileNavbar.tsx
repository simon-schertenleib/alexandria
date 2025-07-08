"use client"

import Link from "next/link"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

export default function MobileNavbar() {
  const { isMobile } = useSidebar()

  if (!isMobile) {
    return null
  }

  return (
    <header className="md:hidden flex items-center gap-2 border-b p-4">
      <SidebarTrigger />
      <Link href="/" className="text-base font-semibold">
        Alexandria
      </Link>
    </header>
  )
}
