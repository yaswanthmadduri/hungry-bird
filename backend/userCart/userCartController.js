const userCartService = require('./userCartService');

// get cart items
exports.getCartItems = async function (req, res, next) {
    try {
        var result = await userCartService.getCartItemsService(req.params.userEmailId);
        return res.status(200).json({ status: 200, cartItems: result.cartItems, message: "Available items in cart" });

    }
    catch (e) {
        return res.status(500).json({ status: 500, error: e, message: "Error occured while fetching data" });
        next(e);
    }
}

// delete item from cart

exports.deleteItemFromCart = async function (req, res, next) {
    try {
        var result = await userCartService.deleteItemFromCartService(req.params.userEmailId, req.body.itemName);
        return res.status(200).json({ status: 200, result: result, message: "Deleted that item from cart" });

    }
    catch (e) {
        return res.status(500).json({ status: 500, error: e, message: "Error occured while fetching data" });
        next(e);
    }
}

//increase item quantity

exports.increaseItemQuantity = async function (req, res, next) {
    try {
        var result = await userCartService.increaseItemQuantityService(req.params.userEmailId, req.body.itemName);
        return res.status(200).json({ status: 200, message: "Increased item quantity in cart by 1" });
    }
    catch (e) {
        return res.status(500).json({ status: 500, error: e, message: "Error occured while fetching data" });
        next(e);
    }
}


//decrease item quantity

exports.decreaseItemQuantity = async function (req, res, next) {
    try {
        var result = await userCartService.decreaseItemQuantityService(req.params.userEmailId, req.body.itemName);
        return res.status(200).json({ status: 200, message: "Decreased item quantity in cart by 1" });
    }
    catch (e) {
        return res.status(500).json({ status: 500, error: e, message: "Error occured while fetching data" });
        next(e);
    }
}


// add item to cart

exports.addItemToCart = async function (req, res, next) {
    try {
        var qty = 1;
        var result = await userCartService.addItemToCartService(req.params.userEmailId,
            req.body.itemName,
            qty,
            req.body.itemCost,
            req.body.itemType,
            req.body.productImage,
            req.body._id);
        return res.status(200).json({ status: 200, result : result._id, message: "Item added to cart successfully" });
    }
    catch (e) {
        return res.status(500).json({ status: 500, error: e, message: "Error occured while fetching data" });
        next(e);
    }
}