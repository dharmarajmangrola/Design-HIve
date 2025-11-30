"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    // Animation for slide change
    useGSAP(() => {
        if (slideRef.current) {
            gsap.fromTo(slideRef.current,
                { opacity: 0, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
            );
        }
    }, [currentImageIndex]);

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
        <main className="min-h-screen w-full bg-[#F3F0E7] pt-24 pb-20">
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

            {/* Info Section - Reverted to Original with Hover Effects */}
            <section className="w-full px-6 md:px-20 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
                    {/* Left Column: Title and List */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <h2 className="text-4xl md:text-5xl font-light mb-10 uppercase tracking-wide">Info</h2>
                        <ul className="space-y-0 text-sm uppercase tracking-wider text-[#171717]/80">
                            {infoList.map((item, index) => (
                                <li key={index} className="group relative border-b border-[#171717]/20 overflow-hidden cursor-pointer">
                                    {/* Animation: Scale from center, slower duration */}
                                    <div className="absolute inset-0 bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out origin-center"></div>
                                    <span className="relative z-10 block py-3 px-4 group-hover:text-white transition-colors duration-500">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column: Description */}
                    <div className="md:col-span-7 lg:col-span-6 lg:col-start-7 flex flex-col justify-start pt-2">
                        <h2 className="text-4xl md:text-5xl font-light mb-10 uppercase tracking-wide">Description</h2>
                        <p className="text-sm md:text-base leading-relaxed text-[#171717]/90 text-justify">
                            For this residence, we were commissioned to create a comprehensive interior design that harmonizes with the architectural structure. The client expressed a strong preference for a serene yet sophisticated aesthetic—a vision that is clearly reflected in the final outcome. The result is a delicate balance between Japandi minimalism and a refined, elegant atmosphere. Our process began with optimizing the spatial layout, which served as the foundation for a custom lighting plan. Every detail, from the material selection to the bespoke furniture, has been curated to create a cohesive and inviting living environment. We are excited to see how this design will enhance the daily lives of its inhabitants.
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
