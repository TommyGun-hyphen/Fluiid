const Board = require('../models/board.model');


//show all boards for project in params (populateProject middleware should be ran before this)
exports.index = (req, res) => {
    let boards = req.project.boards;
    console.log(boards);
    res.send();
}


//
exports.store = (req, res) => {
    //req.proejct needs to be populated

}