"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
            title: "Modern Villa",
            category: "Residential",
            description: "A seamless blend of nature and modern architecture, providing a sanctuary of peace.",
        },
        {
            id: 2,
            image: "/featured-project-2.jpg",
            title: "Urban Loft",
            category: "Commercial",
            description: "Redefining city living with sustainable materials and smart spatial design.",
        },
        {
            id: 3,
            image: "/featured-project-3.jpg",
            title: "The Gallery",
            category: "Public Space",
            description: "An open space designed to inspire creativity and foster community interaction.",
        },
    ];

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".featured-card");
        
        const splitTitles = cards.map(card => new SplitText(card.querySelector(".featured-title"), { type: "chars" }));
        const splitDescs = cards.map(card => new SplitText(card.querySelector(".featured-desc"), { type: "lines" }));

        // Initial Layout Setup
        gsap.set(cards, {
            zIndex: (i) => cards.length - i,
            scale: (i) => 1 - (i * 0.1),
            y: (i) => i * 20,
            transformOrigin: "center top"
        });

        // 1. Hide Text for ALL cards initially (including the first one)
        cards.forEach((_, i) => {
            gsap.set(splitTitles[i].chars, { yPercent: 100, opacity: 0 });
            gsap.set(splitDescs[i].lines, { yPercent: 100, opacity: 0 });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                // 2. Increase 'end' distance to account for the extra step (first card text reveal)
                end: `+=${(cards.length + 0.5) * 100}%`, 
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // 3. Step 1: Animate FIRST card text IN immediately
        tl.to(splitTitles[0].chars, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: { from: "random", amount: 0.5 }
        })
        .to(splitDescs[0].lines, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1
        }, "<0.3");


        // 4. Step 2: Loop through rest of the cards
        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                const nextCard = cards[i + 1];
                const nextTitleChars = splitTitles[i + 1].chars;
                const nextDescLines = splitDescs[i + 1].lines;

                tl
                // Move current card OUT
                .to(card, {
                    y: () => -window.innerHeight,
                    scale: 0.9,
                    duration: 1,
                    ease: "power2.inOut"
                })
                // Move next card IN
                .to(nextCard, {
                    scale: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.inOut"
                }, "<")
                
                // Animate NEXT text IN (Random letters)
                .to(nextTitleChars, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: { from: "random", amount: 0.5 }
                }, "<0.2")
                
                .to(nextDescLines, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.1
                }, "<0.4");
            }
        });
        
        return () => {
            splitTitles.forEach(s => s.revert());
            splitDescs.forEach(s => s.revert());
        }

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
                        className="featured-card absolute w-full h-full overflow-hidden border border-white/10 shadow-2xl"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10" />

                        {/* Content */}
                        <div className="relative z-20 w-full h-full flex flex-col justify-end p-8 md:p-16 lg:p-24">
                            <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16">
                                <div className="max-w-3xl">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-0.5 bg-white/60"></div>
                                        <span className="text-sm tracking-[0.2em] uppercase font-medium text-white/80">
                                            {project.category}
                                        </span>
                                    </div>

                                    <div className="overflow-hidden mb-12">
                                        <h3 className="featured-title text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] uppercase tracking-tight">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <div className="overflow-hidden">
                                        <p className="featured-desc text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-xl">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}