import React from "react";
import EventForm from "./EventForm";
import axios from "axios";

function NewEvent(props) {
    const eventsUrl = '/api/v1/events';
    
    const onSubmit = (event) => {
        const {name, info, start_date} = event;

        if (name.length === 0)
            return;

        const jsonBody = {
            name,
            info,
            start_date
        };

        axios.post(
            eventsUrl,
            {event: jsonBody},
            {withCredentials: true}
        ).then(() => {
            props.history.push(`/`);
        }).catch(error => {
            console.log("create error", error)
        })
    }

    return (
        <div>
            <h1>Add new Event</h1>
            <EventForm
                onFormSubmit={onSubmit}
            />
        </div>
    );
}

export default NewEvent;