import React from "react";

function SearchForm({ search, handleInputChange }) {
  return (
      <div className="form-group">
        <input
          onChange={handleInputChange}
          value={search}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          id="search"
        />
       </div>
  );
}

export default SearchForm;