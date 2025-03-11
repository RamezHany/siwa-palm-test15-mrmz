"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function LanguageSwitcher({ scrolled = false, isMobile = false }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  const switchLocale = (newLocale) => {
    // Replace the locale segment in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPathname)
  }

  if (isMobile) {
    return (
      <div className="flex justify-center gap-4">
        <Button
          variant={locale === "en" ? "default" : "outline"}
          className={cn(locale === "en" ? "bg-white text-red-700" : "border-white text-white", "flex-1")}
          onClick={() => switchLocale("en")}
        >
          English
        </Button>
        <Button
          variant={locale === "ar" ? "default" : "outline"}
          className={cn(locale === "ar" ? "bg-white text-red-700" : "border-white text-white", "flex-1")}
          onClick={() => switchLocale("ar")}
        >
          العربية
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={scrolled ? "text-red-700" : "text-white"}>
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={locale === "en" ? "bg-red-50 text-red-700 font-medium" : ""}
          onClick={() => switchLocale("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className={locale === "ar" ? "bg-red-50 text-red-700 font-medium" : ""}
          onClick={() => switchLocale("ar")}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

