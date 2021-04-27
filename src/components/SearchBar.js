import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    __onInput = (e) => {
        const { onInput } = this.props;
        e.preventDefault();

        if (onInput) {
            onInput(e.target.value);
        }
    }

    render() {
        return (
            <div className="search-bar-container">
            <div className="search-bar-title">
                <h2>Search By Title </h2>
            </div>
                <input
                    type="text"
                    onInput={(e) => this.__onInput(e)}
                />
            </div>
        );
    }
}

export default SearchBar;