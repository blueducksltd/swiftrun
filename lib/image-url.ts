/**
 * Resolves an image URL safely for display.
 * If the image is stored in a private Vercel Blob, proxies through /api/blogs/blob.
 * Otherwise returns the URL as is.
 */
export function getSafeImageUrl(url?: string | null): string {
    if (!url || typeof url !== 'string') return ''
    const trimmed = url.trim()
    if (!trimmed) return ''

    // If it's a Vercel blob URL, proxy it through the blob reading route
    if (trimmed.startsWith('http') && (trimmed.includes('blob.vercel-storage.com') || trimmed.includes('.vercel-storage.com'))) {
        return `/api/blogs/blob?url=${encodeURIComponent(trimmed)}`
    }

    return trimmed
}

/**
 * Resolves an absolute image URL for Open Graph and Twitter Card tags.
 * WhatsApp, X (Twitter), Facebook, and LinkedIn preview scrapers require absolute URLs.
 */
export function getAbsoluteImageUrl(url?: string | null): string {
    const defaultImage = 'https://www.swiftrunapp.com/open-graph.png'
    if (!url || typeof url !== 'string') return defaultImage
    const trimmed = url.trim()
    if (!trimmed) return defaultImage

    const safe = getSafeImageUrl(trimmed)
    if (safe.startsWith('http://') || safe.startsWith('https://')) {
        return safe
    }
    const cleanPath = safe.startsWith('/') ? safe : `/${safe}`
    return `https://www.swiftrunapp.com${cleanPath}`
}
