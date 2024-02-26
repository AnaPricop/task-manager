import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
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
        <div className='ShowBookList col'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Projects List</h2>
                        {/*<button  onClick={handleLogout}>*/}
                        {/*    Logout*/}
                        {/*</button>*/}
                    </div>

                    {/*<div className='col-md-11'>*/}
                    {/*    <Link*/}
                    {/*        to='/create-book'*/}
                    {/*        className='btn btn-outline-warning float-right'*/}
                    {/*    >*/}
                    {/*        + Add New Book*/}
                    {/*    </Link>*/}
                    {/*    <br />*/}
                    {/*    <br />*/}
                    {/*    <hr />*/}
                    {/*</div>*/}
                </div>

                <div className='list row py-5'>{projectList}</div>
            </div>
        </div>
    );
}

export default ShowProjects;