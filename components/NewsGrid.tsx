"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimationSection from "./AnimationSection";

type Tab = "All" | "How Tos" | "News";
type Blog = { id: string; title: string; content: string; category: string; image: string; date: string };
const tabs: Tab[] = ["All", "How Tos", "News"];

function getExcerpt(content: string) {
    const text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return text.length > 150 ? `${text.slice(0, 150)}...` : text;
}

export default function NewsGrid() {
    const [selectedTab, setSelectedTab] = useState<Tab>("All");
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blogs").then(async (response) => {
            if (!response.ok) throw new Error("Failed to load blogs");
            setBlogs(await response.json() as Blog[]);
        }).catch(() => setBlogs([])).finally(() => setLoading(false));
    }, []);

    const filteredBlogs = blogs.filter((blog) => selectedTab === "All" || blog.category === selectedTab);

    return <div>
        <div className="w-full overflow-x-auto md:overflow-visible"><div className="flex w-max gap-4 px-4 md:grid md:w-full md:grid-cols-3 md:gap-20 md:px-20">
            {tabs.map((tab) => <button key={tab} type="button" onClick={() => setSelectedTab(tab)} className={`flex w-[calc(33.333vw-2rem)] shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full border-2 p-3 md:w-auto md:shrink ${selectedTab === tab ? "border-none bg-[#1893A6] text-white" : "border-[#00000008] bg-[#0000000D]"}`}>{tab}</button>)}
        </div></div>

        <div className="my-10 grid grid-cols-1 gap-10 overflow-hidden md:my-20 md:grid-cols-2">
            {loading ? <div className="col-span-1 flex justify-center py-20 text-sm text-gray-400 md:col-span-2">Loading stories...</div> : filteredBlogs.length === 0 ? <div className="col-span-1 flex flex-col items-center justify-center gap-3 py-20 text-center md:col-span-2"><h2 className="text-xl font-bold text-gray-500">No stories found</h2><p className="text-sm text-gray-400">{selectedTab === "All" ? "There are no published stories yet." : `No published stories in ${selectedTab}.`}</p></div> : filteredBlogs.map((blog, index) => {
                const isEven = index % 2 === 0;
                const image = blog.image.startsWith("http") ? `/api/blogs/blob?url=${encodeURIComponent(blog.image)}` : blog.image;
                return <AnimationSection key={blog.id} animation={isEven ? "slideRight" : "slideLeft"}><Link href={`/news/${blog.id}`} className={`${isEven ? "bg-[#F9BACA33]" : "bg-[#8DD8EB33]"} block overflow-hidden rounded-4xl transition hover:-translate-y-1 hover:shadow-lg`}><article><div className="relative h-72 w-full bg-cover bg-center" style={{ backgroundImage: `url(${image || "/car2.jpg"})` }} role="img" aria-label={blog.title} /><div className="grid gap-4 p-5"><div className="flex items-center gap-3 text-base md:text-sm"><span>{blog.category}</span><span className="h-2 w-px bg-black" /><span>{blog.date}</span></div><h2 className={`text-xl font-extrabold ${isEven ? "text-[#DF6F9F]" : "text-[#33A2B5]"}`}>{blog.title}</h2><p>{getExcerpt(blog.content)}</p></div></article></Link></AnimationSection>;
            })}
        </div>
    </div>;
}
