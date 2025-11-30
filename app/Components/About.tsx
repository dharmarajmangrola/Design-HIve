"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useTransition } from "./TransitionProvider";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
    const { navigate } = useTransition();
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef1 = useRef<HTMLParagraphElement>(null);
    const textRef2 = useRef<HTMLParagraphElement>(null);
    const imageSectionRef = useRef<HTMLDivElement>(null);
    const teamTitleRef = useRef<HTMLHeadingElement>(null);
    const teamTextRef = useRef<HTMLParagraphElement>(null);
    const teamSectionRef = useRef<HTMLDivElement>(null);

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        // Debounce resize to avoid excessive re-renders
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 200); // 200ms delay to wait for resize to finish
        };

        handleResize(); // Set initial width
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    useGSAP(() => {
        // Ensure elements exist before splitting
        if (!titleRef.current || !textRef1.current || !textRef2.current || !teamTitleRef.current || !teamTextRef.current) return;

        const splitTitle = new SplitText(titleRef.current, { type: 'lines' });
        const splitText1 = new SplitText(textRef1.current, { type: 'lines' });
        const splitText2 = new SplitText(textRef2.current, { type: 'lines' });
        const splitTeamTitle = new SplitText(teamTitleRef.current, { type: 'lines' });
        const splitTeamText = new SplitText(teamTextRef.current, { type: 'lines' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });

        // Set initial state
        gsap.set(splitTitle.lines, { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
        gsap.set([splitText1.lines, splitText2.lines], { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
        gsap.set([splitTeamTitle.lines, splitTeamText.lines], { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });

        // Animate Title
        tl.to(splitTitle.lines, {
            y: "0%",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power3.out",
            stagger: 0.05
        })
            // Animate Text 1
            .to(splitText1.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.out",
                stagger: 0.05
            }, "-=0.8")
            // Animate Text 2
            .to(splitText2.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.out",
                stagger: 0.05
            }, "-=0.8");

        // Image Section Scrub Animation
        gsap.timeline({
            scrollTrigger: {
                trigger: imageSectionRef.current,
                start: "top 80%",
                end: "bottom 60%",
                scrub: 1,
            }
        })
            .to(".about-row-1", { opacity: 1, filter: "blur(0px)", x: 0, duration: 1 })
            .to(".about-row-2", { opacity: 1, filter: "blur(0px)", x: 0, duration: 1 }, "<0.2");

        // Team Section Animation
        gsap.timeline({
            scrollTrigger: {
                trigger: teamSectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        })
            .to(splitTeamTitle.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.out",
            })
            .to(splitTeamText.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.out",
                stagger: 0.05
            }, "-=0.8");

        // Refresh ScrollTrigger to ensure start/end positions are correct after layout changes
        ScrollTrigger.refresh();

        return () => {
            // Revert restores the original text content, removing the divs SplitText created
            splitTitle.revert();
            splitText1.revert();
            splitText2.revert();
            splitTeamTitle.revert();
            splitTeamText.revert();
        };

    }, { scope: containerRef, dependencies: [windowWidth] });

    return (
        <section ref={containerRef} className="min-h-screen w-full bg-background text-foreground flex flex-col items-center border-b border-black">
            <div className="max-w-4xl w-full text-center p-8 md:p-16 lg:p-24">
                <div className="overflow-hidden mb-16">
                    {/* KEY FIX: The key prop forces this element to re-render on resize, clearing old splits */}
                    <h2 ref={titleRef} key={`title-${windowWidth}`} className="text-5xl md:text-7xl font-light tracking-wide uppercase">
                        About Us
                    </h2>
                </div>

                {/* KEY FIX: Applying key to the container of the text paragraphs */}
                <div className="space-y-12 text-lg leading-relaxed opacity-80" key={`text-content-${windowWidth}`}>
                    <p ref={textRef1}>
                        Founded on the principles of visionary design and meticulous craftsmanship, Design Hive has established itself as a leader in contemporary architecture. We are a collective of passionate architects, designers, and thinkers who strive to push the boundaries of what is possible. Our portfolio spans residential, commercial, and public projects, each characterized by a unique narrative and a deep respect for context.
                    </p>
                    <p ref={textRef2}>
                        We collaborate closely with our clients to understand their aspirations and translate them into reality. Our process is iterative and inclusive, fostering a dialogue that enriches the final outcome. Whether it's a private residence or a large-scale urban development, we bring the same level of dedication and artistic integrity to every project we undertake.
                    </p>
                </div>

                <div className="mt-16">
                    <button
                        onClick={() => navigate('/about')}
                        className="px-8 py-4 bg-black text-white rounded-full text-sm tracking-widest cursor-pointer uppercase hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        About Us
                    </button>
                </div>
            </div>

            {/* Separator Line */}
            <div className="w-full h-1 bg-foreground/20 my-12"></div>

            {/* New Image-Text Section */}
            <div ref={imageSectionRef} className="w-full max-w-4xl flex flex-col gap-12 py-12 px-8 md:px-16 lg:px-24">
                {/* Row 1: Text + Image (Fade in from Right) */}
                <div className="about-row-1 flex flex-col md:flex-row items-center justify-center gap-8 opacity-0 blur-sm translate-x-20">
                    <span className="text-6xl md:text-8xl font-light tracking-tighter">VISION</span>
                    <div className="relative w-48 h-32 md:w-64 md:h-40 rounded-2xl overflow-hidden">
                        <img src="/about-img-1.jpg" alt="About Image 1" className="object-cover w-full h-full" />
                    </div>
                </div>

                {/* Row 2: Image + Text (Fade in from Left) */}
                <div className="about-row-2 flex flex-col md:flex-row items-center justify-center gap-8 opacity-0 blur-sm -translate-x-20">
                    <div className="relative w-48 h-32 md:w-64 md:h-40 rounded-2xl overflow-hidden">
                        <img src="/about-img-2.jpg" alt="About Image 2" className="object-cover w-full h-full" />
                    </div>
                    <span className="text-6xl md:text-8xl font-light tracking-tighter">by HIVE®</span>
                </div>
            </div>

            {/* Separator Line */}
            <div className="w-full h-1 bg-foreground/20 mt-12 mb-32"></div>

            {/* Our Team Section */}
            <div ref={teamSectionRef} className="w-full max-w-7xl mb-32 px-8 flex flex-col md:flex-row gap-16 items-center">
                {/* Left Text */}
                <div className="w-full space-y-8 text-center">
                    <div>
                        <span className="md:text-xl text-[16px] opacity-80 block mb-2">HIVE Group®</span>
                        <div className="overflow-hidden">
                            <h2 ref={teamTitleRef} key={`team-title-${windowWidth}`} className="text-5xl md:text-6xl whitespace-nowrap font-light">Our Team</h2>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <p ref={teamTextRef} key={`team-text-${windowWidth}`} className="text-lg opacity-80 leading-relaxed">
                            Our team is our greatest asset. Comprising diverse talents from around the globe, we bring a wealth of experience and fresh perspectives to every challenge. We foster a culture of continuous learning and innovation, where every member is empowered to contribute their best work. Together, we are building a legacy of architectural excellence.
                        </p>
                    </div>
                </div>
                {/* Right Image */}
                <div className="w-full relative h-[400px] md:h-[400px] rounded-4xl overflow-hidden">
                    <img src="/our-team.jpg" alt="Our Team" className="object-cover w-full h-full" />
                </div>
            </div>
        </section>
    );
}
