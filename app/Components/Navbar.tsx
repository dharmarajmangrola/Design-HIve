"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "./TransitionProvider";

gsap.registerPlugin(SplitText);

export default function Navbar() {
    const { navigate } = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 1. Re-added state to track scrolling
    const [isScrolled, setIsScrolled] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const splitTextRef = useRef<SplitText | null>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    // 2. Re-added useEffect to toggle state on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = contextSafe(() => {
        if (isMenuOpen) {
            tlRef.current?.reverse().then(() => {
                setIsMenuOpen(false);
                gsap.set(".menu-link", { opacity: 0 });

                if (splitTextRef.current) {
                    splitTextRef.current.revert();
                    splitTextRef.current = null;
                }
            });
        } else {
            setIsMenuOpen(true);
            if (splitTextRef.current) splitTextRef.current.revert();

            const split = new SplitText(".menu-link", { type: "lines" });
            splitTextRef.current = split;

            gsap.set(split.lines, { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
            gsap.set(".menu-link", { opacity: 1 });

            tlRef.current = gsap.timeline();

            tlRef.current
                .to([leftPanelRef.current, rightPanelRef.current], {
                    x: "0%",
                    duration: 1,
                    ease: "power3.inOut",
                    stagger: 0
                })
                .to(split.lines, {
                    y: "0%",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.1
                });
        }
    });

    // Close menu when route changes
    useEffect(() => {
        if (isMenuOpen) {
            toggleMenu();
        }
    }, [pathname]);

    // Determine styles based on state
    const isHome = pathname === '/';
    const showWhiteBg = isScrolled && !isMenuOpen;
    const isDarkText = !isMenuOpen && (showWhiteBg || !isHome);

    return (
        <div ref={containerRef}>
            <nav
                className={`fixed top-0 left-0 w-full flex justify-between items-center px-8 z-50 transition-all duration-500 ${showWhiteBg ? "bg-[#F3F0E7]" : "bg-transparent"
                    } ${isDarkText ? "text-black" : "text-white"}`}
            >
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                        if (isMenuOpen) {
                            toggleMenu();
                        } else if (pathname === '/') {
                            setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }, 500);
                        } else {
                            navigate('/');
                        }
                    }}
                >
                    <Image
                        src="/logo.png"
                        alt="Design Hive Logo"
                        width={125}
                        height={125}
                        className={`object-contain h-22 w-auto transition-all duration-500 ${isDarkText ? "invert" : ""}`}
                    />
                </div>

                <div
                    className="flex flex-col gap-1.5 cursor-pointer group w-10 justify-center items-end"
                    onClick={toggleMenu}
                >
                    <div className="w-8 h-[2px] bg-current transition-colors duration-500"></div>
                    <div className="w-8 h-[2px] bg-current transition-colors duration-500"></div>
                    <div className="w-8 h-[2px] bg-current transition-colors duration-500"></div>
                </div>
            </nav>

            {/* Menu Overlay */}
            <div className="fixed inset-0 z-40 pointer-events-none">
                <div
                    ref={leftPanelRef}
                    className="absolute top-0 left-0 w-1/2 h-full bg-black -translate-x-full pointer-events-auto"
                ></div>

                <div
                    ref={rightPanelRef}
                    className="absolute top-0 right-0 w-1/2 h-full bg-black translate-x-full pointer-events-auto"
                ></div>

                <div
                    ref={menuContentRef}
                    className={`absolute inset-0 flex flex-col justify-center items-center text-white z-50 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                    <div className="flex flex-col gap-8 text-center">
                        <div
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0 cursor-pointer"
                            onClick={() => { router.push('/'); }}
                        >
                            Home
                        </div>
                        <div
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0 cursor-pointer"
                            onClick={() => { router.push('/projects'); }}
                        >
                            Projects
                        </div>
                        <div
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0 cursor-pointer"
                            onClick={() => { router.push('/about'); }}
                        >
                            About
                        </div>
                        <div
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0 cursor-pointer"
                            onClick={() => { router.push('/gallery'); }}
                        >
                            Gallery
                        </div>
                        <div
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0 cursor-pointer"
                            onClick={() => { router.push('/contact'); }}
                        >
                            Contact
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}