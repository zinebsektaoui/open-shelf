import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const book = await Book.findByIdAndDelete(id);

  return book
    ? NextResponse.json({ message: "Book deleted successfully" })
    : NextResponse.json({ message: "Book not found" }, { status: 404 });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const book = await Book.findById(id);

  if (!book) {
    return NextResponse.json({ message: "Livre introuvable" }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const body = await request.json();

  const updatedBook = await Book.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return Response.json(updatedBook);
}