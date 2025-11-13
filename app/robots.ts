import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://www.swiftrunapp.com/";
    return {
        rules: [
            {
                userAgent: "*",
                disallow: "/api"
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl
    }
}