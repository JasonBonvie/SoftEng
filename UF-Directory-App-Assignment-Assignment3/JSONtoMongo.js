'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
    last = require('./listings.json');

/* Connect to your database */
mongoose.connect('mongodb://CEN3031:CEN3031TA@ds129434.mlab.com:29434/software-eng');

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
  fs.readFile('listings.json', 'utf8', function(err, data) {
    var new_listing;
    var data = JSON.parse(data).entries; 
    
    data.forEach(function(item,index){ 
      // console.log(index);
      // console.log(new_listing);
      new_listing = new Listing({
        code: last.entries[index].code,
        name: last.entries[index].name,
        "coordinates": 
        last.entries[index].coordinates,
        address: last.entries[index].address
      });
      
      new_listing.save(function (err) {
      if(err) {
        console.log(err);
      }
      console.log("listing saved successfully");
    });
    });
   
 })

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */