import React, {useState} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import axios from "axios";
import styles from "../../css/boards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Dropdown} from "react-bootstrap";
import Modal from './ModalBoard';

const SidemenuBoards = ({board, setBoard, project, selected, createBoard, setCreateBoard}) => {
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [isVisibleBoard, setIsVisibleBoard] = useState(false);
    const handleCreateBoard = () => {
        if (createBoard && isVisibleBoard)
        {
            setCreateBoard(!createBoard);
            setIsVisibleBoard(!isVisibleBoard);
        }
        else if (!createBoard && isVisibleBoard)
                setIsVisibleBoard(!isVisibleBoard);
            else if (createBoard && !isVisibleBoard)
            setCreateBoard(!createBoard);
        else if (!createBoard && !isVisibleBoard)
            setCreateBoard(!createBoard);
    }
    const [boardData, setBoards] = useState({  //board data
        title: "",
        idProject: project._id,
        background: ""
    });
    const onChangeBck = (e) => {
        setBoards({...boardData, 'background': e});
        setBoardBck(e)//set values for board form
    };
    const onChangeBoard = (e) => {
        setBoards({...boardData, [e.target.name]: e.target.value});   //set values for board form
    };
    const approveDelete = (value) => {
        if (value === 1) {
            confirmedDelete();
        }
    };
    const confirmedDelete = () => {
        axios.delete(`http://localhost:8001/api/boards/${selected}`)
            .then((res) => {
                setBoard([...board.filter(function (tsk) {
                    return tsk._id !== selected
                })]);
                let length = board.length - 2;
                navigate(`/${project._id}/${board[length].title}`, {state: board[length]});
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    }
    const [selectedItem, setSelectedItem] = useState('');
    const dropdowndel = (e) => {

        if (e === '0') {
            setShow(true);
        }
    };
    const [dotsStyle, setDotsStyle] = useState('');

    const boardList =
        board !== 'undefined' && board.length === 0
            ? <a style={{paddingLeft: '20px'}}>No boards.</a>
            : board.map((b, k) => <Link to={{
                pathname: `/${project._id}/${b.title}`
            }} state={b} key={b._id} className="row"
                                        onMouseEnter={e => {
                                            setDotsStyle(b._id);
                                        }}
                                        onMouseLeave={e => {
                                            setDotsStyle('')
                                        }}> <a
                className={selected && b._id === selected ? "active nav-link link-dark1" : "nav-link link-dark1"}
                key={b._id} style={{paddingLeft: '30px'}}
            >
                {b.title} </a>
                <Dropdown onSelect={dropdowndel} onClick={() => setSelectedItem(b.title)}>
                    <Dropdown.Toggle tag="text" id="dropdown-autoclose-true"
                                     className={b._id === dotsStyle || (selected && b._id === selected) ? ' display-dots settings-btn-sidemenu' : 'not-display-dots settings-btn-sidemenu'}
                                     size="sm"
                    >
                        <span className="settings-dot"></span>
                        <span className="settings-dot"></span>
                        <span className="settings-dot"></span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-status">
                        <Dropdown.Item eventKey="0">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Link>);
    // const boardList1 =
    //     board !== 'undefined' && board.length === 0
    //         ? 'there are no projects!'
    //         : board.map((b, k) =>console.log(b));
    const [boardBck, setBoardBck] = useState('bck1');


    const onSubmitBoard = (e) => {
        e.preventDefault();
        console.log(boardData)
        axios
            .post("http://localhost:8001/api/boards", boardData)
            .then((res) => {
                setBoards({
                    title: "",
                    idProject: project._id,
                    background: ""
                });
                console.log(res.data.board)
                setBoard([...board, res.data.board]);
                setIsVisibleBoard(!isVisibleBoard);
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };
    const projectListSelect = <option key={project._id} value={project._id}>{project.title}</option>;
    return (
        <div className="p-3 bg-light sidebar_dsh h-100  px-3 position-fixed"
        >
            <button className="btn btn-lg text-center button-d" onClick={() => navigate(-1)}><span>Back</span>
            </button>
            <Modal approveDelete={approveDelete} boardName={selectedItem} show={show} setShow={setShow}/>
            <a href="/"
               className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark1 text-decoration-none header-sidemenu">
                <img className="img-style-board" src={project.image ? project.image : '/bck5.svg'}/>
                {project.title}

            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                {/*<li className="nav-item">*/}
                {/*    <a className={(active === 0 ? 'active ' : 'null ') + "nav-link link-dark1"}*/}
                {/*       onClick={() => setActive(0)}>*/}
                {/*        <svg className="bi me-2" width="16" height="16">*/}
                {/*        </svg>*/}
                {/*        Home*/}
                {/*    </a>*/}
                {/*</li>*/}
                <li>
                    <a className="nav-link link-dark1" onClick={handleCreateBoard}>
                        <svg className="bi me-2" width="16" height="16">
                        </svg>
                        Create board
                    </a>
                    <section
                        className={isVisibleBoard || createBoard ? 'create_project_visible section_board' : 'create_project_hidden section_board'}
                        style={styles.section_setting}>
                        <div className="section_header justify-content-center" style={styles.section_header}>
                            <div className="">Create board</div>
                        </div>
                        <form className="form-create-board" onSubmit={onSubmitBoard}>
                            <div className="form-group row justify-content-center">
                                <div className={boardBck + " background-div"} value={boardBck}>
                                    {/*<img src="./bck1.svg"/>*/}
                                </div>
                                <a className="row bck-title">Background</a>
                                <ul className="ul-little-div">
                                    <li className="li-little-div" onClick={() => onChangeBck('bck2')}>
                                        <a className="little-bck-div bck2"></a>
                                    </li>
                                    <li className="li-little-div" onClick={() => onChangeBck('bck3')}>
                                        <a className="little-bck-div bck3"></a>
                                    </li>
                                    <li className="li-little-div" onClick={() => onChangeBck('bck4')}>
                                        <a className="little-bck-div bck4"></a>
                                    </li>
                                    <li className="li-little-div" onClick={() => onChangeBck('bck5')}>
                                        <a className="little-bck-div bck5"></a>
                                    </li>
                                    <li className="li-little-div" onClick={() => onChangeBck('bck6')}>
                                        <a className="little-bck-div bck6"></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="form-group">
                                <label htmlFor="titleOfProject">Board title</label>
                                <input type="text" className="form-control" id="titleOfProject"
                                       placeholder="" value={boardData.title} name="title"
                                       onChange={onChangeBoard}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectProject">Project</label>
                                <input className="form-select" name="idProject" id="selectProject"
                                       onChange={onChangeBoard} value={project.title}>
                                    {/*{projectListSelect}*/}
                                </input>
                            </div>
                            <button type="submit" className="btn create-project-btn btn-sm">Create</button>
                        </form>
                    </section>
                </li>
                <hr/>
                {/*<hr/>*/}
                <a
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark1 text-decoration-none"
                    style={{
                        fontWeight: '700',
                        paddingLeft: '10px', paddingBottom: '10px'
                    }}>
                    {/*<img className="header-logo" src="/myprojects.svg"/>*/}
                    My Boards
                </a>
                <ul className="nav nav-pills flex-column mb-auto text-decoration-none">
                    {/*{board}*/}
                    {boardList}
                </ul>
            </ul>

        </div>
    );
};

export default SidemenuBoards;
