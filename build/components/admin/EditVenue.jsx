import React from 'react';
import ListActions from '../../actions/ListActions';
//Components
import Select from '../forms/formSelect';
import VenueForm from '../forms/VenueForm';
import MapBlock from '../blocks/mapBlock';
import {Button, Alert} from 'reactstrap';

var MapboxClient = require('mapbox');
var client = new MapboxClient(process.env.MapboxAccessToken);


export default class VenueEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formDisplay: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.calculateCoords = this.calculateCoords.bind(this)
        this.onCreateNew = this.onCreateNew.bind(this)
      }
    
    componentWillUnmount(){
        ListActions.venueEditReset();
    }
    
    // Add the listing to the database
    handleSubmit() {
        let newVenue = this.props.venueEdit
        //Format the website URL
        if (!/^https?:\/\//i.test(newVenue.website)) {
            newVenue.website = 'http://' + newVenue.website;
        }
		if (newVenue._id){
            ListActions.updateVenue(newVenue)
		} else {
			delete newVenue._id
			ListActions.saveVenue(newVenue)
		}
    }

    //Delete the listing
    handleDelete() {
        ListActions.deleteVenue(this.props.venueEdit._id)
		//Reset the form
        ListActions.venueEditReset();
        //Hide the form
        this.setState({
            formDisplay: false
        })
    }
    
    
    handleSelectChange (data) {
        if (data){
			this.setState({
                    formDisplay: true
                })
            if (data.label == data.value) {
				console.log('New Venue');
				//New Venue
				ListActions.venueInfoChange({
					name: 'name',
					value: data.value
				})
			} else {
				//Update venue
                ListActions.getVenueInfo(data.value);
            }
        } else {
			// If the reset form button is pressed
            ListActions.venueEditReset();
			this.setState({
                    formDisplay: false
                })
        }
    }

    onCreateNew(){
        ListActions.venueEditReset();
        this.setState({
            formDisplay: true
        })
    }

    calculateCoords(fullAdress){
        var self = this
		client.geocodeForward(fullAdress, function(err, data, res) {
			if (data.features[0]){
				const newCoords = data.features[0].center
                ListActions.coordinatesChange(newCoords)
                self.setState({
                    foundAddress: data.features[0].place_name
                })	
			}
		})
	}
    
    render() {
        
        //Get option for select element
        const getOptions = (input) => {
            if (input) {
                return fetch('/venues/find/' + input)
                .then((response) => {
                  return response.json();
                }).then((json) => {
                  return { options: json };
                });   
            } else {
                return Promise.resolve({ options: [] });
            }
        }

        //Have a select value only if editing an existing venue
        let selectValue = this.props.venueEdit._id && { value: this.props.venueEdit._id, label: this.props.venueEdit.name }
        
        return ( 
            <div className="editVenue cf">
                <h3>Edit Venue</h3>
                <div className="editHeader">
                        <Button onClick={this.onCreateNew}>New</Button>
                        <div className="search">
                            <Select 
                                value={selectValue} 
                                handleSelectChange={this.handleSelectChange} 
                                getOptions={getOptions} />
                        </div>
                </div>
                <div className="venueEditing">
					<div className="listingForm">
					{this.state.formDisplay && 
                        <VenueForm {...this.props.venueEdit} 
                            //newVenue={(this.props._id == '' || this.props._id == null && this.props.name !== '')}
                            handleSubmit = {this.handleSubmit}
                            handleDelete = {this.handleDelete}
                            error={this.props.error.updatevenue} 
                            calculateCoords={this.calculateCoords}
                            loading={(this.props.loading.updatevenue || this.props.loading.deletevenue)}
                            success={this.props.success}/>
						}
					</div>
                </div>
                {this.state.formDisplay && 
                    <div className="venueLocation">
                            <MapBlock {...this.props.venueEdit} />
                            {this.state.foundAddress && this.props.address1 &&
                                            <Alert color="secondary">Found by GPS: {this.state.foundAddress}</Alert>}
                    </div>
                }
            </div>
        );
    }
}