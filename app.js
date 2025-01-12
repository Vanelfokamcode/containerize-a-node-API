const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' }
];

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Bookstore API' });
})
// GET all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET book by id
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// POST new book
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book
app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
});

// DELETE book
app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });
    
    books.splice(bookIndex, 1);
    res.status(204).send();
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});