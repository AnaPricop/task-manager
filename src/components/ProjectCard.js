import React from 'react';
import { Link } from 'react-router-dom';
// import googlebooks from '@googleapis/books';
import axios from 'axios';
import '../App.css';

const ProjectCard = ({project}) => {

    return (
        <div className='card-container row'>
            {/*<img*/}
            {/*    src={project.title}*/}
            {/*    alt='Project'*/}
            {/*    height={100}*/}
            {/*/>*/}
            <div className='desc'>
                <h5>
                    {/*<Link to={`/show-book/${book._id}`}>{book.Name}</Link>*/}
                    <a>{project.title}</a>
                </h5>
                {/*<h3>{book.Authors}</h3>*/}
                {/*<p>{book.Rating}</p>*/}
            </div>
        </div>

    );
};

export default ProjectCard;