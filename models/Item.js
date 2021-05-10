const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceM: {
        type: Number,
        default: 0
        
    },
    priceL: {
        type: Number,
        default: 0

    },
}, {collection: 'app'});

module.exports = Item = mongoose.model('item',ItemSchema);