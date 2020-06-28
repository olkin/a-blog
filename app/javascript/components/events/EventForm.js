import React, {useState} from "react";
import {Link} from "react-router-dom";

function EventForm({onFormSubmit, post}) {
    const [state, setState] = useState({ name: post?.name, info: post?.info});

    const onChange = (e) =>
        setState({ ...state, [e.target.name]: e.target.value });

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
                    id="postName"
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