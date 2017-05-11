var config = require('../config');
var needle = require('needle');
var hubotGeocode = require('hubot-geocoder');

module.exports = {
  /*
  * get restaurants nearest to the user's location. user provides address for now
  * @param {Object} switchBoard
  * @param {Object} msg
   */
  getRestaurant: function (switchBoard, msg) {
    console.log(hubotGeocode);
    var dialog = switchBoard.startDialog(msg);
    msg.reply('Sure, What is your address or city, state? (e.g. New York, NY or 132 Main St, New York, NY)');

    dialog.addChoice(/(^)/i, function (msg2) {
      hubotGeocode(msg2, config.google.key, "personaldietbot", function (err, resp) {
        console.log(resp);
        var options = {
          headers : {
            'Content-Type': 'application/json'
          },
          key: config.google.key,
          location: resp[0].lat + "," + resp[0].lng,
          radius: 500,
          type: 'restaurant'
        };
        needle.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+options.location+"&radius=5000&type=restaurant&key="+options.key, function (err, resp) {
          if (err) {
            console.log("error!!");
            console.log(err);
            msg2.reply("Oh no, an error occured :(");
          } else {
            console.log("success!!");
            console.log(resp.body);
            resp.body.results.forEach(function (restaurant) {
              //console.log(restaurant.name);
              msg2.emote(restaurant.name + ", " + restaurant.vicinity);
            });
            msg2.reply("Got back something! Check the console");
          }
        });
      });

    });
  }

};
