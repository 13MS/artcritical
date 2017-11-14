import React from 'react';
import ListActions from '../../actions/ListActions';
import Display from '../../actions/displayActions';
import VenueItem from '../venues/VenueItem';

export default class VenuesPage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        ListActions.getVenuesAdmin();
    }

    render() {
        let secondaryNH = ''
        let newSecondaryNH = ''
        let renderExport = []
        let title = ''
        let num = this.props.allVenues.length - 1
        
        let neighborhood = (name) => (<h2>{name}</h2>)
        
        let theVenuesRender = venues => venues.map((venue, index) => {
            
            let result = <VenueItem key={venue._id} {...venue} />
                
            newSecondaryNH = venue.neighborhood;
            
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
            <div className = "venuesWrap">
                <h2>Venues</h2>
                {theVenuesRender(this.props.allVenues)}
            </div>
        );
    }
}