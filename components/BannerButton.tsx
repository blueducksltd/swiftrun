"use client";
import { useDownloadApp } from '@/stores/DownloadAppProvider';
import LearnMore from './LearnMore'
import { useRouter } from 'next/navigation';

type BannerHref = "customer" | "rider" | `/${string}` | `http${string}` | `#${string}`;

export default function BannerButton({
    text,
    bg,
    href,
    onClick,
}: {
    text: string;
    bg: string;
    href?: BannerHref;
    onClick?: () => void;
}) {
    const { setState } = useDownloadApp();
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        if (!href) return;

        if (href.startsWith("http")) {
            window.location.href = href;
            return;
        }
        if (href.startsWith("/") || href.startsWith("#")) {
            router.push(href);
            return;
        }
        if (href === "customer") {
            setState(prev => ({ ...prev, show: true, type: "user" }));
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