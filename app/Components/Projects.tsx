"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const projects = [
        {
            id: 1,
            image: "/project-1.jpg",
            category: "ARCHITECTURE",
            type: "HOSPITALITY",
            year: "2023",
        },
        {
            id: 2,
            image: "/project-2.jpg",
            category: "ARCHITECTURE",
            type: "HOSPITALITY",
            year: "2023",
        },
        {
            id: 3,
            image: "/project-3.jpg",
            category: "ARCHITECTURE",
            type: "HOSPITALITY",
            year: "2023",
        },
    ];

    const featuredProjects = [
        {
            id: 1,
            image: "/featured-project-1.jpg",
            title: "Lorem Ipsum",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        {
            id: 2,
            image: "/featured-project-2.jpg",
            title: "Lorem Ipsum",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        {
            id: 3,
            image: "/featured-project-3.jpg",
            title: "Lorem Ipsum",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
    ];

    useGSAP(() => {
        const cards = gsap.utils.toArray(".featured-card");

        // Initial state setup
        gsap.set(cards, {
            zIndex: (i) => cards.length - i,
            scale: (i) => 1 - (i * 0.1),
            y: (i) => i * 20,
            transformOrigin: "center top"
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${cards.length * 100}%`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true, // 1. IMPORTANT: Recalculate values on resize
            }
        });

        // Animate each card except the last one
        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                tl.to(card as gsap.TweenTarget, {
                    // 2. IMPORTANT: Use a function () => ... so it re-evaluates the height
                    y: () => -window.innerHeight, 
                    duration: 1,
                    ease: "power2.inOut"
                })
                    .to(cards[i + 1] as gsap.TweenTarget, {
                        scale: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    }, "<");
            }
        });

    }, { scope: containerRef });

    return (
        <div className="w-full bg-background text-foreground">
            {/* Existing Projects Grid Section */}
            <section className="min-h-screen w-full py-24 px-8 md:px-16 lg:px-24 flex flex-col justify-center">
                <div className="max-w-[1400px] mx-auto w-full">
                    <div className="flex flex-col justify-center items-center mb-16 md:mb-24">
                        <h2 className="text-5xl md:text-7xl font-light tracking-wide uppercase mb-12 text-center">
                            Projects
                        </h2>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base tracking-widest uppercase font-medium opacity-80">
                            <span className="cursor-pointer hover:opacity-100 transition-opacity">Ongoing Project</span>
                            <span className="cursor-pointer hover:opacity-100 transition-opacity">Completed Project</span>
                            <span className="cursor-pointer hover:opacity-100 transition-opacity">Proposal Project</span>
                            <span className="cursor-pointer hover:opacity-100 transition-opacity">Studies</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {projects.map((project) => (
                            <div key={project.id} className="group cursor-pointer">
                                <div className="relative w-full aspect-4/3 overflow-hidden rounded-2xl mb-6">
                                    <Image
                                        src={project.image}
                                        alt={`Project ${project.id}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm tracking-widest opacity-70 uppercase font-medium">
                                    <span>{project.category}</span>
                                    <span className="text-[10px]">|</span>
                                    <span>{project.type}</span>
                                    <span className="text-[10px]">|</span>
                                    <span>{project.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button className="px-8 py-4 bg-black text-white rounded-full text-sm tracking-widest cursor-pointer uppercase hover:scale-105 active:scale-95 transition-all duration-300">
                            View All Works
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section ref={containerRef} className="relative h-screen w-full overflow-hidden text-white flex items-center justify-center">
                {featuredProjects.map((project, index) => (
                    <div
                        key={project.id}
                        className="featured-card absolute w-full h-[80vh] overflow-hidden border border-white/20 bg-neutral-900 flex items-end p-8 md:p-16 lg:p-24"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-60"
                            priority={index === 0}
                        />
                        <div className="relative z-10 max-w-4xl">
                            <span className="block text-sm md:text-base tracking-widest uppercase mb-4 opacity-80">Featured Project</span>
                            <h3 className="text-5xl md:text-7xl font-light mb-8 leading-none">{project.title}</h3>
                            <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl">
                                {project.description}
                            </p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}