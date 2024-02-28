import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "../../css/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProjectCard from "../ProjectCard";


const Sidemenu = (project) => {
    const [active, setActive] = useState(0);
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    var token = localStorage.getItem("token");
    const [prevProject, setNewProjects] = useState([]);
    console.log(project.projects)
    // setNewProjects(project.projects);
    const [isVisible, setIsVisible] = useState(false);
    const [projectData, setProject] = useState({
        title: ""
    });
    const onChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };
    const handleCreate = () => {
        setIsVisible(!isVisible);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8001/api/projects", projectData, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                setProject({
                    title: ""
                });
                // if (prevProject == [])
                //     setNewProjects(project.projects)
                // setNewProjects(prevProject=>({
                //     prevProject: [projectData, ...prevProject]
                // }))
                this.setState(project=>({
                    project: [projectData, ...project.projects]
                }))
                console.log(project)
                console.log(prevProject)
                // // Push to /
                // navigate("/");
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };
    console.log(isVisible)
// console.log(project.projects)
    const projectList =
        project.length === 0
            ? 'there are no projects!'
            : project.projects.map((project, k) => <a className="nav-link link-dark1" key={project._id}>
                <svg className="bi me-2" width="16" height="16"></svg>
                {project.title} </a>);
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar_dsh h-100  px-3 position-fixed"
             style={styles.sidebar_dsh}>
            <a href="/"
               className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark1 text-decoration-none header-sidemenu">
                <img className="header-logo" src="/taskmng.svg"/>
                TaskAcc
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a className={(active === 0 ? 'active ' : 'null ') + "nav-link link-dark1"}
                       onClick={() => setActive(0)}>
                        <svg className="bi me-2" width="16" height="16">
                            {/*<use xlink:href="#table"/>*/}
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <div className="d-flex">
                        <a href="#" onClick={handleCreate}
                           className="nav-link link-dark1 ">
                            {/*// className={(active === 1 ? 'active ': 'null ') + "nav-link link-dark"}*/}
                            {/*// onClick={() => setActive(1)}>*/}
                            <svg className="bi me-2" width="16" height="16">
                                {/*<use xlink:href="#speedometer2"/>*/}
                            </svg>
                            Create project
                        </a>
                        <section
                            className={isVisible ? 'create_project_visible section_setting' : 'create_project_hidden section_setting'}
                            style={styles.section_setting}>
                            <div className="section_header row" style={styles.section_header}>
                                <div className="row justify-content-center">Create a project</div>
                            </div>
                            {/*<div className="row">*/}
                            {/*    <div className="col-xs-12">Name of Section</div>*/}
                            {/*</div>*/}
                            <form className="form-create-project" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="titleOfProject">Project title</label>
                                    <input type="text" className="form-control" id="titleOfProject"
                                           placeholder="" value={project.title} name="title"
                                           onChange={onChange}/>
                                </div>
                                <button type="submit" className="btn create-project-btn btn-sm">Create</button>
                            </form>
                        </section>
                    </div>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark1">
                        {/*// className={(active === 2 ? 'active ': 'null ') + "nav-link link-dark"}*/}
                        {/*// onClick={() => setActive(2)}>*/}
                        <svg className="bi me-2" width="16" height="16">
                            {/*<use xlink:href="#table"/>*/}
                        </svg>
                        Create board
                    </a>
                </li>
                <hr/>
                {/*<hr/>*/}
                <a href="/"
                   className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark1 text-decoration-none">
                    <img className="header-logo" src="/myprojects.svg"/>
                    My projects
                </a>
                <ul className="nav nav-pills flex-column mb-auto">
                    {projectList}

                </ul>
            </ul>


            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-dark1 text-decoration-none dropdown-toggle"
                   id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32"
                         className="rounded-circle me-2"/>
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    {/*<li><a className="dropdown-item" href="#">Profile</a></li>*/}
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><a className="dropdown-item" onClick={handleLogout}>Sign out</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidemenu;