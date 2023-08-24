const Joi = require('joi');

module.exports.bookSchema = Joi.object({
    book: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        image: Joi.string().required(),
        isbn: Joi.number().required(),
        blurb: Joi.string().required(),
    }).required()
});

// module.exports.reviewSchema = Joi.object({
//     review: Joi.object({
//         rating: Joi.number().required().min(1).max(5),
//         body: Joi.string().required(),
//     }).required()
// });