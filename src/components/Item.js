import React from 'react'

const Item = (props) => {
    const { Name: name, Position: position, Office: office, Age: age, "Start Date": start_date, Salary: salary } = props.data
    return (
        <tr>
            <td>{ name }</td>
            <td>{ position }</td>
            <td>{ office }</td>
            <td>{ age }</td>
            <td>{ start_date }</td>
            <td>{ salary }</td>
        </tr>
    )
}

export default Item