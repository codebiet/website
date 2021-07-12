import React from "react";
const Filter = (props) => {
  return (
    <div className="FilterDiv">
      <h2>Find Here</h2>
      <form className="form" id="addItemForm">
        <input
          type="text"
          className="input"
          id="addInput"
          placeholder="Enter the name"
        />
        <button className="button is-info">Search</button>
      </form>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="Filters">
          <div className="FilterItem">
            <select
              name="year"
              id="year"
              value={props.year}
              onChange={(e) => {
                props.setYear(e.target.value);
                props.setPage(1);
              }}
            >
              <option value="" selected="selected">
                Select Year
              </option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Final Year</option>
              <option value="Passout">Passout</option>
            </select>
          </div>
          <div className="FilterItem">
            <select
              name="Branch"
              id="Branch"
              value={props.branch}
              onChange={(e) => {
                props.setPage(1);
                props.setBranch(e.target.value);
              }}
            >
              <option value="" selected="selected">
                Select Branch
              </option>
              <option value="Chemical Engineering">Chemical</option>
              <option value="Civil Engineering">Civil </option>
              <option value="Computer Science and Engineering">
                Computer Science
              </option>
              <option value="Electronics and Communication Engineering">
                Electronics and Communication
              </option>
              <option value="Electrical Engineering">Electrical</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Mechanical Engineering">Mechanical</option>
            </select>
          </div>
          <div className="FilterItem">
            <select
              name="profession"
              id="profession"
              value={props.profession}
              onChange={(e) => {
                props.setPage(1);
                props.setProfession(e.target.value);
              }}
            >
              <option value="" selected="selected">
                Select Profession
              </option>
              <option value="Professional">Professional</option>
              <option value="Student">Student</option>
            </select>
          </div>
        </div>
        {/*<div className="submitbtn">
          <button type="submit" className="default-btn">Search</button>
  </div>*/}
      </form>
    </div>
  );
};

export default Filter;
