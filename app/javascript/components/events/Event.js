import React, {useContext, useState} from 'react';
import Avatar from "react-avatar";
import userContext from "../userContext";
import {Link} from "react-router-dom";
import axios from "axios";
import {EVENT_FORMATS, EVENT_TIERS} from "../constants/EventConstants";
import EventDetails from "./EventDetails";
import EventEditActions from './EventEditActions'

import '../../styles/Event.scss'

function Event(props) {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [registrationsState, setRegistrationsState] = useState({loading: null, registrations: []});

    const formattedDate = new Intl.DateTimeFormat('en',
        {weekday: 'short', month: 'short', day: '2-digit', timeZone: 'UTC'})
        .format(new Date(props.event.start_date));

    const userInfo = useContext(userContext);
    const canUpdate = () => userInfo.user.id === props.event.user_id;

    const urls = {
        destroy: `/api/v1/events/${props.event.id}`,
        edit: `/events/${props.event.id}/edit`,
        register: `/events/${props.event.id}/register`,
        registrations: `/api/v1/events/${props.event.id}/registrations`
    }

    const loadRegistrations = () => {
        axios.get(urls.registrations,
            {withCredentials: true}
        ).then(response => {
            setRegistrationsState({loading: false, registrations: response.data});
        }).catch(error => {
            console.log("registrations error", error)
        })
    }

    const deleteEvent = () => {
        //const token = document.querySelector('meta[name="csrf-token"]').content;
        axios.delete(
            urls.destroy,
            {withCredentials: true}
        ).then(() => {
            props.onEventDeleted(props.event.id);
        }).catch(error => {
            console.log("login error", error)
        })
    }

    const availableTiersDisplay = () => {
        const availableTiers = props.event.tiers || [];
        return availableTiers.length > 0
            ? availableTiers.map(tier => EVENT_TIERS[tier] || 'Unknown').join(', ')
            : 'N/A'
    }

    const eventSubtitle =  props.event.format
        ? `${EVENT_FORMATS[props.event.format]} volleyball`|| 'Volleyball event'
        : 'Volleyball event'

    const detailsClass = () => detailsVisible ? '' : 'hidden'
    const expandRegistrationClass = () => detailsVisible ? 'expanded' : 'expand'

    const toggleDetails = () => {
        registrationsState.loading == null && loadRegistrations();
        setDetailsVisible(!detailsVisible);
    }

    return (
        <div className={`event-card event-card--${props.event.format}`}>
            <div className={`event-card__header icon icon-${props.event.format}`}>
                <div className="grid-x">
                    <div className="cell medium-12">
                        <h4 className="event-card__subtitle">
                            {eventSubtitle}
                        </h4>
                        {canUpdate() &&
                        <EventEditActions
                            editUrl={urls.edit}
                            deleteEvent={deleteEvent}
                        />
                        }
                    </div>
                </div>
            </div>

            <div className="event-card__details">
                <h6 className='event-card__date-range'>{formattedDate}</h6>
                <div className="grid-x">
                    <div className='cell small-12 medium-9 event-card__content'>
                        <div className="grid-x">
                            <div className="cell small-4 medium-2">
                                <Avatar className="event-card__image" size={50} name={props.event.user.email}/>
                            </div>
                            <div className="cell small-8 medium-10">
                                <h6 className="event-card__title">{props.event.name}</h6>
                                <p>{props.event.info}</p>
                                <div className='event__details'>
                                    <div>
                                        <span className='details-title'>Tiers: </span>{availableTiersDisplay()}
                                    </div>

                                    <div>
                                        <span className={`details-title event-card__registration-toggler icon icon-${expandRegistrationClass()}`}
                                              onClick={toggleDetails}>
                                            Registrations
                                        </span>

                                        <div className={`event-card__registrations ${detailsClass()}`}>
                                            {
                                                registrationsState.loading == null || registrationsState.loading
                                                    ? <>Loading...</>
                                                    : <EventDetails registrations={registrationsState.registrations} />
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cell small-12 medium-3 columns event-card__actions">
                        <Link to={urls.register} className="button primary">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Event;