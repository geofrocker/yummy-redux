import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as LoginActions from '../../actions/loginActions'
import toastr from 'toastr'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  constructor(props, context){
    super(props, context)
    this.state={
        userData:{username:'',password:''},
        message:'',
        redirect:false
    }
    
  }

  handleChange = (event) => {
    const field = event.target.name
    let userData = this.state.userData
    userData[field] = event.target.value
    this.setState({ userData })
  }
    
  loginUser = (e) =>{
    e.preventDefault();
    this.props.actions.login(this.state.userData)
    .then(() =>{
      toastr.success('You are now logged In')
      this.setState({redirect:true})
    })
    .catch(xhr=>{
      return this.setState(() =>{
        return {
          message:xhr.response?xhr.response.data.error:'An Error occurred, Try again',
          userData:{username:'', password:''}
          }
    })
  })}

  render(){
      const {redirect,userData, message}=this.state
      if(redirect){
        return <Redirect to="/" />
      }
      return (
          <div className="Login">
              <h1>Please sign in</h1>
              {message
                  ? <div className="alert alert-danger col-xs-11">{message}</div>
                  : <div></div> 
              }
              <div className="jumbotron col-xs-11">
                  <form method="POST" id="login-form" onSubmit={this.loginUser}>
                      <div className="form-group">
                          <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} value={userData.username} required/>
                      </div>
                  
                      <div className="form-group">
                          <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} value={userData.password} required/>
                      </div>
                      
                      <input type="submit" className="btn btn-primary pull-right" value="Login"/>

                      <center>
                          <p>or</p>
                          <p><a href="/register">Click here to register</a></p>
                      </center>
                  </form>
              </div>
              
          </div>
      );
  }
}
Login.contextType ={
  router:PropTypes.object
}
Login.propTypes = {
  message: PropTypes.string.isRequired,
}

function mapStateToProps(state, ownProps){
  return {
    message:state.auth.message
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(LoginActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Login);