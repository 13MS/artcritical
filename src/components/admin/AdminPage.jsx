import React from 'react';
import {IndexLink, Link} from 'react-router';
// Components
import LogInForm from '../login/LogInForm.jsx';


export default class IndexPage extends React.Component {

    render() {
		console.log(this.props.user)
        let adminRender = this.props.user.isLoggedIn ?
            <div className = "admin cf">
                <header>
                    <h2>Account page</h2>
                    <IndexLink to={'/account'} activeClassName="active">Account</IndexLink>
                    <Link to={'/account/newlisting'} activeClassName="active">New Listing</Link>
                    <Link to={'/account/editlisting'} activeClassName="active">Edit Listing</Link>
                    <Link to={'/account/editvenue'} activeClassName="active">Edit Venue</Link>
					<Link to={'/account/venuesadmin'} activeClassName="active">All Venues</Link>
                    <Link to={'/account/featured'} activeClassName="active">Featured Listings</Link>
                </header>
                <div className="admin-content">{React.cloneElement(this.props.children, this.props)}</div>
            </div>
            :
            <div>
                <header>
                    <h2>Admin</h2>
                    <p>Please login to have access to your account</p>
                </header>
                <LogInForm loading={this.props.isLoggingIn} />
            </div>
        
        return ( 
            <div>
              {adminRender}
            </div>
        );
    }
}