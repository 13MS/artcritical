import alt from '../alt';
import ListActions from '../actions/ListActions';
import ArtistsActions from '../actions/ArtistsActions';
import AuthActions from '../actions/AuthActions';
import ImagesActions from '../actions/ImagesActions';
import EventActions from '../actions/EventActions';
import AdActions from '../actions/AdActions';
import toastr from 'toastr';
import moment from 'moment';

class ListStore {
    constructor() {
        this.bindActions(ListActions);
        this.bindActions(ArtistsActions);
        this.bindActions(AuthActions);
        this.bindActions(ImagesActions);
        this.bindActions(EventActions);
        this.bindActions(AdActions);
        //Display settings
        this.view = 'condensed';
        this.menuActive = false;
        //List states
        this.currentListings = [];
        this.currentLoaded = false
        this.futureListings = [];
        this.allListings = [];
        this.eventsListings = [];
        this.glanceListings = [];
        this.latestListings = []
        this.latestEvents = []
        this.latestVenues = []
        // Auth states
        this.user = {};
        this.user.isLoggedIn = false;
        this.user.facebook = {};
		this.user.local = {};
        this.user.mylist = [];
		this.currentUser = {};
        this.user.userAccess = 0;
        this.allUsers = [];
        //SideBar states
        this.sidebarOpen = false;
        // Image State
        this.isUploaded = false;
        this.uploadedFileCloudinaryUrl = '';
        //New listing states
        this.listingEdit = {};
        this.listingEdit.artists = [];
        this.listingEdit.event = false;
        this.listingEdit.events = [];
        this.listingEdit.venue = {};
        //New event states
        this.eventEdit = {};
        this.eventEdit.venue = {};
        //New venue states
        this.venueEdit = {
            popup: false,
			coordinates: {}
		};
        // Featured listings
        this.features = [];
        this.allFeatures = [];
        //Venues
        this.allVenues = [];
        this.venue = {};
        this.venue.likeList = 0;
        this.venue.currentListings = [];
        this.venue.upcomingListings = [];
        this.venue.pastListings = [];
        //Artists
        this.allArtists = [{name: 'The test artist'}]
        //Ads
        this.adEdit = {};
        this.allAds = [];
        this.ads = [];
        //Loadings
        this.loading = {};
        this.loading.login = false;
        this.loading.register = false;
        this.loading.updateUser = false;
        this.loading.updatelisting = false;
		this.loading.deletelisting = false;
        this.loading.updatevenue = false;
		this.loading.deletevenue = false;
        this.loading.savelisting = false;
        this.loading.savevenue = false;
        this.loading.current = false;
        this.loading.future = false;
        this.loading.events = true;
        this.loading.allVenues = false;
        this.loading.features = false;
        this.loading.featureByDate = false
        this.loading.glance = false
        this.loading.certifyReset = false
        this.loading.latestListings = false
        this.loading.latestVenues = false
        this.loading.latestEvents = false
        this.loading.ads = {}
        //Error Messages
        this.error = {};
        this.error.feature = '';
        this.error.general = '';
        this.error.login = '';
        this.error.updateUser = '';
        this.error.updatelisting = {};
        this.error.updatevenue = '';
        this.error.savelisting = '';
        this.error.savevenue = '';
        this.error.reset = ''
        this.error.ads = {}
        //Success
        this.success = {};
        this.success.ads = {}
        this.success.updateUser = false;
        this.success.updatelisting = false;
        this.success.updateEvent = false;
        this.success.saveEvent = false;
        this.success.deleteEvent = false;
        this.success.updatevenue = false;
		this.success.deletelisting = false;
        this.success.deletevenue = false;
        this.success.savelisting = false;
        this.success.savevenue = false;
        this.success.feature = false;
        this.success.deleteUser = false;
    }
    
