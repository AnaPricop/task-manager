import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Card from 'react-bootstrap/Card';
import styles from "../../css/dashboard.css";
import boards from "../../css/boards.css";
const BoardCard = ({board}) => {
    var background = './color.svg';
    const navigate = useNavigate();
    const [projid, setProjId] = useState('');
    const [boardBck, setBoardBck] = useState('./../' + (board.background ? board.background : 'bck4') + '.svg');
    return (
        <div className="px-2 mx-5 my-5 col-lg-2 col-md-8 justify-content-center" key={board._id}>
            <Card className="text-white card-board bg-dark">
                <Card.Img src={boardBck} alt="Card image" className="card-img" />
                <Card.ImgOverlay>
                    <Card.Title className="card-title-board">{board.title}</Card.Title>
                    {/*<Card.Text>*/}
                    {/*    This is a wider card with supporting text below as a natural lead-in*/}
                    {/*    to additional content. This content is a little bit longer.*/}
                    {/*</Card.Text>*/}
                    {/*<Card.Text>Last updated 3 mins ago</Card.Text>*/}
                </Card.ImgOverlay>
            </Card>
        </div>
    );
};

export default BoardCard;