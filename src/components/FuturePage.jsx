import React from 'react';
import {Link} from 'react-router';
import ListActions from '../actions/ListActions';
import Display from '../actions/displayActions';
//COMPONENTS
import Listing from './listing.jsx';
import SizeSelector from './blocks/sizeSelector';


export default class FuturePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        ListActions.getFuture();
    }

    render() {
        let secondaryNH = ''
        let newSecondaryNH = ''
        let renderExport = []
        let title = ''
        let num = this.props.futureListings.length - 1
        
        let neighborhood = (name) => (<h2>{name}</h2>)
        
        let thelistRender = futureListings => futureListings.map((listing, index) => {
            
            let result = <Listing key={listing._id} {...listing} user={this.props.user}/>
                
            newSecondaryNH = listing.venue.neighborhood;
            
            if ( newSecondaryNH !== secondaryNH) {
                
                //Add the result to the next export and reset the render
                var contentRender = <div key={index} className="neighborhood">{renderExport}</div>
                var newExport = [title, contentRender]
                renderExport = [];
                
                // Update neighborhood
                secondaryNH = newSecondaryNH
                newSecondaryNH = Display.displayNeighborhood(secondaryNH)
                title = neighborhood(newSecondaryNH)
                renderExport.push(result)
                
                // Export the last neighborhood
                return newExport
            } 
            
            renderExport.push(result)
            if (num == index){
                var contentRender = <div key={index} className="neighborhood">{renderExport}</div>
                var newExport = [title, contentRender]
                return newExport
            }
            return true;
        });
        
        return ( 
            <div className = "home">
                <h2>Future</h2>
                <SizeSelector view={this.props.view} />
                <div className={this.props.view + " listingsWrap"}>
                    {thelistRender(this.props.futureListings)}
                    {this.props.loading.future && <div className="loading">Loading...</div>}
                </div>
            </div>
        );
    }
}