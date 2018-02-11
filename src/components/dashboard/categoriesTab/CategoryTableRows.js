import React from 'react';
import Moment from 'react-moment';

function truncate(str, no_words) {
  return `${str.split(' ').splice(0, no_words).join(' ')}...`;
}

const RecipeTableRows = props => (
  <tr>
    <td>{props.id}</td>
    <td>{props.cat_name}</td>
    <td>{truncate(props.cat_desc, 5)}</td>
    <td>{props.created_by}</td>
    <td>
      <Moment format="DD/MM/YYYY">
        {props.create_date}
      </Moment>
    </td>
    <td>
      <button onClick={() => props.handleEditData(props.cat_id)} className="btn btn-primary"> Edit</button>&nbsp;
      <button onClick={() => props.deleteHandler(props.cat_id)} className="btn btn-danger"> Delete</button>
    </td>
  </tr>
);
export default RecipeTableRows;
