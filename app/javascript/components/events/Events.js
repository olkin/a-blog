import React, {useEffect, useState} from 'react';
import axios from "axios";
import Event from "./Event";

function EventsList({events}) {
    return (
        <>
        <h1>Upcoming volleyball events</h1>
            {events.map((event) =>
                <Event key={event.id}
                       event={event}
                />
            )}
        </>
    );
}

function Events() {
    const [eventsState, setEventsState] = useState({events: [], loading: null});

    const loadEvents = () => {
        axios.get('/api/v1/events',
            { withCredentials: true }
        ).then(response => {
            setEventsState({loading: false, events: response.data});
        }).catch(error => {
            console.log("events error", error)
        })
    }

    useEffect(() => {
        setEventsState({...eventsState, loading: true});
        loadEvents();
    }, [setEventsState]);

    if (eventsState.loading == null || eventsState.loading) return <>Loading...</>;
    if (eventsState.events.length === 0) return <>No upcoming events</>;
    return <EventsList events={eventsState.events}/>;
}

export default Events;