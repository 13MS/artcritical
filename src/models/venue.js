var mongoose = require('mongoose');

// Create the Listings table ==================================

var venueSchema = mongoose.Schema({
    name: String,
    slug: String,
    website: String,
    address: String,
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
    }
});

venueSchema.pre('save', (next) => {
    now = Date.now();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
})

//compile the model
module.exports = mongoose.model('Venue', venueSchema);
