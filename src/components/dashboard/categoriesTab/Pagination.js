import React from 'react';

const Pagination = (props) => {
  const { nextPage, previousPage } = props;
  props = props.categoryData;
  return (
    <center>
      <div className="col-xs-12 col-sm-12" id="pagination">
        <ul className="pagination">
          <li className={props.disablePrevious}>
            <a className="page-link" id="catPrevPage" onClick={() => previousPage(props)}>Previous</a>
          </li>
          <li className={props.disableNext}>
            <a className="page-link" id="catNextPage" onClick={() => nextPage(props)}>Next</a>
            <a className="page-link">Showing {props.page} of {props.total_pages}</a>
          </li>

        </ul>
      </div>
    </center>
  );
};
export default Pagination;
