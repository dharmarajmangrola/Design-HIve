"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TransitionContext = createContext({
    navigate: (href: string) => { },
});

export const useTransition = () => useContext(TransitionContext);

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const navigate = contextSafe((href: string) => {
        if (isTransitioning || href === pathname) return;
        setIsTransitioning(true);

        const tl = gsap.timeline({
            onComplete: () => {
                router.push(href);
            }
        });

        timelineRef.current = tl;

        tl.to([leftPanelRef.current, rightPanelRef.current], {
            x: "0%",
            duration: 0.7,
            ease: "power3.inOut",
            stagger: 0
        });
    });

    useEffect(() => {
        if (isTransitioning && timelineRef.current) {
            // Reverse the animation when pathname changes
            timelineRef.current.reverse().then(() => {
                setIsTransitioning(false);
                timelineRef.current = null;
            });
        }
    }, [pathname]);

    return (
        <TransitionContext.Provider value={{ navigate }}>
            <div ref={containerRef}>
                {/* Transition Overlay */}
                <div className="fixed inset-0 z-9999 pointer-events-none flex">
                    <div
                        ref={leftPanelRef}
                        className="w-1/2 h-full bg-black -translate-x-full"
                    ></div>
                    <div
                        ref={rightPanelRef}
                        className="w-1/2 h-full bg-black translate-x-full"
                    ></div>
                </div>
                {children}
            </div>
        </TransitionContext.Provider>
    );
}
