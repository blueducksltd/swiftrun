/**
 * Utilities for SEO-friendly career URLs.
 * Example:
 * Title: "Customer Support Representative"
 * Slug: "customer-support-representative"
 */

export function slugify(text: string): string {
    return (text || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function createCareerSlug(title: string, id?: string): string {
    const slug = slugify(title)
    if (slug) return slug
    return id || ''
}

export function parseCareerSlug(param: string): { id?: string; slug: string } {
    const raw = decodeURIComponent(param || '').trim()

    // 1. If it's a 24-char hex MongoDB ObjectId directly:
    if (/^[0-9a-fA-F]{24}$/.test(raw)) {
        return { id: raw, slug: raw }
    }

    // 2. If it's pure numbers directly (e.g. "900", "120"):
    if (/^\d+$/.test(raw)) {
        return { id: raw, slug: raw }
    }

    // 3. If it ends with a 24-char hex MongoDB ObjectId (e.g. "operations-lead-67123..."):
    const mongoMatch = raw.match(/-([0-9a-fA-F]{24})$/)
    if (mongoMatch) {
        return { id: mongoMatch[1], slug: raw }
    }

    // 4. If it ends with numeric ID (e.g. "sales-rep-900"):
    const numMatch = raw.match(/-(\d+)$/)
    if (numMatch) {
        return { id: numMatch[1], slug: raw }
    }

    // 5. Name slug:
    return { slug: raw }
}
