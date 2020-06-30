import React, {useState} from "react";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const formatOptions = [
    {value: 'women_2s', label: 'Women 2s'},
    {value: 'men_2s', label: 'Men 2s'},
    {value: 'coed_2s', label: 'Coed 2s'},
    {value: 'coed_3s', label: 'Coed 3s'},
    {value: 'coed_4s', label: 'Coed 4s'},
    {value: null, label: 'Other'}
]

function EventForm({onFormSubmit, event}) {
    const [state, setState] = useState({
        name: event?.name,
        info: event?.info
    });

    const [startDate, setStartDate] = useState(event? new Date(event.start_date) : new Date());
    const [formatOption, setFormatOption] = useState(null);

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
            <Select
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