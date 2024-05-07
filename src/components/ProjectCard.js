import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from "../css/projects.css";
import styles1 from "../css/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../App.css';
import Modal from './dashboard/Modal';

const ProjectCard = ({project, projects, setProjects, setProjectsDel, info, setInfo}) => {
    var background = './color.svg';
    const [focus, setFocus] = useState(false);
    const handleClickFocus = () => {
        setFocus(!focus)
    };
    const [saveProject, setSaveProject] = useState(false);
    const [projTitle, setTitle] = useState(project.title);
    const onTodoChange = (value) => {
        console.log(value)
        setTitle({title: value})
    }
    const [edit, setEdit] = useState(true);


    const navigate = useNavigate();
    const [projid, setProjId] = useState('');
    const approveDelete = (value) => {
        if (value === 1) {
            confirmedDelete();
        }
    };
    const [show, setShow] = useState(false);
    const deleteProject = (projectid) => {
        setProjId(projectid);
        setShow(true);
    };
    const handleNext = () => {
        navigate(`/proj/${project._id}`);
    }
    const updateProject = (e) => {
        console.log(projTitle, e)
        let to_send = {
            image: image,
            title: projTitle.title
        }
        axios
            .put("http://localhost:8001/api/projects/" + project._id, to_send)
            .then((res) => {
                //  res.data.task.status = e;
                project.title = projTitle.title;
                console.log(projects.filter(function (e) {
                    return e._id === project._id
                }))
                setProjects(projects);
                // setSaveTask(!saveTask)
                // setEdit(!edit)
            })
            .catch((err) => {
                console.log("Error in update task!");
            });
        setSaveProject(false)
        setEdit(true);
        setFocus(false);
    };

    const [image, setImage] = useState(project.image)
    const [style, setStyle] = useState({display: 'none'});
    const onImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImage(base64);
        setEdit(false)
        setSaveProject(true)
        setFocus(false)
        // setProject({...projectData, image: base64});
        project.image = base64;
    }
    const confirmedDelete = () => {
        axios
            .delete("http://localhost:8001/api/projects/" + projid)
            .then((res) => {
                console.log(projid);
                setProjectsDel(projid);
                setProjId('');
                info.all = info.all - 1;
                setInfo(info);
            })
            .catch((err) => {
                console.log("Error in Delete project!");
            });
    }
    return (
        <div className="card mx-3 my-3 col-lg-2 col-md-8 justify-content-center" key={project._id}>
            {/*<div className="progress_top">*/}
            {/*    <svg viewBox="0 0 36 36" width="10px" xmlns="http://www.w3.org/2000/svg"*/}
            {/*         aria-hidden="true" role="img" className="iconify iconify--twemoji"*/}
            {/*         preserveAspectRatio="xMidYMid meet" fill="#000000">*/}
            {/*        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>*/}
            {/*        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>*/}
            {/*        <g id="SVGRepo_iconCarrier">*/}
            {/*            <circle fill="#f5a447" cx="18" cy="18" r="18"></circle>*/}
            {/*        </g>*/}
            {/*    </svg>*/}
            {/*    <span className="span_progress">In Progress</span>*/}
            {/*</div>*/}
            <div className="row justify-content-center" style={{paddingTop: '20px'}} title="Change Image">
                <div className="select-img"
                     onMouseEnter={e => {
                         setStyle({display: 'block'});
                     }}
                     onMouseLeave={e => {
                         setStyle({display: 'none'})
                     }}>
                    <img className="img-style-proj" src={project.image ? project.image : background}
                         alt="Card image cap"/>
                    <input type="file" onChange={onImageChange}
                           className="filetype input-select"/>
                    <span className="change-img-proj" style={style}><svg viewBox="0 0 512 512" version="1.1"
                                                                         width='60px' height='60px'
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         fill="#000000"><g id="SVGRepo_bgCarrier"
                                                                                           strokeWidth="0"></g><g
                        id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g
                        id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g id="Layer_1"></g> <g
                        id="Layer_2"> <g> <g> <path className="st0"
                                                    d="M307.81,212.18c-3.24,0-6.07-2.17-6.91-5.3l-4.82-17.88c-0.84-3.12-3.68-5.3-6.91-5.3h-21.46h-25.44H220.8 c-3.24,0-6.07,2.17-6.91,5.3l-4.82,17.88c-0.84,3.12-3.68,5.3-6.91,5.3H169.5c-3.96,0-7.16,3.21-7.16,7.16v101.78 c0,3.96,3.21,7.16,7.16,7.16h170.95c3.96,0,7.16-3.21,7.16-7.16V219.35c0-3.96-3.21-7.16-7.16-7.16H307.81z M282.33,264.94 c-0.86,13.64-11.93,24.71-25.58,25.58c-16.54,1.05-30.18-12.59-29.14-29.14c0.86-13.64,11.93-24.71,25.58-25.58 C269.74,234.76,283.38,248.4,282.33,264.94z"></path> </g> <g> <path
                        class="st0"
                        d="M82.95,272.41c3.82,0,7.53-1.53,10.23-4.23l21.23-21.23c4.74-4.74,6.4-11.92,3.73-18.06 c-2.73-6.29-8.88-8.95-18.84-7.57l-0.27,0.27c15.78-71.56,79.7-125.27,155.94-125.27c60.72,0,115.41,33.72,142.73,87.99 c3.58,7.11,12.24,9.97,19.34,6.39c7.11-3.58,9.97-12.24,6.39-19.34c-15.47-30.73-39.05-56.66-68.22-75.01 C325.23,77.47,290.57,67.5,254.98,67.5c-93,0-170.48,67.71-185.75,156.41c-5.38-4.77-13.59-5.18-19.13-0.44 c-6.3,5.39-6.75,14.88-1.13,20.84c0.23,0.24,5.69,6.03,11.41,11.93c3.41,3.51,6.2,6.33,8.3,8.38c4.23,4.13,7.88,7.69,14.07,7.78 C82.81,272.41,82.88,272.41,82.95,272.41z"></path> </g> <g> <path
                        class="st0"
                        d="M464.28,247.82l-26.5-26.5c-2.75-2.75-6.57-4.3-10.44-4.23c-2.33,0.03-4.29,0.56-6.07,1.42 c-0.26,0.12-0.51,0.26-0.76,0.4c-0.04,0.02-0.08,0.04-0.12,0.06c-0.59,0.33-1.16,0.68-1.69,1.08c-1.88,1.34-3.6,3.03-5.44,4.82 c-2.1,2.05-4.89,4.87-8.3,8.38c-5.72,5.9-11.18,11.68-11.41,11.93c-5.46,5.79-5.19,14.91,0.6,20.36 c5.75,5.42,14.77,5.18,20.24-0.48c-4.72,83.85-74.42,150.62-159.43,150.62c-70.52,0-131.86-45.23-152.62-112.55 c-2.35-7.6-10.41-11.86-18.01-9.52c-7.6,2.34-11.86,10.41-9.52,18.01c11.62,37.68,35.48,71.52,67.19,95.28 c32.8,24.59,71.86,37.58,112.96,37.58c100.11,0,182.23-78.45,188.14-177.1l0.79,0.79c2.81,2.81,6.5,4.22,10.18,4.22 c3.69,0,7.37-1.41,10.18-4.22C469.91,262.57,469.91,253.45,464.28,247.82z"></path> </g> </g> </g> </g></svg></span>
                </div>
            </div>
            <div className="card-body ">
                {/*<div className="d-flex">*/}
                <input className={focus ? "card-title card-title1" : "card-title"}
                       defaultValue={project.title}
                       disabled={edit}
                       onChange={e => onTodoChange(e.target.value)}></input>
                <div className={saveProject ? "labels-task py-2" : "not-vis labels-task py-2"}>
                        <span><button className="save-task btn btn-dark"
                                      onClick={() => {
                                          updateProject();
                                      }}>Save</button></span>
                    <span><button className="cancel-task btn" onClick={() => {
                        setSaveProject(!saveProject);
                        setEdit(!edit);
                        setFocus(!focus);
                    }}>Cancel</button></span>
                    {/*</div>*/}
                </div>
                <div className="row justify-content-center py-3">
                    <div className="col col-lg-2" style={{textAlign: 'center' , cursor: 'pointer'}} title="Open Project" onClick={() => {
                        handleNext();
                    }}>
                        <svg viewBox="0 0 1024 1024" width="25px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#272829"
                                      d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="col col-lg-2" style={{textAlign: 'center', cursor: 'pointer'}}  title="Edit Project"
                         onClick={() => {
                             setEdit(!edit);
                             setSaveProject(!saveProject);
                             handleClickFocus();
                         }}>
                        <svg viewBox="0 0 24 24" width="25px" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z"
                                    fill="#272829"></path>
                                <path
                                    d="M19.0206 3.48162C17.0806 1.54162 15.1806 1.49162 13.1906 3.48162L11.9806 4.69162C11.8806 4.79162 11.8406 4.95162 11.8806 5.09162C12.6406 7.74162 14.7606 9.86162 17.4106 10.6216C17.4506 10.6316 17.4906 10.6416 17.5306 10.6416C17.6406 10.6416 17.7406 10.6016 17.8206 10.5216L19.0206 9.31162C20.0106 8.33162 20.4906 7.38162 20.4906 6.42162C20.5006 5.43162 20.0206 4.47162 19.0206 3.48162Z"
                                    fill="#272829"></path>
                                <path
                                    d="M15.6103 11.5308C15.3203 11.3908 15.0403 11.2508 14.7703 11.0908C14.5503 10.9608 14.3403 10.8208 14.1303 10.6708C13.9603 10.5608 13.7603 10.4008 13.5703 10.2408C13.5503 10.2308 13.4803 10.1708 13.4003 10.0908C13.0703 9.81078 12.7003 9.45078 12.3703 9.05078C12.3403 9.03078 12.2903 8.96078 12.2203 8.87078C12.1203 8.75078 11.9503 8.55078 11.8003 8.32078C11.6803 8.17078 11.5403 7.95078 11.4103 7.73078C11.2503 7.46078 11.1103 7.19078 10.9703 6.91078C10.9491 6.86539 10.9286 6.82022 10.9088 6.77532C10.7612 6.442 10.3265 6.34455 10.0688 6.60231L4.34032 12.3308C4.21032 12.4608 4.09032 12.7108 4.06032 12.8808L3.52032 16.7108C3.42032 17.3908 3.61032 18.0308 4.03032 18.4608C4.39032 18.8108 4.89032 19.0008 5.43032 19.0008C5.55032 19.0008 5.67032 18.9908 5.79032 18.9708L9.63032 18.4308C9.81032 18.4008 10.0603 18.2808 10.1803 18.1508L15.9016 12.4295C16.1612 12.1699 16.0633 11.7245 15.7257 11.5804C15.6877 11.5642 15.6492 11.5476 15.6103 11.5308Z"
                                    fill="#272829"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="col col-lg-2" style={{textAlign: 'center', cursor: 'pointer'}}  title="Delete Project"
                         onClick={() => deleteProject(project._id)}>
                        <svg viewBox="0 0 1024 1024" width="25px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#272829"
                                      d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path>
                            </g>
                        </svg>
                    </div>
                    {/*</div>*/}
                </div>
                {/*<div className={saveProject ? "labels-task py-2" : "not-vis labels-task py-2"}>*/}
                {/*        <span><button className="save-task btn btn-dark"*/}
                {/*                      onClick={() => {updateProject();}}>Save</button></span>*/}
                {/*    <span><button className="cancel-task btn" onClick={() => {*/}
                {/*        setSaveProject(!saveProject);*/}
                {/*        setEdit(!edit)*/}
                {/*    }}>Cancel</button></span>*/}
                {/*</div>*/}
            </div>
            <Modal approveDelete={approveDelete} projName={project.title} show={show} setShow={setShow}/>
        </div>

    );
};
export default ProjectCard;

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