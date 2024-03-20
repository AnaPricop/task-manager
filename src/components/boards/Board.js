import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Card from 'react-bootstrap/Card';
import AddCard from './AddCard';
import TaskCard from './TaskCard';
import Loading from '../Loading';
import styles from "../../css/dashboard.css";
import boards from "../../css/boards.css";

const BoardCard = ({board, currentBoard}) => {
    console.log(currentBoard)

    const [isClicked, setClicked] = useState(0);
    const [isClicked1, setClicked1] = useState(0);
    const [isClicked2, setClicked2] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    var token = localStorage.getItem("token");
    // let list0 = [], list1 = [], list2 = [];
    const [list0, setList0] = useState([]);

     function fetchData() {
        let res =  axios.get('http://localhost:8001/api/tasks/' + currentBoard._id)
        console.log(res.data)
        setTasks(res.data);
        setIsLoading(false);
    }

    useEffect(() => {
         axios.get('http://localhost:8001/api/tasks/' + currentBoard._id).then((res) => {        console.log(res.data)
             setTasks(res.data);
             setIsLoading(false);})
    }, [currentBoard]);
    const list_0 = tasks.filter(task => task.status === 0).length === 0 ? '' : tasks.filter(task => task.status === 0).map((b, k) =>
        <TaskCard task={b} key={k}/>);
    const list_1 = tasks.filter(task => task.status === 1).length === 0 ? '' : tasks.filter(task => task.status === 1).map((b, k) =>
        <TaskCard task={b} key={k}/>);
    const list_2 = tasks.filter(task => task.status === 2).length === 0 ? '' : tasks.filter(task => task.status === 2).map((b, k) =>
        <TaskCard task={b} key={k}/>);
    return (
        <div className=" w-100 h-90 row my-3">
            {isLoading ? (
                <Loading/>
            ) : (<>
                    <h2 className="boards-h2 row">{currentBoard.title}</h2>
                    <div className="my-5 w-100 row h-90">
                        <div className="col-3 mx-5">
                            <div className="task-status">To Do</div>
                            {list_0}
                            {isClicked ? <AddCard setClicked={setClicked} color={currentBoard.background}
                                                  boardId={currentBoard._id} tasks={tasks} setTasks={setTasks}
                                                  status='0'/> : ''}

                            <div className="list-board justify-content-center align-items-center"
                                 onClick={() => setClicked(!isClicked)}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src="../../addboard.svg" alt="Card image" className="list-add-svg"/>
                                    <span className="span-tsk">Add a card</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 mx-5">
                            <div className="task-status">In Progress</div>
                            {list_1}
                            {isClicked1 ? <AddCard setClicked={setClicked1} color={currentBoard.background}
                                                   boardId={currentBoard._id} tasks={tasks} setTasks={setTasks}
                                                   status='1'/> : ''}
                            <div className="list-board justify-content-center align-items-center"
                                 onClick={() => setClicked1(!isClicked1)}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src="../../addboard.svg" alt="Card image" className="list-add-svg"/>
                                    <span className="span-tsk">Add a card</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 mx-5">
                            <div className="task-status">Done</div>
                            {list_2}
                            {isClicked2 ? <AddCard setClicked={setClicked2} color={currentBoard.background}
                                                   boardId={currentBoard._id} tasks={tasks} setTasks={setTasks}
                                                   status='2'/> : ''}
                            <div className="list-board justify-content-center align-items-center"
                                 onClick={() => setClicked2(!isClicked2)}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src="../../addboard.svg" alt="Card image" className="list-add-svg"/>
                                    <span className="span-tsk">Add a card</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>

    )
};

export default BoardCard;