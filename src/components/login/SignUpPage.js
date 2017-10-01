import React from 'react';
import {Link} from 'react-router';
import SignUpForm from './SignUpForm';


export default class LogInPage extends React.Component {

    render() {
        
        return ( 
            <div className = "admin">
                <header>
                    <h2>Sign Up</h2>
                </header>
                <SignUpForm />
                Already signed up? <Link to={'/login'} activeClassName="active">Log In</Link>
            </div>
        );
    }
}