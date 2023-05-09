const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;

const BrandSchema = Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: false},
});

module.exports = Mongoose.model('brand', BrandSchema, 'brand');