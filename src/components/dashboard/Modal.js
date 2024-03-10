import React, {useState, useEffect, useRef} from 'react';
// import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import styles from "../css/projects.css";
// import ProjectCard from './ProjectCard';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


function Modal({approveDelete, projName, idModal }) {

    const onClickHandler = () => {
        approveDelete(1);
    };
    return (
        <div className="modal fade" id={idModal} tabIndex="-1" role="dialog"   data-bs-backdrop="static"
             data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel"
             aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                       Are you sure you want to delete {projName} project?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={onClickHandler}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;