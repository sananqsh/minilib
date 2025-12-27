const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const BOOKS_FILE = path.join(__dirname, "books.json");

app.use(express.json());

function readBooks() {
  const data = fs.readFileSync(BOOKS_FILE, "utf-8");
  return JSON.parse(data);
}

function writeBooks(books) {
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
}

// =====================
// CREATE BOOK
// =====================
app.post("/books", (req, res) => {
  const { id, title, author, published_year } = req.body;

  if (!id || !title || !author || !published_year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const books = readBooks();

  const exists = books.find(b => b.id === id);
  if (exists) {
    return res.status(400).json({ message: "Book with this ID already exists" });
  }

  const newBook = { id, title, author, published_year };
  books.push(newBook);
  writeBooks(books);

  res.status(201).json(newBook);
});

// =====================
// SEARCH BOOKS BY TITLE
// =====================
app.get("/books/search", (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  const books = readBooks();
  const results = books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  res.json(results);
});

// =====================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

