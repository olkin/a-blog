import React, {useState} from "react";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import eventFormats from "./EventFormats";

const formatOptions = Object.entries(eventFormats).map(([value, label]) => {
    return {value: value, label: label};
});

function EventForm({onFormSubmit, event}) {
    const [state, setState] = useState({
        name: event?.name,
        info: event?.info
    });

    const [startDate, setStartDate] = useState(event? new Date(event.start_date) : new Date());

    const initialFormat = event?.format
        ? formatOptions.find((option) => option.value === event.format )
        : null;
    const [formatOption, setFormatOption] = useState(initialFormat);

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    const onDateChange = date => {
        setStartDate(date);
    };

    const onFormatChange = selectedOption => {
        setFormatOption(selectedOption);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onFormSubmit({...state, start_date: startDate, format: formatOption?.value});
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="eventFormat">Game format</label>
            <Select
                id='eventFormat'
                value={formatOption}
                onChange={onFormatChange}
                options={formatOptions}
                placeholder="Choose format"
            />
            <div>
                <label htmlFor="eventName">Name</label>
                <input
                    type="text"
                    name="name"
                    id="eventName"
                    onChange={onChange}
                    required
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
                <label htmlFor="eventStartDate">Event Date</label>
                <DatePicker
                    id='eventStartDate'
                    dateFormat="E, MMM d"
                    selected={startDate}
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