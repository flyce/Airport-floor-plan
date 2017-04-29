import { Meteor } from 'meteor/meteor';
import '../imports/api/users.js';
import '../imports/api/tracks.js';
import '../imports/api/peoples.js';

var fs = require( 'fs' );
import { Users } from '../imports/api/users.js';

import { Tracks } from '../imports/api/tracks.js';


Meteor.startup(() => {
  // code to run on server at startup
});



// exports a RESTful API for browser
HTTP.methods({

    // name RESTful API as "GET /download-meteor-logo"
    '/download': function() {

        // A file in streaming, so need to response to browser as a streaming.
        var res = this.createWriteStream();

        // Play as a HTTP client for requesting image.
        // It is Sync way
        var result = fs.readFileSync("/Users/Echo/Desktop/Echo/imports/img/ZBAA.png");

        var buffer = result;
        // TODO: need to set header for response here which transfered by
        // response of logo request.
        res.write(buffer);
        res.end();
    },

    '/data': function() {

        // A file in streaming, so need to response to browser as a streaming.
        var res = this.createWriteStream();

        // Play as a HTTP client for requesting image.
        // It is Sync way
        var result = fs.readFileSync("/Users/Echo/Desktop/Echo/imports/data/demo-data.json");

        var buffer = result;
        // TODO: need to set header for response here which transfered by
        // response of logo request.
        res.write(buffer);
        res.end();
    },
});
// Meteor.isServer enclosure