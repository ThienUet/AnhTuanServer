const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;


const ProductCartSchema = Schema({
    product_id: {type: Schema.Types.ObjectId, ref: 'product'},
    user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    quantity: {type: Number, default: 0},
});

module.exports = Mongoose.model('product_cart', ProductCartSchema, 'product_cart');