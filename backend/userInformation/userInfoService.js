const userInfo = require('../model/userinfo');
const passport = require('passport');



///  GET USERS FROM LIST

exports.getAllUsersService = function () {
    return new Promise((resolve, reject) => {
        userInfo.find(function (err, users) {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(users);
            }
        });
    });
}


/// UPDATE PROFILE PIC

exports.updateProfilePicService = function (email, filePath) {
    return new Promise((resolve, reject) => {
        userInfo.findOneAndUpdate(
            { "email": email },
            {
                $set: {
                    profilePicture: filePath
                }
            }
            , function (err, response) {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(response);
                }
            });
    });
}

exports.getProfilePicService = function (email) {
    return new Promise((resolve, reject) => {
        userInfo.findOne({ "email": email },
            function (err, data) {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            });

    });
}

exports.deleteUserAccountService = function (email) {
    return new Promise((resolve, reject) => {
        userInfo.findOneAndDelete(
            { "email": email }
            , function (err, data) {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            });
    });
}

/// user auth
exports.userAuthenticationService = function (){
    return new Promise ((resolve, reject) => {
            // call for passport authentication
            passport.authenticate('local', (err, user, info) => {
                // error from passport middleware
                if (err) return reject(err);
                // registered user
                else if (user) return resolve(user);
                // unknown user or wrong password
                else return reject(info);
            })(req, res);

    })
}