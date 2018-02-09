import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import toastr from 'toastr'
import { loadRecipes} from '../../actions/recipesActions'
import Recipes from './Recipes'
import url from '../../config'
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {showMessage:false, q:'', page:1, url: url+'?page=1', redirect:false};
        this.props.loadRecipes(this.state.url)
        .catch(xhr =>{
            let defaultResponse = "An Error occurred, Try again";
            toastr.error(xhr.response ? xhr.response.data.message: defaultResponse)
            this.setState({redirect:true})
            console.log(this.state.redirect)
          })
    }

    //Handle the link to the next page from pagination
    nextPage() {
        if (this.props.has_next){
            this.props.loadRecipes(this.props.next_page)
        }
    }

    // Handle the link to the previous page from pagination
    previousPage() {
        if(this.props.has_prev){
            this.props.loadRecipes(this.props.previous_page)
        }
    };

    // Handle the search functionality
    handleSearch = (event) => {
        event.preventDefault();
        this.setState({showMessage:false,q: event.target.value,page:1});
        if(this.state.q){
            let localurl = url +'?q='+this.state.q+'&page='+this.state.page
            this.props.loadRecipes(localurl)
        }else{
            let localurl = url +'?page='+this.state.page
            this.props.loadRecipes(localurl)
        }
        if(this.props.recipes.length===0){
            this.setState({
                showMessage:true
            })
        }
    }
    render(){
        const {page, recipes, disableNext, disablePrevious, total_pages}=this.props
        if(this.state.redirect){
            return <Redirect to='/error'/>
        }
        let loadPagination;
        if (recipes.length>0) {
            loadPagination =
           <div className="col-xs-11 col-sm-3 pull-right">
                <ul className="pagination">
                    <li className={disablePrevious}>
                    <a className="page-link" onClick={() => this.previousPage()}>Previous</a>
                    </li>
                    <li className={disableNext}>
                    <a className="page-link" onClick={() => this.nextPage()}>Next</a>
                    <a className="page-link">Showing {page} of {total_pages}</a>
                    </li>
                    
                </ul>
            </div> 
        }
        let loadSearchBarContent;
        if (this.state.showMessage) {
            loadSearchBarContent =
           <div className="Home jumbotron" id="search-bar">
                <h3>No recipes matched your query.</h3>
            </div>
        }
        return (
            <div className="Home">
                <div className="col-xs-12 col-sm-6 pull-right">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">Search</div>
                        <input type="text" className="form-control" onChange={this.handleSearch} onKeyUp={this.handleSearch} id="search" placeholder="Enter your search key words here!"/>
                    </div>
                </div>
                <div className="col-xs-12">
                {loadSearchBarContent}
                <hr/>
                    {recipes.map(inf =>
                    <Recipes key={inf.recipe_id} {...inf}/>
                    )}
                </div>
                {loadPagination}
            </div>
    );
    }
}

Home.propTypes = {
    recipes: PropTypes.array.isRequired,
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
        message:state.message,
        disablePrevious,
        disableNext
    }
  }
  
  export const mapDispatchToProps = (dispatch) => ({
    loadRecipes:(url) => dispatch(loadRecipes(url))    
  })

  export default connect(mapStateToProps, mapDispatchToProps) (Home);
  