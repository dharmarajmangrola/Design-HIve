"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProjectDetailsPage() {
    const params = useParams();
    // In a real app, we would fetch project details using params.id

    // Using placeholder images as requested
    const topImage = "/project-1.jpg";
    const bottomImage = "/project-2.jpg";

    return (
        <main className="min-h-screen w-full bg-[#F3F0E7] pt-24 pb-20">
            {/* Top Image Section */}
            <section className="w-full px-4 md:px-10 mb-20">
                <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                    <Image
                        src={topImage}
                        alt="Project Top View"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </section>

            {/* Info Section */}
            <section className="w-full px-4 md:px-10 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {/* Left Column: Title and List */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <h2 className="text-4xl md:text-5xl font-light mb-8 uppercase tracking-wide">Info</h2>
                        <ul className="space-y-2 text-sm uppercase tracking-wider text-[#171717]/80">
                            <li className="border-b border-[#171717]/20 pb-1">Moodboard</li>
                            <li className="border-b border-[#171717]/20 pb-1">Afspraak op locatie</li>
                            <li className="border-b border-[#171717]/20 pb-1">Kleur- en materialenplan</li>
                            <li className="border-b border-[#171717]/20 pb-1">Meubelplan incl. shoplinks</li>
                            <li className="border-b border-[#171717]/20 pb-1">Verlichtingsplan</li>
                            <li className="border-b border-[#171717]/20 pb-1">3D Video</li>
                            <li className="border-b border-[#171717]/20 pb-1">Stalenbox</li>
                            <li className="border-b border-[#171717]/20 pb-1">Presentatieboekje</li>
                            <li className="border-b border-[#171717]/20 pb-1">Eindpresentatie</li>
                        </ul>
                    </div>

                    {/* Right Column: Description */}
                    <div className="md:col-span-8 lg:col-span-6 lg:col-start-6 flex items-end">
                        <p className="text-sm md:text-base leading-relaxed text-[#171717]/90 text-justify">
                            Voor onze nieuwbouwwoning in Veenendaal heb ik een compleet 3D-interieurontwerp mogen maken, en dat voor de volledige woning. De opdrachtgever had een duidelijke voorkeur voor een rustige, maar toch chique stijl – iets wat je goed terugziet in het uiteindelijke ontwerp. Het is echt een mooie balans geworden tussen Japandi en een verfijnde, elegante sfeer. Als eerste stap heb ik de indeling van de woning ontworpen, omdat ik ook een volledig lichtplan mocht aanleveren. Dit lichtplan wordt straks gerealiseerd door Lumio uit Nijverdal. Naar verwachting start de bouw dit najaar en wordt de woning ongeveer twaalf maanden later opgeleverd. Ik ben ontzettend benieuwd naar hoe dit interieurontwerp straks in de praktijk tot leven komt!
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom Image Section */}
            <section className="w-full px-4 md:px-10">
                <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                    <Image
                        src={bottomImage}
                        alt="Project Bottom View"
                        fill
                        className="object-cover"
                    />
                </div>
            </section>
        </main>
    );
}
