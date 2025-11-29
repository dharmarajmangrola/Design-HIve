"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransition } from "../Components/TransitionProvider";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
    const { navigate } = useTransition();
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);

    const projects = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        image: `/project-${i + 1}.jpg`,
        category: "ARCHITECTURE",
        type: "RESIDENTIAL",
        year: "2024"
    }));

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
                        className="flex gap-6 px-6 md:gap-10 md:px-10 items-center h-[55vh] md:h-[70vh] w-max"
                    >
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/projects/project-${project.id}`)}
                                className="flex flex-col gap-4 h-full shrink-0 group cursor-pointer"
                            >
                                <div className="relative h-[85%] aspect-4/5 overflow-hidden bg-gray-200">
                                    <Image
                                        src={project.image}
                                        alt={`Project ${project.id}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                        <span className="text-white text-xl tracking-[0.2em] uppercase font-light">View</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="flex items-center gap-2 text-xs tracking-widest opacity-70 uppercase font-medium text-[#171717]">
                                    <span>{project.category}</span>
                                    <span className="text-[10px]">|</span>
                                    <span>{project.type}</span>
                                    <span className="text-[10px]">|</span>
                                    <span>{project.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#171717] font-medium tracking-widest text-xs md:text-sm uppercase flex items-center gap-2 whitespace-nowrap">
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
