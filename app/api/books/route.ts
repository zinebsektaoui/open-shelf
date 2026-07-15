import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const books = await Book.find();
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const book = await Book.create(body);
  return NextResponse.json(book, { status: 201 });
}
