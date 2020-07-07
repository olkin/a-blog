import React from 'react'
import EventRegistrationForm from "./EventRegistrationForm";

function NewEventRegistration(props) {
    return (
        <div>
            <h1>Registration Info</h1>
            <EventRegistrationForm
                event={props.event}
            />
        </div>
    )
}

export default NewEventRegistration