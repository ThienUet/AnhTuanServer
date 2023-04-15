const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;

// Chi tiết đơn hàng
const ProductCheckoutDetailSchema = Schema({
    product_id: {type: Schema.Types.ObjectId, ref: 'product'},
    product_name: {type: String, required: true},
    product_brand: {type: String, required: true},
    product_image: {type: String, required: true},
    product_category: {type: String, required: true},
    product_price: {type: String, required: true},
    product_quantity: {type: Number, required: true},
});

module.exports = Mongoose.model('product_checkout_detail', ProductCheckoutDetailSchema, 'product_checkout_detail');