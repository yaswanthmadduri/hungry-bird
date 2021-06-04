const restaurantService = require('../restaurantItems/restaurantService');
const foodItem = require('../model/fooditem');

/// POST ITEMS TO RESTAURANT LIST
exports.addItemstoRestaurant = async function (req, res, next) {
    try {
        var result = await restaurantService.addItemsService(req.body.itemName,
            req.body.itemQuantityAvailable,
            req.body.itemQuantityBought,
            req.body.itemCost,
            req.body.itemType,
            "http://localhost:3000/" + req.file.path);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Added" });

    }
    catch (e) {
        return res.status(200).json({ status: 200, data: e, message: "Item already exists in the list" });
        next(e);
    }

}


///GET ALL ITEMS LIST FROM RESTAURANT

exports.getAllItems = async function (req, res, next) {
    try {
        var result = await restaurantService.getAllItemsService();
        return res.status(200).json({ status: 200, data: result, message: "Available items" });

    }
    catch (e) {
        return res.status(200).json({ status: 500, data: e, message: "Error occured while fetching data" });
        next(e);
    }

}


///EDIT availability

exports.editItem = async function (req, res, next) {
    try {
        var name = req.params.itemName;
        var result = await restaurantService.editItemService(name, req.body.itemQuantityAvailable);
        return res.status(200).json({ status: 200, data: result, message: "Item updated" });
    }
    catch (e) {
        return res.status(500).json({ status: 200, data: e, message: "Error occured while updating" });
        next(e);
    }
}



///DELETE ITEM FROM RESTAURANT LIST
exports.deleteItem = async function (req, res, next) {
    try {
        var name = req.body.itemName;
        var result = await restaurantService.deleteItemService(name);
        return res.status(200).json({ status: 200, data: result, message: "Item deleted" });

    }
    catch (e) {
        return res.status(500).json({ status: 200, data: e, message: "Error occured while deleting" });
        next(e);
    }
}

