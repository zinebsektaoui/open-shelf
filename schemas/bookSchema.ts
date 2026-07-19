import { z } from "zod";

export const bookSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères.")
    .max(100, "Le titre ne peut pas dépasser 100 caractères."),

  author: z
    .string()
    .min(3, "Le nom de l'auteur est trop court."),

  isbn: z
    .string()
    .regex(
      /^(97(8|9))?\d{9}(\d|X)$/,
      "ISBN invalide."
    ),

  publicationYear: z
    .number()
    .min(1000, "Année invalide.")
    .max(
      new Date().getFullYear(),
      "L'année ne peut pas être dans le futur."
    ),

  category: z
    .string()
    .min(1, "Veuillez sélectionner une catégorie."),

  description: z
    .string()
    .min(10, "La description est trop courte.")
    .max(1000, "Description trop longue."),

  available: z.boolean(),
});

export type BookFormData = z.infer<typeof bookSchema>;