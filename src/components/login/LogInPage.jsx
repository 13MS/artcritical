import React from 'react';
import {Link, browserHistory} from 'react-router';
import AuthActions from '../../actions/AuthActions';
import ListActions from '../../actions/ListActions';
import { Redirect } from 'react-router-dom';
//COMPONENTS
import LogInForm from './LogInForm.jsx';

export default class LogInPage extends React.Component {
    
    constructor(props) {
        super(props);
      }

    render() {
        
        const loggedIn = this.props.user.isLoggedIn
        const Router = this.context.router

        if (loggedIn) {
            setTimeout(function() {
                ListActions.getMylist();
                Router.push('/');
            }, 0);
        }
        
        return ( 
            <div className = "admin">
                <header>
                    <h2>Login</h2>
                </header>
                <div className="admin-content">
                <LogInForm loginFunction={AuthActions.attemptLogIn} />
                <a href="/auth/facebook">Login with Facebook</a>
            </div>
                Need to sign up? <Link to={'/signup'} activeClassName="active">Sign Up</Link>
            </div>
        );
    }
}

LogInPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};