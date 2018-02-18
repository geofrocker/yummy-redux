import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CategoryModal = (props) => {
  const {
    modalTitle, catData, handleChange,
  } = props;
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={modalTitle === 'Add Category' ? props.addCategory : props.handleCategoryUpdate} id="category-form">
          <div className="form-group">
            <input type="text" className="form-control" value={catData.cat_name} onChange={handleChange} placeholder="Category Name" id="cat_name" required />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Category Description" id="cat_desc" value={catData.cat_desc} onChange={handleChange} required />
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />&nbsp;
          <Button onClick={props.handleClose} className="btn btn-success">Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default CategoryModal;

