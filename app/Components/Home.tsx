"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useGSAP(
        () => {
            const splitTitle = new SplitType(titleRef.current!, { types: 'lines', tagName: 'span' });
            const splitText = new SplitType(textRef.current!, { types: 'lines', tagName: 'span' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                },
            });

            // Set initial state: hidden below with clip-path
            gsap.set(splitTitle.lines, { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
            gsap.set(splitText.lines, { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });

            // Animate Title Chars
            tl.to(splitTitle.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 0.8,
                ease: "power3.out"
            })
                // Animate Text Lines
                .to(splitText.lines, {
                    y: "0%",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1
                }, "-=0.5");

        },
        { scope: containerRef }
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
                            className="text-4xl md:text-6xl font-light tracking-wide uppercase"
                        >
                            Why Design Hive ?
                        </h2>
                    </div>

                    <div className="mb-10">
                        <p
                            ref={textRef}
                            className="text-lg md:text-xl leading-loose opacity-80"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                            perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                            quae ab illo inventore veritatis et quasi architecto beatae vitae
                            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                            perspiciatis unde omnis iste natus error sit voluptatem  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                            perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                            quae ab illo inventore veritatis et quasi architecto beatae vitae
                            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit.
                        </p>
                    </div>
                </div>
            </section>

            {/* Video Section */}
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
        </div>
    );
}
