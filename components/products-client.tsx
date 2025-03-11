"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ArrowRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductsClient() {
  const t = useTranslations("Products")
  const [searchQuery, setSearchQuery] = useState("")

  const products = [
    {
      id: 1,
      name: t("medjool.name"),
      description: t("medjool.description"),
      image: "/placeholder.svg?height=500&width=500",
      color: "from-red-700 to-amber-600",
      slug: "medjool",
    },
    {
      id: 2,
      name: t("siwa.name"),
      description: t("siwa.description"),
      image: "/placeholder.svg?height=500&width=500",
      color: "from-amber-600 to-amber-500",
      slug: "siwa",
    },
    {
      id: 3,
      name: t("mazaq.name"),
      description: t("mazaq.description"),
      image: "/placeholder.svg?height=500&width=500",
      color: "from-amber-700 to-amber-500",
      slug: "mazaq",
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-red-900/90 -z-10" />
        <div
          className="absolute inset-0 bg-[url('/date-pattern.png')] bg-repeat opacity-10 -z-10"
          style={{ backgroundSize: "200px" }}
        />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("title")}</h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">{t("subtitle")}</p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className={`h-48 relative bg-gradient-to-r ${product.color}`}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4 mix-blend-multiply"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-700 mb-2">{product.name}</h3>
                <p className="text-amber-800/70 mb-6">{product.description}</p>
                <Link href={`/products/${product.slug}`}>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white">
                    {t("viewProduct")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-red-700 mb-4">{t("noResults")}</h3>
            <p className="text-amber-800/70 mb-6">{t("tryDifferentSearch")}</p>
            <Button
              variant="outline"
              className="border-red-700 text-red-700 hover:bg-red-50"
              onClick={() => setSearchQuery("")}
            >
              {t("clearSearch")}
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}

