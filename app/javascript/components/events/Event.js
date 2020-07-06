import React, {useContext} from 'react';
import '../../styles/Event.scss'
import Avatar from "react-avatar";
import userContext from "../userContext";
import {Link} from "react-router-dom";
import axios from "axios";
import {EVENT_FORMATS, EVENT_TIERS} from "../constants/EventConstants";

function Event(props) {
    const formattedDate = new Intl.DateTimeFormat('en',
        {weekday: 'short', month: 'short', day: '2-digit', timeZone: 'UTC'})
        .format(new Date(props.event.start_date));

    const userInfo = useContext(userContext);
    const canUpdate = () => userInfo.user.id === props.event.user_id;

    const urls = {
        destroy: `/api/v1/events/${props.event.id}`,
        edit: `/events/${props.event.id}/edit`
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

    return (
        <div className="event-card">
            <div className={`event-card__header event-card__header--${props.event.format} icon icon-${props.event.format}`}>
                <div className="grid-x">
                    <div className="cell medium-12">
                        <h4 className="event-card__subtitle">
                            {eventSubtitle}
                        </h4>
                        {canUpdate()
                            ? <div className='available-actions'>
                        <span>
                            <Link to={urls.edit}>
                                <i className="fa fa-edit"/>
                        </Link>
                        </span>
                                <span>
                        <a onClick={deleteEvent}>
                             <i className="fa fa-trash"/>
                        </a>
                        </span>
                            </div>

                            : <></>
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
                                    <span>Tiers: </span>{availableTiersDisplay()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Event;