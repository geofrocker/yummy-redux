import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {loadRecipes, loadRecipe, loadCategories, updateRecipe, deleteRecipe, addRecipe} from '../../../actions/recipesActions'
import url from '../../../config'
import RecipeTableRows from './RecipeTableRows'
import Pagination from './Pagination'
import RecipeModal from './RecipeModal'
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';

export class RecipesTable extends Component{
  constructor(props){
    super(props)
    this.state = {showMessage:false, q:'', page:1, url: url+'myrecipes?page=1',show: false,selected:'',modalTitle:'Add Recipe',recipeId:'',
    recipeData:{title:'',category:'',ingredients:'',steps:'',status:'',category_rel:''},redirect: false
    };
  }
  componentDidMount(){
    this.props.loadRecipes(this.state.url)
    .catch(xhr =>{
      xhr.response.status ===500 || !xhr.response?this.setState({ redirect: true }): this.setState({ redirect: false })
    })
    this.props.loadCategories(`${url}category?page=1`)
  }
  
  addRecipe = (e) =>{
    e.preventDefault()
    this.props.addRecipe(this.state.recipeData)
    .then(() =>{
      toastr.success('Recipe Created Successfully')
      this.setState({recipeData:{title:'',category:'',ingredients:'',steps:'',status:''}})
      this.props.loadRecipes(`${url}myrecipes?page=1`)
      this.handleClose()
    }).catch(xhr =>{
      toastr.error(this.props.message)
    })
  }
  handleRecipeUpdate = (e) => {
    e.preventDefault()
    this.props.updateRecipe(this.state.recipeId,this.state.recipeData)
    .then(() =>{
      toastr.success('Recipe Updated Successfully')
      this.setState({recipeData:{title:'',category:'',ingredients:'',steps:'',status:''}})
      this.props.loadRecipes(`${url}myrecipes?page=${this.props.page}`)
      this.handleClose()
    }).catch(xhr =>{
      toastr.error(this.props.message)
    })
  }

  deleteHandler = (id,e) =>{
    this.props.deleteRecipe(id)
    .then(() =>{
      toastr.success('Recipe Deleted Successfully')
      this.props.loadRecipes(`${url}myrecipes?page=${this.props.page}`)
    }).catch(() =>{
      toastr.error(this.props.message)
    })
  }

  handeChange = (e) => {
    const field = e.target.id
    let recipeData = this.state.recipeData
    recipeData[field] = e.target.value
    this.setState({ recipeData })
  }

  handleClose = () =>{
    this.setState({ show: false });
  }
  handleEditData = (id) =>{
    this.props.loadRecipe(id).then(() =>{
      this.setState({
        recipeData:{
          title:this.props.recipe.title,
          category:this.props.recipe.category,
          ingredients:this.props.recipe.ingredients,
          steps:this.props.recipe.steps,
          status:this.props.recipe.status,
          category_rel:this.props.recipe.category_rel
        },
        modalTitle:'Edit Recipe',
        recipeId:id
      })
    })
    this.setState({ show: true });
  }

  handleShow = () =>{
    this.setState({show:true, recipeData:{title:'',category:'',ingredients:'',steps:'',status:''},selected:'selected'});
  }

  //Handle the link to the next page from pagination
  nextPage =(props) =>{
      if (props.has_next){
          props.loadRecipes(props.next_page)
          .catch(xhr=>{
            this.setState({ redirect: true });
          })
      }
  }

  // Handle the link to the previous page from pagination
  previousPage =(props) =>{
      if(props.has_prev){
          props.loadRecipes(props.previous_page)
          .catch(xhr=>{
            this.setState({ redirect: true });
          })
      }
  };
  // Handle the search functionality
  handleRecipeSearch = (event) => {
    event.preventDefault();
    this.setState({showMessage:false,q: event.target.value,page:1});
    if(this.state.q){
        let localurl = url +'myrecipes?q='+this.state.q+'&page='+this.state.page
        this.props.loadRecipes(localurl)
    }else{
        let localurl = url +'myrecipes?page='+this.state.page
        this.props.loadRecipes(localurl)
    }
    if(this.props.recipes.length===0){
        this.setState({
            showMessage:true
        })
    }
  }
  render(){
    if (this.state.redirect) {
      return <Redirect to="/error" />
    }
    return(
      <div className="RecipesTable">
        <h3>&nbsp;<a onClick={this.handleShow} className="btn btn-success pull-right"> Add Recipe</a>
        <RecipeModal handleClose={this.handleClose} show={this.state.show} selected={this.state.selected} recipeData={this.state.recipeData} message={this.props.message} categories={this.props.categories} modalTitle={this.state.modalTitle} handleChange={this.handeChange} handleRecipeUpdate={this.handleRecipeUpdate} addRecipe={this.addRecipe}/>
            <div className="col-xs-7 col-sm-4 pull-right">
                <div className="input-group mb-2 mb-sm-0">
                    <div className="input-group-addon">Search</div>
                    <input type="text" className="form-control" onChange={this.handleRecipeSearch} onKeyUp={this.handleRecipeSearch} placeholder="Enter your search key words here!" id="search"/>
                </div>
            </div>
        </h3><br/>
        {this.props.loading
          ?<center id="loader"><i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i></center>
          :<div>
            {this.props.recipes.length > 0
              ? <div>
                  {this.props.recipes.map((recipe, index) =>
                      <RecipeTableRows id={index + 1} key={recipe.recipe_id}{...recipe} deleteHandler={this.deleteHandler} handleEditData={this.handleEditData} />
                  )}
                  <Pagination recipeData={this.props} nextPage={this.nextPage} previousPage={this.previousPage}/>
                </div>
              
              : <div className="alert alert-info col-sm-8" id="no-recipes">
                  <p>No recipes at the moment!<a onClick={this.handleShow} className="btn btn-primary pull-right"> Add Recipe</a></p>
                </div>
            }
          </div>
        }
      </div>
    )
}
}

function mapStateToProps(state, ownProps){
    let disableNext = ""
    let disablePrevious = ""
    if(state.recipes.has_next){
      disableNext = "page-item"
    }else{
      disableNext = "page-item disabled" 
    }
    if(state.recipes.has_prev){
      disablePrevious = "page-item"
    }else{
      disablePrevious = "page-item disabled"
    }

  return {
      recipes:state.recipes.recipes,
      page:state.recipes.page,
      total_pages:state.recipes.total_pages,
      has_next:state.recipes.has_next,
      has_prev:state.recipes.has_prev,
      previous_page:state.recipes.previous_page,
      next_page:state.recipes.next_page,
      message:state.recipes.message,
      disablePrevious,
      disableNext,
      loading: state.ajaxCallsInProgress > 0,
      categories: state.categories.categories,
      recipe:state.recipes.recipe
  }
}

function mapDispatchToProps(dispatch){
  return{
    loadRecipes:(url) => dispatch(loadRecipes(url)),
    loadRecipe:(id) => dispatch(loadRecipe(id)),
    loadCategories:(url) => dispatch(loadCategories(url)),
    addRecipe:(data) => dispatch(addRecipe(data)),
    updateRecipe:(id,data) => dispatch(updateRecipe(id,data)),
    deleteRecipe:(id) => dispatch(deleteRecipe(id)),
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (RecipesTable);