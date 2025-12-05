"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ProjectDetailsPage() {
    const params = useParams();
    const id = params?.id;

    // Mock data based on ID (fallback to 1 if not found or invalid)
    const projectId = typeof id === 'string' ? parseInt(id) : 1;
    const safeId = isNaN(projectId) || projectId < 1 || projectId > 10 ? 1 : projectId;

    const topImage = `/project-${safeId}.jpg`;

    // Gallery images (excluding the top image to avoid repetition if possible, or just a set list)
    // We'll just pick 4 specific images for the gallery for now
    const galleryImages = [
        "/project-2.jpg",
        "/project-3.jpg",
        "/project-4.jpg",
        "/project-5.jpg"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);

    // Refs for animation
    const containerRef = useRef<HTMLDivElement>(null); // Scope for the whole page or main section
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const textRef1 = useRef<HTMLParagraphElement>(null);
    const textRef2 = useRef<HTMLParagraphElement>(null);
    const descriptionSectionRef = useRef<HTMLElement>(null); // Trigger for the description section

    const [windowWidth, setWindowWidth] = useState(0);

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    // Handle Resize for SplitText
    useEffect(() => {
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

    // Animation for slide change
    useGSAP(() => {
        if (slideRef.current) {
            gsap.fromTo(slideRef.current,
                { opacity: 0, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
            );
        }
    }, [currentImageIndex]);

    // Animation for Text Content (SplitText)
    useGSAP(() => {
        if (!titleRef.current || !subtitleRef.current || !textRef1.current || !textRef2.current) return;

        const splitTitle = new SplitText(titleRef.current, { type: 'lines' });
        const splitSubtitle = new SplitText(subtitleRef.current, { type: 'lines' });
        const splitText1 = new SplitText(textRef1.current, { type: 'lines' });
        const splitText2 = new SplitText(textRef2.current, { type: 'lines' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: descriptionSectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });

        // Set initial state
        gsap.set([splitTitle.lines, splitSubtitle.lines], { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
        gsap.set([splitText1.lines, splitText2.lines], { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });

        // Animate Title & Subtitle
        tl.to(splitTitle.lines, {
            y: "0%",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power3.out",
            stagger: 0.05
        })
            .to(splitSubtitle.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.out",
                stagger: 0.05
            }, "-=0.8")
            // Animate Text 1
            .to(splitText1.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.out",
                stagger: 0.05
            }, "-=0.6")
            // Animate Text 2
            .to(splitText2.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.out",
                stagger: 0.05
            }, "-=0.8");

        ScrollTrigger.refresh();

        return () => {
            splitTitle.revert();
            splitSubtitle.revert();
            splitText1.revert();
            splitText2.revert();
        };

    }, { scope: containerRef, dependencies: [windowWidth] });

    const infoList = [
        "Moodboard",
        "Afspraak op locatie",
        "Kleur- en materialenplan",
        "Meubelplan incl. shoplinks",
        "Verlichtingsplan",
        "3D Video",
        "Stalenbox",
        "Presentatieboekje",
        "Eindpresentatie"
    ];

    return (
        <main ref={containerRef} className="min-h-screen w-full bg-[#F3F0E7] pt-24 pb-20">
            {/* Top Image Section */}
            <section className="w-full px-4 md:px-10 mb-24">
                <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden rounded-sm">
                    <Image
                        src={topImage}
                        alt={`Project ${safeId} Top View`}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
            </section>

            {/* Description Section */}
            <section ref={descriptionSectionRef} className="w-full px-8 md:px-16 lg:px-24 mb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="overflow-hidden mb-12 md:mb-16 text-center">
                        <h1 ref={titleRef} key={`title-${windowWidth}`} className="text-2xl md:text-3xl font-medium uppercase tracking-widest">
                            Residence Hengelo
                        </h1>
                        <p ref={subtitleRef} key={`subtitle-${windowWidth}`} className="text-sm uppercase tracking-widest opacity-50 mt-4">Minimalist Japandi Renovation</p>
                    </div>

                    <div className="space-y-8 text-center md:text-left">
                        <p ref={textRef1} key={`text1-${windowWidth}`} className="text-sm md:text-base tracking-widest [word-spacing:0.1em] leading-loose opacity-70">
                            For this residence, we were commissioned to create a comprehensive interior design that harmonizes with the architectural structure. The client expressed a strong preference for a serene yet sophisticated aesthetic—a vision that is clearly reflected in the final outcome.
                        </p>
                        <p ref={textRef2} key={`text2-${windowWidth}`} className="text-sm md:text-base tracking-widest [word-spacing:0.1em] leading-loose opacity-70">
                            The result is a delicate balance between Japandi minimalism and a refined, elegant atmosphere. Our process began with optimizing the spatial layout, which served as the foundation for a custom lighting plan. Every detail, from the material selection to the bespoke furniture, has been curated to create a cohesive and inviting living environment. We are excited to see how this design will enhance the daily lives of its inhabitants.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom Gallery Section */}
            <section className="w-full px-4 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <h3 className="text-2xl font-light uppercase tracking-wide">Project Gallery</h3>

                        {/* Navigation Arrows */}
                        <div className="flex gap-4">
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 rounded-full border border-black/20 flex justify-center items-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
                            >
                                <FaArrowLeft className="text-sm" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full border border-black/20 flex justify-center items-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
                            >
                                <FaArrowRight className="text-sm" />
                            </button>
                        </div>
                    </div>

                    {/* Gallery Slider */}
                    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-gray-200">
                        <div ref={slideRef} className="w-full h-full relative">
                            <Image
                                src={galleryImages[currentImageIndex]}
                                alt={`Gallery Image ${currentImageIndex + 1}`}
                                fill
                                className="object-cover"
                            />
                            {/* Image Counter */}
                            <div className="absolute bottom-6 right-6 bg-black/80 text-white px-4 py-2 text-xs tracking-widest uppercase backdrop-blur-sm">
                                {currentImageIndex + 1} / {galleryImages.length}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
