const mongoose = require('mongoose');
const Project = require('../models/project.model');

const populateProject = (req, res, next) => {
    console.log(req.params)
    if(!req.params.project_id){
        console.warn("request does not contain parameter 'project_id'. no need to use populateProject middleware");
        next();
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



module.exports = {
    populateProject
};