    //List Reducers
    onGetCurrentAttempt(){
        this.loading.current = true;
    }
    onGetCurrentSuccess(data) {
        this.loading.current = false;
        this.currentListings = this.currentListings.concat(data);
    }
    onCurrentNotLoaded(){
        this.currentLoaded = false
    }
    onCurrentLoaded(){
        this.currentLoaded = true
    }
    onGetFutureAttempt(){
        this.loading.future = true;
    }
    onGetFutureSuccess(data) {
        this.loading.future = false;
        this.futureListings = this.futureListings.concat(data);
    }
    onGetAllSuccess(data) {
        this.allListings = data;
    }
    onGetEventsAttempt() {
        this.loading.events = true;
    }
    onGetEventsSuccess(data) {
        this.eventsListings = data;
        this.loading.events = false;
    }
    onGetGlanceAttempt(){
        this.loading.glance = true
    }
    onGetGlanceSuccess(data) {
        this.loading.glance = false
        this.glanceListings = data;
    }

    onGetCurrentFail(jqXhr) {
        this.loading.current = false;
        // Handle multiple response formats, fallback to HTTP status code number.
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
    onGetFutureFail(jqXhr) {
        this.loading.future = false;
        // Handle multiple response formats, fallback to HTTP status code number.
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
    onGetAllFail(jqXhr) {
        // Handle multiple response formats, fallback to HTTP status code number.
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
    onGetEventsFail(jqXhr) {
        this.loading.events = false;
        // Handle multiple response formats, fallback to HTTP status code number.
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
    onGetGlanceFail(jqXhr) {
        this.loading.glance = false
        // Handle multiple response formats, fallback to HTTP status code number.
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }


    //GET Latest Listings for Review
    onGetLatestEventsAttempt(){
        this.loading.latestListings = true
    }
    onGetLatestListingsSuccess(data){
        this.latestListings = data
        this.loading.latestListings = false
    }
    onGetLatestListingsFail(error){
        this.loading.latestListings = false
        console.log(error)
    }

    //GET Latest Events for Review
    onGetLatestEventsAttempt(){
        this.loading.latestEvents = true
    }
    onGetLatestEventsSuccess(data){
        this.latestEvents = data
        this.loading.latestEvents = false
    }
    onGetLatestEventsFail(error){
        console.log(error)
        this.loading.latestEvents = false
    }

    //GET Latest Venues for Review
    onGetLatestVenuesSuccess(){
        this.loading.latestVenues = false
    }
    onGetLatestVenuesSuccess(data){
        this.latestVenues = data
        this.loading.latestVenues = false
    }
    onGetLatestVenuesFail(error){
        console.log(error)
        this.loading.latestVenues = false
    }

    onCleanupAttempt(){
        console.log('Cleaning up...');
        this.loading.cleanup = true
    }   
    onCleanupSuccess(docs){
        this.loading.cleanup = false
        this.success.cleanup = 'Cleaned up ' + docs.length + ' listings!'
        console.log(this.success.cleanup);
    }
    onCleanupFailure(){
        this.loading.cleanup = false
        console.log('Cleaning failed');
    }
    
    //Listing size change
    onSizeChange(size){
        this.view = size;
    }
    
    // Reset listing edit
    onListingEditReset(){
        this.listingEdit = {
            name: '',
            description: '',
            image: '',
            venue: {},
            relatedEvents: [],
            artists: []
        };
    }

    //Load a specific listing into listing edit
    onEditListing(listing){
        console.log('Editing a listing')
        this.listingEdit = listing;
    }
	
	onAdminReset(){
		//Reset the Venue Admin
		this.allVenues = [];
		//Reset the Listing Edit
		this.listingEdit = {
            image: '',
            name: '',
            _id: '',
            description: '',
            text: '',
            events: [],
            venue: {},
            end: null,
            start: null
        };
		//Reset the Venue Edit
	}
	
    onVenueEditReset(){
        this.venueEdit = {
            _id: '',
            name: '',
            slug: '',
            address1: '',
            address2: '',
            city: '',
            zipcode: '',
            state: '',
            email: '',
            phone: '',
            coordinates: {
                lat: '',
                long: ''
            }
        }
		// Reset messages
		this.success.updatevenue = false;
		this.loading.updatevenue = false;
		this.error.updatevenue = ''
    }
    
    // Get listing info
    onGetListingInfoSuccess(info){
		console.log('Listing info loaded', info);
        this.listingEdit = info.data;
        if (!this.listingEdit.relatedEvents){
            this.listingEdit.relatedEvents = [];
        }
		// This makes the found listing a featured listing
		if (Number.isInteger(info.i)){
			console.log('Feature listing', this.features);
			this.features[info.i].list = info.data;
			console.log('Feature #' + info.i, this.features[info.i].list);
		}
    }
    onGetListingInfoFailure(jqXhr){
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
    
    // Get venue info
    onGetVenueFullInfoSuccess(data){
        this.listingEdit.venue = data.venue;
        this.venue = data.venue;
        this.venue.currentListings = data.currentListings;
        this.venue.upcomingListings = data.upcomingListings;
        this.venue.pastListings = data.pastListings; 
    }
    // Get venue info
    onGetVenueInfoSuccess(data){
        this.listingEdit.venue = data;
        this.eventEdit.venue = data;
        if (!data.coordinates){
            data.coordinates = {}
        }
        this.venueEdit = data;
		//Create a slug automatically if there is none
		if(!data.slug){
            this.venueEdit.slug = data.name.replace(/\s+/g, '-').toLowerCase();
        }
    }
    onGetVenueFullInfoFailure(jqXhr){
        
    }
    onGetVenueInfoFailure(jqXhr){
        
    }
	//Add a venue
    onSaveVenueAttempt(){
        this.loading.savevenue = true;       
    }
    onSaveVenueSuccess(data){
        console.log('Venue saved')
        this.venueEdit._id = data._id
        this.loading.savevenue = false
        this.success.savevenue = true
        setTimeout(function(){
            this.success.savevenue = false;
        }.bind(this), 2000)
    }
    onSaveVenueFailure(err){
        console.log('Problem saving venue', err)
        this.loading.savevenue = false; 
        this.error.saveVenue = 'Error while saving changes'; 
    }
	// Update a venue
    onUpdateVenue(info){
        this.venue.coordinates = {
            lat: info[1],
            long: info[0]
        }
    }
    onUpdateVenueAttempt(){
        this.loading.updatevenue = true;
    }
    onUpdateVenueSuccess(data){
        console.log('Venue updated', data)
        this.venueEdit = data;
        this.loading.updatevenue = false;
        this.success.updatevenue = true;
        setTimeout(function(){
            this.success.updatevenue = false;
        }.bind(this), 2000)
    }
    onUpdateVenueFailure(error){
        console.log('Problem updating venue', error)
        this.loading.updatevenue = false;
        this.error.updateVenue = 'Error. ' + error;
    }
	
	//Delete a Venue
	onDeleteVenueAttempt(){
        this.loading.deletevenue = true;
		this.success.deletevenue = false;
    }
    onDeleteVenueSuccess(){
        console.log('Deleted');
		this.loading.deletevenue = false;
        this.success.deletevenue = true;
        setTimeout(function(){
            this.success.deletevenue = false;
        }.bind(this), 2000)
    }
    onDeleteVenueFailure(err){
        console.log('Error deleting: ', err);
		this.loading.deletevenue = false;
    }
    
    onGetVenueListingsSuccess(data){
        this.venue.listings = data;
    }
    onGetVenueListingsFailure(error){
        console.log(error);
    }
    onGetVenuesAdminAttempt(){
		this.allVenues = [];
        this.loading.allVenues = true;
    }
    onGetVenuesAdminSuccess(data){
        this.loading.allVenues = false;
        //this.allVenues = this.allVenues.concat(data);
		this.allVenues = data;
    }
    onGetVenuesAdminFailure(error){
        console.log(error);
    }
    
    //Reset the venue in the form
    onResetVenue() {
        this.listingEdit.venue = {}
    }
    
    //Save a new listing
    onSaveListingAttempt(){
        this.success.savelisting = false;
        this.loading.savelisting = true;       
    }
    onSaveListingSuccess(data){
        this.success.savelisting = true;
        this.loading.savelisting = false; 
        this.listingEdit._id = data._id;
        var that = this;
        setTimeout(function(){
            that.success.savelisting = false;
        }.bind(this), 2000)
    }
    onSaveListingFailure(err){
        console.log('Error ', err);
        this.loading.savelisting = false; 
        this.error.savelisting = 'Error ' + err; 
    }
    
    
    //Update a listing
    onUpdateListingAttempt(){
        this.loading.updatelisting = true;
    }
    onUpdateListingSuccess(data){
        this.loading.updatelisting = false; 
        this.success.updatelisting = true; 
        this.sidebarOpen = false;
        var that = this;
        setTimeout(() => {
            that.success.updatelisting = false;
        }, 2000);
    }
    onUpdateListingFailure(err){
        this.loading.updatelisting = false; 
        this.error.updatelisting = 'Error: ' + err; 
        console.log('Error: ', err);
    }
    
    //Update a listing
    onDeleteListingSuccess(){
        console.log('Deleted');  
		//Reset the listing data
        this.success.deletelisting = true;
        //Reset the listing
        this.listingEdit = {
            venue: {},
            relatedEvents: [],
            artists: [],
            name: '',
            description: ''
        }
        //Close the sidebar
        this.sidebarOpen = false;
        //Reset the success status
        var that = this;
        setTimeout(() => {
            that.success.deletelisting = false;
        }, 1000);
    }
    onDeleteListingFailure(err){
        console.log('Error: ', err);
		this.error.deletelisting = 'Error deleting listing'; 
    }
    
    //Update info on listing page
    onListingInfoChange (info){ 
        if (info.target) {
            const value = info.target.value;
            const name = info.target.name;
            if (name === 'artists') {
                var splitArtists = new Array()
                value.map(artist => {
                    let split = artist.name.split(',')
                    if (split.length > 1){
                        split.map(newArtist => {

                            splitArtists.push({name: $.trim(newArtist)})
                        })
                    } else {
                        splitArtists.push(artist)
                    }
                })
                this.listingEdit[name] = splitArtists;
            } else {
                this.listingEdit[name] = value;
            }
        } else if (info.startDate) {
            this.listingEdit.start = info.startDate;
            if (info.endDate){
                this.listingEdit.end = info.endDate;
            }
		} else if (info.date) {
            this.listingEdit.start = info.date;
       } else {
           this.listingEdit.event = !info.event;  
        }
    }

    //Duplicate the current listing
    onListingDuplicate(){
        this.listingEdit._id = ''
    }
    //Duplicate the current venue
    onVenueDuplicate(){
        this.venueEdit._id = ''
    }
    //Duplicate the current event
    onEventDuplicate(){
        this.eventEdit._id = ''
    }
    
    //Update info on feature page
    onFeatureInfoChange (data){
            const value = data.event.value
            const name = data.event.name
            this.features[data.i][name] = value
    }
    
    //Update info on venue page
    onVenueInfoChange (info){
            const value = info.value;
            const name = info.name;  
            if (name === 'lat'){
                this.venueEdit.coordinates.lat = parseFloat(value);       
            } else if (name === 'long'){
                this.venueEdit.coordinates.long = parseFloat(value);       
            } else {
                this.venueEdit[name] = value;
            }
            //Keep the slug synced with the name
            this.venueEdit.slug = this.venueEdit.name.replace(/\s+/g, '-').toLowerCase();
            
    }
    //Update coordinates on venue page
    onCoordinatesChange (coord){
            this.venueEdit.coordinates = {
                lat: coord[1],
                long: coord[0]
            };
    }
    
    //FEATURED
    onUpdateFeatureSuccess(data){
        this.success.updateFeature = true
        console.log(data[0])
        var number = data[1]
        this.features[number] = data[0]

        console.log(this.features)

        var that = this;
        setTimeout(() => {
            that.success.updateFeature = false;
        }, 1000);
    }
    onUpdateFeatureFailure(error){
        this.error.updateFeature = 'Error updating the feature: ' + error
        console.log(error);
    }
    onFeatureReset(day){
        if (Number.isInteger(day)){
            this.features[day]= {}
        }
        this.success.feature = false
    }
    onDeleteFeatureSuccess(){
        console.log('feature deleted')
        this.success.deleteFeature = true

        var that = this;
        setTimeout(() => {
            that.success.deleteFeature = false
        }, 1000)
    }
    onDeleteFeatureFailure(){
        this.error.deleteFeature = 'feature deletion failed'
        this.success.deleteFeature = false
    }
    onFeatureLoadAttempt() {
        this.loading.features = true
    }
    onFeatureLoadSuccess(data) {
        this.loading.features = false
        if (data.json){
			// Match all features with a day of the next week
            let features = []
            this.allFeatures = data.json
            
			//Find element in features whose date == d
				//For each day of the week
				for (var i=0; i < data.days; i++) {
                    let tempFeature = null
                    let d = moment().utcOffset(-4).add(i, 'days');
					// Go through all the features
					this.allFeatures.map((feature) => {
                        // Check if it matches
						if (moment(feature.date).utcOffset(-4).isSame(d, 'day')){
                            tempFeature = feature
                        }
					})
					if (tempFeature){
						features.push(tempFeature)
						tempFeature = null
					}  else {
                        for (var y = 0; y < this.allFeatures.length; y++){
						    var feature = this.allFeatures[y]
                            // Find current feature
                            if (!features.includes(feature) && (feature.list || feature.event)){
                                features.push(feature)
                                break
                            }
                        }
					}
                }
            this.features = features;
        } else {
            this.error.feature = "No Features";
        }
    }
    onFeatureLoadFailure(error) {
        this.loading.features = false
        console.log("Feature load error: ", error);
        this.features= [];
    }
	onFeatureEdit(featureEdit){
		this.feature = featureEdit;
    }
    onFeatureAdminAttempt() {
        this.loading.features = true
    }
    onFeatureAdminFailure(error) {
        this.loading.features = false
        this.features= [];
    }
    onFeatureAdminSuccess(data) {
        this.loading.features = false
        if (data.json){
			// Match all features with a day of the next week
            this.allFeatures = data.json

            if (data.days){
                let features = []
                //Find element in features whose date == d
                    //For each day of the week
                    for (var i=0; i < data.days; i++) {
                        let tempFeature = null
                        let d = moment().add(i, 'days');
                        // Go through all the features
                        this.allFeatures.map((feature) => {
                            // Check if it matches
                            if (moment(feature.date).utcOffset(-4).isSame(d, 'day')){
                                tempFeature = feature
                            }
                        })
                        if (tempFeature){
                            features.push(tempFeature)
                            tempFeature = null
                        }  else {
                            features.push({})
                        }
                    }
                this.features = features;
            }
        } else {
            this.error.feature = "No Features";
        }
    }
    onFeatureDateAttempt(){
        this.loading.featureByDate = true
        console.log('start loading')
    }
    onFeatureDateSuccess(json){
        console.log('stop loading')
        this.loading.featureByDate = false
        console.log('feature by date: ', json)
        this.feature = json
    }
    onFeatureDateFailure(error){
        this.loading.featureByDate = false
        console.log('Error retrieving Feature article', error)
    }
    
    // Auth Reducers
    
    // LOGIN ATTEMPT
    onLoginAttempt(){
        this.loginRedirect = false;
        this.loading.login = true
        this.error.login = ''
    }
    onLoginFailure(error){
        console.log('Login error: ', error);
        this.error.login = 'Wrong username or password.'
        this.loading.login = false
    }
    onLoginSuccess(json){
		console.log('Logged in: ', json);
        this.user = json;
        this.user.isLoggedIn = true;
        this.user.userAccess = 3;
        this.loading.login = false
    }
    
    // REGISTER ATTEMPT
    onRegisterAttempt(){
		console.log('onRegisterAttempt');
        this.isRegistering = true;
    }
    onRegisterFailure(error){
        console.log(error);
        this.user.firstname = '';
		this.user.lastname = '';
        this.user._id = '';
        this.user.local.username = '';
        this.isRegistering = false;
    }
    onRegisterSuccess(user){
		console.log('Logged in: ', user);
        this.user = user;
		this.user.isLoggedIn = true;
        this.isRegistering = false;
    }
    
    //Facebook Login
    onFacebookLogin(user){
        console.log("Logged in via Facebook");
        this.user = user;
		this.isRegistering = false;
        this.user.isLoggedIn = true;
    }
    
    //UPDATE USER
    onUpdateUserAttempt(){
        this.loading.updateUser = true;
        this.success.updateUser = false;
        this.error.updateUser = '';
    }
    onUpdateUserSuccess(data){
        console.log('Success!');
        this.loading.updateUser = false;
        this.success.updateUser = true;
        setTimeout(function(){
            this.success.updateUser = false;
        }.bind(this), 2000)
    }
    onUpdateUserFailure(error){
        console.log('Failed Updating User', error);
        this.loading.updateUser = false;
        this.error.updateUser = 'Error Saving';
    }

     //DELETE USER
     onDeleteUserAttempt(){
        this.success.deleteUser = false;
        this.error.updateUser = '';
    }
    onDeleteUserSuccess(info){
        console.log(info.data.slug)
        //Find user in current list of all users and delete it there for visualization
        this.allUsers = this.allUsers && this.allUsers.filter(user => {return user.slug !== info.data.slug})
        //Display Success
        this.success.deleteUser = true;
        setTimeout(function(){
            this.success.deleteUser = false;
        }.bind(this), 2000)
    }
    onDeleteUserFailure(error){
        console.log('Failed Deleting User', error);
        this.error.deleteUser = 'Error Saving';
    }

    //RESET THE PASSWORD
    onForgotPasswordAttempt(){
        this.loading.forgot = true;
        this.success.forgot = ''
        this.error.forgot = ''
    }
    onForgotPasswordSuccess(){
        this.loading.forgot = false;
        this.success.forgot = 'An email was sent to your inbox'
        console.log('Email sent!')
    }
    onForgotPasswordFailure(){
        this.error.forgot = "This email doesn't match any account"
        this.loading.forgot = false;
    }
    onCertifyPasswordAttempt(){
        console.log('Trying to certify token')
        this.error.reset = ''
        this.resetUser = null
        this.loading.certifyReset = true
    }
    onCertifyPasswordSuccess(user){
        console.log('Success')
        this.resetUser = user
        this.loading.certifyReset = false
    }
    onCertifyPasswordFailure(){
        console.log('Failure')
        this.error.resetUser = 'The reset link expired. Please try again.'
        this.resetUser = null
        this.loading.certifyReset = false
    }
    onResetPasswordAttempt(){
        this.loading.reset = true;
        this.error.reset = ''
        this.success.reset = ''
    }
    onResetPasswordSuccess(){
        this.loading.reset = false;
        this.success.reset = 'Password was successfully changed! <a href="/login">Login</a>';
    }
    onResetPasswordFailure(){
        this.loading.reset = false;
        this.error.reset = 'There was a problem changing the password.';
    }
	
	//USERS ADMIN PAGE
	onGetAllUserAttempt(){
		console.log('Attempting to get all users');
		this.loading.allUsers = true;
	}
	onGetAllUserFailure(error){
		console.log('Failed to get all users', error);
		this.allUsers = [];
		this.loading.allUsers = false;
	}
	onGetAllUserSuccess(users){
		console.log('Managed to get all users');
		this.loading.allUsers = false;
		this.allUsers = users;
	}
    
    // LOGOUT ATTEMPT
    onLogoutFailure(error){
        console.log("Failed to log out");
        console.log(error);
    }
    onLogoutSuccess(action){
        console.log("Logged out");
        this.user = {};
		this.user.local= {};
		this.user.facebook= {};
        this.user.mylist = [];
        this.user.isLoggedIn = false;
    }
    
    // CHECK SESSION
    onSessionCheckFailure() {
        this.user = {};
		this.user.local= {};
		this.user.facebook= {};
        this.user.mylist = [];
        this.user.isLoggedIn = false;
    }
    onSessionCheckSuccess(action){
        this.user = action;
		if (!this.user.local){
			this.user.local = {};
		}
		if (!this.user.facebook){
			this.user.facebook = {};
		}
        this.user.isLoggedIn = true;
    }
    
    // ADD TO MYLIST
    onAddToMyListSuccess(data){
		console.log('Added to the list', data);
		if (data) {
            this.user.mylist = data;	
            console.log(this.user);
		} else {
			this.user.mylist = [];
		}
    }
    onAddToMyListFailure(error){
		console.log('Error adding to the list', this.user);
        console.log(error);
    }
    
    // GET MYLIST
	//Get a user's list
	onGetUserMylistSuccess(data) {
        console.log('onGetUserMylistSuccess', data);
        this.currentUser = data;
        this.currentUser.loaded = true;
    }
    onGetUserMylistFailure(error) {
        console.log('onGetUserMylistFailure', error);
        this.currentUser.loaded = false;
    }
    // REORDER MYLIST
    onReorderMyListAttempt(data){
        this.user.mylist = data;
    }
    onReorderMyListSuccess(data){
        console.log('saved!');  
    }
    onReorderMyListFailure(){
        console.log('problem!');
    }

    // CLEAR MY LIST
    onClearMyListSuccess(){
        console.log('Cleared!');  
        this.user.mylist = [];
    }
    onClearMyListFailure(e){
        console.log('onClearMyListFailure: ' + e)
    }
    
    // INFO CHANGE ON ACCOUNT PAGE
    onUserInfoChange (data){

        const target = data.event.target;
        const value = target.value;
        const name = target.name;
        if (data.index == null){
            //Means we're in the account edit page
            if (name == "email"){
                this.user.local.username = value;
            } else {
                this.user[name] = value;	
            }
        } else {
            //Means we're in the user admin page
            if (name == "email"){
                this.allUsers[data.index].username = value;
            } else {
                this.allUsers[data.index][name] = value;	
            }
        }
    }
    
    // UPLOAD AN AVATAR
    onAvatarUploadSuccess(image){
        this.isUploaded = true;
        this.user.avatar = image.public_id;
    }
    onAvatarUploadFailure(err){
        console.log('Error: ', err);
    }
    // UPLOAD A THUMBNAIL
    onThumbnailUploadSuccess(data){
        console.log('Uploaded!', data)
        if (data.name){
            this.adEdit[data.name] = data.image.public_id;
        } else {
            this.listingEdit.image = data.image.public_id;
        }
		if (Number.isInteger(data.i)){

            if (this.features[data.i].list) this.features[data.i].list.image = data.image.public_id

            if (this.features[data.i].event) this.features[data.i].event.image = data.image.public_id

            console.log(data.image.public_id)
		}
    }
    onThumbnailUploadFailure(err){
        console.log('Error: ', err);
    }

    //EVENTS
    onAddEvent(){
        this.listingEdit.relatedEvents.push({
            name: "",
            description: "",
            type: "",
            date: ""
        });
    }

    onRemoveEvent(index){
        this.listingEdit.relatedEvents.splice(index, 1);
    }

    onEventsInfoChange(event){
        console.log(event)
        if (event.target){
            const type = event.target.name;
            const index = event.target.dataset.index;
            this.listingEdit.relatedEvents[index][type] = event.target.value;
            //Make sure events have a type
            if (this.listingEdit.relatedEvents[index].type === ""){
                this.listingEdit.relatedEvents[index].type = "reception"
            }
        } else if (event.date){
            this.listingEdit.relatedEvents[event.index].date = event.date;
            //Make sure events have a type
            if (this.listingEdit.relatedEvents[event.index].type === ""){
                this.listingEdit.relatedEvents[event.index].type = "reception"
            }
        }
        
    }


    //ACTUAL EVENTS

    //Update info on event form
    onEventInfoChange (info){
        if (info.target) {
            const value = info.target.value;
            const name = info.target.name;   
            this.eventEdit[name] = value;
		} else if (info.date) {
            this.eventEdit.date = info.date;
       }
    }
    onSaveEventSuccess(data){
        this.eventEdit._id = data._id
        this.success.saveEvent = true;
        var that = this;
        setTimeout(() => {
            that.success.saveEvent = false;
        }, 1000);
    }

    onSaveEventFailure(error){
        console.log('error: ' + error);
        this.error.saveEvent = 'Error. ' + error;
    }

    onGetEventInfoSuccess(info){
        if (info){ 
            this.eventEdit = info.data
        }
        // Making a featured event
		if (Number.isInteger(info.i)){
            this.features[info.i].event = info.data;
            this.features[info.i].list = info.data.list;
            this.features[info.i].venue = info.data.venue;
            this.features[info.i].type = 'event';
			console.log('Feature #' + info.i, this.features[info.i]);
		}
    }
    //Update an event
    onUpdateEventAttempt(){
        this.loading.updateEvent = true;
    }
    onUpdateEventSuccess(data){
        this.loading.updateEvent = false; 
        this.success.updateEvent = true; 
        this.sidebarOpen = false;
        var that = this;
        setTimeout(() => {
            that.success.updateEvent = false;
        }, 1000);
    }
    onUpdateEventFailure(err){
        this.loading.updateEvent = false; 
        this.error.updateEvent = 'Error while saving changes'; 
        console.log('Error: ', err);
    }
    //Delete Event
    onDeleteEventSuccess(){
		//Reset the listing data
        this.success.deleteEvent = true;
        //Reset the listing
        this.deleteEvent = {
            venue: {},
            events: [],
            artists: []
        }
        //Close the sidebar
        this.sidebarOpen = false;
        //Reset the success status
        var that = this;
        setTimeout(() => {
            that.success.deleteEvent = false;
        }, 1000);
    }
    onDeleteEventFailure(err){
        console.log('Error: ', err);
		this.error.deleteEvent = 'Error deleting event'; 
    }
    onEventEditReset(){
        this.eventEdit = {
            venue: {},
            list: null,
            artists: null
        };
        console.log(this.eventEdit);
    }
    //Load a specific event into listing edit
    onEditEvent(event){
        console.log('Editing an event')
        this.eventEdit = event;
    }

    //Sidebar
    onToggleSideBar(){
        this.sidebarOpen = !this.sidebarOpen
        if (!this.sidebarOpen){
            this.eventEdit = {
                venue: {},
                list: null,
                artists: null
            }
            this.listingEdit = {
                events: [],
                venue: {},
                end: null,
                start: null
            };
        }
    }

    //Menu
    onToggleMenu(){
        this.menuActive = !this.menuActive
    }

    // ARTISTS

    onGetAllArtistsSuggestionsAttempt(){
        console.log('Attempting to retrieve all artists')
    }
    onGetAllArtistsSuggestionsSuccess(data){
        this.allArtists = data
    }
    onGetAllArtistsSuggestionsFailure(){
        console.log('Error retrieving all artists')
    }


    //Ads

    onEditThisAd(info){
        this.adEdit = info;
    }

    onAdEditReset() {
        this.adEdit = {};
    }

    onGetAllAttempt(){
        console.log('Attempting to getting all ads')
    }

    onGetAllSuccess(data){
        console.log('Success getting all ads')
        this.allAds = data;
    }

    onGetAllFailure(){
        console.log('Failure getting all ads')
        this.allAds = [];
    }

    onGetAdsAttempt(){
        console.log('Attempting to get current ads')
    }

    onGetAdsSuccess(data){
        console.log('Success getting current ads', data)
        this.ads = data;
    }

    onGetAdsFailure(){
        console.log('Failure getting current ads')
        this.ads = [];
    }

    onAdInfoChange(info){
        this.adEdit = {...this.adEdit, ...info}
    }

    onSaveAdAttempt(){
        console.log('Attempting to Save')
        this.success.ads.save = false
        this.error.ads.save = ''
    }

    onSaveAdSuccess(data){
        console.log('Ad has been saved')
        this.success.ads.save = true
        this.adEdit = data
    }

    onSaveAdFailure(error){
        this.error.ads.save = error
        this.success.ads.save = false
        console.log('Failure to save ad', error)
    }

    onUpdateAdAttempt(){
        console.log('Updating the ad...')
        this.success.ads.update = false
        this.error.ads.update = ''
    }

    onUpdateAdSuccess(data){
        console.log('Updated the ad successfully.')
        this.adEdit = data
        this.success.ads.update = true
    }

    onUpdateAdFailure(error){
        console.log('Failure updating the ad.', error)
        this.error.ads.update = 'Failure updating the ad'
        this.success.ads.update = false
    }

    onDeleteAdAttempt(){
        console.log('Deleting the ad...')
        this.success.ads.delete = false
        this.error.ads.delete = ''
    }

    onDeleteAdSuccess(data){
        console.log('Deleted the ad successfully.')
        this.adEdit = {}
        this.success.ads.delete = true
    }

    onDeleteAdFailure(error){
        console.log('Failure deleting the ad.', error)
        this.error.ads.delete = 'Failure updating the ad'
        this.success.ads.delete = false
    }

}

export default alt.createStore(ListStore);