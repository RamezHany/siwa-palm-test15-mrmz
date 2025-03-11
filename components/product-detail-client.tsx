"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import OrderForm from "@/components/order-form"

export default function ProductDetailClient({ slug }) {
  const t = useTranslations("ProductDetail")
  const router = useRouter()

  const [quantity, setQuantity] = useState(1)
  const [showOrderForm, setShowOrderForm] = useState(false)

  // Get product data based on slug
  const getProductData = () => {
    switch (slug) {
      case "medjool":
        return {
          name: t("medjool.name"),
          description: t("medjool.description"),
          longDescription: t("medjool.longDescription"),
          image: "/placeholder.svg?height=600&width=600",
          color: "from-red-700 to-amber-600",
          price: "120",
          unit: t("unit"),
        }
      case "siwa":
        return {
          name: t("siwa.name"),
          description: t("siwa.description"),
          longDescription: t("siwa.longDescription"),
          image: "/placeholder.svg?height=600&width=600",
          color: "from-amber-600 to-amber-500",
          price: "90",
          unit: t("unit"),
        }
      case "mazaq":
        return {
          name: t("mazaq.name"),
          description: t("mazaq.description"),
          longDescription: t("mazaq.longDescription"),
          image: "/placeholder.svg?height=600&width=600",
          color: "from-amber-700 to-amber-500",
          price: "100",
          unit: t("unit"),
        }
      default:
        router.push("/products")
        return null
    }
  }

  const product = getProductData()

  if (!product) return null

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 pb-16">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          variant="ghost"
          className="text-red-700 hover:text-red-800 hover:bg-red-50"
          onClick={() => router.push("/products")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToProducts")}
        </Button>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div
              className={`rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r ${product.color} p-8 h-[400px] md:h-[500px] relative`}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain mix-blend-multiply"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-red-700 mb-4">{product.name}</h1>
            <p className="text-xl text-amber-800/70 mb-6">{product.description}</p>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-md">
              <p className="text-lg text-amber-800/90 mb-6">{product.longDescription}</p>

              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-red-700">
                  ${product.price} <span className="text-lg font-normal text-amber-800/70">/ {product.unit}</span>
                </div>

                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-full border-red-700 text-red-700 hover:bg-red-50"
                    onClick={decreaseQuantity}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-16 text-center font-bold text-red-700">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-r-full border-red-700 text-red-700 hover:bg-red-50"
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-lg py-6"
                onClick={() => setShowOrderForm(true)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t("orderNow")}
              </Button>
            </div>

            {/* Nutritional Info */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-red-700 mb-4">{t("nutritionalInfo")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-amber-800/70">{t("calories")}</div>
                  <div className="text-lg font-bold text-red-700">277 kcal</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-amber-800/70">{t("protein")}</div>
                  <div className="text-lg font-bold text-red-700">1.8g</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-amber-800/70">{t("carbs")}</div>
                  <div className="text-lg font-bold text-red-700">75g</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-amber-800/70">{t("fiber")}</div>
                  <div className="text-lg font-bold text-red-700">6.7g</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-red-700 mb-6">{t("orderForm.title")}</h2>
            <OrderForm productName={product.name} quantity={quantity} onClose={() => setShowOrderForm(false)} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

