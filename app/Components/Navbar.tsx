"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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

    // Split timelines for better control
    const panelTlRef = useRef<gsap.core.Timeline | null>(null);
    const contentTlRef = useRef<gsap.core.Timeline | null>(null);
    const delayTimerRef = useRef<gsap.core.Tween | null>(null);

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
        // Kill any pending delayed calls to prevent conflicts
        if (delayTimerRef.current) {
            delayTimerRef.current.kill();
            delayTimerRef.current = null;
        }

        if (isMenuOpen) {
            // Close Menu
            // Reverse content first, then panels
            contentTlRef.current?.reverse().then(() => {
                panelTlRef.current?.reverse().then(() => {
                    setIsMenuOpen(false);
                    gsap.set(".menu-link", { opacity: 0 });

                    if (splitTextRef.current) {
                        splitTextRef.current.revert();
                        splitTextRef.current = null;
                    }
                });
            });
        } else {
            // Open Menu
            setIsMenuOpen(true);
            if (splitTextRef.current) splitTextRef.current.revert();

            const split = new SplitText(".menu-link", { type: "lines" });
            splitTextRef.current = split;

            gsap.set(split.lines, { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
            gsap.set(".menu-link", { opacity: 1 });

            // Panel Timeline
            panelTlRef.current = gsap.timeline();
            panelTlRef.current.to([leftPanelRef.current, rightPanelRef.current], {
                x: "0%",
                duration: 0.7,
                ease: "power3.inOut",
                stagger: 0
            });

            // Content Timeline (Header + Links)
            contentTlRef.current = gsap.timeline({ paused: true });
            contentTlRef.current
                .to(".menu-header", { opacity: 1, duration: 0.5, ease: "power3.out" })
                .to(split.lines, {
                    y: "0%",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.05
                }, "<0.1"); // Start text animation slightly after header

            // Play content timeline after a delay (to match the original timing relative to panels)
            // Panels take 0.7s. We want content to start around 0.5s.
            delayTimerRef.current = gsap.delayedCall(0.7, () => {
                contentTlRef.current?.play();
            });
        }
    });

    // Close menu when route changes
    useEffect(() => {
        if (isMenuOpen) {
            toggleMenu();
        }
    }, [pathname]);

    const handleLinkClick = contextSafe((href: string) => {
        if (href === pathname) {
            toggleMenu();
            return;
        }

        // Animate ONLY the content out (header + links)
        // Wait for content to disappear BEFORE navigating
        contentTlRef.current?.reverse().then(() => {
            router.push(href);
        });
    });

    // Determine styles based on state
    const isHome = pathname === '/';
    const showWhiteBg = isScrolled;
    const isDarkText = showWhiteBg || !isHome;

    return (
        <div ref={containerRef}>
            <nav
                className={`fixed top-0 left-0 w-full flex justify-between items-center px-8 z-40 transition-all duration-500 ${showWhiteBg ? "bg-[#F3F0E7]" : "bg-transparent"
                    } ${isDarkText ? "text-black" : "text-white"}`}
            >
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                        if (pathname === '/') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                            navigate('/');
                        }
                    }}
                >
                    <Image
                        src="/logo.png"
                        alt="Design Hive Logo"
                        width={80}
                        height={80}
                        className={`transition-all duration-500 ${isDarkText ? "invert" : ""}`}
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
            <div className={`fixed inset-0 z-50 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div
                    ref={leftPanelRef}
                    className="absolute top-0 left-0 w-1/2 h-full bg-black -translate-x-full"
                ></div>

                <div
                    ref={rightPanelRef}
                    className="absolute top-0 right-0 w-1/2 h-full bg-black translate-x-full"
                ></div>

                {/* Menu Header (Logo + Close Button) */}
                <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-5 z-50 menu-header opacity-0">
                    <div
                        className="cursor-pointer"
                        onClick={() => handleLinkClick('/')}
                    >
                        <Image
                            src="/logo.png"
                            alt="Design Hive Logo"
                            width={80}
                            height={80}
                            className="" // Always white on black menu
                        />
                    </div>
                    <div
                        className="cursor-pointer p-2"
                        onClick={toggleMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-8 h-8"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>

                <div
                    ref={menuContentRef}
                    className="absolute inset-0 flex flex-col justify-center items-center text-white/90 z-40"
                >
                    <div className="flex flex-col gap-8 text-center">
                        <div
                            className="menu-link text-5xl md:text-7xl font-medium uppercase tracking-widest hover:text-gray-400 transition-colors opacity-0 cursor-pointer"
                            onClick={() => handleLinkClick('/')}
                        >
                            Home
                        </div>
                        <div
                            className="menu-link text-5xl md:text-7xl font-medium uppercase tracking-widest hover:text-gray-400 transition-colors opacity-0 cursor-pointer"
                            onClick={() => handleLinkClick('/projects')}
                        >
                            Projects
                        </div>
                        <div
                            className="menu-link text-5xl md:text-7xl font-medium uppercase tracking-widest hover:text-gray-400 transition-colors opacity-0 cursor-pointer"
                            onClick={() => handleLinkClick('/about')}
                        >
                            About
                        </div>
                        <div
                            className="menu-link text-5xl md:text-7xl font-medium uppercase tracking-widest hover:text-gray-400 transition-colors opacity-0 cursor-pointer"
                            onClick={() => handleLinkClick('/gallery')}
                        >
                            Gallery
                        </div>
                        <div
                            className="menu-link text-5xl md:text-7xl font-medium uppercase tracking-widest hover:text-gray-400 transition-colors opacity-0 cursor-pointer"
                            onClick={() => handleLinkClick('/contact')}
                        >
                            Contact
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}