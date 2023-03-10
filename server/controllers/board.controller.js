const Board = require('../models/board.model');
const Project = require('../models/project.model');
const {isValidObjectId} = require('../utils');


exports.index = (req, res) => {
    Board.find({
        project: req.project.id
    }).exec((err, boards) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.send(boards);
    })
}
//adds a board to project in params
exports.store = (req, res) => {
    let board = new Board({
        title: req.body.title,
        description: req.body.description || null,
        creation_date: new Date(),
        project: req.project.id,
        last_date: new Date()
    });

    board.save((err, board)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.status(201).send({message: "Board added successfully!"});
    })
}

exports.show = (req, res) => {
    res.send(req.board);
}

exports.destroy = (req, res) => {
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
            res.status(404).send({message: 'Board not found!'});
            return;
        }
        board.remove(err=>{
            if(err){
                res.status(500).send({message: err});
                return;
            }
            res.status(202).send({message: 'Board deleted successfully!'});
        })
    });
}

exports.update = (req, res) => {
    req.board.update({
        title: req.body.title || req.board.title,
        description: req.body.description || req.board.description,
        last_date: new Date()
    }).exec(err=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({message: "Board updated successfully"});
    })
}