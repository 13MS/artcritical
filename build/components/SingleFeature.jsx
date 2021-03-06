import React from 'react'
import {Link} from 'react-router'
import ListActions from '../actions/ListActions'
//COMPONENTS
import Helmet from './blocks/Helmet'
import Loading from './blocks/loading'
import moment from 'moment'
import FeatureBlock from './blocks/featureBlock'
import FeaturedSelect from './forms/featuredSelect'
import {Button} from 'reactstrap'


export default class SingleFeature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }

        this.onEditButton = this.onEditButton.bind(this)
    }

    componentWillMount() {
        ListActions.getFeatureByDate(this.props.params.date);
    }

    onEditButton(){
        this.setState({
            editing: !this.state.editing
        })
    }

    render() {

        console.log(this.props.loading.featureByDate)

        let date = moment.utc(this.props.params.date, 'MMDDYY').format('MMMM D YYYY')

        let ogImage = this.props.feature && this.props.feature.list && this.props.feature.list.image
                            ?  "https://res.cloudinary.com/artcritical/image/upload/c_fill,g_faces:center,h_630,q_auto:good,w_1200/" + this.props.feature.list.image + ".jpg"
                            : ''

        return ( 
            <div className="singleFeature">
                <Helmet
                    link={"https://list.artcritical.com/features/" + this.props.params.date} 
                    ogUrl={"https://list.artcritical.com/features/" + this.props.params.date}
                    ogImage={ogImage}
                />
                <div className="left-col">
                    <h2>Featured Listing</h2>
                    <h3>{date}</h3>
                    { this.props.feature && this.props.user.userAccess >=1 && <Button onClick={this.onEditButton}>{this.state.editing ? 'Done' : 'Edit'}</Button>}
                    <Link to='/features'>Back to all features</Link>
                </div>
                <div className="right-col">
                    {this.props.loading.featureByDate
                        ? <Loading />
                        : this.props.feature
                            ? this.state.editing 
                                ? <FeaturedSelect 
                                    feature={this.props.feature} 
                                    dayNumber={1} 
                                    error={this.props.error}
                                    success={this.props.success}/>
                                : <FeatureBlock feature={this.props.feature} user={this.props.user} isSingle={true}/>
                            : <p>No feature listing on this date</p>
                    }


                </div>
            </div>
        );
    }
}