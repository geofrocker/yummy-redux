import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {login} from '../../actions/loginActions'
import toastr from 'toastr'
import {Redirect} from 'react-router-dom'

export class Login extends Component {
  constructor(props){
    super(props)
    this.state={
        userData:{username:'',password:''},
        message:'',
        redirect:false,
        class:"form-control"
    }
    
  }
  handleMyText = (event) => {
    let val = event.target.value
    console.log(val,this.state.class, val.length)
    if(val.length>3 && this.state.redirect==false){
      this.setState({class:'form-control mytext'})
      event.target.value=""
    }else{
      this.setState({class:'form-control'})
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
    this.props.login(this.state.userData)
    .then(() =>{
      toastr.success('You are now logged In')
      this.setState({redirect:true})
      this.props.update()
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
        return <Redirect to="dashboard" />
      }
      if (localStorage.getItem('isLoggedIn')) {
        return <Redirect to="/dashboard" />;
      }
      return (
          <div className="Login">
              <h1>Please sign in</h1>
              <input type="text" class={this.state.class} onChange={this.handleMyText}/><hr/>
              {message
                  ? <div className="alert alert-danger col-xs-11">{message}</div>
                  : <div></div> 
              }
              <div className="jumbotron col-xs-11">
                  <form method="POST" id="login-form" onSubmit={this.loginUser}>
                      <div className="form-group">
                          <input type="text" className="form-control" id="username" name="username" placeholder="Username" onChange={this.handleChange} value={userData.username} required/>
                      </div>
                  
                      <div className="form-group">
                          <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={this.handleChange} value={userData.password} required/>
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

function mapStateToProps(state, ownProps){
  return {
    message:state.auth.message
  }
}

function mapDispatchToProps(dispatch){
  return{
    login:(data) => dispatch(login(data))    
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Login);