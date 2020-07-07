import React, {useState} from 'react'
import Select from "react-select";
import {Link} from "react-router-dom";
import {EVENT_REQUIRED_EQUIPMENT, EVENT_TIERS} from "../constants/EventConstants";
import CheckboxCollection from "../form/CheckboxCollection";

function EventRegistrationForm({onFormSubmit, event, registration}) {
    const eventTiers = event.tiers;
    const tierOptions = eventTiers.map(tier => {return { value: tier, label: EVENT_TIERS[tier] } } )
    const initialTierOption = registration?.tier && tierOptions.find((option) => option.value === registration.tier);

    const requiredEquipment = event.requested_equipment || []
    const requiredEquipmentOptions = requiredEquipment.reduce((obj, equipment) => {
        return {...obj, [equipment]: EVENT_REQUIRED_EQUIPMENT[equipment]}
        }, {})

    const [contactInfo, setContactInfo] = useState(registration?.contact_info);
    const [tierOption, setTierOption] = useState(initialTierOption);
    const [availableEquipment, setAvailableEquipment] = useState(registration?.available_equipment || []);
    const [players, setPlayers] = useState(registration?.players || []);

    const onSubmit = (e) => {
        e.preventDefault();

        onFormSubmit({players, contact_info: contactInfo, tier, available_equipment: availableEquipment});
    }

    const onContactInfoChange = event => setContactInfo(event.target.value)
    const onTierOptionChange = selectedOption => setTierOption(selectedOption)
    const onEquipmentChange = event => onCheckboxChange(event, availableEquipment, setAvailableEquipment)

    const onCheckboxChange = (event, currentValues, setValue) => {
        const target = event.target;
        const value = target.value;

        currentValues = currentValues.filter(item => item !== value)
        if(target.checked) {
            currentValues.push(value);
        }

        setValue(currentValues);
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="tier">Tier</label>
                <Select
                    id='tier'
                    value={tierOption}
                    onChange={onTierOptionChange}
                    options={tierOptions}
                    placeholder="Choose tier"
                />
            </div>
            <div>
                <label htmlFor="contactInfo">Contact Info</label>
                <input
                    type="text"
                    id="contactInfo"
                    name='contact_info'
                    onChange={onContactInfoChange}
                    required
                    value={contactInfo || ''}
                />
            </div>
            { requiredEquipment.length > 0 &&
                <div>
                    <fieldset>
                        <legend>Specify available equipment</legend>
                        <CheckboxCollection
                            options={requiredEquipmentOptions}
                            onChange={onEquipmentChange}
                            selectedValues={availableEquipment}
                        />
                    </fieldset>
                </div>
            }
            <button type="submit" className="button">
                Save
            </button>
            <Link to="/">
                Cancel
            </Link>
        </form>
    )
}

export default EventRegistrationForm