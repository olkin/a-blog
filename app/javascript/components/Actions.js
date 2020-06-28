import React, {useContext} from 'react';
import userContext from "./userContext";
import {Link} from "react-router-dom";

function Actions() {
    const userInfo = useContext(userContext);

    if (!userInfo.user.email) return <></>;
    return (
        <Link to='/events/new' className="button button--with-icon">
            <i className="far fa-calendar-plus"></i>Add event</Link>
    );
}

export default Actions;