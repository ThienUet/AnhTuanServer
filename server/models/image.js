const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageModel = Schema({
    type: String,
    path: String,
    name: String,
    description: String,
    size: Number,
    created_by: {type: Schema.Types.ObjectId, ref: 'user'},
    created_date: {type: Date, default: Date.now }
});
module.exports = mongoose.model('image', ImageModel, 'image');