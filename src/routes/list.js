var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//#######################
// GET ALL listings ===================
//#######################

router.get('/alllistings', function (req, res) {
    var List = req.list;
    var Venue = req.venue;

    List.find().
    sort('neighborhood').
    limit(50).
    populate('venue').
    exec(function (e, docs) {
        res.json(docs);
    });
});


//#######################
// GET currentlist to display.
//#######################

router.get('/currentlistings/:offset_ratio', function (req, res) {
    var List = req.list,
        Venue = req.venue;

    //Find today's date
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    //Count how many times we've fetched listings
    var offset_ratio = parseInt(req.params.offset_ratio) * 100; 

    List.find().
    where('start').lte(today).
    where('end').gte(today).
	where('event').ne(true).
	where('venue').ne('').
    sort('neighborhood').
    skip(offset_ratio).
    limit(100).
    populate('venue').
    exec(function (e, docs) {
		/*docs.map(listing => {
		Venue.findOne({name: listing.venue}).exec().then(function(venue){
			//console.log('listing: ', listing.name);
			//console.log('venue: ', listing.venue);
			if (venue) {
				//console.log('venue real: ', venue.name);
				//List.update({_id: listing._id}, {venue: venue._id}, function (err, newlisting){console.log(newlisting)});
			} else {
				//console.log('venue NOT real');
				//List.update({_id: listing._id}, {venue: ""}, function (err, newlisting) {console.log(newlisting)});
			}
		});	
		});*/
        res.json(docs);
    });
});

//#######################
// GET future list to display.
//#######################

router.get('/futurelistings/:offset_ratio', function (req, res) {
    var List = req.list,
        Venue = req.venue;

    //Find today's date
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    //Count how many times we've fetched listings
    var offset_ratio = parseInt(req.params.offset_ratio) * 30; 

    List.find().
    where('start').gte(today).
    where('event').ne(true).
	where('venue').ne('').
    sort('neighborhood').
    skip(offset_ratio).
    limit(30).
    populate('venue').
    exec(function (e, docs) {
        res.json(docs);
    });
});


//#######################
// GET GLANCE list to display.
//#######################

router.get('/glancelistings', function (req, res) {
    var List = req.list,
        Venue = req.venue;

    //Find today's date
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var inaWeek = new Date();
    inaWeek.setDate(inaWeek.getDate() + 7);
    inaWeek.setHours(0, 0, 0, 0);

    List.find({
        $or: [{
            start: {
                $gte: today,
                $lt: inaWeek
            }
        }, {
            end: {
                $gte: today,
                $lt: inaWeek
            }
        }]
    }, {}).
	where('venue').ne('').
    sort('neighborhood').
    populate('venue').
    exec(function (e, docs) {
        if (e)
            res.send(e);
        
        res.json(docs);
    });
});


//#######################
// GET EVENTS list to display.
//#######################

router.get('/eventslistings', function (req, res) {
    var List = req.list;

    //Find today's date
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    List.find().
	where('start').gte(today).
    where('event').equals(true).
	where('venue').ne('').
    sort('start').
    populate('venue').
    exec(function (e, docs) {
        res.json(docs);
    });
});


//#######################
/* FIND listings based on text */
//#######################

router.get('/find/:regex_input', function (req, res, next) {
    var List = req.list;

    var regexp = new RegExp(req.params.regex_input, "i");
    
    List
    .find({name: regexp})
	.where('venue').ne('')
    .exec(function (err, listings) {
    if (err)
        res.send(err);
        
    var results = [];
    listings.map(function (thelisting) {
        results.push({
            value: thelisting._id,
            label: thelisting.name
        });
    })

    res.json(results);
    });

});

//#######################
// GET ONE listing 
//#######################
router.get('/getinfo/:listing_id', function (req, res, next) {
    var List = req.list;

    List.findOne({
        _id: req.params.listing_id
    }).
	where('venue').ne('').
    populate('venue').
    exec(function (e, docs) {
        if (e)
            res.send(e);
		
		console.log(docs);

        res.json(docs);
    });

});


//############################
// POST a new listing.
//############################

router.post('/add', function (req, res) {
    var List = req.list;

    // define a new entry
    var newlisting = new List(req.body);

    //Save this new entry
    newlisting.save(function (err, newlisting) {
        res.send(
            (err === null) ? {
                data: newlisting
            } : {
                msg: err
            }
        );
    });

});


//#######################
// UPDATE a listing.
//#######################

router.post('/update', function (req, res) {
    var List = req.list;

    console.log("Update one listing");

    // define a new entry
    var thelisting = new List(req.body);


    List.update({
        _id: thelisting._id
    }, {
        $set: thelisting
    }, function (err, newlisting) {
        console.log(newlisting)
        res.send(
            (err === null) ? {
                msg: ''
            } : {
                msg: err
            }
        );
    });

});


//#######################
// UPDATE a featured article
//#######################

router.post('/feature', function (req, res) {
    var Feature = req.feature;

    if (req.body._id) {

        //Update feature

        var theFeature = new Feature(req.body);

        Feature.update({
            _id: theFeature._id
        }, {
            $set: theFeature
        }, function (err, newFeature) {
            res.send((err === null) ? { msg: '' } : { msg: err });
        });


    } else {
        // New feature

        var theFeature = new Feature(req.body);

        //Save this new entry
        theFeature.save(function (err, newFeature) {
            res.send((err === null) ? { data: newFeature } : { msg: err });
        });
    }

});

//#######################
// FIND a featured article
//#######################

router.post('/findfeatures/:days', function (req, res) {
    var Feature = req.feature;

    console.log("Find all features");
	
	//Find today's date
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var inaWeek = new Date();
    inaWeek.setDate(inaWeek.getDate() + req.params.days);
    inaWeek.setHours(0, 0, 0, 0);
    
    Feature.find({
        date: {
                $gte: today,
                $lt: inaWeek
            }
    }).
    populate('list').
    populate('venue').
    exec(function (e, docs) {
        res.json(docs);
    });

});


//#######################
// DELETE a listing.
//#######################

router.post('/delete/:listing_id', function (req, res) {
    var List = req.list;

    console.log("Deleting one listing", req.params.listing_id);

    var listingToDelete = req.params.listing_id;
    List.remove({
        '_id': listingToDelete
    }, function (err) {
        res.send((err === null) ? {
            msg: ''
        } : {
            msg: 'error: ' + err
        });
    });

});



module.exports = router;