import { Link } from "react-router";
import { FiGlobe } from "react-icons/fi";

export default function Footer() {
    const year = new Date().getFullYear();

    const footerLinks = [
        { name: "FAQ", href: "#faq" },
        { name: "Help Center", href: "#faq" },
        { name: "Account", href: "/movies" },
        { name: "Media Center", href: "/movies" },
        { name: "Investor Relations", href: "/movies" },
        { name: "Jobs & Careers", href: "/movies" },
        { name: "Ways to Watch", href: "#faq" },
        { name: "Terms of Use", href: "/movies" },
        { name: "Privacy Statement", href: "/movies" },
        { name: "Cookie Preferences", href: "/movies" },
        { name: "Corporate Information", href: "/movies" },
        { name: "Contact Us", href: "#faq" },
        { name: "Speed Test", href: "https://fast.com" },
        { name: "Legal Notices", href: "/movies" },
        { name: "Only on MovieExplorer", href: "/movies" },
        { name: "TVMaze API", href: "https://www.tvmaze.com/api" },
    ];

    return (
        <footer className="border-t border-[#232323] bg-[#141414] text-[#808080] font-body text-xs">
            <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
                {/* Questions header */}
                <p className="mb-8 text-sm text-[#808080]">
                    Questions? Call{" "}
                    <a href="tel:1-800-000-0000" className="hover:underline text-gray-300">
                        1-800-000-0000
                    </a>
                </p>

                {/* 4-column link grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    {footerLinks.map((item, index) => {
                        const isExternal = item.href.startsWith("http");
                        return isExternal ? (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline transition-colors hover:text-gray-300"
                            >
                                {item.name}
                            </a>
                        ) : (
                            <Link
                                key={index}
                                to={item.href}
                                className="hover:underline transition-colors hover:text-gray-300"
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Language Selector Dropdown */}
                <div className="mb-6 inline-flex items-center gap-2 rounded border border-gray-700 bg-black/60 px-3 py-1.5 text-xs text-white">
                    <FiGlobe className="h-4 w-4 text-gray-400" />
                    <select
                        aria-label="Select Language"
                        className="bg-transparent text-white focus:outline-none cursor-pointer"
                        defaultValue="en"
                    >
                        <option value="en" className="bg-[#181818] text-white">English</option>
                        <option value="es" className="bg-[#181818] text-white">Español</option>
                        <option value="fr" className="bg-[#181818] text-white">Français</option>
                        <option value="de" className="bg-[#181818] text-white">Deutsch</option>
                        <option value="ja" className="bg-[#181818] text-white">日本語</option>
                    </select>
                </div>

                {/* Brand & Attribution */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#232323]">
                    <p className="text-[#666666]">
                        MovieExplorer Global • Powered by open TVMaze Catalog
                    </p>
                    <p className="text-[#666666]">
                        © {year} MovieExplorer, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}