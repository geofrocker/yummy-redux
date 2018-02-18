import React from 'react';
import Moment from 'react-moment';

const truncate = str => `${str.substring(0, 40)}`;

const RecipeTableRows = props => (
  <tr>
    <td>{props.id}</td>
    <td>{truncate(props.cat_name)}</td>
    <td>{`${truncate(props.cat_desc)}...`}</td>
    <td>{props.author}</td>
    <td>
      <Moment format="DD/MM/YYYY">
        {props.create_date}
      </Moment>
    </td>
    <td>
      <button onClick={() => props.handleEditData(props.cat_id)} id="catEdit" className="btn btn-primary btn-xs"><span className="fa fa-edit"> Edit</span></button>&nbsp;
      <button onClick={() => props.deleteHandler(props.cat_id)} id="catDelete" className="btn btn-danger btn-xs"><span className="fa fa-trash"> Delete</span></button>
    </td>
  </tr>
);
export default RecipeTableRows;
