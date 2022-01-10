const jwt = require ("jsonwebtoken");
const expressJwt = require("express-jwt");
const UserFile = require("../Models/UserFile");

exports.login = (req, res) => {
    const {username, password} = req.body;
    UserFile.findOne({username : username}, (err, foundUser) => {
        if (err) {
            console.log(err);
            } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: "5h"});
                    return res.json({token, username});
                } else {
                    return res.status(400).json({
                        error: "Incorrect Password!"
                    });
                }
            } else {
                return res.status(400).json({
                    error: "Incorrect Username!"
                });
            }
        }
    });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, algorithms: ["HS256"]
});