"use client";

import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import Header from "@/layouts/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="w-full bg-slate-50">
      <Header />
      <HeroSection />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book: any) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}