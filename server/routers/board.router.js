const express = require('express');
const router = express.Router();

const {populateProject} = require('../middlewares/populate');

const controller = require('../controllers/board.controller');

router.use(populateProject);

router.get('/', controller.index);

module.exports = router;