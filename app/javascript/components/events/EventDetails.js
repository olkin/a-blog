import React from 'react';
import {EVENT_TIERS} from "../constants/EventConstants";
import '../../styles/EventDetails.scss'

function EventDetails({registrations}) {
    const grouppedRegistrations = registrations.reduce((obj, registration) => {
        obj[registration.tier] = [...obj[registration.tier] || [], registration];
        return obj;
    }, {});

    const registrationsList = registrations => {
        return <ol>
            {registrations.map(registration => <li key={registration.id}>
                {registration.players.join('/')}
            </li>)}
        </ol>
    }

    return <div className='registration-groups'>
        {Object.keys(grouppedRegistrations).length > 0
            ? Object.entries(grouppedRegistrations).map(([tier, registrations])=> {
            return<div key={tier}>
                <span>{EVENT_TIERS[tier] || 'Unknown'}</span>
                {registrationsList(registrations)}
            </div>
        })
            : 'Nobody registered yet :( Be the first one!'
        }
    </div>
}

export default EventDetails;