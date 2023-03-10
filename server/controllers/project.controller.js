const mongoose = require('mongoose');
const Project = require('../models/project.model');
const User = require('../models/user.model');
const {isValidObjectId} = require('../utils');

//get all projects for current logged in user
exports.index = (req, res) => {
    Project.find({
        owner: req.user._id
    }).exec((err, projects) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.send(projects);
    })
}
//get one project by :id
exports.show = (req, res) => {
    res.send(req.project);
}

//store new project
exports.store = (req, res) => {
    if(!req.body.title || req.body.title.length < 6){
        res.status(400).send({message: 'title should be at least 6 characters long!'});
        return;
    }

    let project = new Project({
        title: req.body.title,
        description: req.body.description || null,
        is_public: req.body.is_public || false,
        creation_date: new Date(),
        owner: req.user._id,
        last_date: new Date(),
    })

    project.save((err, project)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.status(201).send({project});
    })
}

//delete project if it belongs to logged in user

exports.destroy = (req, res) => {
    if(!project.owner.equals(req.user.id)){
        //not equals //user does not own project
        res.status(403).send({message: "Unauthorized!"});
        return;
    }
    project.remove((err) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.send({message: "Project deleted successfully"});

    })
}

exports.update = (req, res) => {
    req.project.update({
        title: req.body.title || req.project.title,
        description: req.body.description || req.project.description,
        is_public: req.body.is_public || req.project.is_public,
        last_date: new Date()
    }).exec(err=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({message: "Project updated successfully"});
    })
}
