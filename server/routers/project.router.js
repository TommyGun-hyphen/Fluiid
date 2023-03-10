const {verifyToken} = require('../middlewares/authJwt');
const controller = require('../controllers/project.controller');
const express = require('express');
const {populateProject} = require('../middlewares/populate');


const router = express.Router();

router.use(verifyToken);
router.get('/', 
    controller.index
);

router.get('/:project_id', 
    populateProject,
    controller.show
);

router.post('/', 
    controller.store
);

router.delete('/:project_id', 
    populateProject,
    controller.destroy
);
router.put('/:project_id',
    populateProject,
    controller.update
);

const boardRouter = require('./board.router');

router.use(
    '/:project_id/board',
    populateProject,
    boardRouter
);


module.exports = router;