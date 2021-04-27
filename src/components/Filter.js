import React from "react"

export default function Filter(props) {
  return (
    <div className="form-group">
      <input
        name="search"
        type="text"
        className="form-control"
        placeholder="Search"
        id="search"
        onChange={(event)=>props.filterFunc(event)} 
      />
    </div>
  )
}
