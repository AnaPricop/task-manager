import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
 import styles from "../../css/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidemenu from './Sidemenu';
import Projects from '../ShowProjects';
import Statistic from '../ShowStatistic';
import ProjectCard from "../ProjectCard";
import CreateProject from "./CreateProject";
import Loading from "../Loading";

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [info, setInfo] = useState({});
    const [status, setStatus] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    var token = localStorage.getItem("token");
    async function fetchData() {
        let res = await axios.get('http://localhost:8001/api/projects', { headers: {"Authorization" : `Bearer ${token}`} })
       // console.log(res.data);
        setProjects(res.data.projects);
        let information = {all: '', boards: '', done: '', inprogress: ''};
        information.all = res.data.all;
        information.boards = res.data.boards;
        information.done = res.data.done;
        information.inprogress = res.data.inprogress;
        information.alltasks = res.data.all_tsks;
        setInfo(information);
        setStatus(res.data.to_send);
        //  let arrids = [];
       //  for (let i of res.data.projects){
       //      for (let j of i.idBoards) {
       //          arrids.push(j);
       //      }
       //  }
       //  console.log(arrids)
       //  let idd = {ids: arrids, action: 'get'};
       // let res1 = await axios.post('http://localhost:8001/api/boards/', idd)
       //  console.log(res1.data)
        setIsLoading(false);
    }

    useEffect(() => {

        fetchData();
       // fetchDataStatus();
        console.log('i fire once');

    }, []);

    return (
        <div className="bck-pr d-flex flex-row-reverse">
            {isLoading ? (
                <Loading/>
            ) : ( <>
            <div className="col-10
             col-sm-11 my-3 proj-list-margin" style={{paddingLeft: '110px', overflowX: 'hidden'}}>
                <Statistic info={info}  style={{zIndex: 500}}/>
            <Projects projects={projects} setProjects={setProjects} style={{zIndex: 500}} info={info} setInfo={setInfo} status={status}/>
            </div>
            <div className="col">
                <Sidemenu projects={projects} setProjects={setProjects} information={info} setInfo={setInfo} style={{zIndex: 1000}}>
                    {/*<CreateProject/>*/}
                </Sidemenu>
            </div>
                </>
                )}
        </div>
    );
};

export default Home;