import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "../../css/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProjectCard from "../ProjectCard";

const CreateProject = ({projects, setProjects, isVisible, setIsVisible}) => {
    // console.log(val)
    console.log(isVisible)
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    var token = localStorage.getItem("token");

    // const [isVisible, setIsVisible] = useState(false);

    const [projectData, setProject] = useState({
        title: "",
        image: ""
    });
    const onChange = (e) => {
        setProject({...projectData, [e.target.name]: e.target.value});
    };
    const handleCreate = () => {
       // val = false;
        setIsVisible(!isVisible);
        // if (isVisibleBoard === true)
        //     setIsVisibleBoard(!isVisibleBoard);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8001/api/projects", projectData, {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                // console.log(projects)
                // console.log(res.data)
                // setProject({
                //     title: "",
                //     image: ""
                // });
               // projects.append(res.data.project);
            //    console.log([...projects, res.data.project])
                setProjects([...projects, res.data.project]);
                // console.log(projects)
                handleCreate();
            })
            .catch((err) => {
                console.log("Error in Create project!");
            });
    };


    const [image, setImage] = useState('./bck4.svg')

    const onImageChange = async (e) => {
        // if (event.target.files && event.target.files[0]) {

        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64)
        setImage(base64);
        setProject({...projectData, image: base64});
        //  }
    }
    const [style, setStyle] = useState({display: 'none'});

    return (
        <section
            className={isVisible ? 'create_project_visible section_setting' : 'create_project_hidden section_setting'}
            style={styles.section_setting}>
            <div className="section_header row" style={styles.section_header}>
                <div className=" justify-content-center">Create a project</div>
            </div>
            {/*<div className="row">*/}
            {/*    <div className="col-xs-12">Name of Section</div>*/}
            {/*</div>*/}
            <form className="form-create-project" onSubmit={onSubmit}>
                <div className="form-group justify-content-center row py-4"
                >
                    {/*{boardBck + " background-div"}*/}
                    <div className="select-img"
                         onMouseEnter={e => {
                             setStyle({display: 'block'});
                         }}
                         onMouseLeave={e => {
                             setStyle({display: 'none'})
                         }}>
                        <img className="background-div-img" src={image} onChange={onImageChange}/>

                        {/*<img src="./bck1.svg"/>*/}
                        {/*</img>*/}
                        <input type="file" onChange={onImageChange} className="filetype input-select"/>
                        <span className="change-img" style={style}>Change Image</span></div>
                </div>
                <div className="form-group">
                    <label htmlFor="titleOfProject">Project title</label>
                    <input type="text" className="form-control" id="titleOfProject"
                           placeholder="" value={projectData.title} name="title"
                           onChange={onChange}/>
                </div>
                <button type="submit" className="btn create-project-btn btn-sm">Create</button>
            </form>
        </section>
    );
};

export default CreateProject;

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}