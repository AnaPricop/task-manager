import {useParams, useLocation, Link} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import BoardView from './BoardView';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from '../Loading';
import Projects from "../ShowProjects";
import styles from "../../css/dashboard.css";
import SidemenuBoards from "../boards/SidemenuBoards";
import Board from "../boards/Board";

const BoardWrapper = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {projectId} = useParams();
    const {boardId} = useParams();
    // console.log(projectId, boardId);
    const { state } = useLocation();
    console.log(state, boardId)
    const [projects, setProjects] = useState([]);
    const [fProject, setFproject] = useState([]);
    const [currentProject, setCurrentProject] = useState([]);
    const [currentBoard, setCurrentBoard] = useState([]);
    var token = localStorage.getItem("token");
    const [board, setBoard] = useState([]);
    const [boardBck, setBoardBck] = useState();
    useEffect(() => {
        axios
            .get('http://localhost:8001/api/boards/' + projectId)
            .then((res) => {
                console.log(res.data);
                setBoard(res.data);
                // setBoardBck(res.data[0].background)
                // setCurrentBoard(res.data.find(m => m._id === boardId))
            })
            .catch((err) => {
                console.log('Error from Projectslist');
            });
        axios
            .get('http://localhost:8001/api/projects', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                //  console.log(res.data);
                setProjects(res.data);
                setFproject(res.data.find(m => m._id === projectId))
                setCurrentProject(res.data.find(m => m._id === projectId))
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('Error from Projectslist');
            });
    }, []);

    return (
        // <Col md={8}>
        //     <BoardView project={projects.find(m => m._id === projectId)} />
        // </Col>
        <div className="bck-pr d-flex flex-row-reverse">
            {isLoading ? (
                <Loading/>
            ) : ( <>
                    <div className={!state ? " col-10 col-sm-11 my-3 proj-list-margin" : state.background + " col-10 col-sm-11 my-3 proj-list-margin"}
                         style={{paddingLeft: '210px', overflowX: 'hidden'}} >
                        {!state ? (<BoardView  board={board} project={currentProject} />) : (<Board  board={board} currentBoard={state}  />)}
                    </div>
                    <div className="col">
                        <SidemenuBoards board={board} setBoard={setBoard} project={currentProject} selected={!state ? 'none' : state._id}>
                            {/*<CreateProject/>*/}
                        </SidemenuBoards>
                    </div></>
            )}
        </div>
    );
};
export default BoardWrapper;