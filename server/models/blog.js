const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;

const BlogSchema = Schema({
    product_id: {type: Schema.Types.ObjectId, ref: 'product'},
    blog_title: {type: String, required: true},
    blog_desc: {type: String, required: true},
    blog_image: {type: String, required: true},
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, default: Date.now()}
})

module.exports = Mongoose.Model('blog', BlogSchema, 'blog');