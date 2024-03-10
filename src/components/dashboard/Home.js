import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
 import styles from "../../css/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidemenu from './Sidemenu';
import Projects from '../ShowProjects';
import ProjectCard from "../ProjectCard";
import CreateProject from "./CreateProject";


const Home = () => {
    const [projects, setProjects] = useState([]);
    var token = localStorage.getItem("token");
    useEffect(() => {
        axios
            .get('http://localhost:8001/api/projects', { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                console.log(res.data);
                setProjects(res.data);
            })
            .catch((err) => {
                console.log('Error from Projectslist');
            });
    }, []);

    return (
        <div className="bck-pr d-flex flex-row-reverse">
            {/*<div className="col-2">*/}
            {/*<Sidemenu projects={projects} setProjects={setProjects} style={{zIndex: 1000}}>*/}
            {/*    /!*<CreateProject/>*!/*/}
            {/*</Sidemenu>*/}
            {/*</div>*/}
            <div className="col-10
             col-sm-11 my-3 proj-list-margin" style={{paddingLeft: '210px', overflowX: 'hidden'}}>
            <Projects projects={projects} setProjects={setProjects} style={{zIndex: 500}}/>
            </div>
            <div className="col">
                <Sidemenu projects={projects} setProjects={setProjects} style={{zIndex: 1000}}>
                    {/*<CreateProject/>*/}
                </Sidemenu>
            </div>
        </div>
    );
};

export default Home;