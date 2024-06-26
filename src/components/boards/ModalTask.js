import React, {useState, useEffect, useRef} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Modal1({approveDelete, taskName, show, setShow}) {
    //Modal for delete project
    const handleClose = () => setShow(false);
    const onClickHandler = () => {
        approveDelete(1);
        setShow(false);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the task "{taskName}"?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={onClickHandler}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Modal1;