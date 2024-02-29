import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
// import styles from "../css/homepage.css";
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
        <div className="h-100">
            <Sidemenu projects={projects} setProjects={setProjects}/>
            <Projects projects={projects}/>
        </div>
    );
};

export default Home;