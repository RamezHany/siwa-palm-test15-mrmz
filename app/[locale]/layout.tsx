import "./globals.css"
import { Inter, Amiri } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "@/components/theme-provider"
import { locales } from "@/i18n/config"

const inter = Inter({
  subsets: ["latin"], // Removed 'arabic' as it's not supported
  variable: "--font-inter",
})

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

export const metadata = {
  title: "Siwa Palm - Premium Dates from Siwa Oasis",
  description: "Leading company in growing and producing the finest dates since 2001",
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params: { locale } }) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  // Set the direction based on locale
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} ${amiri.variable} font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

