import { careers } from "@/app/util/data";
import BuiltAroundYou from "@/components/BuiltAroundYou";
import GetSwiftRunFooter from "@/components/GetSwiftRunFooter";
import SectionHeader from "@/components/SectionHeader";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import CareerApplyButton from "@/components/CareerApplyButton";
import { getSafeImageUrl, getAbsoluteImageUrl } from "@/lib/image-url";
import { createCareerSlug, parseCareerSlug, slugify } from "@/lib/career-slug";

export const runtime = "nodejs";

type Props = {
    params: Promise<{ id: string }>;
};

type CareerDetail = {
    id: string;
    title: string;
    category: string;
    requirements: string[];
    description: string;
    shouldHave: string[];
    image?: string;
    createdAt?: string;
};

async function getCareer(slugOrId: string): Promise<CareerDetail | null> {
    const raw = decodeURIComponent(slugOrId || '').trim();
    const targetSlug = slugify(raw);
    const { id: extractedId } = parseCareerSlug(raw);
    const client = await clientPromise;
    const db = client.db("swiftrun");

    // 1. Prioritize matching by slugified title in MongoDB (e.g. /career/riders-needed)
    if (targetSlug) {
        const allDb = await db
            .collection("careers")
            .find({ status: "Published" })
            .toArray();
        const matchedByTitle = allDb.find(
            (c) => slugify(c.title) === targetSlug
        );
        if (matchedByTitle) {
            return {
                id: matchedByTitle._id.toString(),
                title: String(matchedByTitle.title),
                category: String(matchedByTitle.category),
                requirements: (matchedByTitle.requirements as string[]) || [],
                description: String(matchedByTitle.description),
                shouldHave: (matchedByTitle.shouldHave as string[]) || [],
                image: matchedByTitle.image ? String(matchedByTitle.image) : undefined,
                createdAt: matchedByTitle.createdAt
                    ? new Date(matchedByTitle.createdAt).toISOString()
                    : undefined,
            };
        }

        // Also check static careers by slugified title
        const matchedStaticByTitle = careers.find(
            (c) => slugify(c.title) === targetSlug
        );
        if (matchedStaticByTitle) {
            return {
                id: matchedStaticByTitle.id,
                title: matchedStaticByTitle.title,
                category: matchedStaticByTitle.category,
                requirements: matchedStaticByTitle.requirements || [],
                description: matchedStaticByTitle.description,
                shouldHave: matchedStaticByTitle.shouldHave || [],
                image: undefined,
            };
        }
    }

    // 2. Try finding by MongoDB ObjectId (if accessed by ID)
    const idToTry = extractedId || raw;
    if (idToTry && ObjectId.isValid(idToTry)) {
        const found = await db.collection("careers").findOne({
            _id: new ObjectId(idToTry),
            status: "Published",
        });
        if (found) {
            return {
                id: found._id.toString(),
                title: String(found.title),
                category: String(found.category),
                requirements: (found.requirements as string[]) || [],
                description: String(found.description),
                shouldHave: (found.shouldHave as string[]) || [],
                image: found.image ? String(found.image) : undefined,
                createdAt: found.createdAt
                    ? new Date(found.createdAt).toISOString()
                    : undefined,
            };
        }
    }

    // 3. Try static careers from data.tsx by ID
    const staticFound = careers.find((c) => c.id === idToTry);
    if (staticFound) {
        return {
            id: staticFound.id,
            title: staticFound.title,
            category: staticFound.category,
            requirements: staticFound.requirements || [],
            description: staticFound.description,
            shouldHave: staticFound.shouldHave || [],
            image: undefined,
        };
    }

    return null;
}

// Dynamic SEO metadata optimized for WhatsApp, X (Twitter), Facebook & LinkedIn
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id: rawParam } = await params;
    const selected = await getCareer(rawParam);

    if (!selected) {
        return {
            title: "Career Not Found – SwiftRun",
            description: "The requested job opening could not be found.",
        };
    }

    const slug = createCareerSlug(selected.title);
    const canonicalUrl = `https://www.swiftrunapp.com/career/${slug}`;
    const absoluteImage = getAbsoluteImageUrl(selected.image);
    const location = selected.requirements?.[0] || "Enugu, Nigeria";
    const employmentType = selected.requirements?.[1] || "Fulltime";

    const cleanDescription = selected.description
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    const metaDescription =
        cleanDescription.length > 155
            ? `${cleanDescription.slice(0, 152)}...`
            : cleanDescription;

    const pageTitle = `${selected.title} (${location}) – SwiftRun Careers`;
    const socialTitle = `Hiring: ${selected.title} at SwiftRun`;
    const socialDescription = `Join SwiftRun as a ${selected.title} in ${location} (${employmentType}). Apply now to build the future of fast, reliable delivery.`;

    return {
        title: pageTitle,
        description: metaDescription,
        keywords: [
            selected.title,
            `${selected.title} job`,
            `${selected.title} ${location}`,
            `${selected.category} careers`,
            "SwiftRun jobs",
            "logistics careers Nigeria",
            "delivery jobs Enugu",
        ],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: socialTitle,
            description: socialDescription,
            url: canonicalUrl,
            siteName: "SwiftRun",
            type: "article",
            locale: "en_US",
            images: [
                {
                    url: absoluteImage,
                    width: 1200,
                    height: 630,
                    alt: `${selected.title} job opening at SwiftRun`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description: socialDescription,
            images: [absoluteImage],
            creator: "@swiftrunapp",
            site: "@swiftrunapp",
        },
    };
}

