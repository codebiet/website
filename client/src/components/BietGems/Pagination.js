import React from "react";
import { Link } from "react-router-dom";
const Pagination = (props) => {
  return (
    <div>
      <div class="pagination">
        <Link to="#">&laquo;</Link>
        <Link className="active" to="#">
          1
        </Link>
        <Link to="#">2</Link>
        <Link to="#">3</Link>
        <Link to="#">4</Link>
        <Link to="#">5</Link>
        <Link to="#">&raquo;</Link>
      </div>
    </div>
  );
};

export default Pagination;
