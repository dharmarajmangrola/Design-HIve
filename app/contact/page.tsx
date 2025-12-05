"use client";
import Image from "next/image";

export default function ContactPage() {
    const interests = [
        "Commercial", "Residential", "Consultation", "Manufacturing",
        "Install/Reno", "Operations", "Service", "Distribution",
        "Jobs/HR", "Other"
    ];

    return (
        <main className="min-h-screen w-full bg-[#F3F0E7] pt-32 flex flex-col justify-between">
            <div className="max-w-7xl mx-auto w-full px-8 md:px-16 lg:px-24 grow flex flex-col justify-center">

                {/* Interests Section */}
                <div className="mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">I'm Interested In...</h1>
                    <div className="flex flex-wrap gap-3">
                        {interests.map((item, index) => (
                            <button
                                key={index}
                                className="px-6 py-2 rounded-full border border-black/20 text-sm md:text-base hover:bg-black hover:text-white transition-colors duration-300"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full max-w-3xl mx-auto flex flex-col gap-12 mb-24">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-transparent text-3xl md:text-5xl placeholder:text-black/20 border-b border-black/20 focus:border-black outline-none py-4 transition-colors"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full bg-transparent text-3xl md:text-5xl placeholder:text-black/20 border-b border-black/20 focus:border-black outline-none py-4 transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="Your Company"
                        className="w-full bg-transparent text-3xl md:text-5xl placeholder:text-black/20 border-b border-black/20 focus:border-black outline-none py-4 transition-colors"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={1}
                        className="w-full bg-transparent text-3xl md:text-5xl placeholder:text-black/20 border-b border-black/20 focus:border-black outline-none py-4 transition-colors resize-none"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mb-24 relative z-10">
                    <button className="w-32 h-32 rounded-full bg-[#b7b7b7] cursor-pointer text-black text-xs tracking-widest uppercase relative overflow-hidden group flex items-center justify-center">
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Submit</span>
                        <div className="absolute inset-0 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                    </button>
                </div>
            </div>

            {/* Bottom Image with Clip Path */}
            <div className="w-full h-[80vh] relative overflow-hidden">
                <div
                    className="absolute inset-0 w-full h-full [clip-path:ellipse(150%_100%_at_50%_100%)] lg:[clip-path:ellipse(80%_100%_at_50%_100%)]"
                >
                    <Image
                        src="/contact-img.jpg"
                        alt="Contact Office"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </main>
    );
}
