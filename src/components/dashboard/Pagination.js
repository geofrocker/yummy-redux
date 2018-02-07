import React from 'react';

const Pagination = (props) => {
  const { nextPage, previousPage } = props;
  props = props.recipeData;
  return (
    <div className="col-xs-11 col-sm-4 pull-right" id="pagination">
      <ul className="pagination">
        <li className={props.disablePrevious}>
          <a className="page-link" onClick={() => previousPage(props)}>Previous</a>
        </li>
        <li className={props.disableNext}>
          <a className="page-link" onClick={() => nextPage(props)}>Next</a>
          <a className="page-link">Showing {props.page} of {props.total_pages}</a>
        </li>

      </ul>
    </div>
  );
};
export default Pagination;
