import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styles from "../css/projects.css";
import ProjectCard from './ProjectCard';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Loading from './Loading';

// import Sidemenu from './dashboard/Sidemenu';

function ShowProjects({projects, setProjects, info, setInfo, status}) {
    const [isLoading, setIsLoading] = useState(false);
    const setProjectsDel = (projectid) => {
        const del = projects.filter(project => projectid !== project._id)
        setProjects(del)
        console.log(del, projectid)
    }

    const projectList =
        projects.length === 0
            ? <h6 style={{marginLeft: '35px'}}>There are no projects.</h6>
            : projects.map((project, k) => <ProjectCard key={k} project={project} projects={projects} setProjects={setProjects} setProjectsDel={setProjectsDel} info={info} setInfo={setInfo} status={status[k]}/>);
    // if (projects.length === 0)
    //     setIsLoading(true)
    // else {
    //     projectList = projects.map((project, k) => <ProjectCard project={project} setProjectsDel={setProjectsDel}
    //                                                             key={k}/>);
    //     setIsLoading(false)
    //
    // }

    return (
        <div className='ShowBookList p-3 row'>
            {isLoading ? (
                <Loading/>
            ) : (<>
                <h5 className="row" style={{marginLeft: '35px'}}>Your Projects</h5>
                <div className='list row py-2'>{projectList}</div>
            </>)}
        </div>

    );
}

export default ShowProjects;