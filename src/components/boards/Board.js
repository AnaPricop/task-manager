import React, {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Card from 'react-bootstrap/Card';
import AddCard from './AddCard';
import TaskCard from './TaskCard';
import Loading from '../Loading';
import styles from "../../css/dashboard.css";
import boards from "../../css/boards.css";
import tasks from "../../css/tasks.css";
import {FaInfoCircle} from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
const BoardCard = ({board, setBoard, currentBoard, project}) => {
    console.log(currentBoard, board)
    let navigate = useNavigate();
    const [edit, setEdit] = useState(true);
    const [saveBoard, setSaveBoard] = useState(false);
    const [title, setTitle] = useState(currentBoard.title)
    const [focus, setFocus] = useState(false);
    const onTodoChange = (value) => {
        console.log(value)
        setTitle({title:value})
    }

    const [isClicked, setClicked] = useState(0);
    const [isClicked1, setClicked1] = useState(0);
    const [isClicked2, setClicked2] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    var token = localStorage.getItem("token");
    // let list0 = [], list1 = [], list2 = [];
    const [list0, setList0] = useState([]);
    const { state } = useLocation();
     function fetchData() {
        let res =  axios.get('http://localhost:8001/api/tasks/' + currentBoard._id)
       // console.log(res.data)
        setTasks(res.data);
        setIsLoading(false);
    }
//console.log(tasks)
    useEffect(() => {
        setIsLoading(true);
         axios.get('http://localhost:8001/api/tasks/' + currentBoard._id).then((res) => {
             setTasks(res.data);
             setIsLoading(false);})
    }, [currentBoard]);
    useEffect(() => {}, []);
    const updateBoard = async (e) => {
        console.log(currentBoard, title)
        await axios
            .put("http://localhost:8001/api/boards/" + currentBoard._id, title)
            .then((res) => {
                // res.data.task.status = e;
                currentBoard.title = title.title;
                setSaveBoard(!saveBoard);
                setEdit(!edit);
                setFocus(!focus);

                var index1 = '';
                board.map((datum, index) => {
                    console.log(datum)
                    if (datum._id === currentBoard._id)
                    {
                        index1 = index;
                    }
                })
                console.log(index1)
                let newArr = [...board]; // copying the old datas array
                newArr[index1] = currentBoard;
                setBoard(newArr);
                navigate(`/${project._id}/${currentBoard.title}`,{
                    state: {
                        ...state,
                        board: currentBoard
                    }
                })
            })
            .catch((err) => {
                console.log("Error in update task!");
            });
    };
    const list_0 = tasks.filter(task => parseInt(task.status) === 0).length === 0 ? '' : tasks.filter(task => parseInt(task.status) === 0).map((b, k) =>
        <TaskCard task={b} key={k} tasks={tasks} setTasks={setTasks}/>);
    const list_1 = tasks.filter(task => parseInt(task.status) === 1).length === 0 ? '' : tasks.filter(task => parseInt(task.status) === 1).map((b, k) =>
        <TaskCard task={b} key={k} tasks={tasks} setTasks={setTasks}/>);
    const list_2 = tasks.filter(task => parseInt(task.status) === 2).length === 0 ? '' : tasks.filter(task => parseInt(task.status) === 2).map((b, k) =>
        <TaskCard task={b} key={k} tasks={tasks} setTasks={setTasks}/>);
    return (
        <div className=" w-100 h-90 row my-3">
            {isLoading ? (
                <Loading/>
            ) : (<>
                <div className="d-flex py-2  align-center" style={{alignItems:'center'}}>
                    <input className={focus ? "board-title board-title1" : "board-title"} placeholder={currentBoard.title}  defaultValue={currentBoard.title} disabled={edit} onChange={e => onTodoChange(e.target.value)}/>
                    <button
                    className="edit-board btn btn-dark"  onClick={() => {
                         setSaveBoard(!saveBoard);
                        setEdit(!edit);
                         setFocus(!focus);
                    }}>Edit</button>
                    <div className={saveBoard ? "labels-task py-2 board-save" : "not-vis labels-task py-2"}>
                        <span><button className="save-task btn btn-dark"
                                      onClick={() => updateBoard()}>Save</button></span>
                        <span><button className="cancel-task btn" onClick={() => {
                            setSaveBoard(!saveBoard);
                            setEdit(!edit);
                            setFocus(!focus);
                        }}>Cancel</button></span>
                    </div>
                </div>
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