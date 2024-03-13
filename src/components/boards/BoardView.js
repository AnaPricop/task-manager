import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";



const BoardView = ({board, project}) => {
console.log(board, project)
//     var token = localStorage.getItem("token");
// const [board, setBoard] = useState();
//     useEffect(() => {
//         axios
//             .get('http://localhost:8001/api/boards/'+ project._id, { headers: {"Authorization" : `Bearer ${token}`} })
//             .then((res) => {
//                 console.log(res.data);
//                 setBoard(res.data);
//             })
//             .catch((err) => {
//                 console.log('Error from Projectslist');
//             });
//     }, []);
    return (
        <div>
            <h2>dsojkpfsldf </h2>
        </div>
    );
};

export default BoardView;