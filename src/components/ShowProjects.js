import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styles from "../css/projects.css";
import ProjectCard from './ProjectCard';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// import Sidemenu from './dashboard/Sidemenu';

function ShowProjects({projects, setProjects}) {
    const setProjectsDel = (projectid) => {
        const del = projects.filter(project => projectid !== project._id)
        setProjects(del)
        console.log(del, projectid)
    }
    // const approveDelete = (projectid) => {
    //     const del = projects.filter(project => projectid !== project._id)
    //     setProjects(del)
    //     console.log(del, projectid)
    // }
    const projectList =
        projects.length === 0
            ? 'there are no projects!'
            : projects.map((project, k) => <ProjectCard project={project} setProjectsDel={setProjectsDel} key={k}/>);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className='ShowBookList p-3 row'>
            <h3>Your Projects</h3>
            <div className='list row py-2'>{projectList}</div>

        </div>

    );
}

export default ShowProjects;