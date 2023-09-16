const Book = require('../models/book');

module.exports.index = async (req, res) => {
    // const genres = ['fantasy', 'romance', 'crime'];
    // const filters = ['title', 'author', 'isbn'];
    // const books = await Book.find({}).populate('owner').sort({ title: 1 });
    // res.render('books/all', { books, genres, filters });
    const books = await Book.find({}).populate('owner').sort({ title: 1 });
    res.send(books);
};

// rewrite with react: 
module.exports.myIndex = async (req, res) => {
    // ejs version: 
    // const currentUser = req.user._id;
    // const books = await Book.find({ owner: currentUser }).populate('owner').sort({ title: 1 });
    // res.render('books/mine', { books });
    // react version:
    const currentUser = req.body[0]._id;
    // const currentUser = req.user._id;
    const books = await Book.find({ owner: currentUser }).populate('owner').sort({ title: 1 });
    res.send(books);
};

module.exports.search = async (req, res) => {
    const { title, author, isbn, genres } = req.query.search;
    // console.log(req.query);
    // Backend: make Queries with $text work so that typing in one word will give all bigger strings as result that contain that partial string
    // const books = await Book.find({ $text: { $search: `${title}` } }).populate('owner').sort({ title: 1 });
    const books = await Book.find({ $or: [{ title: `${title}` }, { author: `${author}` }, { isbn: `${isbn}` }] }).populate('owner').sort({ title: 1 });
    res.render('books/search', { books })
};

module.exports.renderNewForm = (req, res) => {
    res.render('books/new');
};

module.exports.createBook = async (req, res, next) => {
    const book = new Book(req.body.book);
    book.owner = req.user._id;
    await book.save();
    req.flash('success', 'You successfully created a new book!');
    res.redirect(`/books/${book._id}`);
};

module.exports.showBook = async (req, res) => {
    const book = await Book.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'writer'
        },
    }).populate('owner');
    if (!book) {
        req.flash('error', 'Cannot find that book!');
        return res.redirect('/books');
    };
    res.render('books/show', { book });
};

module.exports.renderEditForm = async (req, res) => {
    const book = await Book.findById(req.params.id)
    if (!book) {
        req.flash('error', 'Cannot find that book!');
        return res.redirect('/books');
    };
    res.render('books/edit', { book });
};

module.exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, { ...req.body.book });
    req.flash('success', 'Successfully updated this book!');
    res.redirect(`/books/${book._id}`)
};

module.exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a book!');
    res.redirect('/books');
};


