const { reject } = require('lodash');
const userInfo = require('../model/userinfo');

///  GET CART ITEMS

exports.getCartItemsService = function (email) {
    return new Promise((resolve, reject) => {
        userInfo.findOne({ "email": email },
            function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
    });
}


/// DELETE ITEM FROM CART SERVICE 

exports.deleteItemFromCartService = function (email, itemName) {
    return new Promise((resolve, reject) => {
        userInfo.findOneAndUpdate({ email: email },
            { $pull: { cartItems: { itemName: itemName } } },
            function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });

    });
}


/// INCREASE QTY BY 1

exports.increaseItemQuantityService = function (email, itemName) {
    return new Promise((resolve, reject) => {
        userInfo.findOneAndUpdate(
            {
                email: email,
                "cartItems.itemName": itemName
            },
            {
                $inc: { "cartItems.$.itemQuantity": 1 }
            },
            {
                "upsert": true
            },
            function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
    });
}

/// DECREASE QTY BY 1

exports.decreaseItemQuantityService = function (email, itemName) {
    return new Promise((resolve, reject) => {
        userInfo.findOneAndUpdate(
            {
                email: email,
                "cartItems.itemName": itemName
            },
            {
                $inc: { "cartItems.$.itemQuantity": -1 }
            },
            {
                "upsert": true
            },
            function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
    });
}

/// ADD ITEM TO CART

exports.addItemToCartService = function (email, itemName, qty, cost, type, image, id) {
    return new Promise((resolve, reject) => {
        userInfo.findOneAndUpdate(
            { "email": email},
            {
                $push: {
                    cartItems: [
                        {
                            itemName: itemName,
                            itemQuantity: qty,
                            itemCost: cost,
                            itemType: type,
                            productImage: image,
                            _id: id
                        }
                    ]
                }
            },
            { upsert: true }
            , function (err, data) {
                if (!err) {
                    resolve(data);
                }
                else {
                    if (err.code == 11000) {
                        reject(err);
                    }
                    else
                        reject(err);
                }
            })
    });
}