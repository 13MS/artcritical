import React from 'react';
import ListActions from '../../actions/ListActions';
var MapboxClient = require('mapbox');
var client = new MapboxClient('pk.eyJ1IjoiYXJ0Y3JpdGljYWwiLCJhIjoiY2o5ZWUzdGlrMmIydjJ3bnJpeWxsN2I1YSJ9.HKlVu4oYspR74CeCdVouRg');
//COMPONENTS
import MapBlock from '../blocks/mapBlock';
import VenueListings from './VenueListings';
import VenueContent from './VenueContent';
import Tabs from '../tabs.jsx';


export default class VenuePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.componentWillMount = this.componentWillMount.bind(this);
    }
    
    componentWillMount(){
        ListActions.getVenueInfo(this.props.params.id);
    }

    render() {
        
        // Get coordinates
        const fullAdress = this.props.venue.address 
                                ? this.props.venue.address + ' ' + this.props.venue.city
                                : null
        const venueId = this.props.venue._id
        
        if (fullAdress && !this.props.venue.coordinates) {
            client.geocodeForward(fullAdress, function(err, data, res) {
                const newCoords = data.features[0].center;
                ListActions.updateVenue(newCoords, venueId);
            })
        }
        
        return ( 
            <div className="venuePage">
                <VenueContent venue={this.props.venue}/>
                {this.props.venue.coordinates && <MapBlock {...this.props.venue} />}
                <div className="listingsWrap">
                    <Tabs>
                        <VenueListings view={this.props.view} listings={this.props.venue.currentListings} mylist={this.props.mylist} label="Current Shows" />
                        <VenueListings view={this.props.view} listings={this.props.venue.upcomingListings} mylist={this.props.mylist} label="Upcoming Shows" />
                        <VenueListings view={this.props.view} listings={this.props.venue.pastListings} mylist={this.props.mylist} label="Past Shows" />
                    </Tabs>
                </div>
            </div>
        );
    }
}