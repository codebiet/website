import React from "react";
const Filter = (props) => {
  return (
    <div className="project-filter-container FilterDiv">
      <h2>Filter Projects</h2>
      <form>
        <div className="Filters">
          <div className="FilterItem">
            <select name="year" id="year">
              <option value="" selected="selected">
                Technology
              </option>
              <option value="react">React</option>
              <option value="angular">Angular</option>
              <option value=".net">.Net</option>
              <option value="vue">Vue</option>
              <option value="php">Php</option>
            </select>
          </div>
          <div className="FilterItem">
            <select name="Branch" id="Branch">
              <option value="" selected="selected">
                Rating
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="submitbtn">
          <button type="submit" className="default-btn">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
