import React from 'react';
import {EVENT_TIERS} from "../constants/EventConstants";

function EventDetails({registrations}) {
    const grouppedRegistrations = registrations.reduce((obj, registration) => {
        obj[registration.tier] = [...obj[registration.tier] || [], registration];
        return obj;
    }, {});

    const registrationsList = registrations => {
        return <ul>
            {registrations.map(registration => <li key={registration.id}>
                {registration.players.join('/')}
            </li>)}
        </ul>
    }

    return <div>
        {Object.entries(grouppedRegistrations).map(([tier, registrations])=> {
            return<div key={tier}>
                {EVENT_TIERS[tier] || 'Unknown'}
                {registrationsList(registrations)}
            </div>
        })}
    </div>
}

export default EventDetails;