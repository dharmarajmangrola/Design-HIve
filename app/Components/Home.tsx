"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // FIX PART 1: Add a state to track if the component has mounted
    const [isMounted, setIsMounted] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        // FIX PART 2: Set mounted to true once the client loads
        setIsMounted(true);

        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 200);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    useGSAP(
        () => {
            if (!titleRef.current || !textRef.current) return;

            const splitTitle = new SplitText(titleRef.current, { type: 'lines' });
            const splitText = new SplitText(textRef.current, { type: 'lines' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            });

            gsap.set(splitTitle.lines, { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
            gsap.set(splitText.lines, { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });

            tl.to(splitTitle.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.out"
            })
                .to(splitText.lines, {
                    y: "0%",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.05
                }, "-=0.9");

            return () => {
                splitTitle.revert();
                splitText.revert();
            };
        },
        { scope: containerRef, dependencies: [windowWidth] }
    );

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="w-full" ref={containerRef}>
            {/* Hero Section */}
            <section className="relative min-h-screen w-full flex justify-center items-center bg-black overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/hero-img.jpg"
                        alt="Hero Image"
                        fill
                        className="object-cover opacity-80 hero-image"
                        priority
                    />
                </div>
            </section>

            {/* Why Design Hive Section */}
            <section className="w-full py-24 px-8 md:px-16 lg:px-24 bg-background text-foreground">
                <div className="max-w-7xl mx-auto">
                    <div className="overflow-hidden mb-12">
                        <h2
                            ref={titleRef}
                            key={`home-title-${windowWidth}`}
                            className="text-4xl md:text-6xl font-light tracking-wide uppercase text-center"
                        >
                            Why Design Hive ?
                        </h2>
                    </div>

                    <div className="mb-10">
                        <p
                            ref={textRef}
                            key={`home-text-${windowWidth}`}
                            className="text-lg leading-loose text-center"
                        >
                            At Design Hive, we believe architecture is more than just buildings; it's about crafting experiences that inspire and endure. Our approach blends innovative design with sustainable practices to create spaces that resonate with their environment and the people who inhabit them. From concept to completion, we are dedicated to excellence, ensuring every detail reflects our commitment to quality and creativity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Video Section - FIX PART 3: Only render this div if mounted on client */}
            {isMounted ? (
                <div
                    className="relative w-full aspect-video overflow-hidden cursor-pointer group"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <video
                        ref={videoRef}
                        src="/hero-video.mp4"
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                    />

                    {/* Play Button Overlay */}
                    <div
                        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"
                            }`}
                    >
                        <div className="w-20 h-20 bg-black/30 backdrop-blur-sm rounded-full flex justify-center items-center border border-white/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10 text-white ml-1"
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
            ) : (
                // Optional: Render a placeholder of the same size so layout doesn't jump
                <div className="w-full aspect-video bg-gray-200"></div>
            )}
        </div>
    );
}