import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as registerActions from '../../actions/registerAction'

class Register extends Component {

    constructor(props){
        super(props);
        this.state={
            userData:Object.assign({}, this.props.userData),
            message:'',
            color:'col-xs-11 alert alert-danger',
        }
    }
    handleChange = (event) => {
        const field = event.target.name
        let userData = this.state.userData
        userData[field] = event.target.value
        this.setState({ userData })
    }
    /*
    Register the user
    */
    componentWillReceiveProps(nextProps){
        this.setState({message:nextProps.message})
        if(nextProps.status){
            this.setState({
                color:'col-xs-11 alert alert-success',
            })    
        }
    }
    regUser = (e) =>{
        e.preventDefault();
        /*
        Make an api call
        */
        if(this.state.userData.cpassword !== this.state.userData.password){
            return this.setState({
                message: 'Passwords do not match',
                color:'col-xs-11 alert alert-danger'
            })
        }
        this.props.actions.register(this.state.userData);
        this.props.reset;
       }
    render(){
        
        const {userData, message, color} = this.state
        return (
        <div className="Register">
            <h1>Register Here</h1>
            {message
                ? <div className={color}>{message}</div>
                : <div></div> 
            }
            <form id="signup-form" onSubmit={this.regUser}>
                <div className="jumbotron col-xs-11">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" value={userData.name} onChange={this.handleChange} name="name" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" value={userData.username} onChange={this.handleChange} name="username" required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" value={userData.email} onChange={this.handleChange} name="email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" value={userData.cpassword} onChange={this.handleChange} name="cpassword" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Comfirm Password" value={userData.password} onChange={this.handleChange} name="password" required/>
                    </div>
                    <input type="submit" className="btn btn-primary pull-right" value="Register"/>

                    <center>
                        <p>or</p>
                        <p><a href="/login">Already a member? Click here to login</a></p>
                    </center>
                </div>
                
            </form>
            
        </div>
        );
    }
}
Register.propTypes = {
    message: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
}

function mapStateToProps(state, ownProps){
    return {
      message:state.message.message,
      status:state.message.status
    }
  }
  
  function mapDispatchToProps(dispatch){
    return{
      actions: bindActionCreators(registerActions, dispatch)
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps) (Register);
  