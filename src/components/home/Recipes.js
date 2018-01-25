import React from 'react';
import Since from 'react-since';

const Recipes = props =>
  <div className="jumbotron">
      <h3>{props.title}</h3>
      <em>Added by <span className="fa fa-user"></span> { props.created_by } about <span className="fa fa-calendar"></span> <Since date={ props.create_date } /> | Category: { props.category}
      <a href={'/recipe/' + props.recipe_id} className="btn btn-primary pull-right">Review</a>
      </em>

      <div>
          <h3>Ingredients</h3>
          <small>{props.ingredients}</small>
          <h3>Steps</h3>
          <small>{props.steps}</small><br/><br/>
          <div className="btn-group" id="btn-group">
              <button type="button" className="btn btn-default btn-xs"><span className="fa fa-comment-o"></span> Reviews:{props.reviews}</button>
              <button type="button" className="btn btn-default btn-xs"><span className="fa fa-thumbs-o-up"></span> Upvotes:{props.upvotes}</button>
          </div>
      </div>
  </div>;
export default Recipes
