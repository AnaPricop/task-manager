import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styles from "../css/projects.css";
import ProjectCard from './ProjectCard';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Loading from './Loading';

// import Sidemenu from './dashboard/Sidemenu';

function ShowStatistic({info}) {
    // const [isLoading, setIsLoading] = useState(false);
    // const setProjectsDel = (projectid) => {
    //     const del = projects.filter(project => projectid !== project._id)
    //     setProjects(del)
    //     console.log(del, projectid)
    // }
    //
    // const projectList =
    //     projects.length === 0
    //         ? 'There are no projects.'
    //         : projects.map((project, k) => <ProjectCard project={project} setProjectsDel={setProjectsDel} key={k}/>);
    // if (projects.length === 0)
    //     setIsLoading(true)
    // else {
    //     projectList = projects.map((project, k) => <ProjectCard project={project} setProjectsDel={setProjectsDel}
    //                                                             key={k}/>);
    //     setIsLoading(false)
    //
    // }

    return (
        <div className='ShowBookList p-3 row '>

            <h3>Dashboard</h3>
            <div className="list row py-2">
                <div className=' list2 mx-3 my-3 col-lg-2 col-md-8 justify-content-center d-flex'>
                    <div className="col-4 px-2 py-2 icon-statistic">
                        <svg viewBox="0 0 24 24" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg"
                             mirrorinrtl="true" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#25283D"
                                      d="M23.71 10.29l-4-4C19.52 6.1 19.26 6 19 6h-7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V11c0-.26-.1-.52-.29-.71zM19 8.42L21.58 11H19.5c-.28 0-.5-.22-.5-.5V8.42zm3 13.08c0 .28-.22.5-.5.5h-9c-.28 0-.5-.22-.5-.5v-13c0-.28.22-.5.5-.5h4c.28 0 .5.22.5.5V10h-2c-.55 0-1 .45-1 1s.45 1 1 1h2.27c.35.6.99 1 1.73 1h2.5c.28 0 .5.22.5.5v8z"></path>
                                <path fill="#25283D"
                                      d="M13 2v1c0 .55-.45 1-1 1s-1-.45-1-1v-.5c0-.28-.22-.5-.5-.5h-.51H2.5c-.28 0-.5.22-.5.5v13c0 .28.22.5.5.5h4.52c.54.01.98.46.98 1s-.44.99-.98 1H2.01C.9 18 0 17.1 0 16V2C0 .9.9 0 2.01 0h8.98C12.1 0 13 .9 13 2zM19 20h-4c-.553 0-1-.447-1-1s.447-1 1-1h4c.553 0 1 .447 1 1s-.447 1-1 1zM19 16h-4c-.553 0-1-.447-1-1s.447-1 1-1h4c.553 0 1 .447 1 1s-.447 1-1 1z"></path>
                                <path fill="#25283D"
                                      d="M7 6H5c-.553 0-1-.447-1-1s.447-1 1-1h2c.553 0 1 .447 1 1s-.447 1-1 1zM7 14H5c-.553 0-1-.447-1-1s.447-1 1-1h2c.553 0 1 .447 1 1s-.447 1-1 1zM7 10H5c-.553 0-1-.447-1-1s.447-1 1-1h2c.553 0 1 .447 1 1s-.447 1-1 1z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="justify-content-center col-8 total-statistic">
                        <span className="row" style={{fontSize: "20px"}}>{info.all}</span>
                        <span className=" row" style={{fontSize: "15px"}}> Total Projects</span>
                    </div>
                </div>
                <div className=' list2 mx-3 my-3 col-lg-2 col-md-8 justify-content-center d-flex'>
                    <div className="col-4 px-2 py-2 icon-statistic">
                        <svg viewBox="0 0 24 24" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg"
                             mirror-in-rtl="true" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#25283D"
                                      d="M7.857 10H2.142C.962 10 0 9.04 0 7.857V2.143C0 .96.96 0 2.142 0h5.715C9.04 0 10 .96 10 2.143v5.714C10 9.04 9.04 10 7.857 10zM2.142 2C2.066 2 2 2.067 2 2.143v5.714c0 .076.066.143.142.143h5.715C7.933 8 8 7.933 8 7.857V2.143C8 2.067 7.933 2 7.857 2H2.142zM7.857 24H2.142C.962 24 0 23.04 0 21.857v-5.715C0 14.962.96 14 2.142 14h5.715C9.04 14 10 14.96 10 16.143v5.715C10 23.038 9.04 24 7.857 24zm-5.715-8c-.076 0-.142.066-.142.143v5.715c0 .076.066.142.142.142h5.715c.076 0 .143-.066.143-.143v-5.715c0-.076-.067-.142-.143-.142H2.142zM21.857 24h-5.715C14.96 24 14 23.04 14 21.857v-5.715C14 14.96 14.96 14 16.142 14h5.715C23.04 14 24 14.96 24 16.14v5.715C24 23.04 23.037 24 21.856 24zm-5.715-8c-.076 0-.143.066-.143.143v5.715c0 .076.065.143.142.143h5.715c.076 0 .143-.065.143-.142v-5.715c0-.076-.066-.143-.143-.143h-5.715zM17.818 12.364c-.55 0-1.098-.208-1.516-.626l-4.04-4.04c-.837-.836-.837-2.196 0-3.03L16.3.625c.808-.808 2.225-.807 3.03 0l4.04 4.04c.837.835.837 2.195 0 3.03l-4.04 4.04c-.418.42-.967.628-1.514.628zm0-10.364c-.028 0-.067.007-.102.04l-4.04 4.04c-.055.055-.055.15 0 .203l4.04 4.04c.055.055.147.056.202 0l4.04-4.04c.055-.054.055-.148 0-.202l-4.04-4.04c-.034-.033-.073-.04-.1-.04z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="justify-content-center col-8 total-statistic">
                        <span className="row" style={{fontSize: "20px"}}>{info.boards}</span>
                        <span className=" row" style={{fontSize: "15px"}}> Total Boards</span>
                    </div>
                </div>
                <div className=' list2 mx-3 my-3 col-lg-2 col-md-8 justify-content-center d-flex'>
                    <div className="col-4 px-2 py-2 icon-statistic">
                        <svg viewBox="0 0 24 24" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg"
                             mirror-in-rtl="true" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#25283D"
                                      d="M8 6H5c-.553 0-1-.448-1-1s.447-1 1-1h3c.553 0 1 .448 1 1s-.447 1-1 1zM13 10H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1zM13 14H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1z"></path>
                                <path fill="#25283D"
                                      d="M18 2v8c0 .55-.45 1-1 1s-1-.45-1-1V2.5c0-.28-.22-.5-.5-.5h-13c-.28 0-.5.22-.5.5v19c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V21c0-.55.45-1 1-1s1 .45 1 1v1c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h14c1.1 0 2 .9 2 2z"></path>
                                <path fill="#25283D"
                                      d="M23.71 8.817c.44.438.372 1.212-.148 1.732l-7.835 7.84c-.07.068-.148.126-.227.173l-2.382 1.317c-.33.183-.7.152-.927-.075-.226-.227-.25-.603-.07-.923l1.328-2.373c.042-.085.1-.153.162-.216 0-.012.007-.018.007-.018l7.835-7.84c.52-.52 1.294-.587 1.73-.15l.53.53z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="justify-content-center col-8 total-statistic">
                        <span className="row" style={{fontSize: "20px"}}>{info.inprogress}</span>
                        <span className=" row" style={{fontSize: "15px"}}>In Progress</span>

                    </div>
                </div>
                <div className=' list2 mx-3 my-3 col-lg-2 col-md-8 justify-content-center d-flex'>
                    <div className="col-4 px-2 py-2 icon-statistic">
                        <svg fill="#25283D" width="40px" height="40px" viewBox="0 0 1024 1024"
                             xmlns="http://www.w3.org/2000/svg" className="icon">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm376 116c-119.3 0-216 96.7-216 216s96.7 216 216 216 216-96.7 216-216-96.7-216-216-216zm107.5 323.5C750.8 868.2 712.6 884 672 884s-78.8-15.8-107.5-44.5C535.8 810.8 520 772.6 520 732s15.8-78.8 44.5-107.5C593.2 595.8 631.4 580 672 580s78.8 15.8 107.5 44.5C808.2 653.2 824 691.4 824 732s-15.8 78.8-44.5 107.5zM761 656h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-23.1-31.9a7.92 7.92 0 0 0-6.5-3.3H573c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.9-5.3.1-12.7-6.4-12.7zM440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="col-8 align-center total-statistic">
                        <span className="row" style={{fontSize: "20px"}}>{info.done}</span>
                        <span className=" row" style={{fontSize: "15px"}}>  Done</span>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowStatistic;