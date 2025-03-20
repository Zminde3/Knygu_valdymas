from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# 📌 Sukuriame DB
def init_db():
    with sqlite3.connect("database.db") as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                year INTEGER NOT NULL
            )
        """)

init_db()

# 📌 Gauti visas knygas
@app.route("/books", methods=["GET"])
def get_books():
    with sqlite3.connect("database.db") as conn:
        books = conn.execute("SELECT * FROM books").fetchall()
    return jsonify([{"id": b[0], "title": b[1], "author": b[2], "year": b[3]} for b in books])

# 📌 Pridėti knygą
@app.route("/books", methods=["POST"])
def add_book():
    data = request.json
    if not all(k in data for k in ["title", "author", "year"]):
        return jsonify({"error": "Visi laukai privalomi!"}), 400
    with sqlite3.connect("database.db") as conn:
        conn.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
                     (data["title"], data["author"], data["year"]))
        conn.commit()
    return jsonify({"message": "Knyga pridėta!"}), 201

# 📌 Redaguoti knygą
@app.route("/books/<int:id>", methods=["PUT"])
def update_book(id):
    data = request.json
    with sqlite3.connect("database.db") as conn:
        conn.execute("UPDATE books SET title=?, author=?, year=? WHERE id=?",
                     (data["title"], data["author"], data["year"], id))
        conn.commit()
    return jsonify({"message": "Knyga atnaujinta!"})

# 📌 Ištrinti knygą
@app.route("/books/<int:id>", methods=["DELETE"])
def delete_book(id):
    with sqlite3.connect("database.db") as conn:
        conn.execute("DELETE FROM books WHERE id=?", (id,))
        conn.commit()
    return jsonify({"message": "Knyga ištrinta!"})

if __name__ == "__main__":
    app.run(debug=True)
