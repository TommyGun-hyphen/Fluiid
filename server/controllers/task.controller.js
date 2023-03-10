const Task = require('../models/task.model');

//get tasks for req.board
exports.index = (req, res) => {
    Task.find({
        board: req.board.id
    }).exec((err, tasks)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }
        return res.send(tasks);
    })
}

exports.show = (req, res) => {
    res.send(req.task);
}

exports.store = (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        creation_date: new Date(),
        last_date: new Date(),
        board: req.board.id
    });

    task.save((err, task) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.status(201).send({message: "Task created successfully!"});
    })
}

exports.destroy = (req, res) => {
    Task.findOne({
        _id: req.task_id
    }).exec((err, task)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }

        if(!task){
            res.status(404).send({message: "Task not found!"});
            return;
        }

        task.remove(err=>{
            if(err){
                res.status(500).send({message: err});
                return;
            }
            res.status(202).send({message: "Task deleted successfully!"});
        });
    })
}