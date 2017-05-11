var config = require('../config');
var needle = require('needle');

module.exports = {
  /*
  * get restaurants nearest to the user's location. user provides address for now
  * @param
   */
  getRestaurant: function (switchBoard, msg) {
    var dialog = switchBoard.startDialog(msg);
    msg.reply('Sure, What is your address or city, state? (e.g. New York, NY or 132 Main St, New York, NY)');

    dialog.addChoice(/(^)/i, function (msg2) {
      console.log(msg2.message.text);
      var addressToURL = msg2.message.text;
      addressToURL = addressToURL.replace("personaldietbot ", "").replace(/\s/g, "+");
      console.log(addressToURL);
      //get request for geocode (lat, lng)
      needle.get("https://maps.googleapis.com/maps/api/geocode/json?address="+addressToURL+"&key="+config.google.key, function (err, resp) {
        console.log(resp.body.results[0].geometry.location.lat + ", " + resp.body.results[0].geometry.location.lng);
        var options = {
          headers : {
            'Content-Type': 'application/json'
          },
          key: config.google.key,
          location: resp.body.results[0].geometry.location.lat + "," + resp.body.results[0].geometry.location.lng,
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
