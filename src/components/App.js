import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
import {Navbar, MenuItem, NavDropdown, Nav, NavItem} from 'react-bootstrap';
// Import custom components
import Home from './home/Home'
import Register from './register/Register'
import Login from './login/Login'
import Logout from '../components/logout/Logout'
import Dashboard from './dashboard/Dashboard'
// import AddRecipe from './add_recipe'
// import EditRecipe from './edit_recipe'
// import AddCategory from './add_category'
// import EditCategory from './edit_category'
import ErrorBoundaryAppContainer from '../components/ErrorBoundary';
import Review from './reviews/Reviews'
import NotFound from './notFound/NotFound'

class App extends Component {
    handlelogout = (e) =>{
        localStorage.clear()
    }
    render(){
        let loadNavBarContent;
        if (localStorage.getItem('isLoggedIn')) {
           loadNavBarContent =
            <Nav pullRight>
                <NavItem>{this.props.loading && <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>}</NavItem>
                <NavDropdown title={'Logged in as '+localStorage.getItem('user')} id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} href="/dashboard">Dashboard</MenuItem>
                    <MenuItem eventKey={3.2} onClick={this.handlelogout} href="/logout">Logout</MenuItem>
                </NavDropdown>
            </Nav>
        }else {
            loadNavBarContent = 
            <ul className="nav navbar-nav navbar-right">
                {this.props.loading && <li><a><i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i></a></li>}
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        }
        return(
            <Router>
                <div>
                    <Navbar inverse collapseOnSelect fixedTop>
                        <Navbar.Header>
                            <Navbar.Brand>
                            <a href="/"><span><img src={require('../static/img/andela.png')} width='24' alt="logo"/></span>
                            Yummy Recipes</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            {loadNavBarContent}   
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/login" component={Login}/>
                            <Route path ="/logout" component={Logout}/>
                            <Route path="/dashboard" component={Dashboard}/>
                            {/* <Route path="/add_recipe" component={AddRecipe}/>
                            <Route path="/edit_recipe/:recipe_id" component={EditRecipe} />
                            <Route path="/add_category" component={AddCategory} />
                            <Route path="/edit_category/:cat_id" component={EditCategory} /> */}
                            <Route path="/recipe/:recipe_id" component={Review} />
                            <Route path="/error" component={ErrorBoundaryAppContainer} />
                            <Route path="*" exact={true} component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
App.propTypes ={
    loading: PropTypes.bool.isRequired
}
function mapStateToProps(state, ownProps){
    return {
        loading: state.ajaxCallsInProgress > 0
    }
}
export default connect(mapStateToProps)(App)