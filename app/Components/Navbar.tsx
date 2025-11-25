import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 z-50 text-white mix-blend-difference">
            <div className="flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="Design Hive Logo"
                    width={130}
                    height={130}
                    className="object-contain"
                />
            </div>
            <div>
                {/* Hamburger Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 cursor-pointer"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
        </nav>
    );
}