export default async function page({ params }: Props) {
    const { id: rawParam } = await params;
    const selected = await getCareer(rawParam);

    if (!selected) {
        notFound();
    }

    const safeImage = getSafeImageUrl(selected.image);
    const absoluteImage = getAbsoluteImageUrl(selected.image);
    const slug = createCareerSlug(selected.title);
    const canonicalUrl = `https://www.swiftrunapp.com/career/${slug}`;
    const location = selected.requirements?.[0] || "Enugu, Nigeria";
    const employmentType = selected.requirements?.[1] || "Fulltime";

    // Structured JSON-LD Schema for Google Jobs Search and search indexers
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: selected.title,
        description: selected.description,
        datePosted: selected.createdAt || new Date().toISOString(),
        employmentType: employmentType.toUpperCase().includes("FULL")
            ? "FULL_TIME"
            : employmentType.toUpperCase().includes("PART")
              ? "PART_TIME"
              : "OTHER",
        hiringOrganization: {
            "@type": "Organization",
            name: "SwiftRun",
            sameAs: "https://www.swiftrunapp.com",
            logo: "https://www.swiftrunapp.com/swiftrun_about.png",
        },
        jobLocation: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                addressLocality: location.split(",")[0]?.trim() || "Enugu",
                addressRegion: "Enugu State",
                addressCountry: "NG",
            },
        },
        image: absoluteImage,
        url: canonicalUrl,
    };

    return (
        <div>
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Header with job image if available, else default /newsBanner.jpg */}
            <SectionHeader
                title={selected.title}
                description=""
                image={safeImage || "/newsBanner.jpg"}
            >
                <div className="grid gap-6 w-full max-w-xl mx-auto">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {selected.requirements.map((item, index) => (
                            <div className="flex items-center gap-2" key={index}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>

                    {/* Centered Apply Button */}
                    <div className="flex justify-center w-full">
                        <CareerApplyButton
                            careerId={selected.id}
                            careerTitle={selected.title}
                            className="bg-[#FFB5CB] text-sm flex items-center justify-center w-full sm:w-fit py-3 px-8 sm:px-20 text-black rounded-full transition duration-300 font-primary"
                        />
                    </div>
                </div>
            </SectionHeader>

            {/* Original content layout */}
            <div className="my-20 px-10 md:px-40 grid gap-20">
                <div className="grid gap-6">
                    <h1 className="text-4xl font-bold">Who we are</h1>
                    <p>
                        SwiftRun is a logistics and delivery company built to make everyday movement easier. We connect customers, riders, and local businesses through dependable delivery experiences, thoughtful technology, and a team that cares about doing the work well.
                    </p>
                    <p>
                        From same-day deliveries to business partnerships, we are building a more connected way for people and communities to send, receive, and grow. Every role at SwiftRun contributes to that mission.
                    </p>
                </div>

                <div className="grid gap-6">
                    <h1 className="text-4xl font-bold">Job Description</h1>
                    <p>{selected.description}</p>
                </div>

                <div className="grid gap-6">
                    <h1 className="text-4xl font-bold">What you should have</h1>
                    <div className="grid gap-4">
                        {selected.shouldHave.map((item, index) => (
                            <div className="flex items-center gap-2" key={index}>
                                <div className="w-2 h-2 outline-1 outline-offset-2 outline-[#066AC0] bg-[#066AC0] rounded-full"></div>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center flex-col gap-4 mb-30">
                    <h1 className="text-4xl font-bold">Begin this journey with us</h1>
                    <CareerApplyButton
                        careerId={selected.id}
                        careerTitle={selected.title}
                        className="bg-[#FFDEBC] text-sm flex items-center justify-center w-full sm:w-fit py-3 px-8 sm:px-20 text-black rounded-full transition duration-300 font-primary"
                    />
                </div>

                <BuiltAroundYou />

                <GetSwiftRunFooter />
            </div>
        </div>
    );
}
