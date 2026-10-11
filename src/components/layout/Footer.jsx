export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hair">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-serif text-base text-ink">MovieExplorer</p>
        <p>
          Title data from{" "}
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noreferrer"
            className="text-ink underline decoration-hair underline-offset-4 hover:decoration-ink"
          >
            TVMaze
          </a>
          .
        </p>
        <p className="num">© {year}</p>
      </div>
    </footer>
  );
}
