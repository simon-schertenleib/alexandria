"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { BreadcrumbLink } from "@/components/ui/breadcrumb"

export default function BackBreadcrumb({
  children = "Back",
}: {
  children?: React.ReactNode
}) {
  const router = useRouter()
  return (
    <BreadcrumbLink asChild>
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm"
      >
        <ArrowLeft className="size-3" />
        {children}
      </button>
    </BreadcrumbLink>
  )
}
