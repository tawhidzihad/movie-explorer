import { Link } from "react-router";

const groups = [
  {
    title: "Catalogue",
    items: [
      { label: "All titles", to: "/movies" },
      { label: "Top rated", to: "/movies?sort=top" },
      { label: "Recently added", to: "/movies?sort=new" },
    ],
  },
  {
    title: "Genres",
    items: [
      { label: "Drama", to: "/movies?q=drama" },
      { label: "Comedy", to: "/movies?q=comedy" },
      { label: "Science Fiction", to: "/movies?q=science-fiction" },
      { label: "Crime", to: "/movies?q=crime" },
    ],
  },
  {
    title: "Info",
    items: [
      { label: "About", href: "#about" },
      { label: "Data source", href: "https://www.tvmaze.com/api", external: true },
      { label: "Accessibility", href: "#accessibility" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hair">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <p className="font-serif text-base text-ink">CineboxBD</p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <p className="font-serif text-xs tracking-widest text-ink-3">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {group.items.map((item) => {
                  const linkClasses =
                    "text-ink-3 transition-colors hover:text-ink";
                  return item.external ? (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClasses}
                      >
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link to={item.href} className={linkClasses}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hair pt-6 text-sm text-ink-3 sm:flex-row">
          <p className="num">© {year}</p>
          <p>
            <a
              href="#about"
              className="text-ink-3 transition-colors hover:text-ink"
            >
              About this project
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
