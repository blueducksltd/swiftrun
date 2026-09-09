import Link from "next/link";
import { notFound } from "next/navigation";
import BlogLikeButton from "@/components/BlogLikeButton";
import BuiltAroundYou from "@/components/BuiltAroundYou";
import DownloadTheAppBtn from "@/components/DownloadTheAppBtn";
import SectionHeaderTexts from "@/components/SectionHeaderTexts";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

type Blog = { id: string; title: string; content: string; category: string; image: string; likes: number; date: string };

async function getBlog(id: string): Promise<Blog | null> {
    if (!ObjectId.isValid(id)) return null;
    const client = await clientPromise;
    const blog = await client.db("swiftrun").collection("blogs").findOne({ _id: new ObjectId(id), status: "Published" });
    if (!blog) return null;
    return { id: blog._id.toString(), title: blog.title, content: blog.content, category: blog.category, image: blog.image || "", likes: Number(blog.likes || 0), date: new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }) };
}

async function getRelatedBlogs(id: string) {
    const client = await clientPromise;
    const blogs = await client.db("swiftrun").collection("blogs").find({ status: "Published", _id: { $ne: new ObjectId(id) } }).sort({ createdAt: -1 }).limit(2).toArray();
    return blogs.map((blog) => ({ id: blog._id.toString(), title: blog.title, category: blog.category, image: blog.image || "", date: new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }) }));
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlog(id);
    if (!blog) notFound();
    const related = await getRelatedBlogs(id);
    const image = blog.image.startsWith("http") ? `/api/blogs/blob?url=${encodeURIComponent(blog.image)}` : blog.image || "/newsBanner.jpg";

    return <div className="bg-white"><section className="relative flex min-h-[360px] items-end overflow-hidden bg-[#063f70] px-5 py-12 text-white sm:min-h-[480px] sm:px-10 lg:px-28"><div className="absolute inset-0 bg-cover bg-center opacity-65" style={{ backgroundImage: `url(${image})` }} /><div className="absolute inset-0 bg-[#063f70]/55" /><div className="relative z-10 mx-auto w-full max-w-5xl"><Link href="/news" className="mb-8 inline-flex text-sm font-semibold text-white/75 hover:text-white">← Back to news</Link><div className="max-w-3xl"><p className="text-sm font-semibold text-[#b9f0ea]">{blog.category} · {blog.date}</p><h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-6xl">{blog.title}</h1><div className="mt-6"><BlogLikeButton blogId={blog.id} initialLikes={blog.likes} /></div></div></div></section><article className="mx-auto max-w-3xl px-5 py-12 sm:py-16"><div className="blog-content text-[15px] leading-7 text-[#40535a]" dangerouslySetInnerHTML={{ __html: blog.content }} /></article>{related.length > 0 && <section className="bg-[#dceeff] px-5 py-14 sm:px-10"><div className="mx-auto max-w-5xl"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#066ac0]">Articles</p><h2 className="mt-2 font-heading text-3xl font-bold">Read more</h2></div><div className="mt-8 grid gap-5 md:grid-cols-2">{related.map((item) => { const relatedImage = item.image.startsWith("http") ? `/api/blogs/blob?url=${encodeURIComponent(item.image)}` : item.image || "/newsBanner.jpg"; return <Link key={item.id} href={`/news/${item.id}`} className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${relatedImage})` }} /><div className="p-5"><p className="text-xs font-semibold text-[#718187]">{item.category} · {item.date}</p><h3 className="mt-2 line-clamp-2 font-heading text-xl font-bold text-[#df6f9f]">{item.title}</h3></div></Link> })}</div></div></section>}<section className="mx-auto max-w-5xl px-5 py-20 text-center sm:py-28"><BuiltAroundYou /><div className="mt-24"><SectionHeaderTexts paragraph="Everything Delivered" heading="Get Swiftrun Today" /><div className="mt-6 flex justify-center"><DownloadTheAppBtn /></div></div></section></div>;
}
