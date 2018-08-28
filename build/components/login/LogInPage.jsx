import React from 'react';
import PropTypes from 'prop-types';
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
                Router.push('/');
            }, 0);
        }
        
        return ( 
            <div className = "SignIn">
                <div className="loginPage">
                    <h2>Login</h2>
                    <LogInForm 
                        loading={this.props.loading.login} 
                        error={this.props.error} />
            	</div>
            </div>
        );
    }
}

LogInPage.contextTypes = {
  router: PropTypes.object.isRequired
};