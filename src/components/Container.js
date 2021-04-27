import React, { Component } from 'react'
import "./style.css"
import Employees from './Employees'
import Filter from './Filter'
import moment from "moment"
import API from '../utils/API'

export default class Container extends Component {
    state = {
        search: '',
        employees: [],
        filteredEmployees: [],
        filtered: false
    };

    componentDidMount = () => {
        API.getEmployees()
            .then(({ data }) => {
                console.log(data.results)
                this.setState({ employees: data.results })
            })
    };

    handleInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(name)
        console.log(value)
        this.setState({ filter: e.target.value });
    };

    filterEmployees = (e) => {
        const { employees, search } = this.state;
        this.setState({ search: e.target.value })
        console.log(search)

        const filteredEmployees = employees.filter((employee) =>
            employee.name.last.toLowerCase().indexOf(search.toLowerCase()) > -1)

        this.setState({ filteredEmployees: filteredEmployees, filtered: true });
        console.log(`filtered ${filteredEmployees}`)
    };

    sortLastName = () => {
        const sortedEmployees = this.state.employees
        sortedEmployees.sort((a, b) => (a.name.last > b.name.last ? 1 : -1))
        this.setState({ employees: sortedEmployees, filtered: false })
    };

    render() {
        return (
            <div className='container-fluid mt-5'>
                <Filter filterFunc={this.filterEmployees} name='search' />
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name </th>
                            <th className='dropdown-toggle' onClick={this.sortLastName}>Last Name</th>
                            <th>Email </th>
                            <th>Phone number</th>
                            <th>DOB </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // render employee list filtered by search criteria
                            this.state.filtered ? (
                                this.state.filteredEmployees.map((employee) => (
                                    <Employees
                                        key={employee.phone}
                                        image={employee.picture.medium}
                                        firstName={employee.name.first}
                                        lastName={employee.name.last}
                                        email={employee.email}
                                        phone={employee.phone}
                                        dob={moment(employee.dob.date, "YYYY MM DD").format(
                                            "MMMM D, YYYY"
                                        )}
                                    />
                                ))
                            ) : (
                                // render employee list
                                this.state.employees.map((employee) => (
                                    <Employees
                                        key={employee.phone}
                                        image={employee.picture.medium}
                                        firstName={employee.name.first}
                                        lastName={employee.name.last}
                                        email={employee.email}
                                        phone={employee.phone}
                                        dob={moment(employee.dob.date, "YYYY MM DD").format(
                                            "MMMM D, YYYY"
                                        )}
                                    />
                                ))
                            )}
                    </tbody>
                </table>
            </div>
        )
    }
}

