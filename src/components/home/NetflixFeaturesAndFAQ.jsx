import { useState } from "react";
import { FiTv, FiDownloadCloud, FiSmartphone, FiSmile, FiChevronRight, FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router";

const FAQS = [
    {
        question: "What is MovieExplorer?",
        answer: "MovieExplorer is a next-generation streaming entertainment portal that lets you explore thousands of blockbuster movies, award-winning TV series, anime, documentaries, and TVMaze catalog titles. You can check real-time ratings, full plot summaries, cast details, release years, and stream trailer previews anytime on any device."
    },
    {
        question: "How much does MovieExplorer cost?",
        answer: "MovieExplorer is 100% free to browse! Enjoy unlimited searches, genre exploration, curated top 10 rankings, and full synopsis details without any subscription fees or hidden costs."
    },
    {
        question: "Where can I watch MovieExplorer?",
        answer: "Watch anywhere, anytime. Sign in to your MovieExplorer account on the web at movie-explorer.app or from any internet-connected device that offers a web browser, including smart TVs, smartphones, tablets, streaming media players and game consoles."
    },
    {
        question: "How do I search for my favorite TV shows and movies?",
        answer: "Simply click the search icon in the top navigation bar or visit the 'Movies' page to search by show title, genre keywords, or network names. Results update instantly with high-resolution poster artwork and ratings."
    },
    {
        question: "What can I watch on MovieExplorer?",
        answer: "MovieExplorer has an extensive library of feature films, documentaries, TV shows, anime, award-winning TVMaze originals, and more. Watch as much as you want, whenever you want."
    },
    {
        question: "Is MovieExplorer good for kids?",
        answer: "Yes! MovieExplorer includes rich family and kids' friendly animation titles, superhero series, and family comedy shows, with age ratings clearly labeled on every title card."
    }
];

const PERKS = [
    {
        icon: FiTv,
        title: "Enjoy on your TV",
        desc: "Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
        accent: "from-red-600/20 to-transparent"
    },
    {
        icon: FiDownloadCloud,
        title: "Download your shows",
        desc: "Save your favorites easily and always have something to watch offline on flights or road trips.",
        accent: "from-purple-600/20 to-transparent"
    },
    {
        icon: FiSmartphone,
        title: "Watch everywhere",
        desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and desktop seamlessly.",
        accent: "from-blue-600/20 to-transparent"
    },
    {
        icon: FiSmile,
        title: "Create profiles for kids",
        desc: "Send kids on adventures with their favorite characters in a space made just for them — free with membership.",
        accent: "from-amber-600/20 to-transparent"
    }
];

export default function NetflixFeaturesAndFAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleCtaSubmit = (e) => {
        e.preventDefault();
        navigate("/movies");
    };

    return (
        <section id="faq" className="my-16 sm:my-24 px-4 sm:px-8 border-t border-[#2A2D31]/60 pt-16">
            <div className="mx-auto max-w-6xl">
                {/* 1. Feature Perks Grid (Netflix Value Props) */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-wide">
                            Why Choose MovieExplorer?
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-gray-400">
                            Built with the world's most comprehensive open entertainment database
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PERKS.map((perk, i) => {
                            const IconComponent = perk.icon;
                            return (
                                <div
                                    key={i}
                                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${perk.accent} bg-[#191919] p-6 border border-white/5 hover:border-[#E50914]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl`}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E50914]/20 text-[#E50914] mb-5">
                                        <IconComponent className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-heading font-bold text-lg text-white mb-2">
                                        {perk.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                        {perk.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Netflix Accordion FAQ */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="text-center mb-10">
                        <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-wide">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-md bg-[#222222] transition-colors hover:bg-[#2b2b2b]"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(index)}
                                        className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-body font-semibold text-base sm:text-xl text-white cursor-pointer"
                                    >
                                        <span>{faq.question}</span>
                                        <span className="text-2xl font-light text-white ml-4">
                                            {isOpen ? <FiX className="h-6 w-6" /> : <FiPlus className="h-6 w-6" />}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-black/40 p-5 sm:p-6 text-sm sm:text-base leading-relaxed text-gray-300 animate-in fade-in duration-200">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Netflix "Ready to Watch?" CTA Box */}
                <div className="rounded-2xl bg-gradient-to-r from-red-950/40 via-[#181818] to-red-950/40 border border-red-900/30 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-3">
                        Ready to watch? Explore 10,000+ shows today.
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 mb-6 max-w-xl mx-auto">
                        Enter your email to join the movie explorer community or jump straight into our complete catalog.
                    </p>

                    <form
                        onSubmit={handleCtaSubmit}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="w-full sm:flex-1 rounded bg-black/70 border border-gray-600 px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-[#E50914] px-7 py-3.5 font-bold text-white shadow-xl hover:bg-[#b80710] hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm sm:text-base shrink-0"
                        >
                            Get Started <FiChevronRight className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
