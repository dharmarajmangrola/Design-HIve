"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        const heroImage = document.querySelector(".hero-image");

        // Initial state for Hero Image (targeting class .hero-image)
        if (heroImage) {
            gsap.set(heroImage, { scale: 1.3 });
        }

        tl.to(lineRef.current, {
            scaleY: 1,
            duration: 1,
            ease: "power3.inOut",
        })
            .to(
                [leftPanelRef.current, rightPanelRef.current],
                {
                    xPercent: (i) => (i === 0 ? -100 : 100),
                    duration: 1.5,
                    ease: "power4.inOut",
                },
                ">"
            )
            .to(
                lineRef.current,
                {
                    opacity: 0,
                    duration: 0.5,
                },
                "<"
            )
            if (heroImage) {
                tl.to(
                    heroImage, 
                    { 
                        scale: 1, 
                        duration: 1.5, 
                        ease: "power4.inOut" 
                    }, "<"
                )
            }
            tl.to(containerRef.current, {
                display: "none",
            });
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-9999 flex w-full h-screen"
        >
            {/* Left Panel */}
            <div
                ref={leftPanelRef}
                className="w-1/2 h-full bg-background relative"
            ></div>

            {/* Center Line */}
            <div
                ref={lineRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-full bg-black origin-center scale-y-0 z-20"
            ></div>

            {/* Right Panel */}
            <div
                ref={rightPanelRef}
                className="w-1/2 h-full bg-background relative"
            ></div>
        </div>
    );
}
