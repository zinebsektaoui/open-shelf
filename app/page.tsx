"use client";

import BookCard from "@/components/BookCard";
import Filter from "@/components/Filter";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { Book } from "@/types/Book";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const handleDelete = async (book: Book) => {
    const confirmDelete = confirm(
      `Voulez-vous supprimer le livre "${book.title}" ?`,
    );
    if (!confirmDelete) return;
    const res = await fetch(`/api/books/${book._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Supprimer directement de l'état
      setBooks((prev) => prev.filter((b) => b._id !== book._id));
    } else {
      const error = await res.json();
      alert(error.message);
    }
  };
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "Tous"
        ? true
        : statusFilter === "Disponible"
          ? book.available
          : !book.available;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-slate-50">
      <Header />
      <HeroSection />
      <div className="mx-6 sm:mx-8 lg:mx-12 xl:mx-auto mb-8 flex max-w-7xl flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Titre ou Auteur
          </label>

          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Filtre Statut
          </label>

          <Filter value={statusFilter} onChange={setStatusFilter} />
        </div>

        <button
          onClick={() => router.push("/books/create")}
          className="flex items-center justify-center rounded-lg bg-blue-950 px-6 py-3 font-medium text-white transition hover:bg-blue-900"
        >
          + Ajouter un Livre
        </button>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
