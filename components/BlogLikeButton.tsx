"use client";

import { useState } from "react";
import { FiHeart } from "react-icons/fi";

export default function BlogLikeButton({ blogId, initialLikes }: { blogId: string; initialLikes: number }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const [saving, setSaving] = useState(false);

    const toggleLike = async () => {
        if (saving) return;
        setSaving(true);
        try {
            const action = liked ? "unlike" : "like";
            const response = await fetch(`/api/blogs/${blogId}/like`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) });
            if (!response.ok) return;
            const data = await response.json() as { likes: number };
            setLikes(data.likes);
            setLiked(!liked);
        } finally {
            setSaving(false);
        }
    };

    return <button type="button" onClick={toggleLike} disabled={saving} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${liked ? "border-[#1893A6] bg-[#1893A6] text-white" : "border-[#dfe8e5] bg-white text-[#52656b] hover:border-[#1893A6] hover:text-[#1893A6]"}`} aria-label={liked ? "Unlike this blog" : "Like this blog"}><FiHeart className={liked ? "fill-current" : ""} /> {likes} {likes === 1 ? "like" : "likes"}</button>;
}
