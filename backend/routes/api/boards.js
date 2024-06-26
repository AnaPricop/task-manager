const express = require('express');
const router = express.Router();
const Board = require('../../models/Board');
const jwt = require("jsonwebtoken");
const Project = require('../../models/Project');
// router.get('/', (req, res) => {
//     //   console.log("aaa", req.headers["authorization"], "aaa")
//     let token = req.headers["authorization"].split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
//     var tkn = decoded._id;
//     console.log(tkn)
//
//     Board.find({user: tkn})
//         .then(boards => {
//             console.log(boards)
//             res.json(projects)})
//         .catch(err => res.status(404).json({ noprojectsfound: 'No boards found' }));
// });

router.get('/:id', (req, res) => {
    Board.find({"idProject": req.params.id})
        .then(board => res.json(board))
        .catch(err => res.status(404).json({noboardsfound: 'No boards found'}));
});


router.post('/', (req, res) => {
    //
    // let token = req.headers["authorization"].split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    // var tkn = decoded._id;
    if (req.body.action === 'get') {
        console.log(req.body.ids)
        let boards = [];
        for (let i in req.body.ids) {
            Board.find({"idProject": req.body.ids[i]})
                .then(board => {
                    console.log(board)
                    boards.push(board)
                    // res.json(board)
                })
                .catch(err => res.status(404).json({noboardsfound: 'No boards found'}));
        }
        console.log(boards)
        res.json(boards);
    } else {
        var arrBoard = {title: req.body.title, idProject: req.body.idProject, background: req.body.background};
        Board.create(arrBoard)
            .then(board => {
                Project.findById(req.body.idProject).then(proj => {
                    let ids = proj.idBoards;
                    // console.log(ids)
                    ids.push(board._id.toHexString());
                    // console.log(ids, typeof ids)
                    let to_upd = {'idBoards': ids}
                    Project.findByIdAndUpdate(req.body.idProject, to_upd).then(task => {
                    });
                    res.json({msg: 'Board added successfully', board: board})
                })

            })
            .catch(err => res.status(400).json({error: 'Unable to add this board'}));
    }
});

router.put('/:id', (req, res) => {
    Board.findByIdAndUpdate(req.params.id, req.body)
        .then(project => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id', (req, res) => {
    Board.findByIdAndDelete(req.params.id)
        .then(project => res.json({mgs: 'Project entry deleted successfully'}))
        .catch(err => res.status(404).json({error: 'No such a project'}));
});

module.exports = router;