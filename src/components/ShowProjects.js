import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from "../css/projects.css";
import ProjectCard from './ProjectCard';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import Sidemenu from './dashboard/Sidemenu';

function ShowProjects(project) {
    // const [projects, setProjects] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:8001/api/projects', { headers: {"Authorization" : `Bearer ${token}`} })
    //         .then((res) => {
    //             setProjects(res.data);
    //         })
    //         .catch((err) => {
    //             console.log('Error from Projectslist');
    //         });
    // }, []);
   // const projlist = React.createContext(projects);
    const projectList =
        project.length === 0
            ? 'there are no projects!'
            : project.projects.map((project, k) => <ProjectCard project={project} key={k} />);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className='ShowBookList p-3 row'>
                {/*<div className='row'>*/}
                {/*    <div className='proj-list'>*/}
                        <h3>Your Projects</h3>
                    {/*</div>*/}
                {/*</div>*/}

                <div className='list row py-2'>{projectList}</div>
        </div>
    );
}

export default ShowProjects;