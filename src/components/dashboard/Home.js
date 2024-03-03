import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
 import styles from "../../css/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidemenu from './Sidemenu';
import Projects from '../ShowProjects';
import ProjectCard from "../ProjectCard";

const Home = () => {
    const [projects, setProjects] = useState([]);
    var token = localStorage.getItem("token");
    useEffect(() => {
        axios
            .get('http://localhost:8001/api/projects', { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                setProjects(res.data);
            })
            .catch((err) => {
                console.log('Error from Projectslist');
            });
    }, []);

    // const projectList =
    //     projects.length === 0
    //         ? 'there are no projects!'
    //         : projects.map((project, k) => <Sidemenu project={project} key={k} />);
    return (
        <div className="bck-pr d-flex flex-row">
            <div className="col-2">
            <Sidemenu projects={projects} setProjects={setProjects}/>
            </div>
            <div className="col-10 proj-list-margin">
            <Projects projects={projects}/>
            </div>
        </div>
    );
};

export default Home;