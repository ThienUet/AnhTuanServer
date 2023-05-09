const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ProductSchema = Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, required: true},
    percent_sale: {type: Number, required: true},
    // số lượng
    quantity: {type: Number, required: true},
    image: {type: Array, required: false},
    brand_id: {type: Schema.Types.ObjectId, ref: 'brand'},
    category_id: {type: Schema.Types.ObjectId, ref: 'category'},
});

module.exports = Mongoose.model('product', ProductSchema, 'product');