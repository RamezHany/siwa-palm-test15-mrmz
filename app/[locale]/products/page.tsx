import { setRequestLocale } from "next-intl/server"
import ProductsClient from "@/components/products-client"
import { locales } from "@/i18n/config"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function ProductsPage({ params: { locale } }) {
  // Enable static rendering
  setRequestLocale(locale)

  return <ProductsClient />
}

