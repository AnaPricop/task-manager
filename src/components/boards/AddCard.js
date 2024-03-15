import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Card from 'react-bootstrap/Card';
import styles from "../../css/dashboard.css";
import boards from "../../css/boards.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddCard = ({setClicked, color}) => {
     console.log(color);
     const [startDate, setStartDate] = useState(new Date());
    // var background = './color.svg';
    // const navigate = useNavigate();
    // const [projid, setProjId] = useState('');
    // const [boardBck, setBoardBck] = useState('./../' + (board.background ? board.background : 'bck4') + '.svg');
    // const handleNext = () => {
    //     navigate(`/boards/${board._id}`);
    // }
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        subject: "",
        dueDate: ""
    });
    const [tasks, setTasks] = useState([]);
    const onChange = (e) => {
        setTaskData({...taskData, [e.target.name]: e.target.value});
    };
    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8001/api/tasks", taskData)
            .then((res) => {
                setTaskData({
                    title: "",
                    description: "",
                    subject: "",
                    dueDate: ""
                });
                setTasks([...tasks, res.data.task]);
                // setImage('./bck4.svg');
                // handleCreate();
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };
    return (
        // <div className="col-3 mx-5">
        // <div className="task-status">To Do</div>
        <div className="add-card justify-content-center align-items-center">
            <form className="form-create-task" onSubmit={onSubmit}>
                <span className="create-task">Create Task</span>
                <div className="form-group">
                    <label htmlFor="titleOfTask">Title</label>
                    <input type="text" className="form-control" id="titleOfTask"
                           placeholder="" value={taskData.title} name="title"
                           onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="taskDescription">Description</label>
                    <textarea type="text" className="form-control" id="taskDescription"
                           placeholder="What is this task about?" value={taskData.description} name="description"
                           onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="taskDueDate">Due Date</label>
                    <DatePicker
                        id="taskDueDate"
                        // selected={date}
                        // onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                        selected={startDate} onChange={(date) => setStartDate(date)}
                    />
                </div>
                <button type="submit" className={color ? color + " btn create-task-btn btn-sm" : " btn create-task-btn btn-sm"} >Create
                </button>
            </form>
        </div>
        // </div>
    );
};

export default AddCard;