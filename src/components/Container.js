import React, { Component } from 'react';
import Employees from './Employees';
import SearchForm from './SearchForm';
import moment from "moment";
import API from '../utils/API';

export default class Container extends Component {
    state = {
        search: '',
        employees: [],
        filteredEmployees: [],
        sorted: false
    };

    componentDidMount = () => {
        API.getEmployees()
            .then(({ data }) => {
                this.setState({ employees: data.results });
            })
            .catch((err) => console.log(err));
    };
    // handleSearchTerm = e =>  {
    //     setSearchTerm(e.target.value)
    // }
    
    handleInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(name)
        console.log(value)
        this.setState({ search: e.target.value });
    };
    

    getEmployees = (e) => {
        const { employees, search } = this.state;
        this.setState({ search: e.target.value });

        const filteredEmployees = employees.filter(
            (employee) =>
                employee.name.first.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                employee.name.last.toLowerCase().indexOf(search.toLowerCase()) > -1
        );

        this.setState({ filteredEmployees: filteredEmployees, sorted: true });
    };

    render() {
        return (
            <div>
                <SearchForm
                    search={this.search} handleInputChange={this.handleInputChange}
                />
                <div className='container-fluid mt-5'>
                    <table className='table table-striped'>
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
                                            "MMMM D YYYY"
                                        )}
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

