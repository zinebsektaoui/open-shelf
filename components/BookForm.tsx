"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/Book";
import { useRouter } from "next/navigation";
type BookFormProps = {
  initialData?: Book;
  onSubmit: (data: Omit<Book, "_id">) => Promise<void> | void;
  onCancel?: () => void;
};

export default function BookForm({
  initialData,
  onSubmit,
  onCancel,
}: BookFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationYear: "",
    category: "",
    description: "",
    available: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        isbn: initialData.isbn,
        publicationYear: initialData.publicationYear.toString(),
        category: initialData.category,
        description: initialData.description,
        available: initialData.available,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      ...formData,
      publicationYear: Number(formData.publicationYear),
    });
    router.push("/");
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-slate-200 bg-indigo-50/60 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-900 focus:bg-white focus:outline-none transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-12 w-full max-w-2xl rounded-2xl bg-white p-10 shadow-lg"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-blue-950">
          {initialData ? "Modifier un livre" : "Nouveau Registre"}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          {initialData
            ? "Modifiez les informations du livre sélectionné."
            : "Veuillez renseigner les informations détaillées du nouvel ouvrage à intégrer au catalogue."}
        </p>
      </div>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Titre de l&apos;ouvrage
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Ex: Le Petit Prince"
            className={inputClasses}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Auteur
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Ex: Antoine de Saint-Exupéry"
            className={inputClasses}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              ISBN
            </label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              placeholder="Ex: 978-3-16-148410-0"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Année de publication
            </label>
            <input
              type="number"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleChange}
              required
              placeholder="Ex : 2024"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Catégorie
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2364748b%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.1rem]`}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Roman">Roman</option>
            <option value="Science">Science</option>
            <option value="Histoire">Histoire</option>
            <option value="Informatique">Informatique</option>
            <option value="Biographie">Biographie</option>
            <option value="Économie">Économie</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description du livre
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Résumé ou biographie..."
            className={`${inputClasses} resize-none`}
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <input
            id="available"
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
          />
          <label htmlFor="available" className="text-sm text-slate-700">
            Livre disponible
          </label>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full rounded-lg border border-slate-200 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-950 py-3 font-semibold text-white transition hover:bg-blue-900"
        >
          {initialData ? "Modifier le livre" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
