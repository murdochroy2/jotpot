import React from 'react'

const Item = (props) => {
    const { name, type, currentLocation, previousLocation, area, updatedOn, updatedBy } = props.data;
    const date = new Date(updatedOn);
    const formattedDate = date.toLocaleString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    return (
        <tr>
            <td>{name}</td>
            <td>{type}</td>
            <td>{currentLocation}</td>
            <td>{previousLocation}</td>
            <td>{area}</td>
            <td>{formattedDate}</td>
            <td>{updatedBy}</td>
        </tr>
    )
}

export default Item