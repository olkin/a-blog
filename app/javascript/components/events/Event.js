import React from 'react';
import '../../styles/Event.scss'

function Event(props) {
    const formattedDate = new Intl.DateTimeFormat('en',
        { weekday: 'short', month: 'short', day: '2-digit' })
        .format(new Date(props.event.start_date));

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
                <h6 className='event-card__date-range'>{formattedDate}</h6>
                <div className="grid-x">
                    <div className='cell small-12 medium-9 event-card__content'>
                        <div className="grid-x">
                            <div className="cell small-4 medium-2">
                                {/*<img className="travel-feature-card-image"*/}
                                {/*     src=""*/}
                                {/*     alt=""/>*/}
                            </div>
                            <div className="cell small-8 medium-10">
                                <h6 className="event-card__title">{props.event.name}</h6>
                                <p>{props.event.info}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Event;