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
                <div className="row">
                    <div className="svg-icon col-4">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#000000"
                                      d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="svg-icon col-4">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M10 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"></path>
                                <path d="M14 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"></path>
                                <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"></path>
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                                      stroke="#000000" strokeWidth="2" stroke-linecap="round"
                                      strokeLinejoin="round"></path>
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                      stroke="#000000" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"></path>
                            </g>
                        </svg>
                    </div>
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