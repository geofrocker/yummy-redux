import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as recipesActions from '../../actions/recipesActions'
import Since from 'react-since';
import toastr from 'toastr'

const Reviews = props =>
<div className="col-sm-12">
    <blockquote>
        <p>{props.content}.</p>
        <footer>By {props.created_by} about <cite title="Time"><Since date={ props.create_date }/></cite></footer>
    </blockquote>
</div>;
    
class Review extends Component {
    constructor(props){
        super(props)
        let recipe_id = this.props.match.params.recipe_id;
        this.state = {
            recipe_id:recipe_id,
            color:'alert alert-danger',
            content:'',
        };
        this.props.actions.loadRecipe(this.state.recipe_id)
        this.props.actions.loadReviews(this.state.recipe_id)  
    }
    // update the state after the user has enter the review
    handleContentChange = (event) =>{
        this.setState({content: event.target.value})
    }
    
    //Make api call to the server to handle upvoting
    upVote = () =>{
        this.props.actions.upvoteRecipe(this.state.recipe_id)
        .then(()=>{
            toastr.success('Thank your vote!')
            this.props.actions.loadRecipe(this.state.recipe_id)
        })
        .catch(() => {
            toastr.error('Sorry! you have already voted!')
        });
    };
 
    // handle reviewing of the recipe
    review = (e) =>{
        e.preventDefault();
        let postData = {content: this.state.content}
        this.props.actions.createReview(this.state.recipe_id,postData).then(response =>{
            toastr.success('Thank you for your review')
            this.props.actions.loadRecipe(this.state.recipe_id)
            this.props.actions.loadReviews(this.state.recipe_id)
            this.setState({color:'alert alert-success'})
            this.refs.content.value='';
        })
    }
    render(){
        if (!localStorage.getItem('isLoggedIn')) {
            this.props.history.push('/login');
          }
        const {reviews,recipeData}=this.props
        let loadReviews;
        if (reviews.length<1) {
            loadReviews = 
            <div>
                <p>This recipe has no reviews yet</p><br/>
            </div>
           
        }else {
            loadReviews =
            <div>
                {reviews.map(inf =>
                <Reviews key={inf.review_id} {...inf}/>
                )}
            </div>
        }
        return (
            <div className="Review">
            {this.props.loading
            ?<center id="loader-recipes"><i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i></center>
            :<div>
                <div className="jumbotron">
                    <h3>{recipeData.title}<a href="/" className="btn btn-primary pull-right">Go back</a></h3>
                    <em>Added by <span className="fa fa-user"></span> { recipeData.created_by } about <span className="fa fa-calendar"></span> <Since date={ recipeData.create_date } /></em>
                    <hr/>
                    <div>
                        <h3>Ingredients</h3>
                        <small>{recipeData.ingredients}</small>
                        <h3>Steps</h3>
                        <small>{recipeData.steps}</small><br/><br/>
                        <div className="btn-group">
                            <button type="button" onClick={() => this.upVote(recipeData.recipe_id)} className="btn btn-primary btn-xs">UpVote</button>
                            <button type="button" className="btn btn-default btn-xs"><span className="fa fa-thumbs-o-up"></span> Upvotes:{recipeData.upvotes}</button>
                            <button type="button" className="btn btn-default btn-xs"><span className="fa fa-comment-o"></span> Reviews:{recipeData.reviews}</button>
                        </div>
                    </div>
                </div>
                <div className="jumbotron review">
                    <p>Reviews</p>
                    {loadReviews}
                    <form onSubmit={this.review} id="review-form">
                            <div className="form-group">
                                <textarea className="form-control" placeholder="Enter your Review!" id="content" ref="content" onChange={this.handleContentChange} required/>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary pull-right" value="Add Review"></input>
                            </div>
                            <br/>
                    </form>
                </div>
            </div>
            }
            </div>

        );
        
    }
}

Review.propTypes = {
  recipeData: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps){
  return {
    recipeData:state.recipes.recipe,
    reviews:state.recipes.reviews,
    message:state.recipes.message,
    review:state.recipes.review,
    loading: state.ajaxCallsInProgress > 0,
  }
}

function mapDispatchToProps(dispatch){
  return{
      actions: bindActionCreators(recipesActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Review);