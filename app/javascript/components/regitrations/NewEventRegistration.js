import React, {useEffect, useState} from 'react'
import EventRegistrationForm from "./EventRegistrationForm";

function NewEventRegistration(props) {
    const eventUrl = `/api/v1/events/${props.match.params.id}`;
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(eventUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => setEvent(response))
        // .catch(() => this.props.history.push("/"));
    }, []);

    return (
        <div>
            <h1>Registration Info</h1>
            {event
                ? <EventRegistrationForm event={event}/>
                : <>Loading...</>
            }

        </div>
    )
}

export default NewEventRegistration