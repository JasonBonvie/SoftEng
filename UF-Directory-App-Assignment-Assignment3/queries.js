/* Fill out these functions using Mongoose queries*/
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

mongoose.connect(config.db.uri,{useMongoClient: true});

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
  });


var findLibraryWest = function() {
 
    Listing.find({"name" : 'Library West'},
      function(err, doc) {
      if (err){ console.log(err);}
      console.log(doc);});
};

var removeCable = function() {
 
   Listing.findOneAndRemove({"code" : "CABL"}, function(err, doc) {
      if (err){ console.log(err);}
      console.log(doc);
    }).remove(function(err, doc){});
};

var updatePhelpsLab = function() {
  Listing.findOneAndUpdate({"name": "Phelps Laboratory" },
        { $set: { "address": '1953 Museum Rd, Gainesville, FL 32603, United States' }},
        function(err, doc){
            if(err) console.log("Not able to update data");
            console.log(doc);
        });
};

var retrieveAllListings = function() {

  Listing.find({}, function(err, listings) {
    if (err){ console.log(err);} 
    console.log(listings);
    });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
