import React, { Component } from 'react'
import "./style.css"
import Employees from './Employees'
import Filter from './Filter'
import moment from "moment"
import API from '../utils/API'

export default class Container extends Component {
    state = {
        filter: '',
        employees: [],
        filteredEmployees: [],
        filtered: false
    };

    componentDidMount = () => {
        API.getEmployees()
            .then(({ data }) => {
                this.setState({ employees: data.results })
            })
    };

    sortLastName = () => {
		const sortedEmployees = this.state.employees
		sortedEmployees.sort((a, b) => (a.name.last > b.name.last ? 1 : -1))
		this.setState({ employees: sortedEmployees, filtered:false})
	};
    
    handleInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(name)
        console.log(value)
        this.setState({ filter: e.target.value });
    };
    
    getEmployees = (e) => {
        const { employees, filter } = this.state;
        this.setState({ filter: e.target.value })

        const filteredEmployees = employees.filter(
            (employee) =>
                employee.name.last.toLowerCase().indexOf(filter.toLowerCase()) > -1
        );

        this.setState({ filteredEmployees: filteredEmployees, filtered: true });
    };

    render() {
        return (
            <div className='container-fluid mt-5'>
                {/* <Filter
                    newFilter={this.getEmployees} name
                /> */}
                <Filter newFilter={this.getEmployees} name='filter' />
               
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
                            {(
                                this.state.employees.map((employee, i) => (
                                    <Employees
                                        key={i}
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
            // </div>
        )
    }
}

