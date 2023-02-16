const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        User.findOne({
            _id: decoded.id
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                res.status(500).send({ message: "User no longer exists" });
                return;
            }
            req.user = user;
            next();
        })
    })
}

isAdmin = (req, res, next) => {
    user = req.user;

    Role.find({
        _id: { $in: user.roles }
    }, (err, roles) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        if (roles.some(r => r.name === "admin")) {
            next();
            return;
        }

        res.status(403).send({ message: "require admin role!" });
        return;
    })
}

isModerator = (req, res, next) => {
    user = req.user;
    Role.find({
        _id: { $in: user.roles }
    }, (err, roles) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        if (roles.some(r => r.name === "moderator")) {
            next();
            return;
        }

        res.status(403).send({ message: "require moderator role!" });
        return;
    })
}

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
}

module.exports = authJwt;