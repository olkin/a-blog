import React, {useState} from "react";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {EVENT_FORMATS, EVENT_REQUIRED_EQUIPMENT, EVENT_TIERS} from '../constants/EventConstants'
import CheckboxCollection from "../form/CheckboxCollection";

function EventForm({onFormSubmit, event}) {
    const formatOptions = Object.entries(EVENT_FORMATS).map(([value, label]) => {
        return {value: value, label: label};
    });
    const initialFormat = event?.format && formatOptions.find((option) => option.value === event.format);

    const [state, setState] = useState({name: event?.name, info: event?.info});
    const [availableTiers, setAvailableTiers] = useState(event?.tiers || []);
    const [requestedEquipment, setRequestedEquipment] = useState(event?.requested_equipment || []);
    const [startDate, setStartDate] = useState(event? new Date(event.start_date) : new Date());
    const [formatOption, setFormatOption] = useState(initialFormat);

    const onChange = (event) => setState({...state, [event.target.name]: event.target.value})
    const onDateChange = date => setStartDate(date)
    const onFormatChange = selectedOption => setFormatOption(selectedOption)
    const onTiersChange = event => onCheckboxChange(event, availableTiers, setAvailableTiers)
    const onEquipmentChange = event => onCheckboxChange(event, requestedEquipment, setRequestedEquipment)

    const onCheckboxChange = (event, currentValues, setValue) => {
        const target = event.target;
        const value = target.value;

        currentValues = currentValues.filter(item => item !== value)
        if(target.checked) {
            currentValues.push(value);
        }

        setValue(currentValues);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        onFormSubmit({...state,
            start_date: startDate,
            format: formatOption?.value,
            tiers: availableTiers,
            requested_equipment: requestedEquipment});
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="eventFormat">Game format</label>
                <Select
                    id='eventFormat'
                    value={formatOption}
                    onChange={onFormatChange}
                    options={formatOptions}
                    placeholder="Choose format"
                />
            </div>
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
                <fieldset>
                    <legend>Available tiers</legend>
                    <CheckboxCollection
                        options={EVENT_TIERS}
                        onChange={onTiersChange}
                        selectedValues={availableTiers}
                    />
                </fieldset>
            </div>
            <div>
                <fieldset>
                    <legend>Request equipment from players</legend>
                    <CheckboxCollection
                        options={EVENT_REQUIRED_EQUIPMENT}
                        onChange={onEquipmentChange}
                        selectedValues={requestedEquipment}
                    />
                </fieldset>
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