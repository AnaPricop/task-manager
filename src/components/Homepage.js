import React, {useState} from "react";
import axios from "axios";
 import {Link} from "react-router-dom";
import styles from "../css/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from './Navbar';

const Login = () => {
    const [data, setData] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8001/api/auth";
            const {data: res} = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div>
        <Navbar />
            <h1 className="align_center" style={styles.align_center}> Let's get started!</h1>
        </div>
    //     <div className='list'>{bookList}</div>
    // <div className="h1"></div>
         // <h1> Let's get started!</h1>
    );
};

export default Login;