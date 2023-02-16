const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');
const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

router.get('/api/test/all', controller.allAccess);
router.get('/api/test/user', authJwt.verifyToken, controller.userAccess);
router.get('/api/test/admin',
    authJwt.verifyToken,
    authJwt.isAdmin,
    controller.adminAccess
);
router.get('/api/test/moderator',
    authJwt.verifyToken,
    authJwt.isModerator,
    controller.moderatorAccess
);

module.exports = router;