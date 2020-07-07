import React from "react";

function CheckboxWithLabel({value, onChange, checked, label}) {
    return (
        <div>
            <input
                type="checkbox"
                value={value}
                onChange={onChange}
                checked={checked}
                id={value}/>
            <label htmlFor={value}>{label}</label>
        </div>
    )
}

function CheckboxCollection(props){
    return (
        <>
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
        </>
    )
}

export default CheckboxCollection;