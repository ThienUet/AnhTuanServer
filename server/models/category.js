const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;

const CategorySchema = ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    created_at: {type: Date, require: false},
    updated_at: {type: Date, required: false}
});

module.exports = Mongoose.model('category', CategorySchema, 'category');