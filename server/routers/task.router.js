const {verifyToken} = require('../middlewares/authJwt');
const controller = require('../controllers/task.controller');
const express = require('express');
const {populateProject} = require('../middlewares/populate');

const router = express.Router();

router.get('/', controller.index);


module.exports = router;