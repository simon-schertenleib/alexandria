"use client"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <line x1="3" x2="21" y1="12" y2="12" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <line x1="3" x2="21" y1="18" y2="18" />
    </svg>
  )
}

export default function Sidebar() {
  return (
    <>
      <div className="md:hidden p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <nav className="flex flex-col space-y-2 p-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="#" className="hover:underline">About</Link>
              <Link href="#" className="hover:underline">Contact</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <aside className="hidden md:block w-60 p-4 border-r border-gray-200 dark:border-gray-700 min-h-screen">
        <nav className="flex flex-col space-y-2">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="#" className="hover:underline">About</Link>
          <Link href="#" className="hover:underline">Contact</Link>
        </nav>
      </aside>
    </>
  )
}
