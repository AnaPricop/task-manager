import React, {useState} from "react";
// import axios from "axios";
// import {Link} from "react-router-dom";
// import styles from "../css/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidemenu from './Sidemenu';

const Dashboard = () => {

    return (
        <div className="h-100">
            <Sidemenu />
        </div>
    );
};

export default Dashboard;