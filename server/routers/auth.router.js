const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');
const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

router.post(
    '/signup',
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
);

router.post('/signin', controller.signin);

module.exports = router;