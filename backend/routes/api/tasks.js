const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const jwt = require("jsonwebtoken");

router.get('/:boardId', (req, res) => {
    //   console.log("aaa", req.headers["authorization"], "aaa")
    // let token = req.headers["authorization"].split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    // var tkn = decoded._id;
    // console.log(tkn)

    Task.find({boardId: req.params.boardId})
        .then(tasks => {
            console.log(tasks)
            res.json(tasks)})
        .catch(err => res.status(404).json({ noprojectsfound: 'No tasks found' }));
});

router.get('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(404).json({ noboardsfound: 'No task found' }));
});

router.post('/', (req, res) => {
    //
    // let token = req.headers["authorization"].split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    // var tkn = decoded._id;
  //  var arrTask={title: req.body.title, idProject: req.body.idProject, background: req.body.background};
    let token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    var tkn = decoded._id;
    var arrTask={ title: req.body.title, description: req.body.description, dueDate: req.body.dueDate, status: req.body.status,
    subject: req.body.subject, boardId: req.body.boardId, createdBy: tkn};
    console.log(arrTask)
    Task.create(arrTask)
        .then(task => {res.json({ msg: 'Task added successfully', task: task })})
        .catch(err => res.status(400).json({ error: 'Unable to add this task' }));
});

router.put('/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body)
        .then(task => {res.json({ msg: 'Updated successfully' , task: task})})
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});
//
// router.delete('/:id', (req, res) => {
//     Project.findByIdAndDelete(req.params.id)
//         .then(project => res.json({ mgs: 'Project entry deleted successfully' }))
//         .catch(err => res.status(404).json({ error: 'No such a project' }));
// });

module.exports = router;