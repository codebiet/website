import React from "react";
const Filter = (props) => {
  return (
    <div className="FilterDiv">
      <h2>Find Here</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="Filters">
          <div className="FilterItem">
            <select name="year" id="year">
              <option value="" selected="selected">
                Select Year
              </option>
              <option value="2020">First Year</option>
              <option value="2019">Second Year</option>
              <option value="2018">Third Year</option>
              <option value="2017">Final Year</option>
              <option value="passout">Passout</option>
            </select>
          </div>
          <div className="FilterItem">
            <select name="Branch" id="Branch">
              <option value="" selected="selected">
                Select Branch
              </option>
              <option value="CH">Chemical</option>
              <option value="CE">Civil </option>
              <option value="CS">Computer Science</option>
              <option value="ECE">Electronics and Communication</option>
              <option value="EE">Electrical</option>
              <option value="IT">Information Technology</option>
              <option value="ME">Mechanical</option>
            </select>
          </div>
          <div className="FilterItem">
            <select name="profession" id="profession">
              <option value="" selected="selected">
                Select Profession
              </option>
              <option value="Professional">Alumni</option>
              <option value="Student">Student</option>
            </select>
          </div>
        </div>
        <div className="submitbtn">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
