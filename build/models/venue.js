var mongoose = require('mongoose');

// Create the Listings table ==================================

var venueSchema = mongoose.Schema({
    name: String,
    slug: String,
    popup: Boolean,
    disabled: Boolean,
    website: String,
	phone: String,
    address1: String,
	address2: String,
    city: String,
	state: String,
	zipcode: Number,
    neighborhood: Number,
    coordinates: {
        lat: Number,
        long: Number
    },
    userList: Number,
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
	updated_by: {
        type: String,
		ref: 'User'
    },
    email: String,
    phone: String,
});

//compile the model
module.exports = mongoose.model('Venue', venueSchema);
