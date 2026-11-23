const rawSiteUrl = process.env.SITE_URL ?? "http://localhost:3000"

export const SITE_URL = rawSiteUrl.replace(/\/$/, "")
export const SITE_BASE_URL = new URL(SITE_URL)
export const SITE_NAME = "Nextjs Pagination"
export const SITE_DESCRIPTION =
  "Modern pagination patterns with Next.js, Prisma and TanStack Table."
export const SITE_LANGUAGE = "en"
export const SITE_LOCALE = "en_US"
