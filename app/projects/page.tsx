"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);

    const projects = Array.from({ length: 10 }, (_, i) => `/project-${i + 1}.jpg`);

    useEffect(() => {
        setIsMounted(true);
        if (containerRef.current && sliderRef.current) {
            const ctx = gsap.context(() => {
                const totalWidth = sliderRef.current!.scrollWidth;
                const windowWidth = window.innerWidth;
                const xMove = -(totalWidth - windowWidth);

                const tl = gsap.to(sliderRef.current, {
                    x: xMove,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: `+=${totalWidth}`, // Scroll distance based on content width
                        pin: true,
                        scrub: 1,
                        onUpdate: (self) => {
                            if (progressRef.current) {
                                const progress = Math.round(self.progress * 100);
                                progressRef.current.innerText = `(${progress.toString().padStart(2, '0')}%)`;
                            }
                        }
                    }
                });
            }, containerRef);
            return () => ctx.revert();
        }
    }, [isMounted]);

    return (
        <main className="min-h-screen w-full bg-[#F3F0E7] overflow-hidden">
            {isMounted ? (
                <div ref={containerRef} className="h-screen w-full flex flex-col justify-center relative">

                    {/* Horizontal Slider */}
                    <div
                        ref={sliderRef}
                        className="flex gap-10 px-10 items-center h-[60vh] w-max"
                    >
                        {projects.map((src, index) => (
                            <div
                                key={index}
                                className="relative h-full aspect-[4/5] overflow-hidden shrink-0 bg-gray-200 group"
                            >
                                <Image
                                    src={src}
                                    alt={`Project ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white font-medium uppercase text-sm">Lorem House</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#171717] font-medium tracking-widest text-sm uppercase flex items-center gap-2">
                        <span>Scroll Down to Explore</span>
                        <span ref={progressRef}>(00%)</span>
                    </div>

                </div>
            ) : (
                // Server-side placeholder
                <div className="h-screen w-full flex items-center justify-center">
                    <div className="text-[#171717] animate-pulse">Loading Projects...</div>
                </div>
            )}
        </main>
    );
}
