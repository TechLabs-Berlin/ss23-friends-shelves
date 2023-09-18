const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const books = require('../controllers/books');
const { isLoggedIn, validateBook, isOwner } = require('../middleware');



router.route('/')
    .get(
        // isLoggedIn,
        catchAsync(books.index))
    .post(
        // isLoggedIn,
        validateBook,
        catchAsync(books.createBook));

router.post('/mine',
    // isLoggedIn,
    catchAsync(books.myIndex));

router.get('/search',
    // isLoggedIn,
    catchAsync(books.search));

router.get('/new',
    // isLoggedIn,
    books.renderNewForm);

router.route('/:id')
    .get(
        // isLoggedIn,
        catchAsync(books.showBook))
    .put(
        // isLoggedIn,
        // isOwner,
        validateBook,
        catchAsync(books.updateBook))
    .delete(
        // isLoggedIn,
        // isOwner,
        catchAsync(books.deleteBook));

router.get('/:id/edit',
    // isLoggedIn,
    isOwner, catchAsync(books.renderEditForm));


module.exports = router;