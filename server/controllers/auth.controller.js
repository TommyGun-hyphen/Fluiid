const config = require ("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    let errors = [];
    if(!req.body.username || req.body.username.length < 6){
        errors.push("Username should be at least 6 characters long.");
    }
    if(!req.body.email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)){
        errors.push("Email should be valid.");
    }
    if(!req.body.password || req.body.password.length < 8){
        errors.push("Password should be at least 8 characters long");
    }else{
        if(req.body.password != req.body.password.trim()){
            errors.push("Password should not start or end with Spaces");
        }
    }
    

    if(errors.length > 0){
        res.status(400).send({
            message: "Bad input!",
            errors
        })
        return;
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        creation_date: new Date(),
    });

    user.save((err, user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        //By default a user has the 'User' role
        res.status(201).send({message: "User was registered successfully!"});
    })
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }

        if(!user){
            res.status(404).send({message: "User not found!"});
            return;
        }

        let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        if(!isPasswordValid){
            res.status(401).send({message:"Invalid password!"});
            return;
        }
        let token = jwt.sign({id:user.id}, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        })
    });
}
