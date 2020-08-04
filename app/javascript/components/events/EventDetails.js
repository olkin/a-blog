import React, {useContext} from 'react';
import {EVENT_TIERS} from "../constants/EventConstants";

import '../../styles/EventDetails.scss'
import axios from "axios";
import userContext from "../userContext";

function EventDetails({registrations, event}) {
    const grouppedRegistrations = registrations.reduce((obj, registration) => {
        obj[registration.tier] = [...obj[registration.tier] || [], registration];
        return obj;
    }, {});

    const acceptAllUrl = `/api/v1/events/${event.id}/accept_all`

    const userInfo = useContext(userContext);
    const canAdmin = () => userInfo.user.email.length > 0;

    const acceptAll = () => {
        axios.post(acceptAllUrl,
            {withCredentials: true}
        ).then(response => {
            console.log("accept all success", response)
        }).catch(error => {
            console.log("accept all error", error)
        })
    }

    const registrationsList = registrations => {
         return (
             <ol>
                 {registrations.map(registration => {
                     return (
                         <li key={registration.id}>
                             {registration.players.join('/')}
                         </li>
                     )
                 })}
             </ol>
         )
    }

    return <>
        <h4>Registrations</h4>
        <div className='registration-groups'>
            {Object.keys(grouppedRegistrations).length > 0
                ? Object.entries(grouppedRegistrations).map(([tier, registrations]) => {
                    return <div key={tier}>
                        <span>{EVENT_TIERS[tier] || 'Unknown'}</span>
                        {registrationsList(registrations)}
                    </div>
                })
                : 'Nobody registered yet :( Be the first one!'
            }
        </div>

        {canAdmin()
            ?
            <div className="button secondary" onClick={acceptAll}>
                Accept All
            </div>
            : <></>
        }
    </>
}

export default EventDetails;