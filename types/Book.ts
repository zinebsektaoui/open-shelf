export type Book = {
  _id?: string;
  isbn:string;
  title: string;
  author: string;
  category: string;
  publicationYear: number;
  description: string;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
};