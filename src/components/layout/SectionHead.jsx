export default function SectionHead({ title, note, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <h2 className="font-serif text-3xl tracking-tight">{title}</h2>
        {note && <p className="mt-1 text-sm text-ink-3">{note}</p>}
      </div>
      {action}
    </div>
  );
}
