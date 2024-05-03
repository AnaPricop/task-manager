import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styles from "../../css/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProjectCard from "../ProjectCard";
import CreateProject from "./CreateProject";
import Loading from "../Loading";

const Sidemenu = ({projects, setProjects, information, setInfo}) => {
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const [active, setActive] = useState(0);
    const fileInput = React.createRef();
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    var token = localStorage.getItem("token");
    //const [prevProject, setNewProjects] = useState([]);
    const [boardBck, setBoardBck] = useState('bck1');

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleBoard, setIsVisibleBoard] = useState(false);
    const [projectData, setProject] = useState({
        title: "",
        image: ''
    });

    //const [children, setChildren] = useState(<div><CreateProject projects={projects} setProjects={setProjects} isVisible={isVisible} setIsVisible={setIsVisible}/></div>);
    const handleCreate = () => {
        setIsVisible(!isVisible);
        //  children = true;
        //  setChildren(<div><CreateProject projects={projects} setProjects={setProjects} isVisible={!isVisible} setIsVisible={setIsVisible}/></div>);
        // {children}.setVal(true);
        if (isVisibleBoard === true)
            setIsVisibleBoard(!isVisibleBoard);
        // console.log(children)
    }
    const handleCreateBoard = () => {
        setIsVisibleBoard(!isVisibleBoard);
        if (isVisible === true)
            setIsVisible(!isVisible);
    }

    const [boardData, setBoard] = useState({  //board data
        title: "",
        idProject: "",
        background: ""
    });
    //background board
    const onChangeBck = (e) => {
        setBoard({...boardData, 'background': e});
        setBoardBck(e)//set values for board form
        console.log(boardData)
    };
    const onChangeBoard = (e) => {
        setBoard({...boardData, [e.target.name]: e.target.value});   //set values for board form
    };
    //submit board
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
                console.log(information)
                setBoards([...boards, res.data.board]);
                information.boards = information.boards + 1;
                 setInfo(information)
                handleCreateBoard();
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };
    const onChange = (e) => {
        setProject({...projectData, [e.target.name]: e.target.value});
    };
    const handleNext = (id) => {
        navigate(`/proj/${id}`);
    }

    const projectList =
        projects.length === 0
            ? <a className="nav-link link-dark1">No projects.</a>
            : projects.map((project, k) => <li style={{height: '40px', textDecoration: 'none', alignContent: 'center'}} className=""><a className="nav-proj link-dark1 align-center justify-content-center" key={project._id}
                                              onClick={() => handleNext(project._id)}>
                <svg className="bi me-2" width="16" height="16"></svg>
                {project.title} </a></li>);
    const projectListSelect =
        projects.length === 0
            ? 'there are no projects!'
            : projects.map((project, k) =>
                <option key={project._id} value={project._id}>{project.title}</option>);

    //image for project
    const [image, setImage] = useState('./bck4.svg')
    const onImageChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        const base64 = await convertToBase64(file);
        setImage(base64);
        setProject({...projectData, image: base64});
    }
    const [style, setStyle] = useState({display: 'none'});
    // const navigate = useNavigate();

    //submit create project
    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8001/api/projects", projectData, {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setProject({
                    title: "",
                    image: ''
                });
                setProjects([...projects, res.data.project]);
                setImage('./bck4.svg');
                information.all = information.all + 1;
                information.inprogress = information.inprogress + 1;
                setInfo(information)
                handleCreate();
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };

    return (
        <div className="p-3 bg-light sidebar_dsh h-100  px-3 position-fixed"
        >
            {isLoading ? (
                <Loading/>
            ) : (<>
                    <a href="/"
                       className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark1 text-decoration-none header-sidemenu">
                        <img className="header-logo" src="/taskmng.svg"/>
                        TaskAcc
                    </a>
                    <hr/>
                    <ul className="nav nav-pills flex-column mb-auto" style={{height: '90%'}}>
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
                                    <div className=" justify-content-center">Create a project</div>
                                </div>
                                {/*<div className="row">*/}
                                {/*    <div className="col-xs-12">Name of Section</div>*/}
                                {/*</div>*/}
                                <form className="form-create-project" onSubmit={onSubmit}>
                                    <div className="form-group justify-content-center row py-4"
                                    >
                                        {/*{boardBck + " background-div"}*/}
                                        <div className="select-img"
                                             onMouseEnter={e => {
                                                 setStyle({display: 'block'});
                                             }}
                                             onMouseLeave={e => {
                                                 setStyle({display: 'none'})
                                             }}>
                                            <img className="background-div-img" src={image} onChange={onImageChange}/>

                                            {/*<img src="./bck1.svg"/>*/}
                                            {/*</img>*/}
                                            <input type="file" onChange={onImageChange}
                                                   className="filetype input-select" id="file-input-id"  value=''/>
                                            <span className="change-img" style={style} onChange={onImageChange}>Change Image</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="titleOfProject">Project title</label>
                                        <input type="text" className="form-control" id="titleOfProject"
                                               placeholder="" value={projectData.title} name="title"
                                               onChange={onChange}/>
                                    </div>
                                    <button type="submit" className="btn create-project-btn btn-sm">Create</button>
                                </form>
                            </section>

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
                                className={isVisibleBoard ? 'create_project_visible section_board' : 'create_project_hidden section_board'}
                                style={styles.section_setting}>
                                <div className="section_header justify-content-center" style={styles.section_header}>
                                    <div className="">Create board</div>
                                </div>
                                {/*<div className="row">*/}
                                {/*    <div className="col-xs-12">Name of Section</div>*/}
                                {/*</div>*/}
                                <form className="form-create-board" onSubmit={onSubmitBoard}>
                                    <div className="form-group row justify-content-center">
                                        <div className={boardBck + " background-div"} value={boardBck}>
                                            {/*<img src="./bck1.svg"/>*/}
                                        </div>
                                        <a className="row bck-title">Background</a>
                                        <ul className="ul-little-div">
                                            <li className="li-little-div" onClick={() => onChangeBck('bck2')}>
                                                <a className="little-bck-div bck2"></a>
                                            </li>
                                            <li className="li-little-div" onClick={() => onChangeBck('bck3')}>
                                                <a className="little-bck-div bck3"></a>
                                            </li>
                                            <li className="li-little-div" onClick={() => onChangeBck('bck4')}>
                                                <a className="little-bck-div bck4"></a>
                                            </li>
                                            <li className="li-little-div" onClick={() => onChangeBck('bck5')}>
                                                <a className="little-bck-div bck5"></a>
                                            </li>
                                            <li className="li-little-div" onClick={() => onChangeBck('bck6')}>
                                                <a className="little-bck-div bck6"></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="titleOfProject">Board title</label>
                                        <input type="text" className="form-control" id="titleOfProject"
                                               placeholder="" value={boardData.title} name="title"
                                               onChange={onChangeBoard}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="selectProject">Project</label>
                                        <select className="form-select" name="idProject" id="selectProject"
                                                value={boardData.idProject} onChange={onChangeBoard}>
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
                        <ul className=" flex-column mb-auto projects-list">
                            {projectList}

                        </ul>
                    </ul>


                    <div className="dropdown">
                        <a href="#"
                           className="d-flex align-items-center link-dark1 text-decoration-none dropdown-toggle"
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
                </>
            )}
        </div>
    );
};

export default Sidemenu;

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        console.log(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}