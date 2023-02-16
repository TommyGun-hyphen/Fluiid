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
    let projectId = req.params.project_id;
    if(!isValidObjectId(projectId)){
        res.status(404).send({message: "Project not found!"});
        return;
    }
    Project.findById(projectId).exec((err, project) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(project){
            res.send({project});
            return;
        }
        res.status(404).send({message: "Project not found!"});
    });
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
        isPublic: req.body.isPublic || false,
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
    if(!isValidObjectId(req.params.project_id)){
        res.status(404).send({message: "Project not found!"});
        return;
    }

    Project.findOne({
        id: req.params.projectId
    }).exec((err, project) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(!project){
            res.status(404).send({message: "Project not found!"});
            return;
        }

        if(!project.owner.equals(req.user.id)){
            //not equals //user does not own project
            res.status(403).send({message: "Unauthorized!"});
            return;
        }
        res.send({message: "Project deleted successfully"});
    })
}
