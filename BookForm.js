import React, { useState, useEffect } from "react";

function BookForm({ onSave, editingBook }) {
  const [book, setBook] = useState({ title: "", author: "", year: "" });

  useEffect(() => {
    if (editingBook) setBook(editingBook);
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.year) return alert("Užpildyk visus laukus!");
    onSave(book);
    setBook({ title: "", author: "", year: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input placeholder="Pavadinimas" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
      <input placeholder="Autorius" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
      <input type="number" placeholder="Metai" value={book.year} onChange={(e) => setBook({ ...book, year: e.target.value })} />
      <button type="submit">{editingBook ? "Redaguoti" : "Pridėti"}</button>
    </form>
  );
}

export default BookForm;
