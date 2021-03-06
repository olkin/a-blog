import React, {useState, useEffect} from "react";
import EventForm from "./EventForm";
import axios from "axios";

function EditEvent(props) {
    const [event, setEvent] = useState(null);
    const eventUrl = `/api/v1/events/${props.match.params.id}`;

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

    const onSubmit = (eventParams) => {
        axios.put(
            eventUrl,
            { event: eventParams },
            { withCredentials: true }
        ).then(() => {
            props.history.push(`/`);
        }).catch(error => {
            console.log("login error", error)
        })
    }

    return (
        <div>
            <h1>Edit Event</h1>
            { event
                ? <EventForm
                    onFormSubmit={onSubmit}
                    event={event}
                />
                : <></>
            }
        </div>
    );
}

export default EditEvent;