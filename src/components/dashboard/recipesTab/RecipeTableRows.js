import React from 'react';
import { Thumbnail } from 'react-bootstrap';

const truncate = str => `${str.substring(0, 25)}`;

const RecipeTableRows = props => (
  <div className="col-md-4">
    <Thumbnail src="https://mperumpy.sirv.com/Images/brooke-lark-158017.jpg" alt="242x200">
      <h3>{truncate(props.title)}</h3>
      <p>{`${truncate(props.ingredients)}...`}</p>
      <p>
        <a href={`/recipe/${props.recipe_id}`} className="btn btn-default" id="view"><span className="fa fa-eye"> View</span></a>&nbsp;
        <button onClick={() => props.handleEditData(props.recipe_id)} id="edit" className="btn btn-primary"><span className="fa fa-edit"> Edit</span></button>&nbsp;
        <button onClick={() => props.deleteHandler(props.recipe_id)} id="delete" className="btn btn-danger"><span className="fa fa-trash"> Delete</span></button>
      </p>
    </Thumbnail>
  </div>
);
export default RecipeTableRows;
