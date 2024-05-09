const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const Board = require('../../models/Board');
const Task = require('../../models/Task');
const jwt = require("jsonwebtoken");

router.get('/', async (req, res) => {
    //   console.log("aaa", req.headers["authorization"], "aaa")
    let token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    var tkn = decoded._id;
    console.log(tkn, req.params.aux)
    var nb_proj_done = 0;
    var nb_proj_all = 0;
    var nb_proj_inprogress = 0;
    var nb_boards = 0;
    var projects;


    var promise = await Project.find({user: tkn});
var to_send = [];
var alltsks = 0;
    for (var j in promise) {
        var done = 1;
        let data = await Task.find({boardId: {$in: promise[j].idBoards}}).exec();
let done_tasks = 0;
        for (var kk in data) {
            if (data[kk].status !== 2 && data[kk].status !== '2') {
                done = 0;
                // break;
            }
            else
                done_tasks ++ ;
        }
        // let nb_of_tasks = data.length;
        alltsks = alltsks + data.length;
        let alltasks = {allTasks: data.length, doneTasks: done_tasks};
        to_send.push(alltasks)
        // to_send[j]['allTasks'] = data.length;
        // to_send[j]['doneTasks'] =done_tasks;
        // promise[j]['allTasks'] = data.length;
        // promise[j]['doneTasks'] = done_tasks;
        // console.log(done_tasks)
        nb_boards = nb_boards + promise[j].idBoards.length;
        if (done === 1 && promise[j].idBoards.length > 0)
            nb_proj_done++;

    }
    nb_proj_all = promise.length;
    nb_proj_inprogress = nb_proj_all - nb_proj_done;

    res.json({
        'done': nb_proj_done,
        'inprogress': nb_proj_inprogress,
        'all': nb_proj_all,
        'boards': nb_boards,
        'projects': promise,
        'to_send': to_send,
        'all_tsks': alltsks
    })
})
;

router.get('/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(404).json({noprojectsfound: 'No project found'}));
});

router.post('/', (req, res) => {

    let token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    var tkn = decoded._id;
    var arrProj = {image: req.body.image, title: req.body.title, user: tkn};
    Project.create(arrProj)
        .then(project => {
            res.json({msg: 'Project added successfully', project: project})
        })
        .catch(err => res.status(400).json({error: 'Unable to add this project'}));
});

router.put('/:id', (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body)
        .then(project => res.json({msg: 'Updated successfully'}))
        .catch(err =>
            res.status(400).json({error: 'Unable to update the Database'})
        );
});

router.delete('/:id', (req, res) => {
    Board.find({idProject: req.params.id}).then(board => {

        for (var i in board) {
            console.log(board[i]._id);
            Task.deleteMany({boardId: board[i]._id}).then(task => {
                console.log('deleted')
            })

        }
        Board.deleteMany({idProject: req.params.id})
            .then(board => {
                Project.findByIdAndDelete(req.params.id)
                    .then(project => res.json({mgs: 'Project entry deleted successfully'}))
            });
    });

    // console.log(boardId)

    // Project.findByIdAndDelete(req.params.id)
    //     .then(project => res.json({ mgs: 'Project entry deleted successfully' }))
    //     .catch(err => res.status(404).json({ error: 'No such a project' }));
});


module.exports = router;