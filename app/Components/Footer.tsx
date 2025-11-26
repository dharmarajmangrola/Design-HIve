"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const qualityRef = useRef<HTMLSpanElement>(null);
    const creativityRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                end: "bottom 20%",
                scrub: 1
            }
        });

        tl.fromTo(qualityRef.current, { x: "-10%" }, { x: "10%", duration: 1 })
            .fromTo(creativityRef.current, { x: "10%" }, { x: "-10%", duration: 1 }, "<");

    }, { scope: containerRef });

    return (
        <footer className="w-full bg-[#F3F0E7] text-black flex flex-col justify-between items-center overflow-hidden">

            {/* Focused on Quality Section */}
            <div ref={containerRef} className="w-full px-8 md:px-16 lg:px-24 py-24 text-center relative border-b border-black">
                {/* Black line top */}
                <div className="absolute top-0 left-0 w-full h-px bg-black"></div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-light uppercase leading-tight mb-16">
                    <span ref={qualityRef} className="block">Focused on Quality</span>
                    <span ref={creativityRef} className="block mt-4 md:mt-0">Driven by Creativity</span>
                </h2>
                <button className="px-10 py-5 bg-black text-white rounded-full text-sm tracking-widest cursor-pointer uppercase hover:scale-105 active:scale-95 transition-all duration-300">
                    Tell us about your project
                </button>
            </div>

            {/* Main Footer Content */}
            <div className="w-full px-8 md:px-16 lg:px-24 pb-8 mt-20">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 justify-items-center items-start">
                    {/* Logo Column */}
                    <div className="md:col-span-3 flex flex-col justify-start">
                        <div className="flex items-center gap-2 mix-blend-difference">
                            <Image
                                src="/logo.png"
                                alt="Design Hive Logo"
                                width={160}
                                height={160}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="md:col-span-3 flex flex-col gap-6 justify-start items-center md:items-start">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">(NAVIGATION)</h3>
                        <nav className="flex flex-col gap-2 text-lg opacity-80 items-center md:items-start">
                            <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
                            <Link href="#about" className="hover:opacity-100 transition-opacity">About Us</Link>
                            <Link href="#projects" className="hover:opacity-100 transition-opacity">Projects</Link>
                            <Link href="#gallery" className="hover:opacity-100 transition-opacity">Gallery</Link>
                            <Link href="#contact" className="hover:opacity-100 transition-opacity">Contact Us</Link>
                        </nav>
                    </div>

                    {/* Follow Column */}
                    <div className="md:col-span-3 flex flex-col gap-6 justify-start items-center md:items-start">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">(FOLLOW)</h3>
                        <div className="flex flex-col gap-4 text-lg opacity-80 items-center md:items-start">
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
                    <div className="md:col-span-3 flex flex-col gap-6 justify-start items-center md:items-start">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">(INFORMATION)</h3>
                        <div className="flex flex-col gap-4 text-lg opacity-80 items-center md:items-start text-center md:text-left">
                            <p className="flex items-center gap-3 justify-center md:justify-start">
                                <MdLocationOn className="text-xl shrink-0" />
                                <span>1032, lorem isoum, 290834</span>
                            </p>
                            <p className="flex items-center gap-3 justify-center md:justify-start">
                                <MdEmail className="text-xl shrink-0" />
                                <span>info@lorem.com</span>
                            </p>
                            <p className="flex items-center gap-3 justify-center md:justify-start">
                                <MdPhone className="text-xl shrink-0" />
                                <span>0283383838</span>
                            </p>
                            <p className="mt-2 text-base opacity-60">Monday to Friday, 8:30am - 5:00pm</p>
                        </div>
                    </div>
                </div>

                {/* Big Text */}
                <div className="w-full overflow-hidden mb-16">
                    <h1 className="text-[12vw] leading-none font-light tracking-tighter text-center">
                        DESIGN HIVE
                    </h1>
                </div>

                {/* Bottom Section */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs md:text-sm uppercase tracking-widest opacity-60 gap-4 md:gap-0 border-t border-black/10 pt-8">
                    <div className="text-center md:text-left">
                        <p>&copy; 2025 DESIGN HIVE</p>
                        <p>SURAT, WE ARE OPEN</p>
                    </div>

                    <div className="flex gap-8">
                        <a href="#" className="hover:opacity-100">PRIVACY POLICY</a>
                        <a href="#" className="hover:opacity-100">TERMS OF SERVICE</a>
                    </div>

                    <div className="text-center md:text-right">
                        <p>MADE BY <span className="underline cursor-pointer hover:opacity-100">BEMOTION</span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
