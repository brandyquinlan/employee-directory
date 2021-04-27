import React from "react"

export default function Filter({ filter, handleInputChange }) {
  return (
    <div className="form-group">
      <input
        onChange={handleInputChange}
        value={filter}
        name="filter"
        type="text"
        className="form-control"
        placeholder="Search"
        id="filter"
      />
    </div>
  )
}
