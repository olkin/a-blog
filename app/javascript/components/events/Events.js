import React, {useEffect, useState} from 'react';
import axios from "axios";
import Event from "./Event";

function EventsList({events, onEventDeleted}) {
    return (
        <>
        <h2>Events</h2>
        {events.map((event) =>
            <Event key={event.id}
                   event={event}
                   onEventDeleted={onEventDeleted}
            />
        )}
        </>
    );
}

function Events() {
    const [eventsState, setEventsState] = useState({events: [], loading: null});

    const onEventDeleted = (event_id) => {
        const newEvents = eventsState.events.filter(event => event.id !== event_id);
        setEventsState({...eventsState, events: newEvents});
    };

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
    return <EventsList events={eventsState.events} onEventDeleted={onEventDeleted}/>;
}

export default Events;