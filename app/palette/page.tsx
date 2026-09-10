const colors = [
  ["archive-ivory", "bg-archive-ivory"],
  ["sky-mist", "bg-sky-mist"],
  ["mountain-haze", "bg-mountain-haze"],
  ["cretan-slate", "bg-cretan-slate"],
  ["olive-leaf", "bg-olive-leaf"],
  ["dry-sage", "bg-dry-sage"],
  ["sun-ochre", "bg-sun-ochre"],
  ["deep-grove", "bg-deep-grove"],
  ["archive-black", "bg-archive-black"],
];

export default function PalettePage() {
  return (
    <main className="grid min-h-screen gap-4 bg-archive-ivory p-8 sm:grid-cols-3">
      {colors.map(([name, className]) => (
        <div key={name} className="overflow-hidden rounded-lg border border-archive-black/15">
          <div className={`${className} h-32`} />
          <div className="bg-white p-3 text-sm font-bold text-archive-black">
            {name}
          </div>
        </div>
      ))}
    </main>
  );
}