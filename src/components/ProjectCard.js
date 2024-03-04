import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
// import googlebooks from '@googleapis/books';
import axios from 'axios';
import styles from "../css/projects.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../App.css';

const ProjectCard = ({project}) => {
    const [boards, setBoards] = useState([]);
    var token = localStorage.getItem("token");
    var background = './bck4.svg';
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:8001/api/boards')
    //         .then((res) => {
    //             setBoards(res.data);
    //         })
    //         .catch((err) => {
    //             console.log('Error from Projectslist');
    //         });
    // }, []);
    // const [blobURL, setBlobURL] = React.useState(null);
    // const imgURL = project[10].image;
    // React.useEffect(() => {
    //     const controller = new AbortController(); // https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    //     const signal = controller.signal;
    //     fetch(imgURL, { signal })
    //         .then((res) => res.blob()) // Get the response and return it as a blob
    //         .then((blob) => { // Create a URL to the blob and use it without modifying it.
    //             setBlobURL(URL.createObjectURL(blob));
    //         })
    //         .catch((error) => { // Error handling here
    //             console.error(error);
    //         });
    //
    //     // Cancel the fetch request on any dependency change
    //     return () => controller.abort();
    // }, [imgURL]);
    return (
        <div className="card col-3 mx-3 my-3">
            <div className="row justify-content-center">
                <img className="img-style-proj" src={project.image ? project.image : background} alt="Card image cap"/>
            </div>
            <div className="card-body justify-content-center row">
                <h5 className="card-title">{project.title}</h5>
                <div className="row justify-content-center">
                    <div className="col-4">
                    <svg viewBox="0 0 1024 1024" width="25px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill="#61677A"
                                  d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"></path>
                        </g>
                    </svg>
                    </div>
                    <div className="col-4">
                    <svg viewBox="0 0 24 24" width="25px" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M13 21H21" stroke="#61677A" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                            <path
                                d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z"
                                stroke="#61677A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M15.3096 5.30981L18.7273 8.72755" stroke="#61677A" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"></path>
                            <path opacity="0.1"
                                  d="M18.556 8.90942L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L15.0647 5.35974C15.0742 5.4062 15.0969 5.45049 15.1329 5.48653L18.5506 8.90426C18.5524 8.90601 18.5542 8.90773 18.556 8.90942Z"
                                  fill="#61677A"></path>
                        </g>
                    </svg>
                    </div>
                    {/*</div>*/}
                    {/*<div className="svg-icon col-4">*/}
                    <div className="col-4">
                    <svg viewBox="0 0 1024 1024" width="25px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill="#61677A"
                                  d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path>
                        </g>
                    </svg>
                    </div>
                    {/*</div>*/}
                </div>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="card-body">
                <a className="card-link">Card link</a>
                <a className="card-link">Another link</a>
            </div>
        </div>

    );
};

export default ProjectCard;