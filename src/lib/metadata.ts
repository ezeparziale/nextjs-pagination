import type { Metadata } from "next"

import { SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site"

import { getPokemonArtworkUrl } from "./pokemon"

interface PageImage {
  url: string
  width?: number
  height?: number
  alt?: string
}

interface PageMetadata {
  title: string
  description?: string
  path: string
  image?: PageImage
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  image,
}: PageMetadata): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      title,
      description,
      url,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
  }
}

export function getPokemonMetadata({
  id,
  name,
}: {
  id: number
  name: string
}): Metadata {
  return createPageMetadata({
    title: `${name} details`,
    description: `Base stats, height, weight and types of ${name}.`,
    path: `/pokemon/${id}`,
    image: {
      url: getPokemonArtworkUrl(id),
      width: 475,
      height: 475,
      alt: `${name} official artwork`,
    },
  })
}
