import React from 'react';
import {EVENT_TIERS} from "../constants/EventConstants";

function EventDetails({registrations}) {
    return <div>
        {registrations.map(registration => {
            return (
                <ul key={registration.id}>
                    <li>{EVENT_TIERS[registration.tier] || 'N/A'}: {registration.players.join('/')}</li>
                </ul>
            )})}
    </div>
}

export default EventDetails;