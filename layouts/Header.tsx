import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-b-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-2xl font-extrabold text-blue-950">
          Bibliothèque Royale
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-base font-semibold text-blue-950 hover:text-blue-800"
          >
            Accueil
          </Link>
          <Link
            href="/ajouter"
            className="text-base text-slate-500 hover:text-slate-700"
          >
            Ajouter un livre
          </Link>
        </nav>
      </div>
    </header>
  );
}