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

        this.handleSelectChange = this.handleSelectChange.bind(this);        
      }
    
    componentWillUnmount(){
        ListActions.listingEditReset();
    }
    
    handleSelectChange (data) {
        if (data){
			if (data.label == data.value) {
				//New Listing
				ListActions.listingInfoChange({target:{
					name: 'name',
					value: data.value
				}})
			} else {
				//Fetch all the venue info
            	ListActions.getListingInfo(data.value);	
			}
        } else {
			//Reset
			ListActions.listingEditReset();
		}
    }
    
    render() {
        
        //how to get option for select element
        const getOptions = (input) => {
            if (input) {
                return fetch('/list/find/' + input)
                .then((response) => {
                  return response.json();
                }).then((json) => {
                  return { options: json };
                });   
            } else {
                return Promise.resolve({ options: [] });
            }
        }
        
        return ( 
            <div>
                <h3>Edit Listing</h3>
                <div id="ListingList">
                        <Select value={{
                            value: this.props.listingEdit._id, 
                            label: this.props.listingEdit.name}
                        } 
                        handleSelectChange={this.handleSelectChange} 
                        getOptions={getOptions} 
                        />
                </div>
                <div id="ListingInfo">
                    <div className="medium">
                        <Listing listing={this.props.listingEdit} user=""/>
                    </div>
                </div>
                <div className="listingForm">
                    <ListingForm 
                        listing={this.props.listingEdit} 
                        error={this.props.error.updatelisting} 
                        loading={this.props.loading.updatelisting}
                        success={this.props.success}/>
                </div>
            </div>
        );
    }
}