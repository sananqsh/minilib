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
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

