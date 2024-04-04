import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import styles1 from "../../css/dashboard.css";
import styles from "../../css/boards.css";
import styles2 from "../../css/tasks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import BoardCard from "./BoardCard";
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import Modal from "./ModalTask";


const LabelColors = ({show,  setShow, task, label}) => {
    const [boardBck, setBoardBck] = useState('bck1');
    console.log(label);

    const onChangeBck = (e) => {
        // setBoards({...boardData, 'background': e});
      setBoardBck(e)//set values for board form
    };
    const onSubmitBoard = (e) => {
        e.preventDefault();
        //console.log(boardData)
        // axios
        //     .post("http://localhost:8001/api/boards", boardData)
        //     .then((res) => {
        //         setBoards({
        //             title: "",
        //             idProject: project._id,
        //             background: ""
        //         });
        //         //   console.log(res.data.board)
        //         setBoard([...board, res.data.board]);
        //         console.log(isVisibleBoard, createBoard)
        //         setIsVisibleBoard(false);
        //         setCreateBoard(false);
        //     })
        //     .catch((err) => {
        //         console.log("Error in Create project!");
        //     });
    };
    return (
        <section
            className={show ? 'create_project_visible section_label' : 'create_project_hidden section_label'}
           >
            <form className="form-update-label" onSubmit={onSubmitBoard}>
                <div className="form-group row ">
                    {/*<div className={boardBck + " background-div"} value={boardBck}>*/}
                    {/*    /!*<img src="./bck1.svg"/>*!/*/}
                    {/*</div>*/}
                    <ul className="ul-little-div-label ">
                        <li className="li-little-div" onClick={() => onChangeBck('bck2')}>
                            <a className="little-bck-label bck2"></a>
                        </li>
                        <li className="li-little-div" onClick={() => onChangeBck('bck3')}>
                            <a className="little-bck-label bck3"></a>
                        </li>
                        <li className="li-little-div" onClick={() => onChangeBck('bck4')}>
                            <a className="little-bck-label bck4"></a>
                        </li>
                        <li className="li-little-div" onClick={() => onChangeBck('bck5')}>
                            <a className="little-bck-label bck5"></a>
                        </li>
                        <li className="li-little-div" onClick={() => onChangeBck('bck6')}>
                            <a className="little-bck-label bck6"></a>
                        </li>
                    </ul>
                </div>
            </form>
        </section>
    );
};

export default LabelColors;