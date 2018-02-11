import React from 'react';
import { Thumbnail } from 'react-bootstrap';

function truncate(str, no_words) {
  return `${str.split(' ').splice(0, no_words).join(' ')}...`;
}

const RecipeTableRows = props => (
  <div className="col-md-4">
    <Thumbnail src="https://mperumpy.sirv.com/Images/recipes3.jpeg" alt="242x200">
      <h3>{props.title}</h3>
      <p>{truncate(props.ingredients, 3)}</p>
      <p>
        <a href={`/recipe/${props.recipe_id}`} className="btn btn-default"><span className="fa fa-eye"> View</span></a>&nbsp;
        <button onClick={() => props.handleEditData(props.recipe_id)} className="btn btn-primary"><span className="fa fa-edit"> Edit</span></button>&nbsp;
        <button onClick={() => props.deleteHandler(props.recipe_id)} className="btn btn-danger"><span className="fa fa-trash-alt"> Delete</span></button>
      </p>
    </Thumbnail>
  </div>
);
export default RecipeTableRows;
