import React from 'react';

function Select(props) {
    return (
        <select className={props.className} name={props.name} id={props.id}>
            {props.options.map((option, idx) => {
                if (props.selected === option.value) {
                    return (
                        <option key={idx} selected="selected" value={option.value}>{option.title}</option>
                    )
                } else {
                    return (
                        <option key={idx} value={option.value}>{option.title}</option>
                    )
                }

            })}
        </select>
    );
}


export default Select;