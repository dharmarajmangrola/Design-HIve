"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useTransition } from "./TransitionProvider";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Footer() {
    const { navigate } = useTransition();
    const containerRef = useRef<HTMLDivElement>(null);
    const qualityRef = useRef<HTMLSpanElement>(null);
    const creativityRef = useRef<HTMLSpanElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const pathname = usePathname();

    // 1. State to track when the page layout is stable
    const [isFooterReady, setIsFooterReady] = useState(false);

    // 2. Refresh logic: Wait for page transitions/pinning to finish
    useEffect(() => {
        // Reset state immediately when path changes
        setIsFooterReady(false);

        // Wait 1 second (1000ms) for the new page to load, animations to finish, and layout to settle
        const timer = setTimeout(() => {
            setIsFooterReady(true);
            ScrollTrigger.refresh();
        }, 1000);

        return () => clearTimeout(timer);
    }, [pathname]);

    useGSAP(() => {
        // 3. Prevent animations from running if the layout isn't ready
        if (!isFooterReady) return;

        // --- 1. Horizontal Scroll Text Animation ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                end: "bottom 20%",
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        tl.fromTo(qualityRef.current, { x: "-10%" }, { x: "10%", duration: 1 })
            .fromTo(creativityRef.current, { x: "10%" }, { x: "-10%", duration: 1 }, "<");


        // --- 2. "DESIGN HIVE" Random Letter Animation ---
        if (titleRef.current) {
            // Always revert old split before creating a new one to avoid nesting divs
            const split = new SplitText(titleRef.current, { type: "chars" });

            // Set initial state (Hidden down)
            gsap.set(split.chars, { yPercent: 100 });

            gsap.to(split.chars, {
                yPercent: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: { from: "random", amount: 0.2 }, // Random "Rain" effect
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%", // Trigger slightly earlier
                    toggleActions: "play none none reverse"
                }
            });

            // Cleanup: Revert SplitText when unmounting or changing pages
            return () => {
                split.revert();
            }
        }

    }, {
        scope: containerRef,
        dependencies: [isFooterReady] // Key dependency: Re-run this when ready becomes true
    });

    return (
        <footer className="w-full bg-[#F3F0E7] text-black flex flex-col justify-between items-center overflow-hidden">

            {/* Focused on Quality Section */}
            <div ref={containerRef} className="w-full px-8 md:px-16 lg:px-24 py-24 text-center relative border-b border-black">
                <div className="absolute top-0 left-0 w-full h-px bg-black"></div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-light uppercase leading-tight mb-16">
                    <span ref={qualityRef} className="block">Focused on Quality</span>
                    <span ref={creativityRef} className="block mt-4 md:mt-0">Driven by Creativity</span>
                </h2>
                <button
                    onClick={() => navigate('/contact')}
                    className="px-10 py-5 bg-black text-white rounded-full text-sm tracking-widest cursor-pointer uppercase hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    Start a Project
                </button>
            </div>

            {/* Main Footer Content */}
            <div className="w-full px-8 md:px-16 lg:px-24 pb-8 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 justify-items-center items-start">
                    {/* Logo Column */}
                    <div className="md:col-span-3 h-full flex flex-col justify-start items-center">
                        <div className="flex justify-center items-center gap-2 h-full mix-blend-difference">
                            <Image
                                src="/logo.png"
                                alt="Design Hive Logo"
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="md:col-span-3 flex flex-col gap-6 justify-start items-center md:items-start">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">(NAVIGATION)</h3>
                        <nav className="flex flex-col gap-2 text-lg opacity-80 items-center">
                            <div
                                onClick={() => {
                                    if (pathname === '/') {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    } else {
                                        navigate('/');
                                    }
                                }}
                                className="cursor-pointer hover:opacity-60 transition-opacity"
                            >
                                Home
                            </div>
                            <div onClick={() => navigate('/about')} className="cursor-pointer hover:opacity-60 transition-opacity">About Us</div>
                            <div onClick={() => navigate('/projects')} className="cursor-pointer hover:opacity-60 transition-opacity">Projects</div>
                            <div onClick={() => navigate('/gallery')} className="cursor-pointer hover:opacity-60 transition-opacity">Gallery</div>
                            <div onClick={() => navigate('/contact')} className="cursor-pointer hover:opacity-60 transition-opacity">Contact Us</div>
                        </nav>
                    </div>

                    {/* Follow Column */}
                    <div className="md:col-span-3 flex flex-col gap-6 justify-start items-center">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">(FOLLOW)</h3>
                        <div className="flex flex-col gap-4 text-lg opacity-80 items-center">
                            <a href="#" className="flex items-center gap-3 hover:opacity-100 transition-opacity">
                                <FaInstagram className="text-xl" /> Instagram
                            </a>
                            <a href="#" className="flex items-center gap-3 hover:opacity-100 transition-opacity">
                                <FaFacebook className="text-xl" /> Facebook
                            </a>
                            <a href="#" className="flex items-center gap-3 hover:opacity-100 transition-opacity">
                                <FaLinkedin className="text-xl" /> Linkedin
                            </a>
                        </div>
                    </div>

                    {/* Information Column */}
                    <div className="md:col-span-3 flex flex-col gap-6 justify-center items-center">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">(INFORMATION)</h3>
                        <div className="flex flex-col gap-4 text-lg opacity-80 items-center text-center md:text-left">
                            <p className="flex items-center gap-3 justify-center text-center">
                                <MdLocationOn className="text-xl shrink-0" />
                                <span>1032, lorem</span>
                            </p>
                            <p className="flex items-center gap-3 justify-center">
                                <MdEmail className="text-xl shrink-0" />
                                <span>info@lorem.com</span>
                            </p>
                            <p className="flex items-center gap-3 justify-center">
                                <MdPhone className="text-xl shrink-0" />
                                <span>0283383838</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Big Text with Ref */}
                <div className="w-full overflow-hidden mb-16">
                    <h1
                        ref={titleRef}
                        className="text-[15vw] md:text-[12vw] leading-none font-light tracking-tighter text-center"
                    >
                        DESIGN HIVE
                    </h1>
                </div>

                {/* Bottom Section */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs md:text-sm uppercase tracking-widest opacity-60 gap-4 md:gap-0 border-t border-black/10 pt-8">
                    <div className="text-center md:text-left">
                        <p>&copy; 2025 DESIGN HIVE</p>
                    </div>

                    <div className="text-center md:text-right">
                        <p>MADE BY <span className="underline cursor-pointer hover:opacity-100">BEMOTION</span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}