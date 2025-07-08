"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className={className}
    >
      <ArrowLeft />
      <span className="sr-only">Go back</span>
    </Button>
  )
}
