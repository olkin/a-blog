import React, {useState} from "react";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EventForm({onFormSubmit, event}) {
    const [state, setState] = useState({
        name: event?.name,
        info: event?.info,
        start_date: event? new Date(event.start_date) : new Date()
    });

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    const onDateChange = date => {
        setState({...state, start_date: date});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(state);
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="eventName">Name</label>
                <input
                    type="text"
                    name="name"
                    id="eventName"
                    onChange={onChange}
                    value={state.name || ''}
                />
            </div>
            <div>
                <label htmlFor="eventInfo">Info</label>
                <textarea
                    type="text"
                    name="info"
                    id="eventInfo"
                    rows={4}
                    required
                    onChange={onChange}
                    value={state.info || ''}
                />
            </div>
            <div>
                {/*<label htmlFor="eventInfo">Info</label>*/}
                <DatePicker
                    selected={state.start_date}
                    onChange={onDateChange}
                />
            </div>
            <button type="submit" className="button">
                Save
            </button>
            <Link to="/">
                Back to events
            </Link>
        </form>
    );
}

export default EventForm;