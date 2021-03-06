import React from 'react'
//COMPONENTS
import {Link} from 'react-router'
import DateBlock from '../blocks/DateBlock'
import ListingNameDisplay from '../blocks/ListingNameDisplay'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Alert} from 'reactstrap'

//Find today's date
let today = moment()

export default class VenueItem extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            expired: false,
            soon: false,
            archived: false,
            old: false,
            upcoming: false,
            currentListings: [],
            expiredDate: '',
            nextListing: ''
        }
        
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount(){

        //Check if it has been used recently and is not disabled
        this.props.listings
			? this.props.listings.length == 0 && this.setState({ expired: true})
            : this.setState({ expired: true})
        this.props.disabled 
            && this.setState({ old: true})
        //Check if it has a current listing
        if (!this.props.disabled && this.props.listings) {
            var allCurrent = []
            this.props.listings.map(function (listing) {
                let listingStart = moment(listing.start)
                let listingEnd = moment(listing.end)
                
                if (listingEnd.isSameOrAfter(today, 'day') && listingStart.isSameOrBefore(today, 'day')){
                    allCurrent.push(listing)
                    this.setState({
                        expired: false
                    })
                }
                if (listingStart.isAfter(today, 'day')){
                    this.setState({
                        upcoming: true
                    })
                    if (!this.state.nextListing || moment(this.state.nextListing.start) <  listingStart){
                        this.setState({
                            nextListing: listing
                        })
                    }
                    
                }
            }, this);   

            this.setState({
                currentListings: allCurrent
            })
        }
        
    }
        
    render() {

        
        let classNames = ['venue']
        this.state.old && classNames.push('old')
        this.state.expired && classNames.push('expired') 
        this.state.upcoming && classNames.push('upcoming')

        let nextListing = this.state.nextListing
        
        let currentListings = (listings) => listings.map((listing) =>
                {
            return <div className="venueListing" key={listing._id}><ListingNameDisplay {...listing} /> - Expires <DateBlock date={listing.end} /></div>
        })
          
    return (
      <div className={classNames.join(' ')} id={this.props._id}>
        <Link to={"/venue/" + this.props.slug}>{this.props.name}</Link> 
        {this.props.website &&
            <a href={this.props.website} target="_blank"><FontAwesomeIcon icon={['fal', 'external-link-square']} /></a>}

            {!this.state.old && currentListings(this.state.currentListings)}
            {nextListing && <div>Upcoming: <ListingNameDisplay {...nextListing} /> - Starting <DateBlock date={nextListing.start}/></div>}

            {!this.props.zipcode && <p className="warning">This Venue needs a zipcode</p>}
            {(!this.props.coordinates || !this.props.coordinates.lat) && <Alert color="danger">This Venue needs coordinates</Alert>}
      </div>
    );
  }
}