import React from 'react';
import {Link} from 'react-router';
import Listing from './listing';
import ListActions from '../actions/ListActions';
import AuthActions from '../actions/AuthActions';
import Display from '../actions/displayActions';


export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Get all listings
        ListActions.getAll();
    }

    render() {
        let nh = ''
        let thelist = mylist => this.props.allListings.map((listing) => {
            let newNh = listing.neighborhood;
            
            if ( newNh !== nh) {
                nh = newNh
                newNh = Display.displayCity(nh)
                return (
                    <div>
                        <h2>{newNh}</h2>
                        <Listing 
                            {...listing} 
                            mylist = {mylist}
                            addToList={(e) => this.addToList(e, listing)}
                            />
                    </div>
                )
            } else {
                return (
                  <Listing 
                      {...listing}
                      mylist = {mylist}
                      />
              )   
            }
        });
        
        
        return ( 
            <div className = "home">
                <h2>Landing page</h2>
                <div className = "listingsWrap">
                    {thelist(this.props.mylist)}
                </div>
            </div>
        );
    }
}