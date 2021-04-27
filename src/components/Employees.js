import React from 'react'
import "./style.css"

export default function Employees(props) {
    return (
        <>
            <tr>
            <td><img alt= {props.firstName} src= {props.image} className="img-fluid"/></td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>{props.dob}</td>
            </tr>
        </>
    )
}

