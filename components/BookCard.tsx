"use client";

import { Book } from "@/types/Book";
import { BookOpen, Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type BookCardProps = {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
};

export default function BookCard({
  book,
  onEdit,
  onDelete,
}: BookCardProps) {
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-blue-950 to-blue-800">
        <BookOpen className="h-14 w-14 text-blue-300/40" strokeWidth={1.5} />

        <span
          className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            book.available
              ? "bg-emerald-800 text-white"
              : "bg-red-100 text-red-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              book.available ? "bg-emerald-300" : "bg-red-500"
            }`}
          />
          {book.available ? "Disponible" : "Emprunté"}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <span className="inline-block rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-900">
          {book.category}
        </span>

        <h3 className="mt-3 text-xl font-bold leading-snug text-blue-950">
          {book.title}
        </h3>
        <p className="mt-1 text-slate-600">{book.author}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-slate-500">{book.publicationYear}</span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/books/${book._id}`)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-blue-900 text-blue-900 hover:bg-blue-50"
              aria-label="Voir"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => router.push(`/books/edit`)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-blue-900 text-blue-900 hover:bg-blue-50"
              aria-label="Modifier"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete?.(book)}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-red-700 text-white hover:bg-red-800"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
