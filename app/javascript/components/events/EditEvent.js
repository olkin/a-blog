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

    const onSubmit = (event) => {
        const {name, info, start_date, format, tiers} = event;

        if (name.length === 0)
            return;

        const jsonBody = {
            name,
            info,
            start_date,
            format,
            tiers
        };

        axios.put(
            eventUrl,
            { event: jsonBody },
            { withCredentials: true }
        ).then(() => {
            props.history.push(`/`);
        }).catch(error => {
            console.log("login error", error)
        })

        //const token = document.querySelector('meta[name="csrf-token"]').content;
        //     headers: {
        //         "X-CSRF-Token": token,
        //         "Content-Type": "application/json"
        //     },
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