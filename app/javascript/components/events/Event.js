import React from 'react';
import '../../styles/Event.scss'

function Event(props) {
    return (
        <div className="event-card">
            <div className="event-card__header icon beach-icon">
                <div className="grid-x">
                    <div className="cell medium-12">
                        <h4 className="event-card__subtitle">
                            Tournament
                        </h4>
                    </div>
                </div>
            </div>
            <div className="event-card__details">
                <h6 className='event-card__date-range'>{props.event.start_date.toString()}</h6>
                <div className="grid-x">
                    <div className='cell small-12 medium-9 event-card__content'>
                        <h6 className="event-card__title">{props.event.name}</h6>
                        <p>{props.event.info}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Event;