import React from 'react';
import AuthActions from '../../actions/AuthActions';
import ListActions from '../../actions/ListActions';
//COMPONENTS
import {Link } from 'react-router';
import Date from '../blocks/DateBlock.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ListingCluster extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            fullInfo: false
        }
        
        // Function binding
        this._revealInfo = this._revealInfo.bind(this)
        this.addToList = this.addToList.bind(this)
    }
    
    //Function to add a listing to the personal list
    addToList(e, listing){
        if (this.props.user._id){
            //Select this listing
            var thislisting = $(e.target).closest('.listing');

            //Add or remove the listing to the user's list
            console.log(listing)
            AuthActions.addToUserList(listing);

            thislisting.toggleClass('selected');
        }
    }

    _editListing(listing){
        ListActions.editListing(listing)
        ListActions.toggleSideBar()
    }

    _revealInfo(){
        this.setState({
            fullInfo: !this.state.fullInfo
        })
    }

    eventsDisplay(events){
        return events.map((event, index) => {
            return <div className="event" key={index}>
                    <FontAwesomeIcon icon={['fal', 'glass-martini']}/> {event.name} {this.props.start && <Date date={event.date} /> } {event.description && '- ' + event.description}
            </div>
        })

    }
        
    render() {

        //Use the first listing to get the venue information
        let listing = this.props.listings[0]
        const id = listing._id;

        let eventsPresence = listing.events && listing.events.length > 0 ? true : false
        
        //Display address
        let address = <span>{listing.venue.address1} {listing.venue.address2}{(listing.venue.address2 !== '' && listing.venue.city !== '') && ', ' }{listing.venue.city}</span>

        //Display date according to type of listing and view
        var dateDisplay = <span>Until <Date date={listing.end}/></span>

        //display the listings
        let displayListings = listings => listings.map((currentListing, index) => {
            return <p key={currentListing._id}><span className="title">{currentListing.name}</span> {dateDisplay}</p>
        })
        
        // Check if the listing is in mylist
        let mylistIndex = 0;
        if (this.props.user.mylist) {
            mylistIndex = this.props.user.mylist.filter(function(v) {
                return v._id === id;
            }).length;   
        }
        let mylistingIcon = mylistIndex > 0 ? ["far", "minus"] : ["far", "plus"]

        const image = listing.image? "https://res.cloudinary.com/artcritical/image/upload/" + listing.image + ".jpg" : 'https://image.freepik.com/free-vector/hexagonal-pattern_1051-833.jpg'
        const style = {backgroundImage: 'url(' + image + ')'}
      
      
    return (
        <div className = {"listing " + (this.state.fullInfo ? 'active ' : '') + (mylistIndex > 0 ? 'selected' : 'notselected') } id={id}>
            <div className="listingAdd">
                {this.props.mylisting ? 
                    <span>{this.props.number}</span>
                   :
                    <div className={this.props.user._id? "addButton active" : "addButton" } onClick={(e) => this.addToList(e, listing)} style={style}>
                        {this.props.user._id &&
                        <FontAwesomeIcon icon={mylistingIcon} />
                        }
                    </div>
                }
            </div>
            <div className = "listingContent">
                <div className="header">

                    {displayListings(this.props.listings)}

                    <p><a className="venueName" href={"/venue/" + listing.venue.slug}>{listing.venue.name}</a> - {address}</p>

                    <div className="icons">
                        {(listing.description || eventsPresence) && <FontAwesomeIcon icon={['fal', 'info-circle']} onClick={this._revealInfo}/>}
                        {eventsPresence && <span className="events"><FontAwesomeIcon icon={['fal', 'glass-martini']}/></span>}
                        {listing.popularity >= 5 && <span className="popular"><FontAwesomeIcon icon={['fas', 'star']}/></span>}
                    </div>

                    <div className="listingActions">
                        {this.props.mylisting && //If you are seeing this on your myList page
                        <a onClick={(e) => this.addToList(e, listing)} className="delete"><FontAwesomeIcon icon={['fal', 'trash']}/></a> }
                        {this.props.user.userAccess > 0 && //If you are seeing this as an editor
                        <a onClick={(e) => this._editListing(listing)} className="edit"><FontAwesomeIcon icon={['fal', 'edit']}/></a> }
                    </div>
                </div>
                {this.state.fullInfo &&
                    <div className="moreInfo">
                        <p>{listing.description}</p>
                        {listing.events && <div className="events">
                            {this.eventsDisplay(listing.events)}
                        </div>}
                    </div>
                }
            </div>
        </div>
    );
  }
}