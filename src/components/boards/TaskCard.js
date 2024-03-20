import React, {useEffect, useState, useRef} from 'react';
import {useNavigate, Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import dateFormat from 'dateformat';
import styles from "../../css/dashboard.css";
import boards from "../../css/boards.css";

const TaskCard = ({task}) => {
    console.log(task)

    return (
        <div className="list-board">
            <div className="d-flex px-2">
                {task.subject.length > 0 ? task.subject.map((tag, index) => (
                    <div className="label-task justify-content-center align-items-center" key={index}>
                        <span className="text">{tag}</span>
                        {/*<span className="close" onClick={() => removeTag(index)}>&times;</span>*/}
                    </div>
                )) : <div className="label-task justify-content-center align-items-center">
                    <span className="text">Default</span>
                    {/*<span className="close" onClick={() => removeTag(index)}>&times;</span>*/}
                </div>}
                {/*<button className="more-btn">*/}
                {/*    <span className="more-dot"></span>*/}
                {/*    <span className="more-dot"></span>*/}
                {/*    <span className="more-dot"></span>*/}
                {/*</button>*/}
            </div>
            <button className="settings-btn py-3 px-3">
                <span className="settings-dot"></span>
                <span className="settings-dot"></span>
                <span className="settings-dot"></span>
            </button>
            <span className="span-task-title px-2">{task.title}</span>
            <div className="d-flex px-2 py-3 ">
                    <svg viewBox="0 0 24 24" width="22px" height="22px" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:'middle'}}>
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <rect x="3" y="6" width="18" height="15" rx="2" stroke="#272829"></rect>
                            <path
                                d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
                                fill="#272829"></path>
                            <path d="M7 3L7 6" stroke="#272829" strokeLinecap="round"></path>
                            <path d="M17 3L17 6" stroke="#272829" strokeLinecap="round"></path>
                            <rect x="7" y="12" width="4" height="2" rx="0.5" fill="#272829"></rect>
                            <rect x="7" y="16" width="4" height="2" rx="0.5" fill="#272829"></rect>
                            <rect x="13" y="12" width="4" height="2" rx="0.5" fill="#272829"></rect>
                            <rect x="13" y="16" width="4" height="2" rx="0.5" fill="#272829"></rect>
                        </g>
                    </svg>
                    <span className="date-time-tsk">{dateFormat(task.dueDate, "mmmm dS, h:MM TT")}</span>
                <div className="svg-view">
                <svg viewBox="0 -0.5 17 17" width="25px" height="25px" version="1.1" className="si-glyph si-glyph-view" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"><title>1127</title>
                        <defs></defs>
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(1.000000, 4.000000)" fill="#272829">
                                <path
                                    d="M8,0 C3.598,0 0.031,2.66 0.031,3.969 C0.031,5.278 3.597,7.938 8,7.938 C12.4,7.938 15.969,5.32 15.969,3.969 C15.969,2.618 12.4,0 8,0 L8,0 Z M7.99,7.062 C4.342,7.062 2.869,5.011 2.869,4 C2.869,2.989 4.342,0.938 7.99,0.938 C11.636,0.938 13.109,2.958 13.109,4 C13.109,5.042 11.637,7.062 7.99,7.062 L7.99,7.062 Z"
                                    className="si-glyph-fill"></path>
                                <ellipse cx="7.932" cy="3.963" rx="1.932" ry="1.963"
                                         className="si-glyph-fill"></ellipse>
                            </g>
                        </g>
                    </g>
                </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#272829">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
                        <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;