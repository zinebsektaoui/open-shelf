import Link from "next/link";
import { ChevronLeft, Pencil, User2, CheckCircle2, BookOpen } from "lucide-react";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import { Book } from "@/types/Book";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Livre introuvable</div>;
  }

  const book: Book = await res.json();

  const descriptionParagraphs = book.description
    ? book.description.split("\n").filter((p) => p.trim().length > 0)
    : [];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f4f5fb]">
        <div className="mx-auto max-w-6xl px-8 py-10">
          {/* Top bar */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Retour au catalogue
            </Link>

            <Link
              href={`/books/edit/${id}`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <Pencil className="h-4 w-4" />
              Modifier ce livre
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
            {/* Left column */}
            <div className="space-y-6">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 text-center shadow-sm flex items-center justify-center">
                <span className="font-serif text-sm leading-snug text-slate-400">
                          <BookOpen className="h-14 w-14 text-blue-300/40" strokeWidth={1.5} />

                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  État de l&apos;exemplaire
                </p>

                <div
                  className={`flex items-center rounded-xl px-4 py-3 ${
                    book.available
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    {book.available ? "Disponible" : "Emprunté"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              <div className="mb-4">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  {book.category}
                </span>
              </div>

              <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900">
                {book.title}
              </h1>

              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <User2 className="h-4 w-4" />
                </span>

                <p className="text-sm font-semibold text-slate-800">
                  {book.author}
                </p>
              </div>

              {/* Informations */}
              <div className="mb-8 grid grid-cols-2 gap-4 border-b border-slate-200 pb-8 sm:grid-cols-4">
                <div>
                  <p className="mb-1 text-xs font-medium text-slate-400">
                    Année
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {book.publicationYear}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-slate-400">
                    ISBN-13
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {book.isbn}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="mb-3 text-lg font-bold text-slate-900">
                  Description de l&apos;ouvrage
                </h2>

                <div className="space-y-4 text-sm leading-relaxed text-slate-600">
                  {descriptionParagraphs.length > 0 ? (
                    descriptionParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{book.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}