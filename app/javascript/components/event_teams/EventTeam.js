import React from 'react';

function EventTeam(props) {
    return <div>
        {props.team.reference} {props.team.registration.players.join('/')}
    </div>;
}

export default EventTeam;