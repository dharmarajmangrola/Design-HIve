"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef1 = useRef<HTMLParagraphElement>(null);
    const textRef2 = useRef<HTMLParagraphElement>(null);
    const imageSectionRef = useRef<HTMLDivElement>(null);
    const teamTitleRef = useRef<HTMLHeadingElement>(null);
    const teamTextRef = useRef<HTMLParagraphElement>(null);
    const teamSectionRef = useRef<HTMLDivElement>(null);
    const footerSectionRef = useRef<HTMLDivElement>(null);
    const qualityRef = useRef<HTMLSpanElement>(null);
    const creativityRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const splitTitle = new SplitType(titleRef.current!, { types: 'lines', tagName: 'span' });
        const splitText1 = new SplitType(textRef1.current!, { types: 'lines', tagName: 'span' });
        const splitText2 = new SplitType(textRef2.current!, { types: 'lines', tagName: 'span' });

        // Team Section Split
        const splitTeamTitle = new SplitType(teamTitleRef.current!, { types: 'lines', tagName: 'span' });
        const splitTeamText = new SplitType(teamTextRef.current!, { types: 'lines', tagName: 'span' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom bottom",
                toggleActions: "play none none none"
            }
        });

        // Set initial state
        gsap.set(splitTitle.lines, { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
        gsap.set([splitText1.lines, splitText2.lines], { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });

        // Team Section Initial State
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
            }, "-=0.5")
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
                stagger: 0.05
            })
            .to(splitTeamText.lines, {
                y: "0%",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power3.out",
                stagger: 0.05
            }, "-=0.8");

        // Footer Section Scrub Animation
        gsap.timeline({
            scrollTrigger: {
                trigger: footerSectionRef.current,
                start: "top 90%",
                end: "bottom 10%",
                scrub: 1,
            }
        })
            .fromTo(qualityRef.current, { x: "-10%" }, { x: "10%", duration: 1 })
            .fromTo(creativityRef.current, { x: "10%" }, { x: "-10%", duration: 1 }, "<");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="min-h-screen w-full bg-background text-foreground flex flex-col items-center border-b border-black">
            <div className="max-w-4xl w-full text-center px-8 md:px-16 lg:px-24">
                <div className="overflow-hidden mb-16">
                    <h2 ref={titleRef} className="text-5xl md:text-7xl font-light tracking-wide uppercase">
                        About Us
                    </h2>
                </div>

                <div className="space-y-12 text-lg md:text-xl leading-relaxed opacity-80">
                    <p ref={textRef1}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </p>
                    <p ref={textRef2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </p>
                </div>

                <div className="mt-16">
                    <button className="px-8 py-4 bg-black text-white rounded-full text-sm tracking-widest cursor-pointer uppercase hover:scale-105 active:scale-95 transition-all duration-300">
                        About Us
                    </button>
                </div>
            </div>

            {/* Separator Line */}
            <div className="w-full h-1 bg-foreground/20 mt-32 mb-12"></div>

            {/* New Image-Text Section */}
            <div ref={imageSectionRef} className="w-full max-w-4xl flex flex-col gap-12 py-12 px-8 md:px-16 lg:px-24">
                {/* Row 1: Text + Image (Fade in from Right) */}
                <div className="about-row-1 flex flex-col md:flex-row items-center justify-center gap-8 opacity-0 blur-sm translate-x-20">
                    <span className="text-6xl md:text-8xl font-light tracking-tighter">loremisp</span>
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
            <div ref={teamSectionRef} className="w-full max-w-7xl mb-32 flex flex-col md:flex-row gap-16 items-center">
                {/* Left Text */}
                <div className="w-full md:w-[90%] space-y-8">
                    <div>
                        <span className="text-xl opacity-80 block mb-2">HIVE Group®</span>
                        <div className="overflow-hidden">
                            <h2 ref={teamTitleRef} className="text-4xl md:text-6xl whitespace-nowrap font-light">Our Team</h2>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <p ref={teamTextRef} className="text-lg opacity-80 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                        </p>
                    </div>
                </div>
                {/* Right Image */}
                <div className="w-full relative h-[400px] md:h-[600px] rounded-4xl overflow-hidden">
                    <img src="/our-team.jpg" alt="Our Team" className="object-contain w-full h-full" />
                </div>
            </div>

            {/* Focused on Quality Section */}
            <div ref={footerSectionRef} className="w-full px-8 md:px-16 lg:px-24 pb-32 text-center overflow-hidden">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-light uppercase leading-tight mb-16">
                    <span ref={qualityRef} className="block">Focused on Quality</span>
                    <span ref={creativityRef} className="block mt-4 md:mt-0">Driven by Creativity</span>
                </h2>
                <button className="px-10 py-5 bg-black text-white rounded-full text-sm tracking-widest cursor-pointer uppercase hover:scale-105 active:scale-95 transition-all duration-300">
                    Tell us about your project
                </button>
            </div>
        </section>
    );
}