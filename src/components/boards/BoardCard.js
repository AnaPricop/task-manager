import React, {useEffect, useState, useRef} from 'react';
import {useNavigate, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Card from 'react-bootstrap/Card';
import styles from "../../css/dashboard.css";
import boards from "../../css/boards.css";
const BoardCard = ({board, project}) => {
    var background = './color.svg';
    const navigate = useNavigate();
    const [projid, setProjId] = useState('');
    const [boardBck, setBoardBck] = useState('./../' + (board.background ? board.background : 'bck4') + '.svg');
    //
    // const handleNext = () => {
    //    // navigate(`/${project._id}/${board._id}`);
    //     history.push(`/${project._id}/${board.title}`, { data });
    // }

    return (
        <div className="px-2 mx-5 my-5 col-lg-2 col-md-8 justify-content-center" key={board._id}>
            <Link  to={{
                pathname: `/${project._id}/${board.title}`
            }}  state={board}>
            <Card className=" card-board" >
                <Card.Img src={boardBck} alt="Card image" className="card-img" />
                <Card.ImgOverlay>
                    <Card.Title className="card-title-board">{board.title}</Card.Title>
                    {/*<Card.Text>*/}
                    {/*    This is a wider card with supporting text below as a natural lead-in*/}
                    {/*    to additional content. This content is a little bit longer.*/}
                    {/*</Card.Text>*/}
                    {/*<Card.Text>Last updated 3 mins ago</Card.Text>*/}
                </Card.ImgOverlay>
            </Card></Link>
        </div>
    );
};

export default BoardCard;