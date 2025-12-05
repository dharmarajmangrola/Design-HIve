"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerSectionRef = useRef<HTMLElement>(null);
    const headerTitleRef = useRef<HTMLHeadingElement>(null);
    const introTextRef = useRef<HTMLParagraphElement>(null);
    const introTextRef2 = useRef<HTMLParagraphElement>(null);
    const introTextRef3 = useRef<HTMLParagraphElement>(null);
    const timelineContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [windowWidth, setWindowWidth] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
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

    useGSAP(() => {
        if (!headerTitleRef.current) return;

        // Initialize SplitText with a custom class for words to make selection easier
        const splitHeaderTitle = new SplitText(headerTitleRef.current, { type: 'lines, words', wordsClass: "header-word" });

        // Header Entry Animation
        const tlHeader = gsap.timeline();

        gsap.set(splitHeaderTitle.lines, { y: "100%" }); // Removed clipPath
        gsap.set(".header-inline-img", { opacity: 0, scale: 0.8 });

        tlHeader
            .to(splitHeaderTitle.lines, {
                y: "0%",
                // Removed clipPath
                duration: 1,
                ease: "power3.out",
                stagger: 0.05
            })
            .to(".header-inline-img", {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.2
            }, "-=0.5");

        // Select all words and inline images in DOM order
        const itemsToAnimate = headerTitleRef.current.querySelectorAll(".header-word, .header-inline-img");

        gsap.to(itemsToAnimate, {
            scrollTrigger: {
                trigger: headerSectionRef.current,
                start: "top top",
                end: "center top",
                scrub: 1
            },
            x: -100,
            opacity: 0,
            filter: "blur(10px)",
            stagger: 0.1,
            ease: "none"
        });

        // Intro Section Animation
        if (introTextRef.current && introTextRef2.current && introTextRef3.current) {
            const splitIntroText = new SplitText(introTextRef.current, { type: 'lines' });
            const splitIntroText2 = new SplitText(introTextRef2.current, { type: 'lines' });
            const splitIntroText3 = new SplitText(introTextRef3.current, { type: 'lines' });

            gsap.set([splitIntroText.lines, splitIntroText2.lines, splitIntroText3.lines], { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });

            gsap.timeline({
                scrollTrigger: {
                    trigger: introTextRef.current,
                    start: "top 65%",
                    toggleActions: "play none none none"
                }
            })
                .to(splitIntroText.lines, {
                    y: "0%",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.05
                })
                .to(splitIntroText2.lines, {
                    y: "0%",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.05
                }, "-=0.9")
                .to(splitIntroText3.lines, {
                    y: "0%",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.05
                }, "-=0.9");
        }

        return () => {
            splitHeaderTitle.revert();
            // Revert others if defined...
        };

    }, { scope: containerRef, dependencies: [windowWidth, isMounted] });

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

    const teamMembers = [
        { name: "Alex Morgan", role: "Principal Architect", img: "/about-page-img-2.jpg" },
        { name: "Sarah Jenkins", role: "Interior Lead", img: "/about-page-img-3.jpg" },
        { name: "David Chen", role: "Senior Designer", img: "/about-page-img-4.jpg" },
        { name: "Emily White", role: "Project Manager", img: "/about-page-img-5.jpg" },
    ];

    const timelineEvents = [
        { year: "2017", title: "Inception", desc: "Design Hive was founded with a vision to create spaces that inspire." },
        { year: "2019", title: "Expansion", desc: "Opened our second studio and expanded our team of creatives." },
        { year: "2021", title: "Global Reach", desc: "Started working on international projects across Europe and Asia." },
        { year: "2023", title: "Sustainability", desc: "Launched our green initiative, committing to carbon-neutral designs." },
        { year: "2025", title: "Future", desc: "Continuing to push boundaries and redefine modern architecture." },
    ];

    return (
        <main ref={containerRef} className="min-h-screen w-full bg-[#F3F0E7]">

            {/* 1. Header Section */}
            <section ref={headerSectionRef} className="w-full min-h-[70vh] py-20 px-6 md:px-16 lg:px-24 flex items-center justify-center">
                <div className="max-w-[1600px] mx-auto text-center">
                    <h1 ref={headerTitleRef} key={`header-${windowWidth}`} className="text-2xl md:text-5xl lg:text-7xl font-medium uppercase leading-tight tracking-wide whitespace-normal">
                        Crafting <span className="inline-block align-middle w-10 h-6 md:w-16 md:h-10 lg:w-24 lg:h-16 rounded-full overflow-hidden mx-1 md:mx-2 header-inline-img relative"><Image src="/about-img-1.jpg" alt="icon" fill className="object-cover" /></span> Your <br className="hidden md:block" />
                        Vision <span className="inline-block align-middle w-10 h-6 md:w-16 md:h-10 lg:w-24 lg:h-16 rounded-full overflow-hidden mx-1 md:mx-2 header-inline-img relative"><Image src="/about-img-2.jpg" alt="icon" fill className="object-cover" /></span> Into <br className="hidden md:block" />
                        Built <span className="inline-block align-middle w-10 h-6 md:w-16 md:h-10 lg:w-24 lg:h-16 rounded-full overflow-hidden mx-1 md:mx-2 header-inline-img relative"><Image src="/project-3.jpg" alt="icon" fill className="object-cover" /></span> Reality
                    </h1>
                </div>
            </section>

            {/* 2. Intro / Founders Section */}
            <section className="w-full px-6 md:px-16 lg:px-24 mb-20 bg-gray-100/50 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 overflow-hidden">
                        <h2 key={`intro-title-${windowWidth}`} className="text-xl md:text-4xl font-medium uppercase tracking-widest">
                            Visionaries behind the Hive
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative rounded-sm overflow-hidden">
                            <Image
                                src="/about-page-img-1.jpg"
                                alt="Founders"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="overflow-hidden">
                                <p ref={introTextRef} key={`intro-text-${windowWidth}`} className="text-sm md:text-base tracking-widest [word-spacing:0.1em] leading-loose opacity-70">
                                    Founded by a duo of passionate architects, Design Hive started as a small studio with big dreams. Today, we are a collective of thinkers, makers, and doers who share a common goal: to create exceptional environments.
                                </p>
                            </div>
                            <div className="overflow-hidden">
                                <p ref={introTextRef2} key={`intro-text-2-${windowWidth}`} className="text-sm md:text-base tracking-widest [word-spacing:0.1em] leading-loose opacity-70">
                                    Our approach is collaborative and client-centric. We listen, we observe, and we create. From the initial concept to the final detail, we are dedicated to delivering excellence in every project.
                                </p>
                            </div>
                            <div className="overflow-hidden">
                                <p ref={introTextRef3} key={`intro-text-3-${windowWidth}`} className="text-sm md:text-base tracking-widest [word-spacing:0.1em] leading-loose opacity-70">
                                    We believe that great design is not just about aesthetics, but about how a space feels and functions. It is about creating places that improve the quality of life for those who use them.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Team Grid Section */}
            <section className="w-full px-6 md:px-16 lg:px-24 mb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-10">
                        <div className="overflow-hidden">
                            <h2 key={`team-title-${windowWidth}`} className="text-xl md:text-4xl font-medium uppercase tracking-widest">
                                Meet the Team
                            </h2>
                        </div>
                        <div className="hidden md:block">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V20M4 12H20" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden mb-6 bg-gray-200">
                                    <Image
                                        src={member.img}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-lg font-medium uppercase tracking-wide">{member.name}</h3>
                                <p className="text-sm opacity-60 tracking-widest mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <h3 className="text-xl md:text-3xl font-medium uppercase tracking-widest mb-8">
                            Want to join us?
                        </h3>
                        <button className="px-8 py-4 bg-black text-white text-xs md:text-sm font-bold tracking-[0.2em] rounded-full uppercase hover:scale-105 transition-transform duration-300">
                            See Openings
                        </button>
                    </div>
                </div>
            </section>

            {/* 4. Video Section */}
            <section className="w-full mb-20">
                <div
                    className="w-full h-[50vh] md:h-[80vh] relative overflow-hidden cursor-pointer group"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {isMounted ? (
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                        >
                            <source src="/about-video.mp4" type="video/mp4" />
                        </video>
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                    <div className={`absolute inset-0 bg-black/10 flex justify-center items-center transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
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
            </section>

            {/* 5. Timeline Section */}
            <section className="w-full px-6 md:px-16 lg:px-24 mb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 overflow-hidden border-b border-black/10 pb-6">
                        <h2 key={`timeline-title-${windowWidth}`} className="text-xl md:text-4xl font-medium uppercase tracking-widest">
                            Our Journey
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="w-full lg:w-1/2 h-[400px] md:h-[600px] relative overflow-hidden">
                            <Image
                                src="/project-5.jpg"
                                alt="Studio Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col justify-between py-4 relative" ref={timelineContainerRef}>
                            {/* Vertical Line Container Removed */}

                            {timelineEvents.map((event, index) => (
                                <div key={index} className="flex gap-6 md:gap-8 group relative z-10">
                                    <div className="w-16 pt-1">
                                        <span className="text-sm font-bold tracking-widest opacity-40 group-hover:opacity-100 transition-opacity duration-300">{event.year}</span>
                                    </div>
                                    <div className="pb-8 pl-6 md:pl-8 relative">
                                        <h4 className="text-lg font-medium uppercase tracking-wide mb-2">{event.title}</h4>
                                        <p className="text-sm opacity-60 tracking-wide leading-relaxed max-w-md">
                                            {event.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
