"use client"
import BookForm from "@/components/BookForm";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";

function page() {
  return (
    <div>
      <Header />
      <BookForm
        onSubmit={async (data) => {
          await fetch("/api/books", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }}
      />
      <Footer />
    </div>
  );
}

export default page;
