import React from 'react';

const RecipeTableRows = props => (
  <tr>
    <td>{props.id}</td>
    <td>{props.cat_name}</td>
    <td>{props.cat_desc}</td>
    <td>{props.created_by}</td>
    <td>{props.create_date}</td>
    <td><button onClick={() => props.handleEditData(props.cat_id)} className="btn btn-primary pull-right"> Edit</button></td>
    <td><button onClick={() => props.deleteHandler(props.cat_id)} className="btn btn-danger"> Delete</button></td>
  </tr>
);
export default RecipeTableRows;
