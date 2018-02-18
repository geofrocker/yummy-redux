import React, { Component } from 'react';
import {connect} from 'react-redux'
import {register} from '../../actions/registerActions'
import toastr from 'toastr'
import {Redirect} from 'react-router-dom'

export class Register extends Component {

    constructor(props){
        super(props);
        this.state={
            userData:{username:'', password:'',name:'',email:'',cpassword:''},
            message:'',
            color:'col-xs-11 alert alert-danger',
            redirect:false
        }
    }

    handleChange = (event) => {
        const field = event.target.name
        let userData = this.state.userData
        userData[field] = event.target.value
        this.setState({ userData })
    }
    regUser = (e) =>{
        e.preventDefault();
        this.setState({
            color:'col-xs-11 alert alert-danger'
        })
        if(this.state.userData.cpassword !== this.state.userData.password){
            return this.setState({
                message: 'Passwords do not match',
                color:'col-xs-11 alert alert-danger'
            })
        }
        this.props.register(this.state.userData).then((response) =>{
            return this.setState(() =>{
                toastr.success('You are now registered')
                return {
                    color:'col-xs-11 alert alert-success',
                    userData:{username:'', password:'',name:'',email:'',cpassword:'',},
                    redirect:true
                }
                
            })
        }).catch(error =>{
            return this.setState(() =>{
                return{
                    color:'col-xs-11 alert alert-danger',
                    message:error.response?error.response.data.Message:'An Error occurred, Try again',
                    userData:{password:'',cpassword:''}
                };
            });
        });
    }
    render(){
        const {userData, message, color,redirect} = this.state
        if(redirect){
            return <Redirect to="/login"/>
        }
        if (localStorage.getItem('isLoggedIn')) {
            return <Redirect to="/dashboard" />;
        }
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
                        <input type="text" className="form-control" placeholder="Name" value={userData.name} onChange={this.handleChange} name="name" id="name" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" value={userData.username} onChange={this.handleChange} name="username" id="username" required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" value={userData.email} onChange={this.handleChange} name="email" id="email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" value={userData.cpassword} onChange={this.handleChange} name="cpassword" id="cpassword" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Comfirm Password" value={userData.password} onChange={this.handleChange} name="password" id="password" required/>
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

function mapStateToProps(state, ownProps){
    return {
      message:state.auth.message,
      status:state.auth.status
    }
}
  
export const mapDispatchToProps = (dispatch) =>({
        register:(data) => dispatch(register(data))    
})
export default connect(mapStateToProps, mapDispatchToProps) (Register);
  