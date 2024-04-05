import React, {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from "../../css/tasks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FaTags, FaTasks, FaCalendarAlt, FaFileAlt, FaInfoCircle, FaComments} from "react-icons/fa";
import {Dropdown} from "react-bootstrap";
import dateFormat from "dateformat";
import LabelColors from "./LabelColors";
import Modal from "./ModalTask";

const TaskView = ({name, show, setShowTaskView, task, setTasks, tasks, ...props}) => {
    //  const [show, setShow] = useState(false);

    const handleClose = () => setShowTaskView(false);
    //const handleShow = () => setShowTaskView(true);
    // console.log(JSON.parse(task.subject))

    const updateTask = async (e) => {
        console.log(taskDescription, e)
        await axios
            .put("http://localhost:8001/api/tasks/" + task._id, taskDescription)
            .then((res) => {
                res.data.task.status = e;
                task.description = taskDescription;
                setSaveTask(!saveTask)
            })
            .catch((err) => {
                console.log("Error in update task!");
            });
    };
    const onUpdate = async (e) => {
        // e.preventDefault();
        let sts = {status: e};
        await axios
            .put("http://localhost:8001/api/tasks/" + task._id, sts)
            .then((res) => {
                res.data.task.status = e;
                var index1 = '';
                tasks.map((datum, index) => {
                    console.log(datum)
                    if (datum._id === res.data.task._id)
                        index1 = index;
                })
                console.log(index1)
                let newArr = [...tasks]; // copying the old datas array
                newArr[index1] = res.data.task;
                setTasks(newArr);
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };
    const evt = (e) => {
        onUpdate(e);
    };

    const [edit, setEdit] = useState(true);
    const [saveTask, setSaveTask] = useState(false);
    //const [descriptionTask, setDescriptionTask] = useState(false);

    const [taskDescription, setDescription] = useState(task.description);
    const onTodoChange = (value) => {
        setDescription(value)
    }
    const [colorLabel, setColorLabel] = useState(false);
    const [label, setLabel] = useState('');
    const [labels, setLabels] = useState(JSON.parse(task.subject));
    const labelColor = (tag) => {
        setColorLabel(!colorLabel);
        setLabel(tag);
    }
   // const [colorL, changeColorL] = useState("");
    // const approveDelete = (value) => {
    //     if (value === 1) {
    //         confirmedDelete();
    //     }
    // };
    // const [currCol]
    const changeColorL = (value) => {
console.log(value)
        setLabels(JSON.parse(value.subject))
    };
    return (
        <>
            {/*<Button variant="primary" onClick={handleShow} className="me-2">*/}
            {/*    {name}*/}
            {/*</Button>*/}
            <Offcanvas show={show} onHide={handleClose} {...props} className="py-3">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><FaFileAlt style={{marginRight: '10px'}}/>{task.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="labels-task"><FaTags style={{marginTop: '-2px'}}/> <span className="label-t"
                                                                                             style={{marginRight: '-6px'}}>Labels</span>
                        {labels.length > 0 ? labels.map((tag, index) => (
                            <div className={tag.color !== '' ? tag.color + " label-task justify-content-center align-items-center" : " label-task justify-content-center align-items-center"} key={index} onClick={() => {labelColor(tag);}}>
                                <span className="text">{tag.title}</span>
                            </div>

                        )) : <div className="label-task justify-content-center align-items-center">
                            <span className="text">Default</span>
                        </div>}
                        <LabelColors show={colorLabel} task={task} label={label} labels={task.subject} changeColor={changeColorL}/>
                        <div className="label-task justify-content-center align-items-center">
                            <span className="text">+</span>
                        </div>
                    </div>
                    <div className="labels-task"><FaTasks style={{marginTop: '-2px'}}/> <span
                        className="label-t">Status</span>
                        <Dropdown className="d-inline dropdown-status" onSelect={evt}>
                            <Dropdown.Toggle id="dropdown-autoclose-true" variant="dark"
                                             className="dropdown-status dropdown-fr" size="sm">
                                {parseInt(task.status) === 0 || task.status === '0' ? 'To Do' : (parseInt(task.status) === 1 || task.status === '1' ? 'In Progress' : 'Done')}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-status">
                                {parseInt(task.status) === 0 ? '' : <Dropdown.Item eventKey="0">To Do</Dropdown.Item>}
                                {parseInt(task.status) === 1 ? '' : <Dropdown.Item eventKey="1">In Progress</Dropdown.Item>}
                                {parseInt(task.status) === 2 ? '' : <Dropdown.Item eventKey="2">Done</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="labels-task py-2"><FaCalendarAlt style={{marginTop: '-6px'}}/> <span
                        className="label-t">Date</span>
                        <span className="label-t">{dateFormat(task.dueDate, "mmmm dS, h:MM TT")}</span>
                    </div>
                    <div className="labels-task py-2"><FaInfoCircle style={{marginTop: '-6px'}}/> <span
                        className="label-t">Description</span>
                        <span className="label-t" style={{marginLeft: '-38px'}}><button
                            className="edit-task btn btn-dark" onClick={() => {
                            setEdit(!edit);
                            setSaveTask(!saveTask)
                        }}>Edit</button></span>
                    </div>
                    <div className="labels-task py-2">
                        {/*<div contentEditable={edit} className="labels-task py-2 px-3"> {task.description}*/}
                        {/*</div>*/}
                        <input
                            className="labels-task py-2 px-3 form-control"
                            type="text"
                            defaultValue={task.description}
                            disabled={edit}
                            onChange={e => onTodoChange(e.target.value)}
                        />
                    </div>
                    <div className={saveTask ? "labels-task py-2" : "not-vis labels-task py-2"}>
                        <span><button className="save-task btn btn-dark" onClick={() => updateTask()}>Save</button></span>
                        <span><button className="cancel-task btn" onClick={() => {
                            setSaveTask(!saveTask);
                            setEdit(!edit)
                        }}>Cancel</button></span>
                    </div>
                    <div className="labels-task py-2"><FaComments style={{marginTop: '-6px'}}/> <span
                        className="label-t">Comments</span>

                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default TaskView;