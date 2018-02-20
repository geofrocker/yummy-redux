import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Categories = props =>
  <option value={props.cat_id}>{props.cat_name}</option>;

const RecipeModal = (props) => {
  const {modalTitle, selected, recipeData, handleChange, categories,} = props;
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={modalTitle === 'Add Recipe' ? props.addRecipe : props.handleRecipeUpdate} id="recipe-form">
          {!categories ? <center><label className="label label-danger">Create categories first, before adding recipes</label></center> : <div />}
          <div className="form-group">
            <input type="text" className="form-control" value={recipeData.title} onChange={handleChange} placeholder="Title" id="title" required />
          </div>
          <div className="form-group">
            <select className="form-control" onChange={handleChange} id="category">
              {modalTitle === 'Edit Recipe' ?
                <option value={recipeData.category} selected>{recipeData.category_rel}</option>
              : <div />}
              <option disabled selected={selected}>Select Category</option>
              {categories.map(category =>
                <Categories key={category.cat_id}{...category} />)}
            </select>
          </div>

          <div className="form-group">
            <input type="text" className="form-control" placeholder="Ingredients" id="ingredients" value={recipeData.ingredients} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <textarea className="form-control" placeholder="Add your steps here" id="steps" value={recipeData.steps} onChange={handleChange} required />
          </div>
          <select onChange={handleChange} id="status" required>
            {recipeData.status ?
              <option value={recipeData.status} selected>{recipeData.status}</option>
            : <div />}
            <option disabled selected={selected}>Select status</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>* required<br /><br />
          <input type="submit" className="btn btn-primary" id="addRecipe" value="Submit" />&nbsp;
          <Button onClick={props.handleClose} className="btn btn-success">Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default RecipeModal;

