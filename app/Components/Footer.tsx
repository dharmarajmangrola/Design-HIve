"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-[#F3F0E7] text-black pt-24 pb-8 px-8 md:px-16 lg:px-24 flex flex-col justify-between items-center">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 justify-items-center items-center">
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
                <div className="md:col-span-3 flex flex-col gap-6 justify-center items-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-2">(NAVIGATION)</h3>
                    <nav className="flex flex-col gap-2 text-lg opacity-80 justify-center items-center">
                        <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
                        <Link href="#about" className="hover:opacity-100 transition-opacity">About Us</Link>
                        <Link href="#projects" className="hover:opacity-100 transition-opacity">Projects</Link>
                        <Link href="#gallery" className="hover:opacity-100 transition-opacity">Gallery</Link>
                        <Link href="#contact" className="hover:opacity-100 transition-opacity">Contact Us</Link>
                    </nav>
                </div>

                {/* Follow Column */}
                <div className="md:col-span-3 flex flex-col gap-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-2">(FOLLOW)</h3>
                    <div className="flex flex-col gap-2 text-lg opacity-80">
                        <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                        <a href="#" className="hover:opacity-100 transition-opacity">Facebook</a>
                        <a href="#" className="hover:opacity-100 transition-opacity">Linkedin</a>
                    </div>
                </div>

                {/* Information Column */}
                <div className="md:col-span-3 flex flex-col gap-6 justify-center items-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-2">(INFORMATION)</h3>
                    <div className="flex flex-col gap-2 text-lg opacity-80 justify-center items-center text-center">
                        <p>Address: 1032, lorem isoum,290834</p>
                        <p>Email: info@lorem.com</p>
                        <p>Phone: 0283383838</p>
                        <p>Monday to Friday, 8:30am - 5:00pm</p>
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
        </footer>
    );
}
