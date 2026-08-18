"use client";
import { useDownloadApp } from '@/stores/DownloadAppProvider';
import LearnMore from './LearnMore'
import { useRouter } from 'next/navigation';

type BannerHref = "customer" | "rider" | `/${string}`;

export default function BannerButton({ text, bg, href }: { text: string; bg: string; href: BannerHref }) {
    const { setState } = useDownloadApp();
    const router = useRouter();

    const handleClick = () => {
        if (href.startsWith("/")) {
            router.push(href);
            return;
        }
        if (href === "customer") {
            setState(prev => ({ ...prev, show: true, type: "customer" }));
            return;
        }
        if (href === "rider") {
            setState(prev => ({ ...prev, show: true, type: "rider" }));
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                }
            }}
            className={`group ${bg} flex items-center justify-center w-full sm:w-fit py-2 px-14 rounded-full transition duration-300 font-primary cursor-pointer`}
        >
            <LearnMore text={text} />
        </div>
    );
}