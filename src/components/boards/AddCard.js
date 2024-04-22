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


const AddCard = ({setClicked, color, boardId, tasks, setTasks, status}) => {
    console.log(status);
    const [startDate, setStartDate] = useState(new Date());
    var token = localStorage.getItem("token");
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        subject: [],
        dueDate: "",
        boardId: boardId,
        status: status
    });
    // const [tasks, setTasks] = useState([]);
    const onChange = (e) => {
        setTaskData({...taskData, [e.target.name]: e.target.value});
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(taskData.subject, JSON.stringify(taskData.subject), JSON.stringify(taskData.subject) === '[]');
        let subj;
        let default1 = [{title: 'Default', color: ''}];
        if (JSON.stringify(taskData.subject) === '[]')
           subj = {subject: JSON.stringify(default1)};
        else
            subj = {subject: JSON.stringify(taskData.subject)};
        setTaskData({...taskData, subj});
        taskData.subject = JSON.stringify(default1);
        console.log(subj, taskData)
        axios
            .post("http://localhost:8001/api/tasks", taskData, {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setTaskData({
                    title: "",
                    description: "",
                    subject: [],
                    dueDate: "",
                    boardId: boardId,
                    status: status
                });
                setTasks([...tasks, res.data.task]);
                setClicked(false);
                // setImage('./bck4.svg');
                // handleCreate();
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };
    const [tags, setTags] = useState([]);

    function handleKeyDown(e) {
        // If user did not press enter key, return
        if (e.key !== 'Enter') return
        // Get the value of the input
        const value = e.target.value
        // If the value is empty, return
        if (!value.trim()) return
        // Add the value to the tags array
        let newTag = {title: value, color: ''};
        console.log(newTag)
        setTags([...tags, newTag])

        console.log(tags)
        // Clear the input
        e.target.value = ''
       taskData.subject = JSON.stringify([...tags, newTag]);
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        // <div className="col-3 mx-5">
        // <div className="task-status">To Do</div>
        <div className="add-card justify-content-center align-items-center">
            <form className="form-create-task">
                <span className="create-task">Create Task</span>
                <div className="form-group py-1">
                    <label className='row px-2' htmlFor="titleOfTask">Title</label>
                    <input type="text" className="form-control" id="titleOfTask"
                           placeholder="" value={taskData.title} name="title"
                           onChange={onChange}/>
                </div>
                <div className="form-group py-1">
                    <label className='row px-2' htmlFor="taskDescription">Description</label>
                    <textarea type="text" className="form-control" id="taskDescription"
                              placeholder="What is this task about?" value={taskData.description} name="description"
                              onChange={onChange}/>
                </div>
                <div className="form-group py-1">
                    <label className='row px-2' htmlFor="taskDueDate">Due Date</label>
                    <DatePicker
                        id="taskDueDate"
                        style={{height: '30px'}}
                        // selected={date}
                        // onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                        selected={startDate} onChange={(date) => {
                        setStartDate(date);
                        var dd = date;
                        const offset = dd.getTimezoneOffset();
                        dd = new Date(dd.getTime() + (offset * 60 * 1000));
                        let modifiedDate = dd.toISOString().split('T')[0] + " " + dd.toLocaleTimeString();
                        taskData.dueDate = modifiedDate
                    }}
                        // value={taskData.description}
                    />
                </div>
                <div className="form-group py-1">
                    <label className='row px-2'>Labels</label>
                    <div className="tags-input-container">
                        {tags.map((tag, index) => (
                            <div className="tag-item" key={index}>
                                <span className="text">{tag.title}</span>
                                <span className="close" onClick={() => removeTag(index)}>&times;</span>
                            </div>
                        ))}
                        <input onKeyDown={handleKeyDown} type="text" className="tags-input"
                               placeholder="What is the subject of the task?"/>
                    </div>
                </div>
                <button type="button" onClick={onSubmit}
                        className={color ? color + " btn create-task-btn btn-sm" : " btn create-task-btn btn-sm"}>Create
                </button>
            </form>
        </div>
        // </div>
    );
};

export default AddCard;