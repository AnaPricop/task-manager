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


const LabelColors = ({show, task, tasks, setTasks, label, labels, setLabels, changeColor}) => {
    const [boardBck, setBoardBck] = useState('bck1');
    console.log(label, labels)
    const updateTask = async (e) => {
        // console.log(taskDescription, e)
        console.log(e)
        let upd_label = {subject: JSON.stringify(e)}
        await axios
            .put("http://localhost:8001/api/tasks/" + task._id, upd_label)
            .then((res) => {
                console.log(res.data.task)
                task.subject[0] = upd_label.subject;
                changeColor(upd_label);
                setLabels(e)
let index1;
                tasks.map((datum, index) => {
                    if (datum._id === task._id)
                        index1 = index;
                })
                console.log(index1)
                let newArr = [...tasks]; // copying the old datas array
                newArr[index1] = task;
                setTasks(newArr);
                console.log(newArr)
                // res.data.task.status = e;
                // task.description = taskDescription;
                // setSaveTask(!saveTask)
            })
            .catch((err) => {
                console.log("Error in update task!");
            });
    };
    const onChangeBck = (e) => {
        // setBoards({...boardData, 'background': e});
        setBoardBck(e);//set values for board form
        let label_new = [{
            title: label && label.title ? label.title : label,
            color: e
        }]
        let labelss = JSON.parse(labels);
        // for (var i in labelss) {
        //     if (labelss[i] === label_new[0].title) {
        //      console.log(labelss[i])
        //     }
        // }
        console.log(labelss)
        labelss.map(function (object, i) {
            console.log(object)
            if (object.title === label_new[0].title) {
                // console.log(label_new[0].color)
                object.color = label_new[0].color;
            }
        })
        updateTask(labelss);
        //  changeColor(label_new);

        //  setLabel(label_new);
    };
    const onSubmitBoard = (e) => {
        e.preventDefault();

    };
    return (
        <section
            className={show ? 'create_project_visible section_label' : 'create_project_hidden section_label'}
        >
            <form className="form-update-label" onSubmit={onSubmitBoard}>
                <div className="form-group ">
                    <ul className="ul-little-div-label ">
                        {/*<li className="li-little-div" onClick={() => onChangeBck('bck2')}>*/}
                        {/*    <a className="little-bck-label bck2"></a>*/}
                        {/*</li>*/}
                        {/*<li className="li-little-div" onClick={() => onChangeBck('bck3')}>*/}
                        {/*    <a className="little-bck-label bck3"></a>*/}
                        {/*</li>*/}
                        {/*<li className="li-little-div" onClick={() => onChangeBck('bck4')}>*/}
                        {/*    <a className="little-bck-label bck4"></a>*/}
                        {/*</li>*/}
                        {/*<li className="li-little-div" onClick={() => onChangeBck('bck5')}>*/}
                        {/*    <a className="little-bck-label bck5"></a>*/}
                        {/*</li>*/}
                        {/*<li className="li-little-div" onClick={() => onChangeBck('bck6')}>*/}
                        {/*    <a className="little-bck-label bck6"></a>*/}
                        {/*</li>*/}
                        {(() => {
                            const arr = [];
                            for (let j = 0; j < 3; j++) {
                                // const arr2 = [];
                                // arr2.push();
                                for (let i = 1; i <= 5; i++) {
                                    let name = 'col' + parseInt(i + 5*j);
                                    arr.push(
                                        // <div>
                                        //     <h1>{i}</h1>
                                        // </div>
                                        <li className="li-little-div col-2" onClick={() => onChangeBck(name)}>
                                            <a className={name + " little-bck-label"}></a>
                                        </li>
                                    );
                                }
                                // arr.push('\n');
                            }
                            return arr;
                        })()}
                    </ul>
                </div>
            </form>
        </section>
    );
};

export default LabelColors;