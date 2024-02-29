import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "../../css/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProjectCard from "../ProjectCard";

const Sidemenu = (project, setProjects) => {
    const [active, setActive] = useState(0);
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    var token = localStorage.getItem("token");
    const [prevProject, setNewProjects] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleBoard, setIsVisibleBoard] = useState(false);
    const [projectData, setProject] = useState({
        title: ""
    });
    const onChange = (e) => {
        setProject({ ...projectData, [e.target.name]: e.target.value });
    };
    const handleCreate = () => {
        setIsVisible(!isVisible);
    }
    const handleCreateBoard = () => {
        setIsVisibleBoard(!isVisibleBoard);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8001/api/projects", projectData, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                setProject({
                    title: ""
                });
                project.setProjects([...project.projects, res.data.project]);
                handleCreate();
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };
   // const [selectedOption, setSelectedOption] = useState(options[0].value); //board select
    const [boardData, setBoard] = useState({  //board data
        title: "",
        idProject: "",
        background: ""
    });
    const onChangeBoard = (e) => {
        setBoard({ ...boardData, [e.target.name]: e.target.value });   //set values for board form
    };
    const [boards, setBoards] = useState([]);  //boards
    const onSubmitBoard = (e) => {
        e.preventDefault();
        console.log(boardData)
        axios
            .post("http://localhost:8001/api/boards", boardData)
            .then((res) => {
                setBoard({
                    title: "",
                    idProject: "",
                    background: ""
                });
                console.log(res.data.board)
               setBoards([...boards, res.data.board]);
                handleCreateBoard();
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };

    const projectList =
        project.length === 0
            ? 'there are no projects!'
            : project.projects.map((project, k) => <a className="nav-link link-dark1" key={project._id}>
                <svg className="bi me-2" width="16" height="16"></svg>
                {project.title} </a>);
    const projectListSelect =
        project.length === 0
            ? 'there are no projects!'
            : project.projects.map((project, k) =>
                // <a className="nav-link link-dark1" key={project._id}>
                // <svg className="bi me-2" width="16" height="16"></svg>
                // {project.title} </a>
    <option key={project._id} value={project._id}>{project.title}</option>);
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
                    <a href="#" className="nav-link link-dark1" onClick={handleCreateBoard}>
                        {/*// className={(active === 2 ? 'active ': 'null ') + "nav-link link-dark"}*/}
                        {/*// onClick={() => setActive(2)}>*/}
                        <svg className="bi me-2" width="16" height="16">
                        </svg>
                        Create board
                    </a>
                    <section
                        className={isVisibleBoard ? 'create_project_visible section_setting' : 'create_project_hidden section_setting'}
                        style={styles.section_setting}>
                        <div className="section_header row" style={styles.section_header}>
                            <div className="row justify-content-center">Create board</div>
                        </div>
                        {/*<div className="row">*/}
                        {/*    <div className="col-xs-12">Name of Section</div>*/}
                        {/*</div>*/}
                        <form className="form-create-project" onSubmit={onSubmitBoard}>
                            <div className="form-group">
                                <label htmlFor="titleOfProject">Board title</label>
                                <input type="text" className="form-control" id="titleOfProject"
                                       placeholder="" value={boardData.title} name="title"
                                       onChange={onChangeBoard}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectProject">Project</label>
                                <select className="form-select" aria-label="Default select example"  name="idProject" id="selectProject" value={boardData.idProject} onChange={onChangeBoard}>
                                    {projectListSelect}
                                </select>
                                {/*<input type="text" className="form-control" id="selectProject"*/}
                                {/*       placeholder="" value={boardData.title} name="title"*/}
                                {/*       onChange={onChangeBoard}/>*/}
                            </div>
                            <button type="submit" className="btn create-project-btn btn-sm">Create</button>
                        </form>
                    </section>
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