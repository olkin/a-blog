import React, {useContext} from 'react';
import userContext from "../userContext";

import '../../styles/GlobalStyles.scss'

function EventActions(props) {
    const userInfo = useContext(userContext);

    const eventsUrl = {
        register_teams: `/api/v1/events/${props.match.params.id}/register_all`
    };

    const registerAllTeams = () => {
        console.log('Yeah!');
    }

    if (!userInfo.user.email) return <></>;
    return (
        <div onClick={registerAllTeams} className="button button--with-icon">
            <i className="fas fa-users"></i>Registrations -> Teams
        </div>
    );
}

export default EventActions;