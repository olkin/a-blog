import React, {useEffect, useState} from 'react'
import EventRegistrationForm from "./EventRegistrationForm";
import axios from "axios";

function NewEventRegistration(props) {
    const urls = {
        event: `/api/v1/events/${props.match.params.id}`,
        register: `/api/v1/events/${props.match.params.id}/registrations`
    };

    const [event, setEvent] = useState(null);

    const onSubmit = (registrationParams) => {
        axios.post(
            urls.register,
            {registration: registrationParams},
            {withCredentials: true}
        ).then(() => {
            props.history.push(`/`);
        }).catch(error => {
            console.log("create error", error)
        })
    }


    useEffect(() => {
        fetch(urls.event)
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
                ? <EventRegistrationForm
                    event={event}
                    onFormSubmit={onSubmit}
                />
                : <>Loading...</>
            }

        </div>
    )
}

export default NewEventRegistration