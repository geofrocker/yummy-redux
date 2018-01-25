import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as homeRecipesActions from '../../actions/homeRecipesActions'
import Recipes from './Recipes'
import url from '../../config'
class Home extends Component {
    constructor(props, context){
        super(props);
        this.state = {
            data:[],
            showMessage:false, 
            q:'', 
            page:1, 
            has_next:false, 
            next_page:'',
            previous_page:'', 
            disablePrevious:'', 
            disableNext:'',
            url: url+'?page=1',
            pages:null
        };
        this.props.actions.loadPublicRecipes(this.state.url)
    }
    
    //Load recipes before the component recieve props
    componentWillReceiveProps(nextProps){
        this.setState({
            data:nextProps.data.Recipe_list,
            showMessage:false,
            pages: nextProps.data.total_pages
        })
        if(nextProps.data.previous_page === 'Null'){
            this.setState({
                disablePrevious: 'page-item disabled',
                previous_page: ''
                });
        }else{
            this.setState({
                previous_page: nextProps.data.previous_page,
                disablePrevious: 'page-item'
                });
        }
        if(nextProps.data.next_page === 'Null'){
            this.setState({
                disableNext: 'page-item disabled',
                next_page: '',
                });
        }else{
            this.setState({
                next_page: nextProps.data.next_page,
                disableNext: 'page-item'
                });
        }
    }

    //Handle the link to the next page from pagination
    nextPage() {
        if (this.state.next_page)
            this.props.actions.loadPublicRecipes(this.state.next_page)
            return this.setState({
                page:this.state.next_page[this.state.next_page.length -1]
            })
    }

    // Handle the link to the previous page from pagination
    previousPage() {
        if(this.state.previous_page)
        this.props.actions.loadPublicRecipes(this.state.previous_page)
        return this.setState({
            page:this.state.previous_page[this.state.previous_page.length -1]
        })
    };

    // Handle the search functionality
    handleSearch = (event) => {
        event.preventDefault();
        this.setState({
            q: event.target.value,
            page:1
        });
        if(this.state.q){
            let localurl = url +'?q='+this.state.q+'&page='+this.state.page
            this.props.actions.loadPublicRecipes(localurl)
        }
    }
    render(){
        const {data, disableNext, disablePrevious, page, pages, showMessage, }=this.state
        let loadPagination;
        if (data.length>0) {
            loadPagination =
           <div className="col-xs-11 col-sm-3 pull-right">
                <ul className="pagination">
                    <li className={disablePrevious}>
                    <a className="page-link" onClick={() => this.previousPage()}>Previous</a>
                    </li>
                    <li className={disableNext}>
                    <a className="page-link" onClick={() => this.nextPage()}>Next</a>
                    <a className="page-link">Showing {page} of {pages}</a>
                    </li>
                    
                </ul>
            </div> 
        }
        let loadNavBarContent;
        if (showMessage) {
           loadNavBarContent =
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
                {loadNavBarContent}
                <hr/>
                    {data.map(inf =>
                    <Recipes key={inf.recipe_id} {...inf}/>
                    )}
                </div>
                {loadPagination}
            </div>
    );
    }
}

Home.propTypes = {
    data: PropTypes.object.isRequired,
  }
  
  function mapStateToProps(state, ownProps){
    return {
      data:state.publicRecipes
    }
  }
  
  function mapDispatchToProps(dispatch){
    return{
      actions: bindActionCreators(homeRecipesActions, dispatch)
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps) (Home);