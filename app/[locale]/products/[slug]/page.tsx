import { setRequestLocale } from "next-intl/server"
import ProductDetailClient from "@/components/product-detail-client"
import { locales } from "@/i18n/config"

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    { locale, slug: "medjool" },
    { locale, slug: "siwa" },
    { locale, slug: "mazaq" },
  ])
}

export default function ProductDetailPage({ params: { locale, slug } }) {
  // Enable static rendering
  setRequestLocale(locale)

  return <ProductDetailClient slug={slug} />
}

