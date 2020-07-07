import React, {useState} from "react";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {EVENT_FORMATS, EVENT_REQUIRED_EQUIPMENT, EVENT_TIERS} from '../constants/EventConstants'
import '../../styles/EventForm.scss'

const formatOptions = Object.entries(EVENT_FORMATS).map(([value, label]) => {
    return {value: value, label: label};
});

function CheckboxWithLabel(props) {
    return (
        <li>
            <input
                type="checkbox"
                value={props.value}
                onChange={props.onChange}
                checked={props.checked}
                id={props.value}/>
            <label htmlFor={props.value}>{props.label}</label>
        </li>
    )
}

function CollectionCheckboxes(props){
    return (
        <ul>
            {
                Object.entries(props.options).map(([value, label]) =>
                    <CheckboxWithLabel
                        key={value}
                        value={value}
                        onChange={props.onChange}
                        checked={props.selectedValues.includes(value)}
                        label={label}
                    />
                )
            }
        </ul>
    )
}

function EventForm({onFormSubmit, event}) {
    const [state, setState] = useState({
        name: event?.name,
        info: event?.info
    });

    const [availableTiers, setAvailableTiers] = useState(event?.tiers || []);
    const [requestedEquipment, setRequestedEquipment] = useState(event?.requested_equipment || []);

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

    const onTiersChange = event => {
        const target = event.target;
        const value = target.value;

        let currentValues = availableTiers;
        currentValues = currentValues.filter(item => item !== value)
        if(target.checked) {
            currentValues.push(value);
        }

        setAvailableTiers(currentValues);
    }

    const onEquipmentChange = event => {
        const target = event.target;
        const value = target.value;

        let currentValues = requestedEquipment;
        currentValues = currentValues.filter(item => item !== value)
        if(target.checked) {
            currentValues.push(value);
        }

        setRequestedEquipment(currentValues);
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
            <fieldset>
                <legend>Available tiers</legend>
                <CollectionCheckboxes
                    options={EVENT_TIERS}
                    onChange={onTiersChange}
                    selectedValues={availableTiers}
                />
            </fieldset>
            <fieldset>
                <legend>Request equipment from players</legend>
                <CollectionCheckboxes
                    options={EVENT_REQUIRED_EQUIPMENT}
                    onChange={onEquipmentChange}
                    selectedValues={requestedEquipment}
                />
            </fieldset>
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