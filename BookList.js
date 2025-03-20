import React from "react";

function BookList({ books, onEdit, onDelete }) {
  return (
    <div className="book-list">
      <h2>📖 Knygų sąrašas</h2>
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>{book.author} ({book.year})</p>
          </div>
          <div className="book-actions">
            <button className="edit-btn" onClick={() => onEdit(book)}>✏️</button>
            <button className="delete-btn" onClick={() => onDelete(book.id)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
