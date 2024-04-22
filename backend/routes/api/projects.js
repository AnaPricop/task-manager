const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const Board = require('../../models/Board');
const Task = require('../../models/Task');
const jwt = require("jsonwebtoken");

router.get('/:aux', (req, res) => {
    //   console.log("aaa", req.headers["authorization"], "aaa")
    let token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    var tkn = decoded._id;
    console.log(tkn, req.params.aux)
    var nb_proj_done = 0;
    var nb_proj_all = 0;
    var nb_proj_inprogress = 0;
    var nb_boards = 0;
    Project.find({user: tkn})
        .then(function (projects) {
            // console.log(projects)
            // res.json(projects)})
            if (req.params.aux === '1') {
                nb_proj_all = projects.length;
                var done = 1;
                // for (var j in projects) {
                    projects.forEach(function (proj) {
                        proj.idBoards.forEach(async function (id) {

                            //  for (var k in proj.idBoards) {
                            Task.find({boardId: id}).then(await function (task) {
                                for (var k in task) {
                                    if (task.status !== 2 && task.status !== '2') {
                                        done = 0;
                                        console.log(task)
                                        break;
                                    }
                                }
                            })
                        })
                        //  }


                        nb_boards = nb_boards + projects[j].idBoards.length;
                        if (done === 1)
                            nb_proj_done++;
                    })
                    nb_proj_inprogress = nb_proj_all - nb_proj_done;
                    res.json({
                        'done': nb_proj_done,
                        'inprogress': nb_proj_inprogress,
                        'all': nb_proj_all,
                        'boards': nb_boards,
                        'projects': projects
                    })
                }
            else
                {
                    res.json({
                        'projects': projects
                    })
                }

            }
        )
            .catch(err => res.status(404).json({noprojectsfound: 'No Projects found'}));
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

// router.get('/sts', (req, res) => {
//     let token = req.headers["authorization"].split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
//     var tkn = decoded._id;
//     console.log(tkn)
//
//     Project.find({user: tkn})
//         .then(projects => {
//             // console.log(projects)
//             // res.json(projects)
//             var nb_proj_done = 0;
//             var nb_proj_all = 0;
//             var nb_proj_inprogress = 0;
//             var nb_boards = 0;
//             for (var i in projects) {
//                 var done = 1;
//                 Board.find({idProject: projects[i]._id}).then(board => {
//
//                     for (var j in board) {
//                         Task.find({boardId: board[j]._id}).then(task => {
//                             for (var k in task) {
//                                 if (task.status !== 2) {
//                                     done = 0;
//                                     break;
//                                 }
//                             }
//                         })
//                         nb_boards++;
//                     }
//
//                 });
//                 nb_proj_all++;
//                 if (done === 1)
//                     nb_proj_done++;
//             }
//             nb_proj_inprogress = nb_proj_all - nb_proj_done;
//             res.json({
//                 'done': nb_proj_done,
//                 'inprogress': nb_proj_inprogress,
//                 'all': nb_proj_all,
//                 'boards': nb_boards,
//                 'projects': projects
//             })
//         })
//         .catch(err => res.status(404).json({noprojectsfound: 'No Projects found'}));
// });

module.exports = router;