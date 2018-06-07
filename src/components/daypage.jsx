import React from "react"
import {IntlProvider, FormattedDate} from "react-intl"
import ListActions from "../actions/ListActions"
import moment from "moment"
//COMPONENTS
import VenueList from "./blocks/VenueList"
import Loading from "./blocks/loading"
import FeatureBlock from "./blocks/featureBlock"

export default class DayPage extends React.Component {
    
    constructor(props) {
        super(props)
		
		this.state={
			date: moment(this.props.date).format().slice(0,10)
		}
    }

    render() { 

        let events = []
		let openings = []
		let closings = []
		
		this.props.glanceListings.map((listing) => {
            // Check if it is an event
            if ( listing.event == true) {// it IS an event
                moment(listing.start).format().slice(0,10) == this.state.date && events.push(listing)
                
            } else { //not an event
                //Check if it starts on this day
                if (moment(listing.start).format().slice(0,10) == this.state.date) {
                    openings.push(listing) 
                } 
                //Check if it ends on this day
                if (moment(listing.end).format().slice(0,10) == this.state.date) {
                    closings.push(listing)  
                } 
            }
                  
        })

        let totalListings = closings.length + events.length + openings.length
        
        return (
            <div className="day">
                <div className="featuredSection">
                    {this.props.feature.list && <FeatureBlock feature={this.props.feature} user={this.props.user}/>}
                </div>   
                {this.props.glanceListings.length > 0 
                ? <div className={this.props.view + " listingsWrap"}>

                        { openings.length > 0 && <div className="openingWrap">
                                <h2>Openings</h2>
                                <VenueList listings={openings} user={this.props.user} dateView="current"/>
                            </div>
                        }

                        { events.length > 0 && <div className="eventsWrap">
                                <h2>Events</h2> 
                                <VenueList listings={events}  user={this.props.user} dateView="nodate"/>
                            </div>
                        }

                        { closings.length > 0 && <div className="closingWrap">
                                <h2>Last Chance</h2>
                                <VenueList listings={closings} user={this.props.user} dateView="nodate"/>
                            </div>
                        }
                        
                        { totalListings == 0 && <h4>Nothing happening today.</h4> }
                        </div>
                    : <Loading /> }
            </div>
        )
    }
}