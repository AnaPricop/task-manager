import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from "../../css/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import BoardCard from "./BoardCard";
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";


const BoardView = ({board, project}) => {
console.log(board, project)
    const boardList =
        board.length === 0
            ? 'No boards.'
            : board.map((b, k) => <BoardCard board={b} key={k} project={project}/>);

    return (
        <Row>
            <h2 className="boards-h2 mx-5 my-3">Boards</h2>
            <div className="px-2 mx-5 my-5 col-lg-2 col-md-8 justify-content-center" key={board._id}>
                <Card className="text-white card-board bg-dark justify-content-center">
                    <Card.Img src="../addboard.svg" alt="Card image" className="card-svg" />
                </Card>
            </div>
            {boardList}
        </Row>
    );
};

export default BoardView;