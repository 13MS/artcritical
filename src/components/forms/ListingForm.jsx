import React from 'react'
import ToggleButton from 'react-toggle-button'
import ListActions from '../../actions/ListActions'
import {browserHistory} from 'react-router'; 
import { Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';


//Components
import DateRange from './formDateRange'
import DateSingle from './formDateSingle'
import Select from './formSelect'
import ThumbnailInput from './ThumbnailInput'



export default class ListingForm extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            event: this.props.event,
            updatevisible: false,
            deletevisible: false,
            modal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
        this.toggle = this.toggle.bind(this);

      }

     toggle() {
        this.setState({
          modal: !this.state.modal,
          updatevisible: !this.state.updatevisible
        });
      }

    onDismiss() {
        this.setState({ updatevisible: false });
    }

    //confirm alert
    onConfirm(event) {
        event.preventDefault();
        this.setState({ 
            updatevisible: true
        });
    }

     //confirm alert
    onDeleteConfirm(event) {
        event.preventDefault();
        this.setState({ 
            deletevisible: true
        });
    }

    onUpdateSubmit(event) {
        this.setState({ 
            updatevisible: false
        }); 
    }

    handleChange (event) {
        //Update values of inputs
        ListActions.listingInfoChange(event);
    }
    
    //Search as the user types in select box
    handleSelectChange (data) {
        if (data) {
            if (data.label == data.value) {
                // Create a new venue
				ListActions.venueInfoChange({ 
					name: 'name', 
					value: data.value
				})
				browserHistory.push('/admin/venues');
            } else {
                //Fetch all the venue info
                ListActions.getVenueInfo(data.value);
            }    
        } else {
            ListActions.resetVenue();
        }   
    }


    
    render() {
        
        //how to get option for select element
        const getOptions = (input) => {
            if (input){
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
        
        let venueData = { value: this.props.venue._id, label: this.props.venue.name}

        let updateModal = this.state.updatevisible ? 
                <Modal isOpen={this.state.updatevisible} toggle={this.toggle}>
                              <ModalBody toggle={this.toggle}>
                                {!this.props.loading && !this.props.success && !this.props.error.general ? "Confirm this update?" : null}

                                {this.props.loading && 
                                <div className='loading'>loading</div>
                                }
                                {this.props.success && 
                                    <div className='success'>Saved!</div>
                                }
                                {this.props.error.general && 
                                    <div className='error'>{this.props.error.savelisting.general}</div>
                                }
                              </ModalBody>
                              <ModalFooter>
                                {!this.props.success ? 
                                    <div>
                                        <Button color="primary" onClick={this.props.handleSubmit}>Confirm</Button>
                                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                                    </div>
                                :
                                    <Button color="success" onClick={this.toggle}>Close</Button>
                                }
                                
                                
                              </ModalFooter>
                </Modal> 
            : 
                null

        let deleteModal = this.state.deletevisible ?
                <Modal isOpen={this.state.deletevisible} toggle={this.toggle}>
                              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                              <ModalBody>
                                Confirm this update? 
                              </ModalBody>
                              <ModalFooter>
                                <Button color="primary" onClick={this.props.handleSubmit}>Confirm</Button>{' '}
                              </ModalFooter>
                </Modal> 
            :
                null

        
        let deleteButton = this.props.handleDelete ?
                <Button className="delete" color="danger" onClick={this.onDeleteConfirm}>Delete</Button>
            :
                null

        console.log(this.props)
        return ( 

            <div id="listingForm">

                <Form>
                    <FormGroup check>
                        <Label>Name</Label>
                        <div className="formSection">
                            <Input name="name" placeholder="Event name" type="text" value={this.props.name} onChange={this.handleChange} />
                        </div>
                    </FormGroup>
                    <FormGroup check>
                        <Label>Venue</Label>
                         <div className="formSection">
                          <Select value={venueData} handleSelectChange={this.handleSelectChange} getOptions={getOptions} />
                        </div>
                    </FormGroup>
                    <FormGroup check>
                        <Label>Event</Label>
                        <div className="formSection">
                            <ToggleButton
                              value={this.props.event}
                              onToggle={(value) => {
                                this.handleChange({'event': value})
                              }} />
                        </div>
                    </FormGroup>
                    <FormGroup check>
                        <Label> Dates </Label>
                        <div className="formSection">
                           {this.props.event ? //If an event
                                <DateSingle startDate={this.props.start} onDatesChange={this.handleChange}/>
                                : // If not an event
                                <DateRange startDate={this.props.start} endDate={this.props.end} onDatesChange={this.handleChange}/>
                           }
                        </div>  
                    </FormGroup>
                     <FormGroup check>
                        <Label>Description</Label>
                        <div className="formSection">
                            <Input type="textarea" name="description" value={this.props.description} onChange={this.handleChange} />
                        </div>
                    </FormGroup>
                     <FormGroup check>
                           <Label>Thumbnail</Label>
                            <ThumbnailInput {...this.props} /> 
					</FormGroup>
					
					<FormGroup>
						<Button onClick={this.onConfirm}>{this.props._id ? 'Update' : 'Create'}</Button>
                            {deleteButton}
                    </FormGroup>
                </Form>   
                        <Button color="danger" onClick={this.state.updatevisible}>Boom</Button>
                        {updateModal}
                        {deleteModal}
            </div>

           

        );
    }
}