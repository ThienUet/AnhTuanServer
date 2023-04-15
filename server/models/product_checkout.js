const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ObjectId = require('mongodb').ObjectId;

// Đơn hàng
const ProductCheckoutSchema = SChema({ 
    checkout_date: {type: Date, default: Date.now()},
    total_price: {type: Number, required: false},
    user_id: {type: SChema.Types.ObjectId, ref: 'user'},
    user_name: {type: String, required: true},
    user_address: {type: String, required: true},
    user_phone: {type: String, required: true},
    user_email: {type: String, required: true},
    status: {type: String, required: true},
    payment_method: {type: String, required: true},
})

module.exports = Mongoose.model('product_checkout', ProductCheckoutSchema, 'product_checkout');