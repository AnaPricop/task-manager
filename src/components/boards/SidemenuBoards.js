import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "../../css/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const SidemenuBoards = ({board, setBoard}) => {
    console.log(board)
    // const [board, setBoard] = useState([]);  //boards
    const [active, setActive] = useState(0);
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

    const [boardData, setBoards] = useState({  //board data
        title: "",
        idProject: "",
        background: ""
    });
    //background board
    const onChangeBck = (e) => {
        setBoards({...boardData, 'background': e});
        setBoardBck(e)//set values for board form
        console.log(boardData)
    };
    const onChangeBoard = (e) => {
        setBoards({...boardData, [e.target.name]: e.target.value});   //set values for board form
    };
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleBoard, setIsVisibleBoard] = useState(false);
    const [projectData, setProject] = useState({
        title: "",
        image: ''
    });
    // const boardList =
    //     board !== 'undefined' && board.length === 0
    //         ? 'there are no projects!'
    //         : board.map((b, k) => <a className="nav-link link-dark1" key={b._id}>
    //             <svg className="bi me-2" width="16" height="16"></svg>
    //             {b.title} </a>);
    const [boardBck, setBoardBck] = useState('bck1');
    return (
        <div className="p-3 bg-light sidebar_dsh h-100  px-3 position-fixed"
        >
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
                            <svg className="bi me-2" width="16" height="16">
                            </svg>
                            Create project
                        </a>
                        {/*<section*/}
                        {/*    className={isVisible ? 'create_project_visible section_setting' : 'create_project_hidden section_setting'}*/}
                        {/*    style={styles.section_setting}>*/}
                        {/*    <div className="section_header row" style={styles.section_header}>*/}
                        {/*        <div className=" justify-content-center">Create a project</div>*/}
                        {/*    </div>*/}
                        {/*    <form className="form-create-project" onSubmit={onSubmit}>*/}
                        {/*        <div className="form-group justify-content-center row py-4"*/}
                        {/*        >*/}
                        {/*            <div className="select-img"*/}
                        {/*                 onMouseEnter={e => {*/}
                        {/*                     setStyle({display: 'block'});*/}
                        {/*                 }}*/}
                        {/*                 onMouseLeave={e => {*/}
                        {/*                     setStyle({display: 'none'})*/}
                        {/*                 }}>*/}
                        {/*                <img className="background-div-img" src={image} onChange={onImageChange}  />*/}
                        {/*                <input type="file" onChange={onImageChange} className="filetype input-select" />*/}
                        {/*                <span className="change-img"  style={style}>Change Image</span></div>*/}
                        {/*        </div>*/}
                        {/*        <div className="form-group">*/}
                        {/*            <label htmlFor="titleOfProject">Project title</label>*/}
                        {/*            <input type="text" className="form-control" id="titleOfProject"*/}
                        {/*                   placeholder="" value={projectData.title} name="title"*/}
                        {/*                   onChange={onChange}/>*/}
                        {/*        </div>*/}
                        {/*        <button type="submit" className="btn create-project-btn btn-sm">Create</button>*/}
                        {/*    </form>*/}
                        {/*</section>*/}
                    </div>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark1" onClick={handleCreateBoard}>
                        <svg className="bi me-2" width="16" height="16">
                        </svg>
                        Create board
                    </a>
                    {/*<section*/}
                    {/*    className={isVisibleBoard ? 'create_project_visible section_board' : 'create_project_hidden section_board'}*/}
                    {/*    style={styles.section_setting}>*/}
                    {/*    <div className="section_header justify-content-center" style={styles.section_header}>*/}
                    {/*        <div className="">Create board</div>*/}
                    {/*    </div>*/}
                    {/*    <form className="form-create-board" onSubmit={onSubmitBoard}>*/}
                    {/*        <div className="form-group row justify-content-center">*/}
                    {/*            <div className={boardBck + " background-div"} value={boardBck}>*/}
                    {/*                /!*<img src="./bck1.svg"/>*!/*/}
                    {/*            </div>*/}
                    {/*            <a className="row bck-title">Background</a>*/}
                    {/*            <ul className="ul-little-div">*/}
                    {/*                <li className="li-little-div" onClick={() => onChangeBck('bck2')}>*/}
                    {/*                    <a className="little-bck-div bck2"></a>*/}
                    {/*                </li>*/}
                    {/*                <li className="li-little-div" onClick={() => onChangeBck('bck3')}>*/}
                    {/*                    <a className="little-bck-div bck3"></a>*/}
                    {/*                </li>*/}
                    {/*                <li className="li-little-div" onClick={() => onChangeBck('bck4')}>*/}
                    {/*                    <a className="little-bck-div bck4"></a>*/}
                    {/*                </li>*/}
                    {/*                <li className="li-little-div" onClick={() => onChangeBck('bck5')}>*/}
                    {/*                    <a className="little-bck-div bck5"></a>*/}
                    {/*                </li>*/}
                    {/*                <li className="li-little-div" onClick={() => onChangeBck('bck6')}>*/}
                    {/*                    <a className="little-bck-div bck6"></a>*/}
                    {/*                </li>*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*        <div className="form-group">*/}
                    {/*            <label htmlFor="titleOfProject">Board title</label>*/}
                    {/*            <input type="text" className="form-control" id="titleOfProject"*/}
                    {/*                   placeholder="" value={boardData.title} name="title"*/}
                    {/*                   onChange={onChangeBoard}/>*/}
                    {/*        </div>*/}
                    {/*        <div className="form-group">*/}
                    {/*            <label htmlFor="selectProject">Project</label>*/}
                    {/*            <select className="form-select" name="idProject" id="selectProject"*/}
                    {/*                    value={boardData.idProject} onChange={onChangeBoard}>*/}
                    {/*                {projectListSelect}*/}
                    {/*            </select>*/}
                    {/*        </div>*/}
                    {/*        <button type="submit" className="btn create-project-btn btn-sm">Create</button>*/}
                    {/*    </form>*/}
                    {/*</section>*/}
                </li>
                <hr/>
                {/*<hr/>*/}
                <a href="/"
                   className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark1 text-decoration-none">
                    <img className="header-logo" src="/myprojects.svg"/>
                    My projects
                </a>
                <ul className="nav nav-pills flex-column mb-auto">
                    {/*{board}*/}

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
                    {/*<li><a className="dropdown-item" onClick={handleLogout}>Sign out</a></li>*/}
                </ul>
            </div>
        </div>
    );
};

export default SidemenuBoards;

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}