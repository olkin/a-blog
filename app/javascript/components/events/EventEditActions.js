import React from 'react';
import {Link} from "react-router-dom";

import '../../styles/EventEditActions.scss'

function EventEditActions({editUrl, deleteEvent}) {
    return (
        <div className='available-actions'>
            <span>
                <Link to={editUrl}>
                    <i className="fa fa-edit"/>
                </Link>
            </span>
            <span>
                <a onClick={deleteEvent}>
                    <i className="fa fa-trash"/>
                </a>
            </span>
        </div>
    )
}

export default EventEditActions;
