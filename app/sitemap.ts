import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.swiftrunapp.com/";
    return [
        { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${baseUrl}/why-choose-us`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/how-it-works/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/download-the-app/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
 
        { url: `${baseUrl}/faqs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 }
    ]
}
