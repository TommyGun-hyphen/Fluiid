const mongoose = require('mongoose');
const Project = require('../models/project.model');
const Board = require('../models/board.model');
const Task = require('../models/task.model');
const {isValidObjectId} = require('../utils');

const populateProject = (req, res, next) => {
    
    if(!req.params.project_id){
        console.warn("request does not contain parameter 'project_id'. no need to use populateProject middleware");
        next();
        return;
    }
    if(!isValidObjectId(req.params.project_id)){
        res.status(404).send({message: "Project not found!"});
        return;
    }
    Project.findOne({
        _id: req.params.project_id
    }).exec((err, project) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(!project){
            res.status(404).send({message: "Project not found!"});
            return;
        }

        req.project = project;
        next();
    })
    
}
const populateBoard = (req, res, next) => {
    
    if(!req.params.board_id){
        console.warn("request does not contain parameter 'board_id'. no need to use populateBoard middleware");
        next();
        return;
    }
    if(!isValidObjectId(req.params.board_id)){
        res.status(404).send({message: "Board not found!"});
        return;
    }
    Board.findOne({
        _id: req.params.board_id
    }).exec((err, board) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(!board){
            res.status(404).send({message: "Board not found!"});
            return;
        }

        req.board = board;
        next();
    })
    
}
const populateTask = (req, res, next) => {
    if(!req.params.task_id){
        console.warn("request does not contain parameter 'task'. no need to use populateTask middleware");
        next();
        return;
    }
    if(!isValidObjectId(req.params.task_id)){
        res.status(404).send({message: "Task not found!"});
        return;
    }

    Task.findOne({
        _id: req.params.task_id
    }).exec( (err, task) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(!task){
            res.status(404).send({message: 'Task not found!'});
            return;
        }
        res.body.task = task;
    })
}

module.exports = {
    populateProject,
    populateBoard,
    populateTask
};