const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: {
        type:String,
        required: true, 

    },
    img: {
        type:String,
        required: true, 

    },
    category: {
        type:String,
        required: true, 
    },
    price: {
        type:Number,
        required: true, 
    }
})

module.exports = Images = mongoose.model('image', imageSchema)