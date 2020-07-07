import React, {useState} from 'react'
import Select from "react-select";
import {Link} from "react-router-dom";
import {EVENT_TIERS} from "../constants/EventConstants";

function EventRegistrationForm({onFormSubmit, event, registration}) {
    const eventTiers = ['competitive', 'intermediate'] //|| event.tiers;
    const tierOptions = eventTiers.map(tier => {return { value: tier, label: EVENT_TIERS[tier] } } )
    const initialTierOption = registration?.tier && tierOptions.find((option) => option.value === registration.tier);

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