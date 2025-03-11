import { setRequestLocale } from "next-intl/server"
import HomeClient from "@/components/home-client"
import { locales } from "@/i18n/config"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function HomePage({ params: { locale } }) {
  // Enable static rendering
  setRequestLocale(locale)

  return <HomeClient />
}

