import React from 'react';
import Moment from 'react-moment';

const truncate = str => `${str.substring(0, 40)}`;

const RecipeTableRows = props => {
  const {id, cat_id, cat_name, cat_desc, author, create_date, handleEditData, deleteHandler} = props
  return(
    <tr>
      <td>{id}</td>
      <td>{truncate(cat_name)}</td>
      <td>{`${truncate(cat_desc)}...`}</td>
      <td>{author}</td>
      <td>
        <Moment format="DD/MM/YYYY">
          {create_date}
        </Moment>
      </td>
      <td>
        <button onClick={() => handleEditData(cat_id)} id="catEdit" className="btn btn-primary btn-xs"><span className="fa fa-edit"> Edit</span></button>&nbsp;
        <button onClick={() => deleteHandler(cat_id)} id="catDelete" className="btn btn-danger btn-xs"><span className="fa fa-trash"> Delete</span></button>
      </td>
    </tr>
  )
}
export default RecipeTableRows;
