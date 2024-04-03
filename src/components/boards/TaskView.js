import React, {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from "../../css/tasks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FaTags, FaTasks, FaCalendarAlt,FaFileAlt,FaInfoCircle,FaComments } from "react-icons/fa";
import {Dropdown} from "react-bootstrap";
import dateFormat from "dateformat";

const TaskView = ({name, show, setShowTaskView, task, setTasks, tasks, ...props}) => {
    //  const [show, setShow] = useState(false);

    const handleClose = () => setShowTaskView(false);
    //const handleShow = () => setShowTaskView(true);
    console.log(task)
    const onUpdate = async (e) => {
        // e.preventDefault();
       // let sts = {status: e};
        await axios
            .put("http://localhost:8001/api/tasks/" + task._id, taskData)
            .then((res) => {
                res.data.task.status = e;
                var index1 = '';
                tasks.map((datum, index) => {
                    console.log(datum)
                    if (datum._id === res.data.task._id)
                        index1 = index;
                })
                console.log(index1)
              //  let newArr = [...tasks]; // copying the old datas array
               // console.log(tasks)
               // newArr[index1] = res.data.task;
               // console.log(newArr)
                task.description = taskData.description;
                task.status = taskData.status;
              //  setTasks(newArr);
                setSaveTask(!saveTask)
            })
            .catch((err) => {
                console.log("Error in update task!");
            });
    };

    const [edit, setEdit] = useState(true);
    const [saveTask, setSaveTask] = useState(false);
    //const [descriptionTask, setDescriptionTask] = useState(false);
    const onTodoChange = (value) =>{
        // console.log(value)
        // setDescriptionTask(value);
        setTaskData({...taskData, 'description': value})
    }
    const [taskData, setTaskData] = useState({  //board data
        description: task.description,
        status: task.status
    });
    const evt = (e) => {
        setTaskData({...taskData, 'status': e})
        onUpdate(e);
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
                    <div className="labels-task"><FaTags style={{marginTop:'-2px'}}/> <span className="label-t" style={{marginRight: '-6px'}}>Labels</span>
                        {task.subject.length > 0 ? task.subject.map((tag, index) => (
                            <div className="label-task justify-content-center align-items-center" key={index}>
                                <span className="text">{tag}</span>
                            </div>
                        )) : <div className="label-task justify-content-center align-items-center">
                            <span className="text">Default</span>
                        </div> }
                            <div className="label-task justify-content-center align-items-center">
                            <span className="text">+</span>
                            </div> </div>
                    <div className="labels-task"><FaTasks style={{marginTop:'-2px'}}/> <span className="label-t">Status</span>
                        <Dropdown className="d-inline dropdown-status" onSelect={evt}>
                            <Dropdown.Toggle id="dropdown-autoclose-true" variant="dark"
                                             className="dropdown-status dropdown-fr" size="sm">
                                {task.status === '0' ? 'To Do' : (task.status === '1' ? 'In Progress' : 'Done')}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-status">
                                {parseInt(task.status) === 0 ? '' : <Dropdown.Item eventKey="0">To Do</Dropdown.Item>}
                                {parseInt(task.status) === 1 ? '' :
                                    <Dropdown.Item eventKey="1">In Progress</Dropdown.Item>}
                                {parseInt(task.status) === 2 ? '' : <Dropdown.Item eventKey="2">Done</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="labels-task py-2"><FaCalendarAlt  style={{marginTop:'-6px'}}/> <span className="label-t">Date</span>
                     <span className="label-t">{dateFormat(task.dueDate, "mmmm dS, h:MM TT")}</span>
                    </div>
                    <div className="labels-task py-2"><FaInfoCircle style={{marginTop:'-6px'}}/> <span className="label-t">Description</span>
                        <span className="label-t" style={{marginLeft:'-38px'}}><button className="edit-task btn btn-dark" onClick={() => {setEdit(!edit);
                        setSaveTask(!saveTask)}}>Edit</button></span>
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
                        <span><button className="save-task btn btn-dark" onClick={() =>  onUpdate()}>Save</button></span>
                        <span><button className="cancel-task btn" onClick={() => {setSaveTask(!saveTask); setEdit(!edit)}}>Cancel</button></span>
                    </div>
                    <div className="labels-task py-2"><FaComments style={{marginTop:'-6px'}}/> <span className="label-t">Comments</span>

                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default TaskView;