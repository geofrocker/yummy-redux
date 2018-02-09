import React from 'react';

const RecipeTableRows = props => (
  <tr>
    <td>{props.id}</td>
    <td>{props.title}</td>
    <td>{props.category}</td>
    <td>{props.created_by}</td>
    <td>{props.status}</td>
    <td>{props.create_date}</td>
    <td><button onClick={() => props.handleEditData(props.recipe_id)} className="btn btn-primary pull-right"> Edit</button><a href={`/recipe/${props.recipe_id}`} className="btn btn-default pull-right"> View</a></td>
    <td><button onClick={() => props.deleteHandler(props.recipe_id)} className="btn btn-danger"> Delete</button></td>
  </tr>
);
export default RecipeTableRows;
