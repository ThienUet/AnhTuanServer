const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const moment = require('moment');
moment.locale('vi');

const UserSchema = Schema({
    user_name: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    full_name: {type: String, required: false},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'client'},
    gender: {type: String, required: true},
    birth_date: {type: Date, required: true},
    banned: {type: Boolean, default: false},
    updated_date: {type: Date, required: false},
    create_date: {type: Date, required: false, default: moment().format()},
    created_by: {type: String, required: false},
    updated_by: {type: String, required: false},
    avatar: {type: String, required: false, default: ''},
});

module.exports = Mongoose.model('user', UserSchema, 'user');