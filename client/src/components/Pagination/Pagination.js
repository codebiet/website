import React from "react";
import Pagination from "react-reactstrap-pagination";
const PaginationComponent = ({ totalItems, pageSize, handlePageChange }) => {
  return (
    <Pagination
      totalItems={totalItems}
      pageSize={pageSize}
      onSelect={handlePageChange}
    />
  );
};

export default PaginationComponent;
