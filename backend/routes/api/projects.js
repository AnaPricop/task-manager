const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const Board = require('../../models/Board');
const Task = require('../../models/Task');
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
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
    Project.find({user: tkn})
        .then(projects => {
            //console.log(projects)
            res.json({'projects': projects})})
        .catch(err => res.status(404).json({ noprojectsfound: 'No Projects found' }));
    // Project.find({user: tkn}).exec()
    //     .then(projects => {
    //             // console.log(projects)
    //             // res.json(projects)})
    //             if (req.params.aux === '1') {
    //                 nb_proj_all = projects.length;
    //
    //                 //   let livePromises = [];
    //                 for (var j in projects) {
    //                     var done = 1;
    //                     //projects.forEach(function (proj) {
    //                    // console.log(projects[j].idBoards)
    //                     //for (var k in projects[j].idBoards) {
    //                     //ivePromises.push(new Promise(resolve => {
    //                     Task.find({boardId: {$in: projects[j].idBoards}}).then(task => {
    //                         //console.log(task, "%%%")
    //                         for (var kk in task) {
    //                             if (task[kk].status !== 2 && task[kk].status !== '2') {
    //                                 done = 0;
    //                                // console.log(task[kk])
    //                                 //   break;
    //                             }
    //                         }
    //                         //resolve(task);
    //                     })
    //                     // }))
    //                     //  }
    //                     //  }
    //
    //
    //                     nb_boards = nb_boards + projects[j].idBoards.length;
    //                     if (done === 1)
    //                         nb_proj_done++;
    //                 }
    //                 //let lives = await Promise.all(livePromises);
    //                 //  console.log(lives)
    //                 nb_proj_inprogress = nb_proj_all - nb_proj_done;
    //                 res.json({
    //                     'done': nb_proj_done,
    //                     'inprogress': nb_proj_inprogress,
    //                     'all': nb_proj_all,
    //                     'boards': nb_boards,
    //                     'projects': projects,
    //                     // 'lives': lives
    //                 })
    //             } else {
    //                 res.json({
    //                     'projects': projects
    //                 })
    //             }
    //
    //         }
    //     )
    //     .catch(err => res.status(404).json({noprojectsfound: 'No Projects found'}));
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