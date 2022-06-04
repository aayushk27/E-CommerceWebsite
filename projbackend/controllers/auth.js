const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


// note: signup
exports.signup = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save user in db"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            // password :user.password,
            id: user._id
        })
        // res.json(user);
    })
};

// note: signin
exports.signin = (req, res) => {
    const errors = validationResult(req)


    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User email dosenot exist"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password donot match"
            })
        }
        //const token
        // const token = jwt.sign({_id:user.id}, process.env.SECRET);
        const token = jwt.sign({ _id: user.id }, "xyz");


        //put token in the cookie
        res.cookie("token", token, { expire: new Date() + 9999 })

        //send response to frontend
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, name, email, role } })


    })
}

// note: signout
exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User signed out successfully"
    })

};

//...protected route
exports.isSignedIn = expressJwt({
    secret: "xyz",
    userProperty: "auth"
})

//...custom middlewares

//  note: isAuthenticated
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if (!checker) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }

    next()
}
// note: isAdmin
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not an ADMIN, access denied"
        })
    }
    next()
}