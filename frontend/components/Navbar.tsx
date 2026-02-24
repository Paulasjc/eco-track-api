'use client';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold tracking-tight">
            <span className="text-slate-900">Eco</span>
            <span className="text-green-600">Track</span>
          </span>
          <span className="hidden sm:inline text-sm font-normal text-slate-500 tracking-tight border-l border-slate-200 pl-3">
            Analítica de emisiones
          </span>
        </div>
      </div>
    </header>
  );
}
