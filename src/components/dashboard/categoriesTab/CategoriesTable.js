import React, { Component } from 'react';
import { connect } from 'react-redux';
import { url } from '../../../config';
import { loadCategories, addCategory, loadCategory, updateCategory, deleteCategory} from '../../../actions/categoriesAction';
import { loadRecipes } from '../../../actions/recipesActions'
import { Table } from 'react-bootstrap';
import Pagination from './Pagination';
import CategoryTableRows from './CategoryTableRows';
import CategoryModal from './CategoryModal'
import toastr from 'toastr'

export class CategoriesTable extends Component {
  constructor(props) {
    super();
    this.state = {
      categories:[],
      showMessage: false,
      q: '',
      show: false,
      selected: '',
      modalTitle: 'Add Category',
      catData: { cat_name: '', cat_desc: '' },
      redirect: false,
    };
  }
  componentWillReceiveProps(props){
    this.setState({categories:props.categories})
  }

  handleShow = () =>{
    this.setState({show:true})
  }

  handleClose = () =>{
    this.setState({show:false, catData:{cat_name:'',cat_desc:'', modalTitle:'Add Category'}})
  }

  handleChange = (e) =>{
    const field = e.target.id
    let catData = this.state.catData
    catData[field] = e.target.value
    this.setState({ catData })
  }

  deleteHandler = (id, e) =>{
    this.props.deleteCategory(id)
    .then(() =>{
      toastr.success('Category Deleted Successfully')
      this.props.loadCategories(`${url}category?page=${this.props.page}`)
      let localurl = url +'myrecipes?page=1'
      this.props.loadRecipes(localurl)
    }).catch(() =>{
      toastr.error(this.props.message)
    })
  }

  handleEditData = (id) =>{
    this.props.loadCategory(`${url}category/${id}`).then(() =>{
      this.setState({
        catData:{
          cat_name:this.props.category.cat_name,
          cat_desc:this.props.category.cat_desc,
        },
        modalTitle:'Edit Category',
        categoryId:id
      })
    })
    this.setState({ show: true });
  }

  handleCategoryUpdate = (e) =>{
    e.preventDefault()
    this.props.updateCategory(this.state.categoryId,this.state.catData)
    .then(() =>{
      toastr.success('Category Updated Successfully')
      this.props.loadCategories(`${url}category?page=${this.props.page}`)
      this.handleClose()
    }).catch(xhr =>{
      toastr.error(this.props.message)
    })

  }

  addCategory = (e) =>{
    e.preventDefault()
    this.props.addCategory(`${url}category`,this.state.catData)
    .then(() =>{
      toastr.success('Category Created Successfully')
      this.props.loadCategories(`${url}category?page=1`)
      this.handleClose()
    }).catch(xhr =>{
      toastr.error(this.props.message)
      this.setState({ redirect: true });
    })
  }

  //Handle the link to the next page from pagination
  nextPage = (props) =>{
    if (props.has_next){
      this.props.loadCategories(props.next_page)
      .catch(xhr=>{
        this.setState({ redirect: true });
      })
    }
  }
  
  // Handle the link to the previous page from pagination
  previousPage =(props) =>{
      if(props.has_prev){
        this.props.loadCategories(props.previous_page)
        .catch(xhr=>{
          this.setState({ redirect: true });
        })
      }
  };

  // Handle the search functionality
  handleCategorySearch = (event) => {
    event.preventDefault();
    this.setState({showMessage:false,q: event.target.value,page:1});
    if(this.state.q){
        var updatedList = this.props.categories;
        updatedList = updatedList.filter(function(item){
          return item.cat_name.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        this.setState({categories: updatedList});
    if(this.state.categories.length===0){
        this.setState({
            showMessage:true
        })
    }
  }
}
  render() {
    const {catData,show, modalTitle, categories, q} = this.state
    return (
      <div className="CategoriesTable col-md-9">
        <h3>&nbsp;<a onClick={this.handleShow} className="btn btn-success pull-right" id="addCategory"> Add Category</a>
        <CategoryModal handleClose={this.handleClose} catData = {catData} show={show} message={this.props.message} modalTitle={modalTitle} handleChange={this.handleChange} handleCategoryUpdate={this.handleCategoryUpdate} addCategory={this.addCategory}/>
          <div className="col-xs-7 col-sm-4 pull-right">
            <div className="input-group mb-2 mb-sm-0">
              <div className="input-group-addon">Search</div>
              <input type="text" className="form-control" id="catSearch" onChange={this.handleCategorySearch} onKeyUp={this.handleCategorySearch} placeholder="Enter your search key words here!" />
            </div>
          </div>
        </h3><br />
        {this.props.loading
          ? <center id="loader"><i className="fa fa-spinner fa-pulse fa-4x fa-fw" /></center>
          : <div>
            {categories.length > 0
              ? <div>
                <Table className="table table-striped responsive">
                  <tbody id="tbody">
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>

                    {!q?this.props.categories.map((category, index) =>
                      <CategoryTableRows id={index + 1} key={category.cat_id}{...category} deleteHandler={this.deleteHandler} handleEditData={this.handleEditData} />)
                    :categories.map((category, index) =>
                    <CategoryTableRows id={index + 1} key={category.cat_id}{...category} deleteHandler={this.deleteHandler} handleEditData={this.handleEditData} />)
                    }
                  </tbody>
                </Table>
                <Pagination categoryData={this.props} nextPage={this.nextPage} previousPage={this.previousPage} />
              </div>

              : <center>
                  <div className="alert alert-info col-sm-8" id="no-categories">
                  <p>No categories at the moment!<a onClick={this.handleShow} className="btn btn-primary pull-right"> Add Category</a></p>
                  </div>
                </center>
            }
            </div>
        }
      </div>
    );
  }
}
export const mapStateToProps = (state, ownProps) => {
  let disableNext = '';
  let disablePrevious = '';
  if (state.categories.has_next) {
    disableNext = 'page-item';
  } else {
    disableNext = 'page-item disabled';
  }
  if (state.categories.has_prev) {
    disablePrevious = 'page-item';
  } else {
    disablePrevious = 'page-item disabled';
  }

  return {
    categories: state.categories.categories,
    category:state.categories.category,
    page: state.categories.page,
    total_pages: state.categories.total_pages,
    has_next: state.categories.has_next,
    has_prev: state.categories.has_prev,
    previous_page: state.categories.previous_page,
    next_page: state.categories.next_page,
    message: state.categories.message,
    disablePrevious,
    disableNext,
    loading: state.ajaxCallsInProgress > 0,
  };
};
export const mapDispatchToProps = dispatch => ({

  loadCategories: url => dispatch(loadCategories(url)),
  loadCategory: url => dispatch(loadCategory(url)),
  addCategory: (url,data) => dispatch(addCategory(url, data)),
  updateCategory: (id,data) => dispatch(updateCategory(id, data)),
  deleteCategory: (id) => dispatch(deleteCategory(id)),
  loadRecipes:(url) => dispatch(loadRecipes(url))    
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTable);
