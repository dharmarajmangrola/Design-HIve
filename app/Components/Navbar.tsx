"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(SplitText);

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const splitTextRef = useRef<SplitText | null>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

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
            // Close Menu
            tlRef.current?.reverse().then(() => {
                setIsMenuOpen(false);

                // Hide links again
                gsap.set(".menu-link", { opacity: 0 });

                if (splitTextRef.current) {
                    splitTextRef.current.revert();
                    splitTextRef.current = null;
                }
            });
        } else {
            // Open Menu
            setIsMenuOpen(true);

            // Initialize SplitText
            if (splitTextRef.current) splitTextRef.current.revert();

            const split = new SplitText(".menu-link", { type: "lines" });
            splitTextRef.current = split;

            // Initial state for SplitText lines
            gsap.set(split.lines, { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });

            // Make parents visible so lines can be seen
            gsap.set(".menu-link", { opacity: 1 });

            tlRef.current = gsap.timeline();

            tlRef.current
                // Panels join in center
                .to([leftPanelRef.current, rightPanelRef.current], {
                    x: "0%",
                    duration: 1,
                    ease: "power3.inOut",
                    stagger: 0
                })
                // Links fade in AFTER panels join
                .to(split.lines, {
                    y: "0%",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.1
                });
        }
    });

    return (
        <div ref={containerRef}>
            <nav
                className={`fixed top-0 left-0 w-full flex justify-between items-center px-8 z-50 text-background transition-all duration-400 ${isScrolled ? "bg-background" : "bg-transparent"
                    }`}
            >
                <div className="flex items-center gap-2 mix-blend-difference">
                    <Image
                        src="/logo.png"
                        alt="Design Hive Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>

                {/* Custom Hamburger (Static) */}
                <div
                    className="flex flex-col gap-1.5 cursor-pointer group w-10 justify-center items-end mix-blend-difference"
                    onClick={toggleMenu}
                >
                    <div className="w-8 h-[2px] bg-current"></div>
                    <div className="w-8 h-[2px] bg-current"></div>
                    <div className="w-8 h-[2px] bg-current"></div>
                </div>
            </nav>

            {/* Menu Overlay */}
            <div className="fixed inset-0 z-40 pointer-events-none">
                {/* Left Panel */}
                <div
                    ref={leftPanelRef}
                    className="absolute top-0 left-0 w-1/2 h-full bg-black -translate-x-full pointer-events-auto"
                ></div>

                {/* Right Panel */}
                <div
                    ref={rightPanelRef}
                    className="absolute top-0 right-0 w-1/2 h-full bg-black translate-x-full pointer-events-auto"
                ></div>

                {/* Menu Content */}
                <div
                    ref={menuContentRef}
                    className={`absolute inset-0 flex flex-col justify-center items-center text-white z-50 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                    <div className="flex flex-col gap-8 text-center">
                        <Link
                            href="/"
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        <Link
                            href="/projects"
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0"
                            onClick={toggleMenu}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/about"
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0"
                            onClick={toggleMenu}
                        >
                            About
                        </Link>
                        <Link
                            href="/gallery"
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0"
                            onClick={toggleMenu}
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/contact"
                            className="menu-link text-5xl md:text-7xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors opacity-0"
                            onClick={toggleMenu}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
