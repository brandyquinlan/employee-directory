import React, { Component } from 'react';
import Employees from './Employees';
import SearchForm from './SearchForm';

import API from '../utils/API';
class Container extends Component {
    state = {
        search: '',
        employees: [],
        sortedEmployees: [],
        sorted: false
    };

    componentDidMount = () => {
        API.getEmployees()
            .then((response) => {
                console.log(response.data.results);
                this.setState({ employees: response.data.results });
            })
            .catch((err) => console.log(err));
    };

    getEmployees = (event) => {
        const { employees, search } = this.state;
        this.setState({ search: event.target.value });

        const sortedEmployees = employees.sort(
            (employee) =>
                employee.name.first.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                employee.name.last.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                employee.email.toLowerCase().indexOf(search.toLowerCase()) > -1
        );

        this.setState({ sortedEmployees: sortedEmployees, sorted: true });
    };

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.getEmployees(this.state.search);
    };
    render() {
        return (
            <div>
                <SearchForm
                    search={this.state.search}
                    handleFormSubmit={this.handleFormSubmit}
                    handleInputChange={this.handleInputChange}
                />
                <div className='container-fluid mt-5'>
                    <table className='table table-striped'>
                        <tbody>
                            {(
                                this.state.employees.map((employee) => (
                                    <Employees
                                        image={employee.picture.medium}
                                        firstName={employee.name.first}
                                        lastName={employee.name.last}
                                        email={employee.email}
                                        phone={employee.phone}
                                        dob={employee.dob.date}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Container;
