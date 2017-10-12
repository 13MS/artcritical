import React from 'react';
import Display from '../../actions/displayActions';
import ListActions from '../../actions/ListActions';
//Components
import Listing from '../listing';
import Select from '../forms/formSelect';
import ListingForm from '../forms/ListingForm';


export default class ListingEdit extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            listing: "",
            listingInfo: {
                _id: '',
                venue: {}
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }
    
    componentWillUnmount(){
        ListActions.listingEditReset();
    }
    
    
    // Add the listing to the database
    handleSubmit() {
        let newListing = {
            _id: this.props.listingEdit._id,
            name: this.props.listingEdit.name,
            start: this.props.listingEdit.start,
            end: this.props.listingEdit.end,
            venue: this.props.listingEdit.venue._id,
            website: this.props.listingEdit.website,
            description: this.props.listingEdit.description,
            neighborhood: this.props.listingEdit.venue.neighborhood,
            image: this.props.listingEdit.image
        }
        ListActions.updateListing(newListing)
        ListActions.listingEditReset();
      }
    
    //Delete the listing
    handleDelete() {
        let oldListing = this.props.listingEdit._id
        ListActions.deleteListing(oldListing)
        ListActions.listingEditReset();
      }
    
    handleSelectChange (data) {
        if (data.value){
            //Fetch all the venue info
            ListActions.getListingInfo(data.value);
        }
    }
    
    render() {
        
        //how ot get option for select element
        const getOptions = (input) => {
          return fetch('/list/find/' + input)
            .then((response) => {
              return response.json();
            }).then((json) => {
              return { options: json };
            });
        }
        
        return ( 
            <div>
                <h3>Edit Listing</h3>
                <div id="ListingList">
                    <form onSubmit={this.handleSubmit}>
                        <Select value={{value: this.props.listingEdit._id, label: this.props.listingEdit.name}} handleSelectChange={this.handleSelectChange} getOptions={getOptions} />
                    </form>
                </div>
                <div id="ListingInfo">
                    <Listing {...this.props.listingEdit}/>
                </div>
                <div className="listingForm">
                    <ListingForm {...this.props.listingEdit} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} />
                </div>
            </div>
        );
    }
}