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
    console.log(project)

    // console.log(this.context)
    const projectList =
        project.length === 0
            ? 'there are no projects!'
            : project.projects.map((project, k) => <a  className="nav-link link-dark"> <svg className="bi me-2" width="16" height="16"> </svg>{project.title} </a>);
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar_dsh h-100  px-3 position-fixed"
             style={styles.sidebar_dsh}>
            <a href="/"
               className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none header-sidemenu">
                <svg viewBox="0 0 24 24" width="30px" style={styles.svg_navbar} fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M9.94531 1.25H14.0551C15.4227 1.24998 16.525 1.24996 17.3919 1.36652C18.292 1.48754 19.0499 1.74643 19.6518 2.34835C20.2538 2.95027 20.5126 3.70814 20.6337 4.60825C20.7502 5.47522 20.7502 6.57754 20.7502 7.94513V16.0549C20.7502 17.4225 20.7502 18.5248 20.6337 19.3918C20.5126 20.2919 20.2538 21.0497 19.6518 21.6517C19.0499 22.2536 18.292 22.5125 17.3919 22.6335C16.525 22.75 15.4226 22.75 14.0551 22.75H9.94532C8.57773 22.75 7.4754 22.75 6.60844 22.6335C5.70833 22.5125 4.95045 22.2536 4.34854 21.6517C3.74662 21.0497 3.48773 20.2919 3.36671 19.3918C3.32801 19.1039 3.30216 18.7902 3.2849 18.4494C3.24582 18.326 3.23821 18.1912 3.26895 18.0568C3.25016 17.4649 3.25017 16.7991 3.25019 16.0549V7.94513C3.25017 6.57754 3.25015 5.47522 3.36671 4.60825C3.48773 3.70814 3.74662 2.95027 4.34854 2.34835C4.95045 1.74643 5.70833 1.48754 6.60843 1.36652C7.4754 1.24996 8.57772 1.24998 9.94531 1.25ZM4.77694 18.2491C4.79214 18.6029 4.81597 18.914 4.85333 19.1919C4.95199 19.9257 5.13243 20.3142 5.4092 20.591C5.68596 20.8678 6.07453 21.0482 6.80831 21.1469C7.56366 21.2484 8.56477 21.25 10.0002 21.25H14.0002C15.4356 21.25 16.4367 21.2484 17.1921 21.1469C17.9258 21.0482 18.3144 20.8678 18.5912 20.591C18.8679 20.3142 19.0484 19.9257 19.147 19.1919C19.2299 18.5756 19.2462 17.7958 19.2494 16.75H13.7502V19.5309C13.7502 19.5396 13.7502 19.5485 13.7502 19.5578C13.7504 19.6691 13.7506 19.8276 13.7293 19.9638C13.7033 20.1302 13.6177 20.4514 13.2851 20.6468C12.9647 20.8349 12.6513 20.765 12.5024 20.7187C12.3726 20.6783 12.2302 20.6105 12.124 20.56C12.1156 20.556 12.1074 20.5521 12.0995 20.5483L11.0002 20.0261L9.90087 20.5483C9.89294 20.5521 9.88477 20.5559 9.87636 20.56C9.7702 20.6105 9.62782 20.6783 9.49796 20.7187C9.34903 20.765 9.03567 20.8349 8.7153 20.6468C8.38263 20.4514 8.29705 20.1302 8.27104 19.9638C8.24976 19.8276 8.25 19.6691 8.25016 19.5578C8.25017 19.5485 8.25019 19.5396 8.25019 19.5309V16.75H7.89796C6.91971 16.75 6.5777 16.7564 6.31562 16.8267C5.5963 17.0194 5.02286 17.5541 4.77694 18.2491ZM9.75019 16.75V18.9592L10.4995 18.6033C10.5013 18.6024 10.5043 18.6009 10.5083 18.5989C10.5573 18.5738 10.7638 18.4682 11.0002 18.4682C11.2365 18.4682 11.443 18.5738 11.4921 18.5989C11.4961 18.6009 11.499 18.6024 11.5009 18.6033L12.2502 18.9592V16.75H9.75019ZM7.89796 15.25C7.85879 15.25 7.8202 15.25 7.78217 15.25C6.9642 15.2497 6.40605 15.2495 5.92739 15.3778C5.49941 15.4925 5.10242 15.6798 4.75019 15.9259V8C4.75019 6.56458 4.75178 5.56347 4.85333 4.80812C4.95199 4.07435 5.13243 3.68577 5.4092 3.40901C5.68596 3.13225 6.07453 2.9518 6.80831 2.85315C7.56366 2.75159 8.56477 2.75 10.0002 2.75H14.0002C15.4356 2.75 16.4367 2.75159 17.1921 2.85315C17.9258 2.9518 18.3144 3.13225 18.5912 3.40901C18.8679 3.68577 19.0484 4.07435 19.147 4.80812C19.2486 5.56347 19.2502 6.56458 19.2502 8V15.25H7.89796ZM7.25019 7C7.25019 6.58579 7.58597 6.25 8.00019 6.25H16.0002C16.4144 6.25 16.7502 6.58579 16.7502 7C16.7502 7.41421 16.4144 7.75 16.0002 7.75H8.00019C7.58597 7.75 7.25019 7.41421 7.25019 7ZM7.25019 10.5C7.25019 10.0858 7.58597 9.75 8.00019 9.75H13.0002C13.4144 9.75 13.7502 10.0858 13.7502 10.5C13.7502 10.9142 13.4144 11.25 13.0002 11.25H8.00019C7.58597 11.25 7.25019 10.9142 7.25019 10.5Z"
                              fill="#1C274D"></path>
                    </g>
                </svg>
                TaskAcc
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a className={(active === 0 ? 'active ' : 'null ') + "nav-link link-dark"}
                       onClick={() => setActive(0)}>
                        <svg className="bi me-2" width="16" height="16">
                            {/*<use xlink:href="#table"/>*/}
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <div className="d-flex">
                        <a href="#" className="nav-link link-dark ">
                            {/*// className={(active === 1 ? 'active ': 'null ') + "nav-link link-dark"}*/}
                            {/*// onClick={() => setActive(1)}>*/}
                            <svg className="bi me-2" width="16" height="16">
                                {/*<use xlink:href="#speedometer2"/>*/}
                            </svg>
                            Create project
                        </a>
                        <section className="section_setting" style={styles.section_setting}>
                            <div class="section_header row" style={styles.section_header}>
                                <div className="row justify-content-center">Create a project</div>
                            </div>
                            {/*<div className="row">*/}
                            {/*    <div className="col-xs-12">Name of Section</div>*/}
                            {/*</div>*/}
                            <form className="form-create-project">
                            <div className="form-group">
                                <label htmlFor="titleOfProject">Project title</label>
                                <input type="text" className="form-control" id="titleOfProject"
                                       placeholder="" />
                            </div>
                                <button className="btn create-project-btn btn-sm">Create</button>
                            </form>
                        </section>
                    </div>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
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
                   className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <svg viewBox="0 0 24 24" width="20px" style={styles.svg_navbar2} xmlns="http://www.w3.org/2000/svg"
                         mirror-in-rtl="true" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill="#000000"
                                  d="M8 6H5c-.553 0-1-.448-1-1s.447-1 1-1h3c.553 0 1 .448 1 1s-.447 1-1 1zM13 10H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1zM13 14H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1z"></path>
                            <path fill="#000000"
                                  d="M18 2v8c0 .55-.45 1-1 1s-1-.45-1-1V2.5c0-.28-.22-.5-.5-.5h-13c-.28 0-.5.22-.5.5v19c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V21c0-.55.45-1 1-1s1 .45 1 1v1c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h14c1.1 0 2 .9 2 2z"></path>
                            <path fill="#000000"
                                  d="M23.87 11.882c.31.54.045 1.273-.595 1.643l-9.65 5.57c-.084.05-.176.086-.265.11l-2.656.66c-.37.092-.72-.035-.88-.314-.162-.278-.09-.65.17-.913l1.907-1.958c.063-.072.137-.123.214-.167.004-.01.012-.015.012-.015l9.65-5.57c.64-.37 1.408-.234 1.72.305l.374.65z"></path>
                        </g>
                    </svg>
                    My projects
                </a>
                <ul className="nav nav-pills flex-column mb-auto">
                    {projectList}

                </ul>
            </ul>


            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
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