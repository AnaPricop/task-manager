import React, {useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
// import googlebooks from '@googleapis/books';
import axios from 'axios';
import styles from "../css/projects.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../App.css';
import Modal from './dashboard/Modal';

const ProjectCard = ({project, setProjectsDel}) => {
    const [boards, setBoards] = useState([]);
    var token = localStorage.getItem("token");
    var background = './color.svg';
    const [unique, setUnique] = useState('#'+project.name + '_' + project._id);
    const [showModal, setShowModal] = useState(false);
    const [projid, setProjId] = useState('');
    const approveDelete = (value) => {
        if (value === 1)
        {
            confirmedDelete();
        }
    };
    const deleteProject = (projectid) => {
        setProjId(projectid);
        setShowModal(true);
    };

    const confirmedDelete = () => {
        axios
            .delete("http://localhost:8001/api/projects/" + projid)
            .then((res) => {
                console.log(projid);
                setProjectsDel(projid);
                setProjId('');
                // const del = projects.filter(project => projectid !== project._id)
                // setProjects(del)
                // setProject({
                //     title: ""
                // });
                // setProjects([...projects, res.data.project]);
                // handleCreate();
            })
            .catch((err) => {
                console.log("Error in Delete project!");
            });
    }
    return (
        <div className="card mx-3 my-3 col-lg-2 col-md-8 justify-content-center" key={project._id}>
            <div className="progress_top">
                <svg viewBox="0 0 36 36" width="10px" xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true" role="img" className="iconify iconify--twemoji"
                     preserveAspectRatio="xMidYMid meet" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <circle fill="#f5a447" cx="18" cy="18" r="18"></circle>
                    </g>
                </svg>
                <span className="span_progress">In Progress</span>
            </div>
            <div className="row justify-content-center">
                <img className="img-style-proj" src={project.image ? project.image : background} alt="Card image cap"/>
            </div>
            <div className="card-body ">
                <h5 className="card-title">{project.title}</h5>
                <div className="row justify-content-center py-3">
                    <div className="col col-lg-2" style={{textAlign: 'center'}}>
                        <svg viewBox="0 0 1024 1024" width="25px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#272829"
                                      d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="col col-lg-2" style={{textAlign: 'center'}}>
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
                    <div className="col col-lg-2" style={{textAlign: 'center'}}
                         onClick={() => deleteProject(project._id)} data-bs-toggle="modal"
                         data-bs-target={unique}>
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
            </div>

            {showModal && (
                <Modal  approveDelete={approveDelete} projName={project.title} idModal={unique}/>
            )}
            {/*<ul className="list-group list-group-flush">*/}
            {/*    <li className="list-group-item">Cras justo odio</li>*/}
            {/*    <li className="list-group-item">Dapibus ac facilisis in</li>*/}
            {/*    <li className="list-group-item">Vestibulum at eros</li>*/}
            {/*</ul>*/}
            {/*<div className="card-body">*/}
            {/*    <a className="card-link">Card link</a>*/}
            {/*    <a className="card-link">Another link</a>*/}
            {/*</div>*/}
        </div>

    );
};

export default ProjectCard;