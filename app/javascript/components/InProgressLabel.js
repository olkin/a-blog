import React from "react";

function InProgressLabel(props) {
    const iconClass = props.icon || "fa fa-hand-peace-o";
    const label = props.label || 'In Progress';

    return <span className='label secondary'>
        <i className={iconClass}></i>
        &nbsp;{label}
    </span>;
}

export default InProgressLabel;