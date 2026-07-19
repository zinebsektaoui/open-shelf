"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookForm from "@/components/BookForm";
import { Book } from "@/types/Book";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import Spinner from "@/layouts/Spinner";

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();

      setBook(data);
      setLoading(false);
    };

    fetchBook();
  }, [id]);

  const handleUpdate = async (updatedBook: Omit<Book, "_id">) => {
    await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    router.push("/");
  };

  if (loading) return <Spinner/>;

  if (!book) return <p>Livre introuvable</p>;

  return (
    <div>
      <Header />
      <BookForm initialData={book} onSubmit={handleUpdate} />
      <Footer />
    </div>
  );
}
