import React, {useEffect, useState, useRef} from 'react';
import Link from 'react';

const Boards = (props) => {
    return
    (
        <div>
<Link to={`/${props.name}`}>
        {props.name} {props.category} {props.image} {props.description}
    </Link>
        </div>
    );
};
export default Boards;