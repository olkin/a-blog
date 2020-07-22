import React, {useContext} from 'react';
import userContext from "../userContext";

import '../../styles/GlobalStyles.scss'
import axios from "axios";

function EventActions(props) {
    const userInfo = useContext(userContext);

    const eventsUrls = {
        registerTeams: `/api/v1/events/${props.match.params.id}/register_all`
    };

    const registerAllTeams = () => {
        axios.post(
            eventsUrls.registerTeams,
            {},
            {withCredentials: true}
        ).then(() => {
            props.history.push(`/`);
        }).catch(error => {
            console.log("create error", error)
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