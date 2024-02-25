const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
 //   console.log("aaa", req.headers["authorization"], "aaa")
    let token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    var tkn = decoded._id;
     console.log(tkn)

    Project.find({user: tkn})
        .then(projects => {
            console.log(projects)
            res.json(projects)})
        .catch(err => res.status(404).json({ noprojectsfound: 'No Projects found' }));
});

router.get('/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(404).json({ noprojectsfound: 'No project found' }));
});

router.post('/', (req, res) => {
    Project.create(req.body)
        .then(project => res.json({ msg: 'Project added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this project' }));
});

router.put('/:id', (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body)
        .then(project => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id', (req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(project => res.json({ mgs: 'Project entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a project' }));
});

module.exports = router;