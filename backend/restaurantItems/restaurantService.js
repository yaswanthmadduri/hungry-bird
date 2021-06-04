
const foodItem = require('../model/fooditem');

// ADD ITEM INTO THE RESTAURANT LIST SERVICE
exports.addItemsService = function (name, availableQuantity, boughtQuantity, cost, type, itemPic) {

    let newFoodItem = new foodItem();
    newFoodItem.itemName = name,
        newFoodItem.itemQuantityAvailable = availableQuantity,
        newFoodItem.itemQuantityBought = boughtQuantity,
        newFoodItem.itemCost = cost,
        newFoodItem.itemType = type,
        newFoodItem.productImage = itemPic

    return new Promise((resolve, reject) => {
        newFoodItem.save((err, newitem) => {
            if (!err) {
                console.log(newitem)
                return resolve(newitem);
            }
            else {
                if (err.code == 11000) {
                    console.log(err)
                    return reject(err.code)
                }
                else
                    return reject(err);
            }
        });

    });
}

///  GET ITEMS FROM LIST

exports.getAllItemsService = function () {
    return new Promise((resolve, reject) => {
        foodItem.find(function (err, items) {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(items);
            }
        });
    });

}


///update availablity

exports.editItemService = function (itemName, quantity){
    return new Promise((resolve, reject) => {
        foodItem.findOneAndUpdate(
            { "itemName": itemName },
            {
                $set: {
                    itemQuantityAvailable: quantity
                }
            }
            , function (err, item) {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(item);
                }
            });
    });
}

/// DELETE ITEM FROM LIST SERVICE

exports.deleteItemService = function (itemName) {
    return new Promise((resolve, reject) => {
        foodItem.findByIdAndDelete({ "itemName": itemName },
        function (err, res) {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(res)
            }

        });
    });
}