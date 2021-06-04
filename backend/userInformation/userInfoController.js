const userInfoService = require('../userInformation/userInfoService');




// get all users
exports.getAllUsers = async function (req, res, next) {
    try {
        var result = await userInfoService.getAllUsersService();
        return res.status(200).json({ status: 200, data: result, message: "Available users" });

    }
    catch (e) {
        return res.status(500).json({ status: 500, data: e, message: "Error occured while fetching data" });
        next(e);
    }
}


//update profile pic
exports.updateProfilePic = async function (req, res, next) {
    try {
        var result = await userInfoService.updateProfilePicService(req.params.userEmailId, req.file.path);
        return res.status(200).json({ status: 200, data: result, message: "Updated your pic" });

    }
    catch (e) {
        return res.status(500).json({ status: 500, data: e, message: "Error occured while fetching data" });
        next(e);
    }
}

//get profile pic
exports.getProfilePic = async function (req, res, next) {
    try {
        var result = await userInfoService.getProfilePicService(req.params.userEmailId);
        return res.status(200).json({ status: 200, profilePicture: result.profilePicture, message: "Profile pic" });

    }
    catch (e) {
        return res.status(500).json({ status: 500, data: e, message: "Error occured while fetching data" });
        next(e);
    }
}


//delete user account 
exports.deleteUserAccount = async function (req, res, next){
    try {
        var result = await userInfoService.deleteUserAccountService(req.params.userEmailId);
        if(result === null){
            return res.status(200).json({ status: 200, message: "Deleted your account already or your account doesnot exist with HungryBird" });
        }
        else{
            return res.status(200).json({ status: 200, result : result, message: "Deleted your account" });
        }

    }
    catch (e) {
        return res.status(500).json({ status: 500, data: e, message: "Error occured while fetching data" });
        next(e);
    }
}

//userAuthentication

exports.userAuthentication = async function(req, res, next){
    try{
        var result = await userInfoService.userAuthenticationService();
            return res.status(200).json({ status: 200, "token": result.generateJwt(), result : result, message: "User is authenticated" });
    }
    catch (e) {
        return res.status(500).json({ status: 500, data: e, message: "Error occured while fetching data" });
        next(e);
    }
}