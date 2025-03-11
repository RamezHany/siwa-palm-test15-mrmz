"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GalleryImage = {
  id: number
  src: string
  alt: string
  category: string
}

export default function GalleryClient() {
  const t = useTranslations("Gallery")
  const locale = useLocale()
  const [activeCategory, setActiveCategory] = useState("all")

  // Sample gallery images
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Date palm trees in Siwa Oasis",
      category: "farms"
    },
    {
      id: 2,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Premium Medjool dates packaging",
      category: "products"
    },
    {
      id: 3,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Date harvesting process",
      category: "production"
    },
    {
      id: 4,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Siwa dates on display",
      category: "products"
    },
    {
      id: 5,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Aerial view of date palm farm",
      category: "farms"
    },
    {
      id: 6,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Date sorting and quality control",
      category: "production"
    },
    {
      id: 7,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Mazaq dates close-up",
      category: "products"
    },
    {
      id: 8,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Irrigation system in date farm",
      category: "farms"
    },
    {
      id: 9,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Date packaging line",
      category: "production"
    },
  ]

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#458a5d]">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("title")}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <CategoryButton 
              active={activeCategory === "all"} 
              onClick={() => setActiveCategory("all")}
            >
              {t("categories.all")}
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === "farms"} 
              onClick={() => setActiveCategory("farms")}
            >
              {t("categories.farms")}
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === "products"} 
              onClick={() => setActiveCategory("products")}
            >
              {t("categories.products")}
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === "production"} 
              onClick={() => setActiveCategory("production")}
            >
              {t("categories.production")}
            </CategoryButton>
          </div>

          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div key={image.id} className="relative h-80 rounded-xl overflow-hidden group">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#458a5d]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="font-bold text-xl">{image.alt}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">{t("noResults")}</p>
              <Button 
                variant="outline" 
                onClick={() => setActiveCategory("all")}
                className="border-[#458a5d] text-[#458a5d] hover:bg-[#458a5d] hover:text-white"
              >
                {t("categories.all")}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 text-center">
        <Link href={`/${locale}`}>
          <Button className="bg-[#458a5d] hover:bg-[#3a7650] text-white">
            {locale === "ar" ? <ArrowRight className="mr-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />}
            {t("backToHome")}
          </Button>
        </Link>
      </section>
    </div>
  )
}

// Helper component
function CategoryButton({ 
  children, 
  active = false, 
  onClick 
}: { 
  children: React.ReactNode
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-full font-medium transition-colors",
        active 
          ? "bg-[#458a5d] text-white" 
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
      )}
    >
      {children}
    </button>
  )
} 