import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Card from 'react-bootstrap/Card';
import styles from "../../css/dashboard.css";
import boards from "../../css/boards.css";
const BoardCard = ({board, currentBoard}) => {
    console.log(board)
    var background = './color.svg';
    const navigate = useNavigate();
    const [projid, setProjId] = useState('');
    const [boardBck, setBoardBck] = useState('./../' + (board.background ? board.background : 'bck4') + '.svg');
    // const handleNext = () => {
    //     navigate(`/boards/${board._id}`);
    // }

    return (
<div className=" w-100 h-90 row my-3">
    <h2 className="boards-h2 row">{currentBoard.title}</h2>
        <div className="my-5 w-100 d-flex h-90">
            <div className="list-board mx-5"></div>
            <div className="list-board mx-5"></div>
            <div className="list-board mx-5"></div>
            {/*<Card className="text-white card-board bg-dark" onClick={() => handleNext()}>*/}
            {/*    <Card.Img src={boardBck} alt="Card image" className="card-img" />*/}
            {/*    <Card.ImgOverlay>*/}
            {/*        <Card.Title className="card-title-board">{board.title}</Card.Title>*/}
            {/*        /!*<Card.Text>*!/*/}
            {/*        /!*    This is a wider card with supporting text below as a natural lead-in*!/*/}
            {/*        /!*    to additional content. This content is a little bit longer.*!/*/}
            {/*        /!*</Card.Text>*!/*/}
            {/*        /!*<Card.Text>Last updated 3 mins ago</Card.Text>*!/*/}
            {/*    </Card.ImgOverlay>*/}
            {/*</Card>*/}
        </div></div>
    );
};

export default BoardCard;