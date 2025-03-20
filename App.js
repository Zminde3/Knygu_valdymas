import React, { useEffect, useState } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import "./App.css";

const API_URL = "http://localhost:5000/books";

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setBooks(data);
  };

  const handleSave = async (book) => {
    const method = book.id ? "PUT" : "POST";
    await fetch(`${API_URL}${book.id ? "/" + book.id : ""}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    setEditingBook(null);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchBooks();
  };

  return (
    <div className="container">
      <h1>📚 Knygų valdymas</h1>
      <BookForm onSave={handleSave} editingBook={editingBook} />
      <BookList books={books} onEdit={setEditingBook} onDelete={handleDelete} />
    </div>
  );
}

export default App;
