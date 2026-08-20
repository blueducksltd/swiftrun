"use client"
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

export default function VideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only pause if it's currently playing and has scrolled out of view.
        // We don't auto-play on scroll-in — only the button starts playback.
        if (!entry.isIntersecting) {
          handlePause();
        }
      },
      { threshold: 0.25 } // pause once 75%+ of the video has left the viewport
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full rounded-4xl overflow-hidden"

    //   className="p-10 flex items-center justify-center h-80 bg-white rounded-4xl relative overflow-hidden"
    >
      <video
        ref={videoRef}
        src={"/videos/homepage.mp4"}
        className="w-full h-full object-cover "
        onEnded={handlePause}
        playsInline
      />

      <div
        onClick={() => {
          window.open("https://youtube.com/@swiftrunlogisticss?si=PiwqxgWjzJDUnuEQ", "_blank", "noopener,noreferrer")

        }}
        className={`w-full h-full inset-0 bg-black/50 absolute flex items-center justify-center transition-opacity duration-500 ease-in-out cursor-pointer ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
          <FaPlay />
        </div>
      </div>
    </div>
  );
}