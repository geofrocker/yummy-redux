import React from 'react';
import Since from 'react-since';

const Recipes = props =>
  (<div className="jumbotron">
    <h3>{props.title}</h3>
    <em>Added by <span className="fa fa-user" /> { props.author } about <span className="fa fa-calendar" /> <Since date={props.create_date} /> | Category: { props.category_rel}
      <a href={`/recipe/${props.recipe_id}`} id="review" className="btn btn-primary pull-right">Review</a>
    </em>

    <div>
      <h3>Ingredients</h3>
      <small>{props.ingredients}</small>
      <h3>Steps</h3>
      <small>{props.steps}</small><br /><br />
      <div className="btn-group" id="btn-group">
        <button type="button" className="btn btn-default btn-xs"><span className="fa fa-comment-o" /> Reviews:{props.reviews}</button>
        <button type="button" className="btn btn-default btn-xs"><span className="fa fa-thumbs-o-up" /> Upvotes:{props.upvotes}</button>
      </div>
    </div>
   </div>);
export default Recipes;
