const express = require('express');
const router = express.Router();


const controller = require('../controllers/board.controller');
const { verifyToken } = require('../middlewares/authJwt');
const{populateBoard} = require('../middlewares/populate');

router.use(verifyToken);

router.get('/', 
    controller.index
);
router.post('/', controller.store);

router.get('/:board_id', 
    populateBoard,
    controller.show
);

router.delete('/:board_id', 
    populateBoard,
    controller.destroy
);

router.put('/:board_id',
    populateBoard,
    controller.update
);

const taskRouter = require('./task.router');

router.use('/:board_id/task',
    populateBoard,
    taskRouter
);

module.exports = router;