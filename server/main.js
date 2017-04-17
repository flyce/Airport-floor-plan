import { Meteor } from 'meteor/meteor';
import '../imports/api/users.js';

Meteor.startup(() => {
  // code to run on server at startup
});


if (Meteor.isServer) {

    // exports a RESTful API for browser
    HTTP.methods({

        // name RESTful API as "GET /download-meteor-logo"
        '/download': function() {

            // A file in streaming, so need to response to browser as a streaming.
            var res = this.createWriteStream();

            // Play as a HTTP client for requesting image.
            // It is Sync way
            var result = fs.readFileSync("D:/WebSormWorkSpace/Echo/imports/img/QQ20170408-0.png");

            var buffer = result;
            // TODO: need to set header for response here which transfered by
            // response of logo request.
            res.write(buffer);
            res.end();
        }
    });
} // Meteor.isServer enclosure