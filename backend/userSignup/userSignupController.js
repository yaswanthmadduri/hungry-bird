const signupService = require('../userSignup/userSignupService').userSignUpService;

exports.userSignup = async function (req, res, next) {
    // Validate request parameters, queries using toi-validator
    try {
        var result = await signupService(req.body.userEmailId,
            req.body.userPassword,
            req.body.userName,
            req.body.userPhoneNumber,
            req.body.termsAccepted);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Signed up" });

    }
    catch (e) {
        res.status(200).json({ status: 200, data: e, message: "Email id exists already" });
        next(e);
    }

}
