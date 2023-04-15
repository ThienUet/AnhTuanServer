const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;


const ProductReview = Schema({
    review_date: {type: Date, default: Date.now()},
    user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    star: {type: Number, required: true},
    review_title: {type: String, required: true },
    review_content: {type: String, required: true},
});

module.exports = Mongoose.model('product_review', ProductReview, 'product_review');