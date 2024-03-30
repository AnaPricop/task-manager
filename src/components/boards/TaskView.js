import React, {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from "../../css/tasks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaTags, FaTasks  } from "react-icons/fa";
import {Dropdown} from "react-bootstrap";

const TaskView = ({name, show, setShowTaskView, task, setTasks, tasks, ...props}) => {
  //  const [show, setShow] = useState(false);

    const handleClose = () => setShowTaskView(false);
    //const handleShow = () => setShowTaskView(true);
    const onUpdate = async (e) => {
        // e.preventDefault();
        let sts = {status: e};
        await axios
            .put("http://localhost:8001/api/tasks/" + task._id, sts)
            .then((res) => {
                res.data.task.status = e;
                setTasks([...tasks.filter(function (tsk) {
                    return tsk._id !== task._id
                }), res.data.task]); //for going last on the list
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };
    const evt = (e) => {
        onUpdate(e);
    };
    return (
        <>
            {/*<Button variant="primary" onClick={handleShow} className="me-2">*/}
            {/*    {name}*/}
            {/*</Button>*/}
            <Offcanvas show={show} onHide={handleClose} {...props} className="py-3">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{task.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="labels-task"><FaTags /> <span className="label-t">Labels</span>
                        {task.subject.length > 0 ? task.subject.map((tag, index) => (
                            <div className="label-task justify-content-center align-items-center" key={index}>
                                <span className="text">{tag}</span>
                            </div>
                        )) : <div className="label-task justify-content-center align-items-center">
                            <span className="text">Default</span>
                        </div>} </div>
                    <div className="labels-task"><FaTasks/> <span className="label-t">Status</span>
                        <Dropdown className="d-inline dropdown-status" onSelect={evt}>
                            <Dropdown.Toggle id="dropdown-autoclose-true" variant="dark"
                                             className="dropdown-status dropdown-fr" size="sm">
                                {task.status === '0' ? 'To Do' : (task.status === '1' ? 'In Progress' : 'Done')}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-status">
                                {parseInt(task.status) === 0 ? '' : <Dropdown.Item eventKey="0">To Do</Dropdown.Item>}
                                {parseInt(task.status) === 1 ? '' : <Dropdown.Item eventKey="1">In Progress</Dropdown.Item>}
                                {parseInt(task.status) === 2 ? '' : <Dropdown.Item eventKey="2">Done</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default TaskView;