import React from 'react';

const Categories = props => (
  <div>
    <h3>Categories<a href="/add_category" className="btn btn-success pull-right"> Add Category</a>
      <div className="col-xs-12 col-sm-6 pull-right">
        <div className="input-group mb-2 mb-sm-0">
          <div className="input-group-addon">Search</div>
          <input type="text" className="form-control" onChange={this.handleCategorySearch} onKeyUp={this.handleCategorySearch} placeholder="Enter your search key words here!" />
        </div>
      </div>
    </h3><br />
    {!props.loading && <center id="loader"><i className="fa fa-spinner fa-pulse fa-4x fa-fw" /></center>}
  </div>
);
export default Categories;
