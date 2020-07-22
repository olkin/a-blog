import React, {useContext} from 'react';
import userContext from "../userContext";

import '../../styles/GlobalStyles.scss'
import axios from "axios";

function EventActions(props) {
    const userInfo = useContext(userContext);

    const eventsUrls = {
        registerTeams: `/api/v1/events/${props.match.params.id}/register_all`
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
        <div onClick={registerAllTeams} className="button button--with-icon">
            <i className="fas fa-users"></i>Registrations -> Teams
        </div>
    );
}

export default EventActions;