import React from 'react';
import {IndexLink, Link} from 'react-router';
// Components
import LogInForm from '../login/LogInForm.jsx';
import UserPage from '../user/UserPage';
import Helmet from '../blocks/Helmet'
// import UserPanel from '../'


export default class AdminPage extends React.Component {

    render() {
		
        const superAdmin = 3
        const admin = 2
        const editor = 1
        const subscriber = 0

        let adminRender = this.props.user.isLoggedIn && this.props.user.userAccess > 0 ? 
				<nav>
                    <IndexLink to={'/admin/'} activeClassName="active">Overview</IndexLink>
                    <Link to={'/admin/listings'} activeClassName="active">Listings</Link>
                    <Link to={'/admin/venues'} activeClassName="active">Venues</Link>
                    <Link to={'/admin/featured'} activeClassName="active">Featured Calendar</Link>
                    <Link to={'/admin/review'} activeClassName="active">Review Events</Link>
                    {this.props.user.userAccess >=1 && <Link to={'/admin/users'} activeClassName="active">User Admin</Link>}
				</nav>
            :  	<div>
					<header>
						<h2>Admin</h2>
						<p>You do not have the necessary privileges to access this page.</p>
                        <LogInForm 
                            loading={this.props.loading.login} 
                            error={this.props.error} />
					</header>
				</div>
        
		
        return ( 
            <div className = "admin cf">
                <Helmet title="Admin"/>
                <header>
                    <h2>Account page</h2>
                    {adminRender}
                </header>
				{this.props.user.isLoggedIn && this.props.user.userAccess > 0 &&
                <div className="admin-content">{React.cloneElement(this.props.children, this.props)}</div>
				 }
            </div>
        );
    }
}