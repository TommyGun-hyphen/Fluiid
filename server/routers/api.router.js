const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const projectRouter = require('./project.router');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);

module.exports = router;