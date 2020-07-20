import React, {useState, useEffect} from 'react';
import axios from "axios";
import EventDetails from "./EventDetails";

import '../../styles/EventRegistrations.scss'

function EventRegistrations(props) {
    const [registrationsState, setRegistrationsState] = useState({loading: null, registrations: []});
    const [detailsVisible, setDetailsVisible] = useState(false);

    const registrationsUrl = `/api/v1/events/${props.event.id}/registrations`

    useEffect(() => {
        if (detailsVisible && registrationsState.loading == null) {
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

    const detailsClass = (detailsVisible) => detailsVisible ? 'visible' : 'hidden'
    const isLoading = () => registrationsState.loading == null || registrationsState.loading
    const showDetails = () => setDetailsVisible(true);

    return (
        <>
            <span className={`details-title event-card__registration-toggler button hollow ${detailsClass(!detailsVisible)}`}
                  onClick={showDetails}>
                More info
            </span>
            <div className={`event-card__registrations ${detailsClass(detailsVisible)}`}>
                {
                    isLoading()
                        ? <>Loading...</>
                        : <EventDetails registrations={registrationsState.registrations} />
                }

            </div>
        </>
    )
}

export default EventRegistrations;