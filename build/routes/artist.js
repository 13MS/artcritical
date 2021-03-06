var express = require('express');
var router = express.Router();


//#######################
// GET ALL Artists ===================
//#######################

router.get('/allartists', function (req, res) {
    var Artists = req.artists

    Artists
    .find()
    .exec(function (e, docs) {
        res.json(docs);
    });
});

//############################
// POST a new artist
//############################

router.post('/add', function (req, res) {
    var Artists = req.artists;

    // define a new entry
    var newartist = req.body;

    // Save when and who created it
	var now = new Date();
	newartist.created_at = now;
	newartist.updated_at = now;
    newartist.updated_by = req.user._id;
    
    console.log(newartist);

    newartist = new Artists(newartist);

    //Save this new entry
    newartist.save(function (err, newartist) {
        res.send(
            (err === null) ? {
                data: newartist
            } : {
                msg: err
            }
        );
    });

});

module.exports = router;
