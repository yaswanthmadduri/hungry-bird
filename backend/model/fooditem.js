const mongoose = require('mongoose');

const foodItemsSchema = mongoose.Schema({

    itemName:{
        type:String,
        required: true
    },
    itemQuantityAvailable:{
        type:Number,
        required: true
    },
    itemQuantityBought:{
        type: Number,
        required: true
    }
});

const foodItem = module.exports = mongoose.model('foodItem',foodItemsSchema);