"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransition } from "../Components/TransitionProvider";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
    const { navigate } = useTransition();
    const [loadedVideos, setLoadedVideos] = useState<boolean[]>([false]);
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [activeFilter, setActiveFilter] = useState("ALL");

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const videos = [
        "/gallery-video-1.mp4",
    ];

    const projects = [
        { id: 1, src: "/gallery-img-1.jpg", title: "Modern Villa", category: "Residential", location: "New York" },
        { id: 2, src: "/gallery-img-2.jpg", title: "Urban Loft", category: "Interior", location: "London" },
        { id: 3, src: "/gallery-img-3.jpg", title: "Coastal Retreat", category: "Residential", location: "Sydney" },
        { id: 4, src: "/gallery-img-4.jpg", title: "City Library", category: "Public", location: "Berlin" },
        { id: 5, src: "/gallery-img-5.jpg", title: "Office Complex", category: "Commercial", location: "Tokyo" },
        { id: 6, src: "/gallery-img-6.jpg", title: "Minimalist Apartment", category: "Interior", location: "Paris" },
        { id: 7, src: "/gallery-img-7.jpg", title: "Forest Cabin", category: "Residential", location: "Vancouver" },
        { id: 8, src: "/gallery-img-8.jpg", title: "Art Museum", category: "Public", location: "Copenhagen" },
        { id: 9, src: "/gallery-img-9.jpg", title: "Skyline Penthouse", category: "Residential", location: "Dubai" },
        { id: 10, src: "/gallery-img-10.jpg", title: "Industrial Workspace", category: "Commercial", location: "Chicago" },
        { id: 11, src: "/gallery-img-11.jpg", title: "Lakeside Home", category: "Residential", location: "Zurich" },
        { id: 12, src: "/gallery-img-12.jpg", title: "Cultural Center", category: "Public", location: "Barcelona" },
        { id: 13, src: "/gallery-img-13.jpg", title: "Heritage Renovation", category: "Restoration", location: "Rome" },
        { id: 14, src: "/gallery-img-14.jpg", title: "Eco-Friendly Housing", category: "Residential", location: "Stockholm" },
        { id: 15, src: "/gallery-img-15.jpg", title: "Luxury Resort", category: "Hospitality", location: "Bali" },
        { id: 16, src: "/gallery-img-16.jpg", title: "Public Park Pavilion", category: "Public", location: "Melbourne" },
    ];

    const filters = ["ALL", "RESIDENTIAL", "INTERIOR", "COMMERCIAL", "PUBLIC", "HOSPITALITY", "RESTORATION"];

    const filteredProjects = activeFilter === "ALL"
        ? projects
        : projects.filter(project => project.category.toUpperCase() === activeFilter);

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
    }, [activeFilter]);

    const handleVideoLoad = (index: number) => {
        setLoadedVideos((prev) => {
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
                    <div className="w-full mb-16">
                        {videos.map((src, index) => (
                            <div
                                key={index}
                                className="relative w-full overflow-hidden bg-gray-200 group cursor-pointer aspect-video"
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
                    <div className="w-full mb-16">
                        {/* Placeholder for server-side rendering to avoid layout shift */}
                        {videos.map((_, index) => (
                            <div key={index} className="w-full bg-gray-200 aspect-video" />
                        ))}
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 text-sm md:text-base font-medium tracking-widest uppercase text-[#171717]">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`transition-all duration-300 ${activeFilter === filter ? "opacity-100 border-b border-black" : "opacity-40 hover:opacity-70"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Images Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="gallery-item flex flex-col group"
                        >
                            <div className="relative w-full aspect-square overflow-hidden mb-4 bg-gray-200">
                                <Image
                                    src={project.src}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105 opacity-0"
                                    onLoadingComplete={(image) => image.classList.remove("opacity-0")}
                                />
                            </div>

                            {/* Content below image */}
                            <div className="flex justify-between items-start mt-2">
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-semibold text-[#171717] uppercase tracking-wide leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">{project.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider border border-gray-300 px-2 py-1 rounded-full">
                                        {project.category}
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
