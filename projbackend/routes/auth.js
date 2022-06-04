var express = require('express')
var router = express.Router()
const { signout,signup, signin, isSignedIn} = require("../controllers/auth")
const { check } = require('express-validator/check');


router.post("/signup",[
    check("name", "name should be atlest 3 characters").isLength({min : 3}),
    check("email", "enter a valid email").isEmail(),
    check("password", "password length must be atleast 3").isLength({min : 3})
    
], signup);


router.post("/signin",[
    check("email", "enter a valid email").isEmail(),
    check("password", "password length must be atleast 5").isLength({min : 5})
    
], signin);

router.get("/signout", signout);

// router.get("/testroute", isSignedIn, (req, res)=>{
//     // res.send("A protected route")
//     res.json(req.auth)
// })

module.exports = router;