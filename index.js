var Hapi = require('hapi');
var Joi = require('joi');
var Path = require("path");
var fs = require("fs");
var converter = require("imageConverter");
var outputDirectory = "images";
var debugFlag = false;

var server = new Hapi.Server('0.0.0.0', '8000');
var host = server.info.uri;

server.start();
console.log("Server running on " + host);



/* Route to obtain images.*/
server.route({
    method: 'GET',
    path: '/images/{path*}',
    handler: {
        directory: {
            path: './images',
            listing: false,
            index: true
        }
    }
});

/* Route to send images.  */
server.route({
    method: 'POST',
    path: '/create',
    config: {
        payload: {
            maxBytes: 209715200,
            output: 'stream',
            parse: true
        },
        handler: function(request, reply) {
            var data = request.payload;
            console.log("Received request!");
            if (data.upload) {
                var name = data.upload.hapi.filename,
                    path = __dirname + "/uploads/" + name,
                    file = fs.createWriteStream(path),
                    displayedName = name.split(".")[0];

                    file.on('error', function(err) {
                        console.error(err);
                        replay([]);
                    });

                data.upload.pipe(file);
                console.log("Uploading file...");
                data.upload.on('end', function(err) {
                    console.log("Converting file");
                    converter.convert(path, outputDirectory, itemHandler(reply, displayedName));
                });

            } else {
                console.log("Unable to convert PDF");
                reply([]);
            }

        }
    }
});

/* Refactored out a handler function to handle items returned by conversion */
function itemHandler(reply, displayedName) {
    return function(items) {
        var response = items.map(function(item) {
            return {
                name: displayedName,
                url: host + "/" + item
            };
        });
        reply(response);
    }; 	
}