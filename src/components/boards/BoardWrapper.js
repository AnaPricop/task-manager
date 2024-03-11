import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import BoardView from './BoardView';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Projects from "../ShowProjects";
import Sidemenu from "../dashboard/Sidemenu";
// import ProjectCard from "../ProjectCard";
const BoardWrapper = () => {
    const { projectId } = useParams();

    const [projects, setProjects] = useState([]);
    const [fProject, setFproject] = useState();

    var token = localStorage.getItem("token");
    useEffect(() => {
        axios
            .get('http://localhost:8001/api/projects', { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                console.log(res.data);
                setProjects(res.data);
                setFproject(res.data.find(m => m._id === projectId))
                console.log(res.data.find(m => m._id === projectId))
            })
            .catch((err) => {
                console.log('Error from Projectslist');
            });
    }, []);
    console.log(projects.find(m => m._id === projectId))
    return (
        // <Col md={8}>
        //     <BoardView project={projects.find(m => m._id === projectId)} />
        // </Col>
    <div className="bck-pr d-flex flex-row-reverse">
        <div className="col-10
             col-sm-11 my-3 proj-list-margin" style={{paddingLeft: '210px', overflowX: 'hidden'}}>
            <BoardView project={fProject} />
        </div>
        <div className="col">
            <Sidemenu projects={projects} setProjects={setProjects} style={{zIndex: 1000}}>
                {/*<CreateProject/>*/}
            </Sidemenu>
        </div>
    </div>
    );
};
export default BoardWrapper;