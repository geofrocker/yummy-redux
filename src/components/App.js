import React, {Component} from 'react';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
import {Navbar, MenuItem, NavDropdown, Nav, NavItem} from 'react-bootstrap';
// Import custom components
import Home from './home/Home'
import Register from './register/Register'
import Login from './login/Login'
import Dashboard from './dashboard/Dashboard'
import ErrorBoundaryAppContainer from '../components/ErrorBoundary';
import Review from './reviews/Reviews'
import NotFound from './notFound/NotFound'

export class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn:localStorage.getItem('isLoggedIn')
        }
    }
    handleUpdate = () =>{
        this.setState({isLoggedIn:localStorage.getItem('isLoggedIn')})
    }
    handlelogout = (e) =>{
        localStorage.clear()
        this.setState({isLoggedIn:false})
    }
    render(){
        let loadNavBarContent;
        if (this.state.isLoggedIn) {
           loadNavBarContent =
            <Nav pullRight>
                <NavItem>{this.props.loading && <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>}</NavItem>
                <NavDropdown title={'Logged in as '+localStorage.getItem('user')} id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}><Link id="link-color" to="/dashboard">Dashboard</Link></MenuItem>
                    <MenuItem eventKey={3.2} onClick={this.handlelogout}>Logout</MenuItem>
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
                            <Link to="/"><span><img src={require('../static/img/andela.png')} width='24' alt="logo"/></span>
                            Yummy Recipes</Link>
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
                            <Route path="/login" render={ routeProps => <Login {...routeProps} update={this.handleUpdate}/> }/>
                            <Route path="/dashboard" component={Dashboard}/>
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

function mapStateToProps(state, ownProps){
    return {
        loading: state.ajaxCallsInProgress > 0
    }
}
export default connect(mapStateToProps)(App)