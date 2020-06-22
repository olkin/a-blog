import React from 'react';

function Event(props) {
    return (
        <div className="card">
            <div className="card-divider">
                <h4 className="card-title">
                    [{props.event.start_date}] {props.event.name}
                </h4>
            </div>
            <div className="card-section">
                <p>
                    {props.event.info}
                </p>
            </div>
        </div>
    );
}

export default Event;