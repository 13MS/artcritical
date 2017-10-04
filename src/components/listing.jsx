import React from 'react';
import AuthActions from '../actions/AuthActions';
//COMPONENTS
import Date from './date.jsx';

export default class Listing extends React.Component {
    
    constructor(props) {
        super(props);
        
        // Function binding
        this.addToList = this.addToList.bind(this);
    }
    
    //Function to add a listing to the personal list
    addToList(e, listing){
        
        //Select this listing
        var thislisting = $(e.target).closest('.listing');
        
        //Add or remove the listing to the user's list
        AuthActions.addToUserList(listing);
        
        if (thislisting.hasClass('selected')){
            
            //Close the currently open tab
            $(thislisting).removeClass('selected');
            
        } else {
            
            //Open this listing
            $(thislisting).addClass('selected');
            
        }
    }
        
    render() {
        
    var end
    if (this.props.event !== true && this.props.end) {
        end = <span>to <Date date={this.props.end} /></span>;
    }
        const id = this.props._id;
        // Check if the listing is in mylist
        let mylistIndex = 0;
        if (this.props.mylist) {
            mylistIndex = this.props.mylist.filter(function(v) {
                return v._id === id;
            }).length;   
        }
        
        const image = this.props.image? "http://res.cloudinary.com/artcritical/image/upload/" + this.props.image + ".jpg" : 'http://www.qygjxz.com/data/out/193/3874945-random-picture.gif'
        const fullURL = 
      
      
    return (
      <div className = {mylistIndex > 0 ? 'listing selected' : 'listing notselected' } id={this.props._id}>
        <div className="listingAdd">
            <div className="addButton" onClick={(e) => this.addToList(e, this.props)}>
                <img src={image}/>
            </div>
        </div>
        <div className = "listingContent">
            <div className="header">
                <p>{this.props.name} {this.props.venue._id !== '' && ' at ' }<span className="venueName">{this.props.venue.name}</span></p>
                <p>{this.props.start && <Date date={this.props.start} /> } {end} </p>
            </div>
            <div className="moreInfo">
                <p>{this.props.venue.address}{(this.props.venue.address !== '' && this.props.venue.city !== '') && ', ' }{this.props.venue.city}</p>
                <p>{this.props.description}</p>
                <p>{this.props.receptionnotes}</p>
            </div>
        </div>
        <div className="listingClose">
            <i className="fa fa-plus-square-o" aria-hidden="true"></i>
            <i className="fa fa-minus-square-o" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}