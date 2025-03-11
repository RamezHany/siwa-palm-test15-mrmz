import createMiddleware from "next-intl/middleware"
import { locales, defaultLocale } from "./i18n/config"

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale,

  // Detect locale from browser/user preferences
  localeDetection: true,
})

export const config = {
  // Match all pathnames except for
  // - ... static files (e.g. /favicon.ico)
  // - ... internal Next.js paths (/api/, /_next/)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}

