
const userInfo = require('../model/userinfo');

exports.userSignUpService = function (email, password, name, phoneNumber, terms) {
    let newuserInfo = new userInfo();
    newuserInfo.email = email,
        newuserInfo.password = password,
        newuserInfo.userName = name,
        newuserInfo.userPhoneNumber = phoneNumber,
        newuserInfo.termsAccepted = terms,
        newuserInfo.signedUp = true,
        newuserInfo.profilePicture = "uploads/dummyprofilepic/avatar_male.svg";
    newuserInfo.cartItems = [];

    return new Promise((resolve, reject) => {
        newuserInfo.save((err, newuser) => {
            if (!err) {
                console.log(newuser)
                return resolve(newuser);
            }
    
            else {
                if (err.code == 11000)
                    return reject(err.code)
                else
                    return reject(err);
            }
        });
    });
}