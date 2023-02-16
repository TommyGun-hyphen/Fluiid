const {verifyToken} = require('../middlewares/authJwt');
const controller = require('../controllers/project.controller');
const express = require('express');


const router = express.Router();

router.get('/', 
    verifyToken,
    controller.index
);

router.get('/:project_id', 
    verifyToken,
    controller.show
);

router.post('/', 
    verifyToken,
    controller.store
)

router.delete('/:project_id', 
    verifyToken,
    controller.destroy
)


const boardRouter = require('./board.router');
router.use('/:project_id/board', boardRouter);


module.exports = router;