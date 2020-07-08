import React, {useState, useEffect} from 'react';
import axios from "axios";
import EventDetails from "./EventDetails";

import '../../styles/EventRegistrations.scss'

function EventRegistrations(props) {
    const [registrationsState, setRegistrationsState] = useState({loading: null, registrations: []});

    const registrationsUrl = `/api/v1/events/${props.event.id}/registrations`

    useEffect(() => {
        if (props.show && registrationsState.loading == null) {
            setRegistrationsState({...registrationsState, loading: true});
            loadRegistrations();
        }
    });

    const loadRegistrations = () => {
        axios.get(registrationsUrl,
            {withCredentials: true}
        ).then(response => {
            setRegistrationsState({loading: false, registrations: response.data});
        }).catch(error => {
            console.log("registrations error", error)
        })
    }

    const detailsClass = () => props.show ? 'expanded' : 'expand'
    const isLoading = () => registrationsState.loading == null || registrationsState.loading

    return (
        <div className={`event-card__registrations ${detailsClass()}`}>
            {
                isLoading()
                    ? <>Loading...</>
                    : <EventDetails registrations={registrationsState.registrations} />
            }

        </div>
    )
}

export default EventRegistrations;