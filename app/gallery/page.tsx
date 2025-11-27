"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
    const [loadedVideos, setLoadedVideos] = useState<boolean[]>([false, false, false]);
    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(16).fill(false));
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const videos = [
        "/gallery-video-1.mp4",
        "/gallery-video-2.mp4",
        "/gallery-video-3.mp4",
    ];

    const images = Array.from({ length: 16 }, (_, i) => `/gallery-img-${i + 1}.jpg`);

    const filters = ["ONGOING", "COMPLETED", "PROPOSAL", "STUDIES"];

    useEffect(() => {
        setIsMounted(true);
        if (containerRef.current) {
            const ctx = gsap.context(() => {
                const items = document.querySelectorAll(".gallery-item");
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.05,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, []);

    const handleVideoLoad = (index: number) => {
        setLoadedVideos((prev) => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
        });
    };

    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
        });
    };

    const handleMouseEnter = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            video.play().catch((err) => console.error("Video play failed:", err));
            setPlayingVideo(index);
        }
    };

    const handleMouseLeave = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            video.pause();
            video.currentTime = 0;
            setPlayingVideo(null);
        }
    };

    return (
        <main className="min-h-screen w-full bg-[#F3F0E7] pt-32 pb-20 px-4 md:px-10">
            <div className="max-w-[1800px] mx-auto" ref={containerRef}>

                {/* Videos Section */}
                {isMounted ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                        {videos.map((src, index) => (
                            <div
                                key={index}
                                className="relative w-full overflow-hidden bg-gray-200 group cursor-pointer aspect-square"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                {!loadedVideos[index] && (
                                    <div className="absolute inset-0 bg-gray-300 animate-pulse z-10" />
                                )}
                                <video
                                    ref={(el) => { videoRefs.current[index] = el; }}
                                    src={src}
                                    className={`w-full h-full object-cover transition-opacity duration-500 ${loadedVideos[index] ? "opacity-100" : "opacity-0"
                                        }`}
                                    loop
                                    muted
                                    playsInline
                                    onLoadedData={() => handleVideoLoad(index)}
                                />

                                {/* Play Button Overlay */}
                                <div
                                    className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 pointer-events-none ${playingVideo === index ? "opacity-0" : "opacity-100"
                                        }`}
                                >
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-black/30 backdrop-blur-sm rounded-full flex justify-center items-center border border-white/20">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="white"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                        {/* Placeholder for server-side rendering to avoid layout shift */}
                        {videos.map((_, index) => (
                            <div key={index} className="w-full bg-gray-200 aspect-square" />
                        ))}
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 text-sm md:text-base font-medium tracking-widest uppercase text-[#171717]">
                    {filters.map((filter) => (
                        <button key={filter} className="hover:opacity-60 transition-opacity">
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Images Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="gallery-item flex flex-col group"
                        >
                            <div className="relative w-full aspect-square overflow-hidden mb-4 bg-gray-200">
                                {!loadedImages[index] && (
                                    <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                                )}
                                <Image
                                    src={src}
                                    alt={`Gallery Image ${index + 1}`}
                                    fill
                                    className={`object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${loadedImages[index] ? "opacity-100" : "opacity-0"
                                        }`}
                                    onLoad={() => handleImageLoad(index)}
                                />
                            </div>

                            {/* Content below image */}
                            <div className="flex justify-between items-start">
                                <div className="max-w-[70%]">
                                    <h3 className="text-sm font-bold text-[#171717] mb-1">kirem neno ispum ipsums</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase">Realisatie</p>
                                    <p className="text-[10px] text-gray-400 leading-tight max-w-[100px]">
                                        Een unieke kijk op deze woning in Hengelo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}