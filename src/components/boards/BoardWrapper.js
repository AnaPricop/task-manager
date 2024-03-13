import {useParams} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import BoardView from './BoardView';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from '../Loading';
import Projects from "../ShowProjects";
import SidemenuBoards from "../boards/SidemenuBoards";
// import ProjectCard from "../ProjectCard";
const BoardWrapper = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {projectId} = useParams();

    const [projects, setProjects] = useState([]);
    const [fProject, setFproject] = useState([]);
    const [currentProject, setCurrentProject] = useState([]);
    var token = localStorage.getItem("token");
    const [board, setBoard] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8001/api/boards/' + projectId)
            .then((res) => {
                console.log(res.data);
                setBoard(res.data);
            })
            .catch((err) => {
                console.log('Error from Projectslist');
            });
        axios
            .get('http://localhost:8001/api/projects', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                console.log(res.data);
                setProjects(res.data);
                setFproject(res.data.find(m => m._id === projectId))
                setCurrentProject(res.data.find(m => m._id === projectId))
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('Error from Projectslist');
            });
    }, []);
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:8001/api/projects', { headers: {"Authorization" : `Bearer ${token}`} })
    //         .then((res) => {
    //             console.log(res.data);
    //             setProjects(res.data);
    //             setFproject(res.data.find(m => m._id === projectId))
    //             setCurrentProject(res.data.find(m => m._id === projectId))
    //         })
    //         .catch((err) => {
    //             console.log('Error from Projectslist');
    //         });
    // }, []);

    return (
        // <Col md={8}>
        //     <BoardView project={projects.find(m => m._id === projectId)} />
        // </Col>
        <div className="bck-pr d-flex flex-row-reverse">
            {isLoading ? (
                <Loading/>
            ) : ( <>
                <div className="col-10 col-sm-11 my-3 proj-list-margin"
                     style={{paddingLeft: '210px', overflowX: 'hidden'}} >
                    <BoardView board={board} project={currentProject} />
                </div>
                <div className="col">
                <SidemenuBoards board={board} setBoard={setBoard} project={currentProject}>
            {/*<CreateProject/>*/}
                </SidemenuBoards>
                </div></>
                )}
        </div>
    );
};
export default BoardWrapper;