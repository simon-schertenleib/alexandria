"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

function Footer({ className, ...props }: React.ComponentProps<"footer">) {
  const year = new Date().getFullYear()
  return (
    <footer data-slot="footer" className={cn("mt-auto w-full", className)} {...props}>
      <Separator />
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between py-4 text-xs text-muted-foreground">
        <span>© {year} Alexandria. All rights reserved.</span>
        <span className="flex items-center gap-2">
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">React</Badge>
        </span>
      </div>
    </footer>
  )
}

export { Footer }
