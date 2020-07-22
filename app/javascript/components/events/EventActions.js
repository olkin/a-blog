import React, {useContext} from 'react';
import userContext from "../userContext";
import axios from "axios";
import {Link} from "react-router-dom";

import '../../styles/GlobalStyles.scss'

function EventActions(props) {
    const userInfo = useContext(userContext);

    const eventsUrls = {
        registerTeams: `/api/v1/events/${props.match.params.id}/accept_all`,
        manageTeams: `/api/v1/events/${props.match.params.id}/teams`
    };

    const registerAllTeams = (e) => {
        e.preventDefault()
        axios.post(
            eventsUrls.registerTeams,
            {},
            {withCredentials: true}
        ).then(response => {
            console.log("Registration success:", response.data.message)
        }).catch(error => {
            console.log("register teams error", error)
        })
    }

    if (!userInfo.user.email) return <></>;
    return (
        <>
            <div onClick={registerAllTeams} className="button button--with-icon">
                <i className="fas fa-users"></i>Registrations -> Teams
            </div>
            <div>
                <Link to={eventsUrls.manageTeams} className="button hollow button--with-icon">
                    Manage teams
                </Link>
            </div>
        </>
    );
}

export default EventActions;